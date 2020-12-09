import React, { Children, cloneElement } from 'react';
import { Box } from '../box';
import { ButtonGroupProps } from './types';
import { ForwardRefExoticComponentWithAs, forwardRefWithAs } from '@stacks/ui-core';

const ButtonGroup: ForwardRefExoticComponentWithAs<ButtonGroupProps, 'div'> = forwardRefWithAs<
  ButtonGroupProps,
  'div'
>(({ size, variant, isAttached, spacing = 2, children, ...rest }, ref) => {
  const clones = Children.map(children, (child, index) => {
    const isFirst = index === 0;
    const isLast = index === Children.count(children) - 1;

    if (!React.isValidElement(child)) {
      return null;
    }

    return cloneElement(child, {
      size: size || child.props.size,
      variant: child.props.variant || variant,
      _focus: { boxShadow: 'outline', zIndex: 1 },
      ...(!isLast && !isAttached && { mr: spacing }),
      ...(isFirst && isAttached && { roundedRight: 0 }),
      ...(isLast && isAttached && { roundedLeft: 0 }),
      ...(!isFirst && !isLast && isAttached && { rounded: 0 }),
    });
  });

  return (
    <Box display="inline-block" ref={ref as any} {...rest}>
      {clones}
    </Box>
  );
});

ButtonGroup.displayName = 'ButtonGroup';

export { ButtonGroup };
