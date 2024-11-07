import styled from 'styled-components';

export const FormContainer = styled.form`
  margin: 0 auto;
  padding: 2rem;
`;

export const FormGroup = styled.div`
  margin-bottom: 3.2rem;

  &:last-of-type {
    margin-bottom: 4rem;
  }

  input {
    margin-bottom: 1.2rem;

    &:last-child {
      margin-bottom: 0;
    }
  }
`;

export const Label = styled.label`
  display: block;
  margin-bottom: 1.2rem;
  font-size: 1.5rem;
  font-weight: 500;
  color: #191919;
`;

export const Required = styled.span`
  color: #fa5252;
  margin-left: 0.4rem;
`;

export const AddressInputGroup = styled.div`
  display: flex;
  gap: 1.2rem;
  align-items: center;
  margin-bottom: 1.2rem;

  > *:first-child {
    width: 200px;
  }

  > button {
    flex-shrink: 0;
    height: 48px;
    width: 100px;
  }
`;

export const CheckboxWrapper = styled.div`
  margin: 2.4rem 0;
  padding: 2rem;
  background-color: #f8f9fa;
  border-radius: 8px;
`;

export const ButtonGroup = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 4rem;

  button {
    min-width: 160px;
    height: 52px;
  }
`;

export const BuyersList = styled.ul`
  display: block;
  padding: 2rem;
`;

export const BuyersListItem = styled.li`
  position: relative;
  padding: 2.4rem;
  background: #ffffff;
  border: 1px solid #e5e5e5;
  border-radius: 12px;
  transition: all 0.2s ease;

  & ~ li {
    margin-top: 1.6rem;
  }

  &:hover {
    border-color: #000000;
  }

  p {
    font-size: 1.5rem;
    line-height: 1.6;
    color: #191919;

    &:first-child {
      font-size: 1.8rem;
      font-weight: 500;
      margin-bottom: 1.6rem;
      padding-right: 120px;
    }

    &:not(:last-child) {
      margin-bottom: 0.8rem;
    }
  }

  .flag {
    display: inline-block;
    height: 2.4rem;
    margin-left: 1.2rem;
    padding: 0 1.2rem;
    border-radius: 4px;
    font-weight: 500;
    font-size: 1.3rem;
    line-height: 2.4rem;
    color: #ff7b00;
    background-color: #fff8f5;
  }

  .button-group {
    position: absolute;
    top: 2.4rem;
    right: 2.4rem;
    display: flex;
    gap: 0.8rem;
  }
`;

export const ModalContent = styled.div`
  width: 500px;
  max-width: calc(100vw - 4rem);
  height: 500px;
  max-height: calc(100vh - 4rem);
  background: #fff;
  border-radius: 12px;
  overflow: hidden;

  > div {
    width: 100%;
    height: 100%;
  }
`;

export const PhoneInputGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;

  input {
    text-align: center;
  }
`;

export const Separator = styled.span`
  font-size: 1.6rem;
  color: #666666;
`;
