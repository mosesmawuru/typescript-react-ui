import * as React from 'react';
import { Box, BoxProps } from '../box';
import { ForwardRefExoticComponentWithAs, forwardRefWithAs } from '@stacks/ui-core';

const defaultProps = {
  width: '24px',
  height: 'auto',
  fill: 'none',
  viewBox: '0 0 24 24',
};

export const Svg: ForwardRefExoticComponentWithAs<BoxProps, 'svg'> = forwardRefWithAs<
  BoxProps,
  'svg'
>(({ as = 'svg', ...props }, ref) => <Box ref={ref} as="svg" {...defaultProps} {...props} />);
