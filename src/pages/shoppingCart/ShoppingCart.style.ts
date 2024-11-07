import styled from 'styled-components';

export const CartWrapper = styled.div`
  // padding-bottom: 10rem;
`;

export const ContsSection = styled.section``;

export const NonContsSection = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: calc(100vh - 5.6rem);
  justify-content: center;
  p {
    font-size: 1.6rem;
    font-weight: bold;
    margin-bottom: 3rem;
  }
`;

export const PickSummary = styled.div`
  position: sticky;
  top: 0rem;
  display: flex;
  justify-content: space-between;
  height: 7.2rem;
  padding: 0 1.6rem;
  align-items: center;
  background-color: ${(props) => props.theme.colors.grey50};
  z-index: 1;
`;

export const ProductList = styled.div`
  padding: 1.5rem 2rem;
`;

export const BrandBox = styled.div`
  display: flex;
  align-items: center;

  label {
    margin-top: 0.2rem;
  }
  svg {
    transform: rotate(90deg);
  }
`;

export const ItemShipCost = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  text-align: right;
  height: 3rem;
  background-color: ${(props) => props.theme.colors.grey100};
  padding: 0 1rem 0 2rem;
`;

export const BindText = styled.span`
  background-color: ${(props) => props.theme.colors.syt_blue};
  padding: 0.3rem 1rem;
  display: inline-block;
  font-size: 1.2rem;
  color: ${(props) => props.theme.colors.white};
`;

export const ShipItem = styled.div`
  font-size: 1.4rem;
  display: flex;
  align-items: center;
  span {
    font-size: 1.4rem;
    font-weight: bold;
    margin-right: 0.5rem;
  }
`;

export const TooltipBox = styled.div`
  p {
    font-size: 1.2rem;
  }
  button {
    position: absolute;
    top: 0;
    right: 0;
  }
`;

export const TooltipTitle = styled.div`
  font-size: 1.4rem;
  font-weight: bold;
  padding-bottom: 1rem;
  margin-bottom: 1rem;
  border-bottom: 0.1rem solid #eee;
`;

export const TooltipIconBox = styled.span`
  margin: 0.3rem 0 0 0.5rem;
  display: inline-block;
`;

export const ProductItem = styled.div`
  position: relative;
  padding: 2rem 0 2rem 1rem;
  border-bottom: 1px solid ${(props) => props.theme.colors.grey100};
`;

export const CloseBtn = styled.button`
  position: absolute;
  top: 0;
  right: -1.2rem;
`;

export const ProductBox = styled.div``;

export const ProductPannel = styled.div`
  display: flex;
  gap: 1rem;
`;

export const ProductImgBox = styled.div`
  display: flex;
`;

export const ProductImg = styled.img`
  width: 7.2rem;
  height: 7.2rem;
  background-color: ${(props) => props.theme.colors.white};
  border: 1px solid #ccc;
`;

export const ProductText = styled.div``;

export const ProductBrand = styled.div<{ $isInactive?: boolean }>`
  font-size: 1.3rem;
  color: ${({ $isInactive }) => ($isInactive ? '#eee' : '#000')};
  ${({ theme }) => theme.mixins.ellipsis(1)};
  width: calc(100vw - 7.2rem - 5rem - 2rem - 1.8rem);
`;

export const ProductName = styled.div<{ $isInactive?: boolean }>`
  font-size: 1.3rem;
  ${({ theme }) => theme.mixins.ellipsis(2)};
  /* width: calc(100vw - 7.2rem - 5rem - 2rem - 1.8rem); */
  width: 80%;
  color: ${({ $isInactive }) => ($isInactive ? '#eee' : '#000')};
`;

export const ProductOption = styled.div<{ $isInactive?: boolean }>`
  font-size: 1.2rem;
  color: ${({ $isInactive }) => ($isInactive ? '#eee' : (props) => props.theme.colors.grey500)};
`;

export const ProductQuantity = styled.div<{ $isInactive?: boolean }>`
  font-size: 1.2rem;
  color: ${({ $isInactive }) => ($isInactive ? '#eee' : '#000')};
`;

export const ProductDesc = styled.div``;

export const OriginPrice = styled.span<{ $isInactive?: boolean }>`
  font-size: 1.3rem;
  color: ${({ $isInactive }) => ($isInactive ? '#eee' : (props) => props.theme.colors.grey500)};
  text-decoration: line-through;
`;

