import styled from 'styled-components';

export const BottomButtonContainer = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  z-index: 10;

  gap: 0.8rem;
  overflow: hidden;
  width: 100%;
  padding: 0.8rem 1.6rem;
  background-color: ${({ theme }) => theme.colors.white};
`;

export const ModalContainer = styled.div`
  padding: 3rem 1rem 1rem 1rem;
`;

export const ModalAddGoodsContainer = styled.div`
  padding: 1rem 1rem 1rem 1rem;
  h3 {
    margin-top: 0.3rem;
    margin-bottom: 1rem;
    font-size: 1.6rem;
  }
`;

export const ModalProductItem = styled.div`
  padding: 0 1rem;
  width: 100%;
  margin-top: 1rem;
  background-color: ${({ theme }) => theme.colors.grey80};
  span {
    display: inline-block;
    padding: 1rem 0;
  }
  div {
    padding: 0.3rem 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    span {
      padding: 0;
      font-size: 1.8rem;
    }
  }
`;
export const ModalTotalPrice = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 1.5rem 0;
  span {
    font-size: 1.4rem;
  }
`;

export const ModalBottomButton = styled.div``;
