import { useCallback, useEffect, useRef, useState } from 'react';

import { Outlet, useLocation } from 'react-router-dom';

import { Footer, Header } from '@components';

import { HeaderConfig } from '@hooks/useTypedOutletContext';

/**
 * 기본 헤더 설정
 * @type {HeaderConfig}
 */
const defaultHeaderConfig: HeaderConfig = {
  showHeader: true,
  showLeftButton: true,
  showTitle: true,
  showRightButton: true,
  title: '',
};

/**
 * 레이아웃 컴포넌트
 * 헤더, 본문 콘텐츠, 푸터를 포함하는 전체 레이아웃 관리
 * 헤더 설정의 상태 관리 및 페이지 간 이동 시 헤더 설정 초기화 처리
 * @returns {JSX.Element} 레이아웃 컴포넌트
 */
const Layout = () => {
  const [headerConfig, setHeaderConfig] = useState<HeaderConfig>(defaultHeaderConfig);
  const location = useLocation();
  const headerUpdated = useRef(false);

  /**
   * 헤더 설정을 업데이트하는 함수
   * @param {Partial<HeaderConfig>} newConfig - 새로운 헤더 설정
   */
  const updateHeader = useCallback((newConfig: Partial<HeaderConfig>) => {
    setHeaderConfig((prev) => {
      const updated = { ...prev, ...newConfig };
      if (JSON.stringify(updated) !== JSON.stringify(prev)) {
        if (typeof window !== 'undefined' && window.sessionStorage) {
          window.sessionStorage.setItem('headerConfig', JSON.stringify(updated));
        }
        headerUpdated.current = true;
        return updated;
      }
      return prev;
    });
  }, []);

  // 페이지 변경 시 헤더 설정을 초기화하거나 저장된 설정 호출
  useEffect(() => {
    if (typeof window !== 'undefined' && window.sessionStorage) {
      const saved = window.sessionStorage.getItem('headerConfig');
      if (saved) {
        updateHeader(JSON.parse(saved));
      } else {
        updateHeader(defaultHeaderConfig);
      }
    }

    return () => {
      headerUpdated.current = false;
    };
  }, [location.pathname, updateHeader]);

  // useHeader 훅이 호출되지 않은 경우 헤더를 기본 설정으로 초기화.
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!headerUpdated.current) {
        updateHeader(defaultHeaderConfig);
      }
    }, 0);

    return () => clearTimeout(timer);
  }, [location.pathname, updateHeader]);

  return (
    <>
      <Header {...headerConfig} />
      <Outlet context={{ updateHeader }} />
      <Footer />
    </>
  );
};

export default Layout;
