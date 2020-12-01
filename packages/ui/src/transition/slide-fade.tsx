import * as React from 'react';
import { Transition } from './base';
import { SlideFadeProps } from './types';

function getTransitionStyles(initialOffset: string) {
  return {
    init: {
      opacity: 0,
      transform: `translateY(${initialOffset})`,
    },
    entered: {
      opacity: 1,
      transform: 'translateY(0px)',
    },
    exiting: {
      opacity: 0,
      transform: `translateY(${initialOffset})`,
    },
  };
}

export const SlideFade = (props: SlideFadeProps) => {
  const { initialOffset = '20px', timeout = 150, ...rest } = props;

  const styles = getTransitionStyles(initialOffset);

  return (
    <Transition
      styles={styles}
      transition={`all ${timeout}ms cubic-bezier(0.4, 0.14, 0.3, 1)`}
      timeout={{ enter: 50, exit: timeout }}
      {...rest}
    />
  );
};
