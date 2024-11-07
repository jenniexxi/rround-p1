import { useEffect } from 'react';

import { createPortal } from 'react-dom';

import useWindowDimensions from '@hooks/useWindowDimensions';

import CloseButton from '@commons/CloseButton';

import * as S from './Modal.style';
import { ModalTypes } from './Modal.type';

type Props = {
  onClickBackDrop?: () => void;
  children?: React.ReactNode;
  type?: ModalTypes;
  isAnimation?: boolean;
  showCloseBtn?: boolean;
  isEnableBackDropHide?: boolean;
  backDropAnimation?: boolean;
  closeBtnPosition?: { top: number; right: number; size: number };
  radius?: number;
  onHide: () => void;
  backDropColor?: string;
};

export type ModalProps = Props & {};
const Modal = ({
  children = <></>,
  onClickBackDrop,
  type = 'center',
  isAnimation = true,
  showCloseBtn = true,
  isEnableBackDropHide = true,
  backDropAnimation = false,
  radius = 20,
  closeBtnPosition = { top: 5, right: 10, size: 32 },
  backDropColor,
  onHide,
}: Props) => {
  const { width } = useWindowDimensions();

  useEffect(() => {
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  const handleBackdropClick = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    if (e.target === e.currentTarget) {
      e.preventDefault();
      isEnableBackDropHide && onHide();
      onClickBackDrop && onClickBackDrop();
    }
  };

  return createPortal(
    <S.BackDrop
      onClick={handleBackdropClick}
      $isAnimation={backDropAnimation}
      $backDropColor={backDropColor}
    >
      <S.ModalView
        type={type}
        $isAnimated={isAnimation}
      >
        {showCloseBtn && (
          <S.CloseBtn $closeBtnPosition={closeBtnPosition}>
            <CloseButton
              onClick={onHide}
              size={closeBtnPosition.size}
            />
          </S.CloseBtn>
        )}
        <S.ChildView
          $width={width}
          type={type}
          $radius={radius}
        >
          {children}
        </S.ChildView>
      </S.ModalView>
    </S.BackDrop>,
    document.body,
  );
};

export default Modal;
