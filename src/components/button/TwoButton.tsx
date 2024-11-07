import { BtnSize, BtnType } from './Button';
import * as S from './Button.style';

type Props = {
  leftType?: BtnType;
  leftonClick?: () => void;
  leftTitle?: string | JSX.Element;
  rightType?: BtnType;
  rightonClick?: () => void;
  rightTitle?: string | JSX.Element;
  size?: BtnSize;
  leftSize?: number;
  rightSize?: number;
  btnGap?: number;
};

export type TwoButtonProps = Props;

const TwoButton = ({
  leftType = 'primary',
  leftonClick,
  leftTitle = '취소',
  rightType = 'primary',
  rightonClick,
  rightTitle = '확인',
  size = 'lg',
  leftSize = 1,
  rightSize = 1,
  btnGap = 10,
}: Props) => {
  return (
    <div style={{ display: 'flex' }}>
      <div style={{ flex: leftSize, marginRight: btnGap }}>
        <S.Button
          $type={leftType}
          $size={size}
          onClick={leftonClick}
        >
          {leftTitle}
        </S.Button>
      </div>
      <div style={{ flex: rightSize }}>
        <S.Button
          $type={rightType}
          $size={size}
          onClick={rightonClick}
        >
          {rightTitle}
        </S.Button>
      </div>
    </div>
  );
};

export default TwoButton;
