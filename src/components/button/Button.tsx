import * as S from './Button.style';

/**
 * 버튼의 스타일 타입을 정의하는 타입
 */
export type BtnType = 'primary' | 'primary.outline' | 'common' | 'common.outline.bk' | 'common.outline.grey';

/**
 * 버튼의 크기를 정의하는 타입
 */
export type BtnSize = 'lg' | 'md' | 'sm' | 'tiny';

/**
 * 버튼 컴포넌트의 Props 타입
 */
type Props = {
  /** 버튼의 스타일 타입 */
  type?: BtnType;
  /** 클릭 이벤트 핸들러 */
  onClick?: ((e: React.MouseEvent<HTMLButtonElement>) => void) | (() => void);
  /** 버튼에 표시될 텍스트 또는 엘리먼트 */
  title: string | JSX.Element;
  /** 버튼의 크기 */
  size?: BtnSize;
  /** 버튼의 너비 (px) */
  width?: number;
};

/**
 * 공통으로 사용되는 버튼 컴포넌트
 * @param {BtnType} type - 버튼의 스타일 타입 (기본값: 'primary')
 * @param {() => void} onClick - 클릭 이벤트 핸들러
 * @param {string | JSX.Element} title - 버튼에 표시될 텍스트 또는 엘리먼트
 * @param {BtnSize} size - 버튼의 크기 (기본값: 'lg')
 * @param {number} width - 버튼의 너비 (px)
 * @returns {JSX.Element} 스타일이 적용된 버튼 엘리먼트
 */
const Button = ({ type = 'primary', onClick, title, size = 'lg', width }: Props) => {
  return (
    <S.Button
      $type={type}
      $size={size}
      onClick={onClick}
      $width={width}
    >
      {title}
    </S.Button>
  );
};

export default Button;
