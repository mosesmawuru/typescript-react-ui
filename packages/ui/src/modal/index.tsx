import React from 'react';
import { Box } from '../box';
import { Flex, FlexProps } from '../flex';
import { ModalContextTypes, ModalProps, WrapperComponentProps } from './types';
import useOnClickOutside from 'use-onclickoutside';

const ModalContext = React.createContext<ModalContextTypes>({
  isOpen: false,
});

export const useModalState = () => React.useContext(ModalContext);

const Header = React.memo(({ component }: WrapperComponentProps) =>
  component ? (
    <Box borderTopRightRadius="6px" borderTopLeftRadius="6px">
      {component}
    </Box>
  ) : null
);

const Footer = React.memo(({ component }: WrapperComponentProps) =>
  component ? (
    <Box borderBottomRightRadius="6px" borderBottomLeftRadius="6px">
      {component}
    </Box>
  ) : null
);

interface ModalUnderlayProps {
  isOpen?: boolean;
  noAnimation?: boolean;
}

const ModalUnderlay = ({ isOpen, noAnimation }: ModalUnderlayProps) => (
  <Box
    position="fixed"
    size="100%"
    left={0}
    right={0}
    top={0}
    bottom={0}
    bg={`rgba(0,0,0,${isOpen ? '0.48' : '0'})`}
    transition={noAnimation ? 'unset' : 'all 0.15s'}
    zIndex={99999}
    style={{
      userSelect: isOpen ? 'unset' : 'none',
      pointerEvents: isOpen ? 'unset' : 'none',
      willChange: 'background',
    }}
  />
);
interface ModalWrapperProps {
  isOpen: boolean;
}

const ModalWrapper: React.FC<ModalWrapperProps & FlexProps> = ({ isOpen, ...rest }) => (
  <Flex
    zIndex={999999}
    position="fixed"
    bottom={[0, 'unset']}
    width="100%"
    top={0}
    left={0}
    height="100%"
    maxHeight={['100vh', 'unset']}
    alignItems="center"
    justifyContent={['flex-end', 'center']}
    flexDirection="column"
    opacity={isOpen ? 1 : 0}
    style={{
      userSelect: isOpen ? 'unset' : 'none',
      pointerEvents: isOpen ? 'unset' : 'none',
    }}
    {...rest}
  />
);

interface ModalCardContainerProps {
  isOpen: boolean;
  noAnimation: boolean;
}

const ModalCardContainer: React.FC<ModalCardContainerProps & FlexProps> = React.forwardRef<
  any,
  ModalCardContainerProps & FlexProps
>(({ noAnimation, isOpen, ...rest }, ref) => (
  <Flex
    flexDirection="column"
    position="relative"
    bg="white"
    mx="auto"
    minWidth={['100%', '396px']}
    maxWidth={['100%', '396px']}
    maxHeight={['100%', 'calc(100% - 48px)']}
    borderRadius={['unset', '6px']}
    boxShadow="high"
    transform={noAnimation ? 'translateY(0px)' : isOpen ? 'translateY(0px)' : 'translateY(15px)'}
    transition={noAnimation ? 'unset' : 'all 0.2s ease-in-out'}
    style={{
      willChange: 'transform',
    }}
    ref={ref}
    {...rest}
  />
));

export const Modal: React.FC<ModalProps> = React.memo(
  ({
    footerComponent: FooterComponent = null,
    headerComponent: HeaderComponent = null,
    isOpen = false,
    children,
    noAnimation = false,
    close,
    ...props
  }) => {
    const { doCloseModal } = useModalState();
    const ref = React.useRef<any>(null);

    React.useEffect(() => {
      const func = (event: KeyboardEvent) => {
        if (event.key === 'Escape') {
          if (close) {
            close();
          } else if (doCloseModal) {
            doCloseModal();
          }
        }
      };

      if (isOpen) {
        typeof window !== 'undefined' &&
          window?.document?.createElement &&
          document.addEventListener('keydown', func);
      }
      return () => {
        typeof window !== 'undefined' &&
          window?.document?.createElement &&
          document.removeEventListener('keydown', func);
      };
    }, [isOpen, close]);

    const handler = isOpen ? close || doCloseModal || null : null;

    useOnClickOutside(ref, handler);

    return (
      <>
        <ModalUnderlay isOpen={isOpen} noAnimation={noAnimation} />
        <ModalWrapper isOpen={isOpen}>
          <ModalCardContainer
            isOpen={isOpen}
            noAnimation={noAnimation}
            {...props}
            // @ts-ignore
            ref={ref as any}
          >
            <Header component={HeaderComponent} />
            <Box overflowY="auto">{children}</Box>
            <Footer component={FooterComponent} />
          </ModalCardContainer>
        </ModalWrapper>
      </>
    );
  }
);

export const ModalProvider: React.FC = props => {
  const [isOpen, setIsOpen] = React.useState(false);
  const doOpenModal = () => (!isOpen ? setIsOpen(true) : null);
  const doCloseModal = () => (isOpen ? setIsOpen(false) : null);
  return (
    <ModalContext.Provider
      value={{
        isOpen,
        doOpenModal,
        doCloseModal,
      }}
    >
      {props.children}
    </ModalContext.Provider>
  );
};
