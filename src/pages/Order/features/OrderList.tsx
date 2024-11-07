import { currencyCodeToCurrency, numberWithCommas } from '@utils/display';

import { OrderPageResp } from '@apis/orderApi';

import * as S from './_Order.style';

// 장바구니와 주문결제 정보 연결
type Props = {
  cartList?: OrderPageResp['data']['cartList'];
};

const OrderList = ({ cartList }: Props) => {
  return (
    <S.OrderItemContainer>
      {cartList?.map((cartItem, index) => (
        <S.OrderItemWrap key={index}>
          <S.OrderItemList>
            <S.ShippingPolicy>배송비: {cartItem.shipping.shippingPolicyEnum.codeName}</S.ShippingPolicy>
            {cartItem.goodsList.map((goods, idx) => (
              <S.OrderItem key={idx}>
                <S.OrderItemImgBox>
                  <S.OrderItemImg
                    src={goods.imageFilesUrl}
                    alt={goods.displayGoodsName}
                  />
                </S.OrderItemImgBox>
                <S.OrderInfo>
                  <S.OrderInfoBrand>{goods.brandName}</S.OrderInfoBrand>
                  <S.OrderInfoName>{goods.displayGoodsName}</S.OrderInfoName>
                  <S.OrderOption>옵션 : {goods.goodsOption}</S.OrderOption>
                  <S.OrderPrice>
                    {numberWithCommas(goods.recommendPrice.number)}
                    {currencyCodeToCurrency(goods.recommendPrice.currencyCode ?? '')} /{' '}
                    {numberWithCommas(goods.paymentPrice.number)}
                    {currencyCodeToCurrency(goods.paymentPrice.currencyCode ?? '')} / {goods.buyCnt} 개
                  </S.OrderPrice>
                  {goods.addGoodsList.length > 0 && (
                    <S.OrderAddList>
                      추가 :{' '}
                      {goods.addGoodsList.map((addGoods, addIndex) => (
                        <div key={addIndex}>
                          {addGoods.optionName} / {addGoods.paymentPrice.number} / {addGoods.buyCnt}
                        </div>
                      ))}
                    </S.OrderAddList>
                  )}
                </S.OrderInfo>
              </S.OrderItem>
            ))}
          </S.OrderItemList>
        </S.OrderItemWrap>
      ))}
    </S.OrderItemContainer>
  );
};

export default OrderList;
