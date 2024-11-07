import styled, { css } from 'styled-components';

import { pxToRem } from '@utils/display';

import { BtnSize, BtnType } from './Button';

export const Button = styled.button<{ $type: BtnType; $size: BtnSize; $width?: number }>`
  ${({ $width }) =>
    $width
      ? css`
          width: ${pxToRem($width)};
        `
      : css`
          width: 100%;
        `}
  ${({ $type }) => {
    switch ($type) {
      case 'primary.outline':
        return css`
          background-color: ${(props) => props.theme.colors.white};
          color: ${(props) => props.theme.colors.black};
          border: 1px solid ${(props) => props.theme.colors.primary};
        `;
      case 'common':
        return css`
          background-color: ${(props) => props.theme.colors.black};
          color: ${(props) => props.theme.colors.white};
        `;
      case 'common.outline.bk':
        return css`
          background-color: ${(props) => props.theme.colors.white};
          color: ${(props) => props.theme.colors.black};
          border: 1px solid ${(props) => props.theme.colors.black};
        `;
      case 'common.outline.grey':
        return css`
          background-color: ${(props) => props.theme.colors.white};
          color: ${(props) => props.theme.colors.black};
          border: 1px solid ${(props) => props.theme.colors.grey200};
        `;
      case 'primary':
      default:
        return css`
          background-color: ${(props) => props.theme.colors.primary};
          color: ${(props) => props.theme.colors.white};
        `;
    }
  }}
  ${({ $size }) => {
    switch ($size) {
      case 'md':
        return css`
          min-width: 6.4rem;
          border-radius: 0.4rem;
          height: 4rem;
          font-size: 1.3rem;
        `;
      case 'sm':
        return css`
          min-width: auto;
          border-radius: 0.3rem;
          height: 3.2rem;
          font-size: 1.2rem;
          padding: 0 0.8rem;
        `;
      case 'tiny':
        return css`
          min-width: auto;
          border-radius: 0.3rem;
          height: 2.4rem;
          font-size: 1.2rem;
        `;
      case 'lg':
      default:
        return css`
          min-width: auto;
          border-radius: 0.6rem;
          height: 4.8rem;
          font-size: 1.5rem;
        `;
    }
  }}
`;
