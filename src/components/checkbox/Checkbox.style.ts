import styled from 'styled-components';

export const CheckboxContainer = styled.div`
  display: flex;
`;

export const CheckboxInput = styled.input`
  margin: 0;
  padding: 0;
  outline: 0 none;
  border: none;
  box-shadow: none;
  -webkit-appearance: none;
  appearance: none;
  width: 1.8rem;
  height: 1.8rem;
  border-radius: 2px;
  border: 1px solid #ddd !important;
  background-color: #fff;
  &:checked {
    border-color: #407df7 !important;
    background-color: #407df7;
    background-image: url(/images/checkbox.svg);
    background-size: 1.2rem 0.9rem;
    background-repeat: no-repeat;
    background-position: center;
  }
  & + label {
    margin-left: 8px;
  }
  &:disabled,
  &[disabled] {
    background-color: ${(props) => props.theme.colors.grey400};
  }
`;

export const CheckboxLabel = styled.label`
  font-size: 16px;
  line-height: 1;
  vertical-align: middle;
`;
