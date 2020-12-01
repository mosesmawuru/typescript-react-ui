import * as React from 'react';
import { BoxProps } from '../box';

/**
 * The size of the button
 */
export type ButtonSizes = 'sm' | 'md' | 'lg';
/**
 * The color scheme of the button variant. Use the color keys passed in `theme.colors`.
 */
export type ButtonColorVariants = string;
/**
 * The variant of the button style to use.
 */
export type ButtonVariants = 'outline' | 'unstyled' | 'link' | 'solid';
/**
 * The mode of the button style to use.
 */
export type ButtonModes = 'primary' | 'secondary' | 'tertiary';

export type CustomStyles = {
  [key in ButtonModes]: BoxProps;
};

interface ButtonPropsBase {
  size?: ButtonSizes;
  isLoading?: boolean;
  variantColor?: ButtonColorVariants;
  variant?: ButtonVariants;
  mode?: ButtonModes;
  customStyles?: CustomStyles;
  /**
   * If `true`, the button will be styled in it's active state.
   */
  isActive?: boolean;
  /**
   * If `true`, the button will be disabled.
   */
  isDisabled?: boolean;
  /**
   * The label to show in the button when `isLoading` is true
   * If no text is passed, it only shows the spinner
   */
  loadingText?: string;
  /**
   * If `true`, the button will take up the full width of its container.
   */
  isFullWidth?: boolean;
  /**
   * The html button type to use.
   */
  type?: 'button' | 'reset' | 'submit';
  /**
   * The content of the button.
   */
  children: React.ReactNode;
}

export interface ButtonStyles {
  variant: ButtonVariants;
  mode: ButtonModes;
  size: ButtonSizes;
  customStyles?: CustomStyles;
}

export type ButtonProps = ButtonPropsBase &
  Omit<BoxProps, 'size'> &
  React.RefAttributes<HTMLButtonElement>;