export const DiscountPrice = styled.span<{ $isInactive?: boolean }>`
  font-size: 1.4rem;
  margin-right: 0.5rem;
  color: ${({ $isInactive }) => ($isInactive ? '#eee' : '#000')};
`;

export const ShipBox = styled.div`
  display: flex;
  justify-content: flex-end;
`;

export const ShipPrice = styled.div<{ $isInactive?: boolean }>`
  color: ${({ $isInactive }) => ($isInactive ? '#eee' : '#000')};
`;

export const ProductStatus = styled.div`
  font-size: 1.6rem;
  color: ${(props) => props.theme.colors.grey500};
  font-weight: bold;
  margin-top: 1rem;
`;

export const AddProductContainer = styled.div`
  margin: 1rem 0 1rem 10.8rem;
  padding: 0.6rem;
  background-color: ${(props) => props.theme.colors.grey100};
  position: relative;
  div {
    & + div {
      margin-top: 0.4rem;
    }
  }
`;

export const AddOptionBedge = styled.div`
  width: 7rem;
  background-color: ${(props) => props.theme.colors.black};
  font-size: 1.2rem;
  color: ${(props) => props.theme.colors.white};
  padding: 0.5rem 0;
  text-align: center;
`;

export const ItName = styled.div`
  font-size: 1.2rem;
`;
export const ItCount = styled.div`
  font-size: 1.2rem;
`;
export const ItPrice = styled.div`
  font-size: 1.2rem;
`;

export const OptionCloseBtn = styled.button`
  position: absolute;
  top: 0;
  right: 0;
  padding: 0;
`;

export const OrderBtn = styled.div`
  text-align: right;
  margin-top: 2rem;
  button {
    &:first-child {
      margin-right: 1rem;
    }
  }
`;

export const ProductTotal = styled.div`
  background-color: ${(props) => props.theme.colors.bg_orange};
`;

export const ItemDl = styled.dl`
  display: flex;
  justify-content: space-between;
  padding: 0 2rem;
  margin-bottom: 1rem;
`;

export const ItemTitle = styled.dt`
  font-size: 1.4rem;
`;

export const ItemPrice = styled.dd`
  font-size: 1.4rem;
`;

export const ItemTotal = styled.dl`
  display: flex;
  justify-content: space-between;
  padding: 1rem 0;
  margin: 0 2rem;
  border-top: 1px solid ${(props) => props.theme.colors.grey400};
  dt {
    font-size: 1.6rem;
    font-weight: bold;
  }
  dd {
    font-size: 1.6rem;
  }
`;

export const InfoList = styled.ul`
  padding: 2rem 2rem 15rem;
  li {
    position: relative;
    padding-left: 1.2rem;
    font-size: 1.4rem;
    &:before {
      content: '';
      position: absolute;
      top: 0.5rem;
      left: 0;
      width: 0.4rem;
      height: 0.4rem;
      border-radius: 0.2rem;
      background-color: ${(props) => props.theme.colors.black};
    }
  }
`;

export const TotalBottom = styled.div`
  position: fixed;
  bottom: 0;
  width: 100%;
  background-color: ${(props) => props.theme.colors.grey400};
  padding: 1.3rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 30;
`;

export const TotalText = styled.div`
  font-size: 1.6rem;
  span {
    font-size: 1.6rem;
    font-weight: bold;
  }
`;

export const PriceBox = styled.div`
  display: flex;
  align-items: center;
  gap: 0.6rem;
  button {
    min-width: 200px;
    height: 40px;
    font-size: 1.6rem;
    background-color: ${(props) => props.theme.colors.black};
    border-radius: 1rem;
    color: ${(props) => props.theme.colors.white};
  }
`;

export const Arrow = styled.span`
  display: inline-block;
  width: 2rem;
  height: 2rem;
`;

export const TotalBtWrap = styled.div`
  padding: 2rem;
  margin-bottom: 6.6rem;
  background-color: ${(props) => props.theme.colors.white};
  h2 {
    font-size: 1.8rem;
    font-weight: bold;
    margin-bottom: 2rem;
  }
`;

export const PayBox = styled.div``;

export const TotalBePayDl = styled.dl`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const PayDt = styled.dt`
  font-size: 1.6rem;
  font-weight: bold;
`;

export const PayDd = styled.dd`
  font-size: 1.6rem;
`;

export const AmountDl = styled.dl`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 1rem;
`;

export const AmountDt = styled.dt`
  font-size: 1.4rem;
