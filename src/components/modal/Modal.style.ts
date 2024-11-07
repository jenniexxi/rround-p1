import styled, { css, keyframes } from 'styled-components';

import { pxToRem } from '@utils/display';

import { ModalTypes } from './Modal.type';

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const slideDown = keyframes`
  from {
    transform: translate(-50%, -100%);
  }
  to {
    transform: translate(-50%, 0);
  }
`;

const slideUp = keyframes`
  from {
    transform: translate(-50%, 100%);
  }
  to {
    transform: translate(-50%, 0);
  }
`;

// center시 좌우 여백 값
const HORIZONTAL_GAP = 20;

export const BackDrop = styled.div<{ $isAnimation: boolean; $backDropColor?: string }>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  ${({ $isAnimation }) =>
    $isAnimation &&
    css`
      animation: ${fadeIn} 0.3s ease-out;
    `}
  ${({ $backDropColor }) =>
    $backDropColor &&
    css`
      background: ${$backDropColor};
    `}
    z-index: 100;
`;

export const ModalView = styled.div<{ type: ModalTypes; $isAnimated: boolean }>`
  position: fixed;
  left: 50%;
  transform: translateX(-50%);

  ${({ type, $isAnimated }) => {
    switch (type) {
      case 'center':
        return css`
          top: 50%;
          transform: translate(-50%, -50%);
          ${$isAnimated &&
          css`
            animation: ${fadeIn} 0.3s ease-out;
          `};
        `;
      case 'topSheet':
        return css`
          top: 0;

          ${$isAnimated &&
          css`
            animation: ${slideDown} 0.3s ease-out;
          `};
        `;
      case 'bottomSheet':
        return css`
          bottom: 0;
          ${$isAnimated &&
          css`
            animation: ${slideUp} 0.3s ease-out;
          `};
        `;
      case 'full':
        return css`
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          transform: translate(0, 0);
        `;
      default:
        return '';
    }
  }}
`;

export const ChildView = styled.div<{
  type: ModalTypes;
  $width: number;
  $radius: number;
}>`
  background: #ffffff;

  min-height: 15rem;
  ${({ type, $width, $radius }) => {
    switch (type) {
      case 'center':
        return css`
          border-radius: ${pxToRem($radius)};
          width: ${pxToRem($width - HORIZONTAL_GAP * 2)};
        `;

      case 'topSheet':
        return css`
          border-bottom-left-radius: ${pxToRem($radius)};
          border-bottom-right-radius: ${pxToRem($radius)};
          width: ${pxToRem($width)};
        `;
      case 'bottomSheet':
        return css`
          border-top-left-radius: ${pxToRem($radius)};
          border-top-right-radius: ${pxToRem($radius)};
          width: ${pxToRem($width)};
        `;
      case 'full':
        return css`
          width: 100%;
          height: 100%;
        `;
      default:
        return '';
    }
  }};
`;

export const CloseBtn = styled.div<{
  $closeBtnPosition: { top: number; right: number };
}>`
  position: absolute;
  ${({ $closeBtnPosition }) => css`
    top: ${pxToRem($closeBtnPosition.top)};
    right: ${pxToRem($closeBtnPosition.right)};
  `}
  width: ${pxToRem(32)};
  height: ${pxToRem(32)};
`;

export const TextModalWrapper = styled.div`
  padding: 2rem;
  p {
    font-size: 2rem;
    margin-bottom: 4rem;
  }
`;
