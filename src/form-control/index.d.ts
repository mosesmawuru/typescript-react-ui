import { BoxProps } from "../box";
import * as React from "react";

interface IFormControl {
  /**
   * Content of the form control.
   */
  children?: React.ReactNode;
  /**
   * If `true` set the form control to the invalid state.
   */
  isInvalid?: boolean;
  /**
   * If `true` set the form control to be required.
   */
  isRequired?: boolean;
  /**
   * If `true` set the form control to the disabled state.
   */
  isDisabled?: boolean;
}

export type FormControlProps = IFormControl & BoxProps;

/**
 * FormControl provides context such as `isInvalid`, `isRequired`, `isDisabled` to it's children.
 */
declare const FormControl: React.FC<FormControlProps>;

export default FormControl;
