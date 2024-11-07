import styled from 'styled-components';

export const OrderItemContainer = styled.div`
  display: block;
`;
export const OrderItemWrap = styled.div`
  display: block;
  & ~ div {
    margin-top: 1rem;
    border-top: 1px solid #000;
    padding-top: 1rem;
  }
`;
export const OrderItemList = styled.ul`
  display: block;
`;
export const OrderItem = styled.li`
  display: flex;
  align-items: center;
  & ~ li {
    margin-top: 1rem;
  }
`;
export const OrderItemImgBox = styled.span`
  flex-shrink: 0;
  width: 6rem;
  height: 6rem;
  border: 1px solid gray;
`;
export const OrderItemImg = styled.img`
  width: 100%;
  height: 100%;
`;
export const OrderInfo = styled.div`
  margin-left: 1rem;
`;
export const ShippingPolicy = styled.p`
  font-size: 1.4rem;
`;
export const OrderInfoBrand = styled.p`
  font-size: 2rem;
`;
export const OrderInfoName = styled.p`
  font-size: 1.4rem;
`;
export const OrderOption = styled.p`
  font-size: 1.4rem;
`;
export const OrderPrice = styled.p`
  font-size: 1.4rem;
`;
export const OrderAddList = styled.p`
  font-size: 1.4rem;
`;
export const OrderSummaryContainer = styled.div``;

export const OrderSummaryItem = styled.dl`
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  font-size: 1.4rem;
  & ~ dl {
    margin-top: 0.5rem;
  }
  dt {
    font-size: 16px;
    line-height: 22px;
    letter-spacing: -0.3px;
    display: flex;
    flex: 1 1;
    min-width: 0;
    font-weight: bold;
  }
  dd {
    dl {
    }
  }
`;
export const OrderSummaryItemDep = styled.dd`
  flex-basis: 100%;
  min-width: 0;
  margin-top: 0.8rem;
  margin-bottom: 0.8rem;
  dt {
    font-size: 1.3rem;
  }
`;
export const OrderSummaryTotal = styled.dl`
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  font-size: 1.4rem;
  border-top: 1px solid #000;
  padding-top: 1rem;
  dt {
    font-size: 2rem;
    display: flex;
    flex: 1 1;
    min-width: 0;
    font-weight: bold;
  }
  dd {
    font-size: 2rem;
  }
`;
export const AddressContainer = styled.div``;

export const FormGroup = styled.div`
  margin-bottom: 20px;
`;

export const Label = styled.label`
  display: block;
  margin-bottom: 8px;
  font-weight: 500;
  font-size: 15px;
`;

export const Required = styled.span`
  color: red;
`;

export const AddressInputGroup = styled.div`
  display: flex;
  gap: 8px;
  margin-bottom: 8px;
  align-items: center;
`;

export const PhoneInputGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  position: relative;
`;

export const PhoneSelect = styled.select`
  position: relative;
  z-index: 1;
  width: 80px;
  height: 48px;
  padding: 0.8rem;
  border-radius: 4px;
  font-size: 14px;
  color: #191919;
  appearance: none;

  // 드롭다운 메뉴의 위치 조정
  option {
    position: absolute;
    left: 0;
    top: 100%;
    min-width: 100%;
  }
`;

export const Separator = styled.span`
  color: #666;
  font-size: 14px; // 폰트 사이즈 추가
`;
export const CheckboxLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 8px;
  border-radius: 4px;
`;

export const CheckboxText = styled.span`
  font-size: 12px;
`;

export const Checkbox = styled.input`
  width: 16px;
  height: 16px;
`;

export const ExistingAddressCard = styled.div`
  padding: 16px;
  border: 1px solid #eee;
  border-radius: 8px;
  margin-bottom: 16px;
`;

export const AddressHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
`;

export const AddressInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const ReceiverName = styled.span`
  font-weight: 500;
`;

export const AddressName = styled.span`
  color: #666;
  font-size: 14px;
`;

export const DefaultBadge = styled.span`
  background: #e3f2fd;
  color: #1976d2;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
`;

export const AddressText = styled.div`
  color: #666;
  margin-bottom: 4px;
`;

export const PhoneText = styled.div`
  color: #666;
`;

export const DirectInputWrapper = styled.div`
  margin-top: 8px;
`;
