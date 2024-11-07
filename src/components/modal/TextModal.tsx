import { Button, TwoButton } from '@components';

import { TwoButtonProps } from '@components/button/TwoButton';

import Modal, { ModalProps } from './Modal';
import * as S from './Modal.style';

type ButtonType = 'multi' | 'single';
export type TextModalProps = TwoButtonProps &
  ModalProps & {
    buttonType?: ButtonType;
    title: string;
  };

export type TextModalOptionProps = Omit<TwoButtonProps & ModalProps, 'onHide'> & { buttonType?: ButtonType };

const TextModal = ({ title, buttonType = 'single', onHide, ...props }: TextModalProps) => {
  return (
    <Modal
      onHide={onHide}
      type={'center'}
      showCloseBtn={props.showCloseBtn ? props.showCloseBtn : false}
      {...props}
    >
      <S.TextModalWrapper>
        <p>{title}</p>
        {buttonType === 'single' ? (
          <Button
            type={props.rightType}
            title={props.rightTitle || '확인'}
            size={props.size}
            onClick={props.rightonClick ? props.rightonClick : onHide}
          />
        ) : (
          <TwoButton {...props} />
        )}
      </S.TextModalWrapper>
    </Modal>
  );
};

export default TextModal;
