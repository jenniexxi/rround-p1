import styled, { css } from 'styled-components';

import { BtnSize } from '@components/button/Button';

import { pxToRem } from '@utils/display';

type InputWrapperProps = {
  error?: string;
};

export const InputWrapper = styled.div<{ $width?: number }>`
  position: relative;
  width: ${({ $width }) => ($width ? pxToRem($width) : '100%')};
  height: auto;
`;

type StyledInputProps = InputWrapperProps & {
  error?: string;
};

export const Input = styled.input<StyledInputProps & { $height: BtnSize; $showResetBtn: boolean }>`
  width: 100%;
  padding: 0 1rem;
  ${({ $showResetBtn }) =>
    $showResetBtn &&
    css`
      padding-right: 3rem;
    `}

  border: 1px solid ${(props) => (props.error ? '#ff6b6b' : '#ddd')};
  border-radius: 0.4rem;
  font-size: 1.6rem;
  transition: all 0.3s ease;

  ${({ $height }) => {
    switch ($height) {
      case 'md':
        return css`
          height: 4rem;
        `;
      case 'sm':
        return css`
          height: 3.2rem;
        `;
      case 'tiny':
        return css`
          height: 2.4rem;
        `;
      case 'lg':
      default:
        return css`
          height: 4.8rem;
        `;
    }
  }}

  &:focus {
    outline: none;
    border-color: ${(props) => (props.error ? '#ff6b6b' : '#4dabf7')};
    box-shadow: 0 0 0 0.2rem ${(props) => (props.error ? 'rgba(255, 107, 107, 0.2)' : 'rgba(77, 171, 247, 0.2)')};
  }
`;

export const Icon = styled.span`
  position: absolute;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
`;

export const ErrorMessage = styled.p`
  width: 100%;
  color: #ff6b6b;
  font-size: 1.4rem;
  margin-top: 0.5rem;
`;

export const MobileInput = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  span {
    margin: 0 1rem;
  }
`;
