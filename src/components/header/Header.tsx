import React from 'react';

import { useNavigate } from 'react-router-dom';

import webviewbridge from '@utils/webviewbridge';

import CloseButton from '@commons/CloseButton';

import * as S from './Header.style';

/**
 * 헤더 컴포넌트 속성 인터페이스
 */
type HeaderProps = {
  showHeader?: boolean;
  showLeftButton?: boolean;
  showTitle?: boolean;
  showRightButton?: boolean;
  title?: string;
  leftElement?: React.ReactNode;
  rightElement?: React.ReactNode;
  onLeftClick?: () => void;
  onRightClick?: () => void;
  isStick?: boolean;
};
/**
 * 헤더 컴포넌트
 * 상단에 표시되는 헤더 렌더링
 */
const Header: React.FC<HeaderProps> = ({
  showHeader = true,
  showLeftButton = true,
  showTitle = true,
  showRightButton = true,
  title = '',
  leftElement,
  rightElement,
  onLeftClick,
  onRightClick,
  isStick = true,
}) => {
  const navigate = useNavigate();

  /** 뒤로 가기 핸들러 */
  const handleBack = () => navigate(-1);

  /** 닫기 핸들러 */
  const handleClose = () => {
    if (window.history.length > 1) {
      // 이전 페이지가 있는 경우
      navigate(-1);
    } else {
      // 이전 페이지가 없는 경우 웹뷰 닫기
      webviewbridge.close();
    }
  };

  /** 왼쪽 엘리먼트 렌더링 함수 */
  const renderLeftElement = () => {
    if (showLeftButton) {
      if (leftElement) {
        return leftElement;
      }
      return <S.BackButton onClick={onLeftClick || handleBack}>{'<'}</S.BackButton>;
    }
    return null;
  };

  /** 오른쪽 엘리먼트 렌더링 함수 */
  const renderRightElement = () => {
    if (showRightButton) {
      if (rightElement) {
        return rightElement;
      }
      return <CloseButton onClick={onRightClick || handleClose} />;
    }
    return null;
  };

  if (!showHeader) return null;

  return (
    <S.HeaderContainer $isStick={isStick}>
      <S.LeftSection>{renderLeftElement()}</S.LeftSection>
      <S.TitleWrapper>{showTitle && <S.Title>{title}</S.Title>}</S.TitleWrapper>
      <S.RightSection>{renderRightElement()}</S.RightSection>
    </S.HeaderContainer>
  );
};

export default Header;
