import { BoxProps } from '../box/types'

interface IFlexPropsBase {
  /**
   * Shorthand for Styled-System `alignItems` prop
   */
  align?: BoxProps['alignItems']
  /**
   * Shorthand for Styled-System `justifyContent` prop
   */
  justify?: BoxProps['justifyContent']
  /**
   * Shorthand for Styled-System `flexWrap` prop
   */
  wrap?: BoxProps['flexWrap']
  /**
   * Shorthand for Styled-System `flexDirection` prop
   */
  direction?: BoxProps['flexDirection']
}

export type FlexProps = IFlexPropsBase & BoxProps
