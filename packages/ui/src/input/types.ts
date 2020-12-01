import * as React from 'react';
import { BoxProps } from '../box';
import { Omit } from '../common-types';

export type InputVariant = 'outline' | 'unstyled' | 'flushed' | 'filled';
export type InputSize = 'default';

export interface InputPropsBase<T = HTMLInputElement> {
  /**
   * If `true`, the input will be disabled.
   * This sets `aria-disabled=true` and you can style this state by passing `_disabled` prop
   */
  isDisabled?: React.InputHTMLAttributes<T>['disabled'];
  /**
   * If `true`, the `input` will indicate an error.
   * This sets `aria-invalid=true` and you can style this state by passing `_invalid` prop
   *
   */
  isInvalid?: boolean;
  /**
   * If `true`, the input element will be required.
   */
  isRequired?: React.InputHTMLAttributes<T>['required'];
  /**
   * If `true`, the input element will span the full width of it's parent
   */
  isFullWidth?: boolean;
  /**
   * If `true`, prevents the value of the input from being edited.
   */
  isReadOnly?: React.InputHTMLAttributes<T>['readOnly'];
  /**
   * The visual InputSize of the `input` element.
   */
  size?: InputSize;
  /**
   * The variant of the input style to use.
   */
  variant?: InputVariant;
  /**
   * The element or component to use in place of `input`
   */
  as?: React.ElementType;
  /**
   * [ARIA] The accessible label to use, in scenarios where the input as no visible label
   */
  'aria-label'?: React.AriaAttributes['aria-label'];
  /**
   * [ARIA] The id of the element that describes the input.
   */
  'aria-describedby'?: React.AriaAttributes['aria-describedby'];

  /**
   * The border color when the input is focused. Use color keys in `theme.colors`
   * @example
   * focusBorderColor = "blue"
   */
  focusBorderColor?: string;
  textStyle?: string;
}

type OmittedTypes = 'size' | 'disabled' | 'required' | 'checked' | 'defaultChecked' | 'readOnly';

type InputHTMLAttributes = Omit<React.InputHTMLAttributes<HTMLInputElement>, OmittedTypes>;

export type InputProps<T = HTMLInputElement> = InputPropsBase<T> &
  BoxProps &
  InputHTMLAttributes &
  React.RefAttributes<T>;
