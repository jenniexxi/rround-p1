import { useEffect } from 'react';

import { useTypedOutletContext } from './useTypedOutletContext';
import { HeaderConfig } from './useTypedOutletContext';

/**
 * 헤더 설정을 관리하는 커스텀 훅
 * @param {string} title - 헤더 제목
 * @param {Partial<HeaderConfig>} config - 추가 헤더 설정
 *
 * @example
 * // 기본 사용법
 * useHeader('페이지 제목');
 *
 * @example
 * // 추가 설정과 함께 사용
 * useHeader('커스텀 헤더', {
 *   showLeftButton: false,
 *   showRightButton: true,
 *   rightElement: <CustomButton />,
 *   onRightClick: () => console.log('오른쪽 버튼 클릭')
 * });
 *
 * @example
 * // 헤더 숨기기
 * useHeader('', { showHeader: false });
 */
export const useHeader = (title: string, config: Partial<HeaderConfig> = {}) => {
  const { updateHeader } = useTypedOutletContext();

  useEffect(() => {
    updateHeader({
      title,
      ...config,
      showHeader: config.showHeader ?? true,
    });
  }, [updateHeader, title, config]);
};
