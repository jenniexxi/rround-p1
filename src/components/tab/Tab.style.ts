import styled, { css } from 'styled-components';

import { pxToRem } from '@utils/display';

import { TabItemTypeInfo } from './Tab';

export const TabContainer = styled.div`
  width: 100%;
`;
export const TabItemView = styled.ul<{
  $tabItemType: TabItemTypeInfo;
  $isFlex: boolean;
  $height?: number;
  $isStickyTab: boolean;
}>`
  display: flex;
  list-style-type: none;
  margin: 0;
  padding: 0;

  /* border-bottom: 2px solid #ccc; */
  flex-direction: row;
  align-items: center;

  overflow-x: auto; // 가로 스크롤 허용
  white-space: nowrap; // 내부 요소들이 줄바꿈되지 않도록 설정
  -webkit-overflow-scrolling: touch; // iOS에서 부드러운 스크롤 지원

  // 스크롤바 숨기기 (선택적)
  scrollbar-width: none; // Firefox
  -ms-overflow-style: none; // IE and Edge
  &::-webkit-scrollbar {
    display: none; // Chrome, Safari, and Opera
  }

  ${({ $isStickyTab }) =>
    $isStickyTab &&
    css`
      position: fixed;
      top: 0;
    `}

  ${({ $height }) =>
    $height &&
    css`
      height: ${pxToRem($height)};
    `}
`;

export const TabItem = styled.li<{
  $isSelected: boolean;
  $tabItemType: TabItemTypeInfo;
  $isFlex: boolean;
  $isFixedWidth: boolean;
  $width?: number;
  $height?: number;
}>`
  cursor: pointer;

  ${({ $isFlex, $tabItemType }) =>
    $isFlex
      ? css`
          flex: 1;
          justify-content: center;
          align-items: center;
          display: flex;
        `
      : css`
          ${$tabItemType.style.itemGap && `margin-right:${$tabItemType.style.itemGap}px`};
        `}

  ${({ $tabItemType, $isSelected }) =>
    $isSelected
      ? css`
          font-weight: ${$tabItemType.style.selecteFontWeight};
          color: ${$tabItemType.style.selectedFontColor};
          background-color: ${$tabItemType.style.selectedBackgroundColor};
          ${$tabItemType.style.isBorder &&
          css`
            border: ${$tabItemType.style.selectedBorderWidth} solid ${$tabItemType.style.selectedBorderColor};
          `}
        `
      : css`
          font-weight: ${$tabItemType.style.fontWeight};
          color: ${$tabItemType.style.fontColor};
          background-color: ${$tabItemType.style.backgroundColor};
          ${$tabItemType.style.isBorder &&
          css`
            border: ${$tabItemType.style.selectedBorderWidth} solid ${$tabItemType.style.selectedBorderColor};
          `}
        `}

  ${({ $isFixedWidth, $width, $height }) => {
    if ($isFixedWidth) {
      return css`
        width: ${pxToRem($width)};
        display: flex;
        flex-shrink: 0;
        align-items: center;
        justify-content: center;
        ${$height
          ? 'height:' + pxToRem($height) + ';'
          : css`
              padding: 0.1rem 1.5rem;
            `}
      `;
    } else {
      return css`
        padding: 0.1rem 1.5rem;
        ${$height && 'height:' + pxToRem($height) + ';'}
      `;
    }
  }}
  ${({ $tabItemType, $isSelected }) => {
    switch ($tabItemType.type) {
      case 'round':
        return css`
          border-radius: pxToRem(500);
        `;
      case 'wrap':
        return css`
          border: 1px solid ${$tabItemType.style.borderColor};
          ${$isSelected &&
          css`
            border-bottom: none;
          `}

          border-top-left-radius: pxToRem(10);
          border-top-right-radius: pxToRem(10);
        `;
      case 'spread':
      default:
        return css``;
    }
  }}
`;

export const TabContent = styled.div<{
  $isStickyTab: boolean;
  $tabViewHeight?: number;
}>`
  ${({ $isStickyTab, $tabViewHeight }) =>
    $isStickyTab &&
    css`
      margin-top: ${pxToRem($tabViewHeight)};
    `}
`;
