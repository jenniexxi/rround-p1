import React, { Suspense, useState } from 'react';

import * as S from './Tab.style';
import TabItem from './TabItem';

/**
 * 탭의 레이아웃 타입
 * - spread: 기본
 * - round: 둥근 모서리
 * - wrap: 탭을 감싸는 스타일
 */
export type TabType = 'spread' | 'round' | 'wrap';

/**
 * 탭 아이템 스타일 타입
 */
export type TabItemStyle = {
  /** 테두리 표시 여부 */
  isBorder: boolean;
  /** 탭 아이템 간의 간격 */
  itemGap?: number;
  /** 기본 폰트 굵기 */
  fontWeight: number | string;
  /** 기본 폰트 색상 */
  fontColor: string;
  /** 기본 배경 색상 */
  backgroundColor: string;
  /** 테두리 색상 */
  borderColor?: string;
  /** 테두리 두께 */
  borderWidth?: number;
  /** 선택된 상태의 폰트 색상 */
  selectedFontColor: string;
  /** 선택된 상태의 폰트 굵기 */
  selecteFontWeight: number | string;
  /** 선택된 상태의 배경 색상 */
  selectedBackgroundColor: string;
  /** 선택된 상태의 테두리 색상 */
  selectedBorderColor?: string;
  /** 선택된 상태의 테두리 두께 */
  selectedBorderWidth?: number;
  /** 고정 너비 사용 여부 */
  isFixedWidth?: boolean;
  /** 탭 아이템의 너비 */
  width?: number;
  /** 탭 아이템의 높이 */
  height?: number;
};

/**
 * 탭 아이템의 타입과 스타일 타입
 */
export type TabItemTypeInfo = {
  /** 탭의 레이아웃 타입 */
  type: TabType;
  /** 탭의 스타일 정보 */
  style: TabItemStyle;
};

/**
 * Tab 컴포넌트의 Props 타입
 */
type Props = {
  /** 탭 아이템들의 정보 배열 */
  tabs: {
    /** 탭의 제목 */
    title: string;
    /** 탭의 컨텐츠 (지연 로딩 컴포넌트 또는 JSX 엘리먼트) */
    content: React.LazyExoticComponent<React.ComponentType<any>> | JSX.Element;
  }[];
  /** flex 레이아웃 사용 여부 */
  isFlex?: boolean;
  /** 탭 고정 여부 */
  isStickyTab?: boolean;
  /** 탭의 타입과 스타일 정보 */
  tabItemTypeInfo: TabItemTypeInfo;
  /** 탭의 높이 */
  height?: number;
  /** 현재 활성화된 탭의 인덱스 */
  activeIndex?: number;
  /** 탭 변경 시 호출되는 콜백 함수 */
  onChange?: (index: number) => void;
};

/**
 *
 * @param {Props} props - 탭 컴포넌트의 속성들
 * @returns {JSX.Element} 탭 컴포넌트
 *
 * @example
 * ```tsx
 * <Tab
 *   tabs={[
 *     { title: '탭1', content: <Content1 /> },
 *     { title: '탭2', content: <Content2 /> }
 *   ]}
 *   tabItemTypeInfo={{
 *     type: 'spread',
 *     style: {
 *       // ... 스타일 설정
 *     }
 *   }}
 * />
 * ```
 */
const Tab = ({ tabs, tabItemTypeInfo, isFlex = false, height, isStickyTab = false, activeIndex, onChange }: Props) => {
  const [internalActiveTab, setInternalActiveTab] = useState(0);

  // 외부에서 제어되는 경우 activeIndex 사용, 아닌 경우 내부 상태 사용
  const activeTab = activeIndex ?? internalActiveTab;

  /**
   * 탭 변경 핸들러
   * @param {number} index - 선택된 탭의 인덱스
   */
  const handleTabChange = (index: number) => {
    if (onChange) {
      onChange(index);
    } else {
      setInternalActiveTab(index);
    }
  };

  /**
   * 컨텐츠 렌더링 함수
   * lazy 컴포넌트나 일반 JSX 구분하여 렌더링
   *
   * @param {React.LazyExoticComponent<React.ComponentType<any>> | JSX.Element} content - 렌더링할 컨텐츠
   * @returns {JSX.Element} 렌더링된 컨텐츠
   */
  const renderContent = (content: React.LazyExoticComponent<React.ComponentType<any>> | JSX.Element) => {
    if (typeof content === 'object' && 'type' in content) {
      return content;
    } else {
      return <Suspense fallback={<div>Loading...</div>}>{React.createElement(content)}</Suspense>;
    }
  };

  return (
    <S.TabContainer>
      <S.TabItemView
        $isStickyTab={isStickyTab}
        $isFlex={isFlex}
        $tabItemType={tabItemTypeInfo}
        $height={height}
      >
        {tabs.map((tab, index) => (
          <TabItem
            key={tab.title + index}
            isFlex={isFlex}
            isSelected={index === activeTab}
            onSelect={() => handleTabChange(index)}
            label={tab.title}
            typeInfo={tabItemTypeInfo}
          />
        ))}
      </S.TabItemView>
      <S.TabContent
        $isStickyTab={isStickyTab}
        $tabViewHeight={height}
      >
        {renderContent(tabs[activeTab].content)}
      </S.TabContent>
    </S.TabContainer>
  );
};

export default Tab;
