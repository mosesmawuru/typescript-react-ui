import React, { forwardRef, Children, cloneElement, isValidElement } from 'react';
import { Flex } from '../flex';
import { Box } from '../box';
import { StackProps } from './types';

export * from './types';

const Stack: React.FC<StackProps> = forwardRef(
  ({ isInline, children, align, justify, spacing = 2, shouldWrapChildren, ...rest }, ref) => {
    const validChildren = Array.isArray(children) ? children.filter(isValidElement) : [];

    return (
      <Flex
        align={align}
        justify={justify}
        flexDir={isInline ? 'row' : 'column'}
        ref={ref}
        {...rest}
      >
        {Children.map(validChildren, (child, index) => {
          if (!isValidElement(child)) {
            return null;
          }
          if (!Array.isArray(children)) {
            return null;
          }
          const isLastChild = validChildren.length === index + 1;
          const spacingProps = isInline
            ? { mr: isLastChild ? undefined : spacing }
            : { mb: isLastChild ? undefined : spacing };

          if (shouldWrapChildren) {
            return (
              <Box display="inline-block" {...spacingProps}>
                {child}
              </Box>
            );
          }
          return cloneElement(child, spacingProps);
        })}
      </Flex>
    );
  }
);

Stack.displayName = 'Stack';

export { Stack };
