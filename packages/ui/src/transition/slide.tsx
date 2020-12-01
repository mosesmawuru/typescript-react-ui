import * as React from 'react';
import { Transition } from './base';
import { SlideProps, Placement } from './types';

const createBaseStyle = (placement: Placement) => {
  switch (placement) {
    case 'bottom': {
      return {
        maxWidth: '100vw',
        bottom: 0,
        left: 0,
        right: 0,
      };
    }
    case 'top': {
      return {
        maxWidth: '100vw',
        top: 0,
        left: 0,
        right: 0,
      };
    }
    case 'left': {
      return {
        width: '100%',
        height: '100vh',
        left: 0,
        top: 0,
      };
    }
    case 'right': {
      return {
        width: '100%',
        right: 0,
        top: 0,
        height: '100vh',
      };
    }
    default:
      return undefined;
  }
};

const getTransformStyle = (placement: Placement, value: string) => {
  let axis = '';
  if (placement === 'left' || placement === 'right') axis = 'X';
  if (placement === 'top' || placement === 'bottom') axis = 'Y';
  return `translate${axis}(${value})`;
};

const getTransitionStyles = (placement: Placement) => {
  const offset = {
    bottom: '100%',
    top: '-100%',
    left: '-100%',
    right: '100%',
  };

  return {
    init: {
      transform: getTransformStyle(placement, offset[placement]),
    },
    entered: { transform: getTransformStyle(placement, '0%') },
    exiting: {
      transform: getTransformStyle(placement, offset[placement]),
    },
  };
};

export function Slide(props: SlideProps) {
  const { placement = 'left', timeout = 250, children, ...rest } = props;

  const styles = getTransitionStyles(placement);

  const positionStyles: React.CSSProperties = {
    position: 'fixed',
    willChange: 'transform',
    ...createBaseStyle(placement),
  };

  return (
    <Transition
      styles={styles}
      transition={`all ${timeout}ms cubic-bezier(0, 0, 0.2, 1)`}
      timeout={{ enter: 50, exit: timeout }}
      {...rest}
    >
      {styles => children({ ...positionStyles, ...styles })}
    </Transition>
  );
}

export default Slide;
