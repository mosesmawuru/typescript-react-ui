/** @jsx jsx */
import { forwardRef } from 'react';
import { jsx, keyframes } from '@emotion/react';
import { Box } from '../box';
import { VisuallyHidden } from '../visually-hidden';
import { SpinnerProps, SpinnerSize } from './types';

const spin = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const getSize = (size: SpinnerSize): string => {
  switch (size) {
    case 'xs':
      return '0.75rem';
    case 'sm':
      return '1rem';
    case 'md':
      return '1.5rem';
    case 'lg':
      return '2rem';
    case 'xl':
      return '3rem';
    default:
      return size;
  }
};

/**
 * Spinner is used for indicating a loading state of a component or page.
 *
 * RECOMMENDED: Add `aria-busy="true"` to the component that triggered the loading state while the spinner is shown.
 */
const Spinner = forwardRef<any, SpinnerProps>(
  (
    {
      size = 'md',
      label = 'Loading...',
      thickness = '2px',
      speed = '0.85s',
      color,
      emptyColor = 'transparent',
      ...props
    },
    ref
  ) => {
    const _size = getSize(size);

    return (
      <Box
        ref={ref}
        display="inline-block"
        borderWidth={thickness}
        borderColor="currentColor"
        borderBottomColor={emptyColor}
        borderLeftColor={emptyColor}
        borderRadius="100%"
        speed={speed}
        color={color}
        size={_size}
        animation={`${spin} ${speed} linear infinite`}
        {...props}
      >
        {label && <VisuallyHidden>{label}</VisuallyHidden>}
      </Box>
    );
  }
);

Spinner.displayName = 'Spinner';

export { Spinner };