`;

export const AmountDd = styled.dd`
  font-size: 1.4rem;
`;

// ProductMOdify 장바구니 주문수정
export const ProductModifyWrap = styled.div`
  height: 100%;
  overflow-y: scroll;
`;

export const HeaderGroup = styled.div`
  position: fixed;
  top: 0;
  width: 100%;
  height: 5rem;
  background-color: #fff;
  z-index: 1;
`;

export const Title = styled.h2`
  padding: 2rem 0 0 2rem;
  font-size: 1.6rem;
`;

export const OrderModifyCloseBtn = styled.div`
  position: absolute;
  top: 0;
  right: 0;
`;

export const OrderModifyContainer = styled.div`
  padding: 7rem 2rem 2rem;
`;

export const ProductPart = styled.div`
  display: flex;
  gap: 1rem;
  img {
    width: 7.2rem;
    height: 7.2rem;
    border: 1px solid ${(props) => props.theme.colors.grey400};
  }
`;

export const TextBox = styled.div`
  div {
    font-size: 1.4rem;
    & + div {
      margin-top: 0.6rem;
    }
  }
`;

export const BrandName = styled.div`
  font-weight: bold;
`;

export const TextPrice = styled.div``;

export const OrigPrice = styled.span`
  font-size: 1.3rem;
  color: ${(props) => props.theme.colors.grey500};
  text-decoration: line-through;
`;

export const DiscPrice = styled.span`
  font-size: 1.4rem;
  margin-right: 0.5rem;
`;

export const OtherOpPart = styled.div`
  margin-top: 1rem;
  h3 {
    font-size: 1.4rem;
    font-weight: bold;
    margin-bottom: 0.6rem;
  }
`;

export const AddOpPart = styled.div`
  margin-top: 1rem;
  h3 {
    font-size: 1.4rem;
    font-weight: bold;
    margin-bottom: 0.6rem;
  }
`;

export const OptionBoxWrap = styled.div`
  position: relative;
  background-color: ${(props) => props.theme.colors.bg_blue};
  padding: 1.5rem 1rem;
  margin-top: 1.5rem;
`;

export const OptionBtn = styled.button`
  position: absolute;
  top: 0;
  right: 0;
  padding: 0;
`;

export const Info = styled.div`
  margin-bottom: 1rem;
`;

export const Bedge = styled.span`
  font-size: 1.2rem;
  background-color: ${(props) => props.theme.colors.primary};
  color: ${(props) => props.theme.colors.white};
  padding: 0.4rem 1rem;
  display: inline-flex;
  align-items: center;
`;

export const Name = styled.span`
  font-size: 1.4rem;
  font-weight: bold;
  ${({ theme }) => theme.mixins.ellipsis(1)};
  width: 80%;
  display: block;
`;

export const QuantityInfo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const OptionPrice = styled.div`
  font-size: 1.4rem;
  font-weight: bold;
`;

export const BasicOptionBtn = styled.button`
  position: absolute;
  top: 0;
  right: 0;
  padding: 0;
`;

export const AmountPart = styled.div`
  background-color: ${(props) => props.theme.colors.grey50};
  padding: 2rem 1rem;
  margin-top: 2rem;
`;

export const PrdDl = styled.dl`
  display: flex;
  justify-content: space-between;
`;

export const PrdDt = styled.dt`
  font-size: 1.6rem;
  font-weight: bold;
`;

export const PrdDd = styled.dd`
  font-size: 1.6rem;
  font-weight: bold;
`;

export const ShipDl = styled.dl`
  display: flex;
  justify-content: space-between;
  margin-top: 1rem;
`;

export const ShipDt = styled.dt`
  font-size: 1.4rem;
`;

export const ShipDd = styled.dd`
  font-size: 1.4rem;
`;

export const BtnBox = styled.div`
  padding: 1.5rem 2rem;
`;

export const BrandPerTotal = styled.div`
  background-color: ${(props) => props.theme.colors.grey50};
  padding: 1rem;
  margin-top: 1.5rem;
`;

export const BrandPayDl = styled.dl`
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;
`;

export const BrandPayDt = styled.dt`
  font-size: 1.4rem;
`;

export const BrandPayDd = styled.dd`
  font-size: 1.4rem;
`;

export const BrandPayTotal = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const PayTitle = styled.span`
  font-size: 1.6rem;
  font-weight: bold;
`;

export const PayAmount = styled.span`
  font-size: 1.6rem;
  font-weight: bold;
`;
