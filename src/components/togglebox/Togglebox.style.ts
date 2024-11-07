import styled from 'styled-components';

export const ToggleboxContainer = styled.div`
  display: flex;
`;

export const ToggleboxInput = styled.input`
  margin: 0;
  padding: 0;
  outline: 0 none;
  border: none;
  box-shadow: none;
  -webkit-appearance: none;
  appearance: none;
  position: relative;
  width: 3.6rem;
  height: 2rem;
  border-radius: 1.2rem;
  background-color: #e8e8e8;
  &:before {
    content: '';
    display: block;
    position: absolute;
    left: 0.2rem;
    right: auto;
    top: 50%;
    width: 1.6rem;
    height: 1.6rem;
    border-radius: 50%;
    background-color: #fff;
    transform: translate(0, -50%);
    transition: 0.25s;
  }
  &:checked {
    background-color: #748bff;
    &:before {
      transform: translate(16px, -50%);
    }
  }
`;

export const ToggleboxLabel = styled.label`
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  border: 0;
`;
