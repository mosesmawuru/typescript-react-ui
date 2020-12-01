import * as React from 'react';
import { useRef, useCallback, useEffect } from 'react';
import { Placement } from '@popperjs/core';

import { useDisclosure, useEventListener, useId, useMergeRefs } from '../hooks';
import { usePopper, UsePopperProps } from '../popper';
import { callAllHandlers, mergeRefs, Dict } from '../utils';
import flushable from 'flushable';

let hideOperation: flushable.FlushableOperation;
let activeId: string | null = null;

function show(fn: (isHidePending: boolean) => void, delay: number) {
  // check if hide has not been executed
  const isHidePending = hideOperation?.pending();

  // immediately execute hide if it has not been executed
  if (isHidePending) {
    hideOperation.flush();
  }

  // setup the show operation using flushable
  const showOperation = flushable(() => fn(isHidePending), isHidePending ? 0 : delay);

  // return a function to cancel show() from executing
  // in the case of multiple tooltips
  return showOperation.cancel;
}

function hide(fn: (flushed: boolean) => void, delay: number) {
  // setup the hide operation using flushable
  hideOperation = flushable(flushed => fn(flushed), delay);

  // return a function to cancel hide() from executing
  return hideOperation.cancel;
}

export interface UseTooltipProps {
  /**
   * Delay (in ms) before hiding the tooltip
   * @default 200ms
   */
  hideDelay?: number;
  /**
   * Delay (in ms) before showing the tooltip
   * @default 200ms
   */
  showDelay?: number;
  /**
   * If `true`, the tooltip will hide on click
   */
  hideOnClick?: boolean;
  /**
   * If `true`, the tooltip will hide while the mouse
   * is down
   */
  hideOnMouseDown?: boolean;
  /**
   * Callback to run when the tooltip shows
   */
  onShow?(): void;
  /**
   * Callback to run when the tooltip hides
   */
  onHide?(): void;
  /**
   * The Popper.js placement of the tooltip
   */
  placement?: Placement;
  /**
   * Custom `id` to use in place of `uuid`
   */
  id?: string;
  /**
   * If `true`, the tooltip will be shown (in controlled mode)
   */
  isOpen?: boolean;
  /**
   * If `true`, the tooltip will be initially shown
   */
  defaultIsOpen?: boolean;
  /**
   * The size of the arrow in css units (numeric)
   * @default 10 ( = 10px )
   */
  arrowSize?: UsePopperProps['arrowSize'];
  /**
   * The label, we check if it changes to refresh the position of the tooltip
   */
  label?: string;
}

export function useTooltip(props: UseTooltipProps = {}) {
  const {
    showDelay = 200,
    hideDelay = 200,
    hideOnClick = false,
    onShow,
    onHide,
    hideOnMouseDown,
    placement,
    id,
    isOpen: isOpenProp,
    defaultIsOpen,
    arrowSize = 10,
    label: _label,
  } = props;

  const [label, setLabel] = React.useState(_label);

  const labelIsUpToDate = _label === label;

  if (!labelIsUpToDate) setLabel(_label);

  const { isOpen, onOpen: open, onClose: close } = useDisclosure({
    isOpen: isOpenProp,
    defaultIsOpen,
    onOpen: onShow,
    onClose: onHide,
  });

  const popper = usePopper({
    forceUpdate: isOpen && labelIsUpToDate,
    placement,
    arrowSize,
  });

  const tooltipId = useId(id, 'tooltip');

  const ref = useRef<any>(null);
  const triggerRef = useMergeRefs(ref, popper.reference.ref);

  const flushRef = useRef<Function>();

  useEffect(() => {
    return () => flushRef.current?.();
  }, []);

  const hideImmediately = useCallback(() => {
    flushRef.current?.();
    close();
  }, [close]);

  const onClick = useCallback(() => {
    if (hideOnClick) {
      hideImmediately();
    }
  }, [hideOnClick, hideImmediately]);

  const onMouseDown = useCallback(() => {
    if (hideOnMouseDown) {
      hideImmediately();
    }
  }, [hideOnMouseDown, hideImmediately]);

  const showTooltip = useCallback(() => {
    flushRef.current?.();

    if (tooltipId !== activeId) {
      hideImmediately();
    }

    activeId = tooltipId;

    if (!isOpen) {
      flushRef.current = show(() => {
        open();
      }, showDelay);
    }
  }, [isOpen, showDelay, open, tooltipId, hideImmediately]);

  const hideTooltip = useCallback(() => {
    flushRef.current?.();
    activeId = null;

    if (isOpen) {
      flushRef.current = hide(() => {
        close();
      }, hideDelay);
    }
  }, [isOpen, hideDelay, close]);

  const onMouseOver = useCallback(
    (event: React.MouseEvent) => {
      const isSelf = event.target === (ref.current as HTMLElement);

      if (isOpen && isSelf) {
        return;
      }

      showTooltip();
    },
    [isOpen, showTooltip]
  );

  // A11y: Close the tooltip if user presses escape
  const onKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (isOpen && event.key === 'Escape') {
        hideImmediately();
      }
    },
    [isOpen, hideImmediately]
  );

  useEventListener('keydown', onKeyDown);

  return {
    isOpen,
    show: open,
    hide: close,
    placement: popper.placement,
    getTriggerProps: (props: Dict = {}) => ({
      ...props,
      ref: mergeRefs(props.ref, triggerRef),
      onMouseOut: callAllHandlers(props.onMouseOut, hideTooltip),
      onMouseOver: callAllHandlers(props.onMouseOver, onMouseOver),
      onClick: callAllHandlers(props.onClick, onClick),
      onMouseDown: callAllHandlers(props.onMouseDown, onMouseDown),
      onFocus: callAllHandlers(props.onFocus, showTooltip),
      onBlur: callAllHandlers(props.onBlur, hideTooltip),
      'aria-describedby': isOpen ? tooltipId : undefined,
    }),
    getTooltipProps: (props: Dict = {}) => ({
      ...props,
      id: tooltipId,
      role: 'tooltip',
      ref: mergeRefs(props.ref, popper.popper.ref),
      style: { ...props.style, ...popper.popper.style },
    }),
    getArrowProps: (props: Dict = {}) => ({
      ...props,
      ref: mergeRefs(props.ref, popper.arrow.ref),
      style: { ...props.style, ...popper.arrow.style },
    }),
  };
}

export type UseTooltipReturn = ReturnType<typeof useTooltip>;
