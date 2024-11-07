import styled, { css } from 'styled-components';

import { pxToRem } from '@utils/display';

export const SelectContainer = styled.div<{ $width?: number; $disable: boolean }>`
  position: relative;

  ${({ $width }) =>
    $width
      ? css`
          width: ${pxToRem($width)};
        `
      : css`
          width: 100%;
        `};
  ${({ $disable, theme }) =>
    $disable &&
    css`
      background-color: ${theme.colors.grey400};
    `}
`;

export const Selector = styled.div<{ $selectedOption: any }>`
  border: 1px solid #ccc;
  padding: 10px;
  min-height: 40px;
  cursor: pointer;
  background-color: white;
  &:hover {
    background-color: #f8f8f8;
  }
  ${({ $selectedOption }) =>
    $selectedOption
      ? css``
      : css`
          color: #ccc;
        `}
`;

export const OptionContainer = styled.ul`
  position: absolute;
  width: 100%;
  border: 1px solid #ccc;
  border-top: none;
  margin-top: -1px;
  max-height: 200px;
  overflow-y: auto;
  background-color: white;
  z-index: 1;
`;
export const Option = styled.li<{ $disabled?: boolean }>`
  padding: 10px;
  cursor: pointer;
  &:hover {
    background-color: #f0f0f0;
  }
  ${({ $disabled, theme }) =>
    $disabled
      ? css`
          color: ${theme.colors.grey400};
        `
      : css`
          color: ${theme.colors.black};
        `}
`;

export const OptionSelectorContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 0.5rem;
  span {
    width: 10rem;
  }
`;
