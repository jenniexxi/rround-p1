import { useState } from 'react';

import { useNavigate } from 'react-router-dom';

import { Button, Checkbox, Modal } from '@components';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { GoodsSaleStatus } from '@type';
import { difference } from 'lodash';

import { showModal } from '@components/modal/ModalManager';

import { PAGE_ROUTES } from '@router/Routes';

// import QuantityCounter from '@components/quantityCounter/QuantityCounter';
import { currencyCodeToCurrency, numberWithCommas } from '@utils/display';

// import { Price } from '@apis/apiCommonType';
// import { SHIPPING_POLICY_CODES } from '@apis/enum.d';
import shoppingCartApi, { Goods } from '@apis/shoppingCartApi';

import CloseButtonSVG from '@assets/svg/CloseButtonSVG';

import { GoodsDisplaySalesStatus } from '@type/display.d';

import * as S from '../ShoppingCart.style';
import ProductModify from './ProductModify';

// type ShippingInfo = {
//   basicShippingPrice: Price;
//   conditionPrice: Price;
//   addShippingPrice: Price;
// };

type Props = {
  goods: Goods;
  checked: boolean;
  onCheckChange: (checked: boolean) => void;
  shippingPrice: number;
  // shippingInfo: ShippingInfo;
  // shippingPrice: Price;
  // ship: Price;
};

const ProductItem = ({ goods, checked, onCheckChange, shippingPrice }: Props) => {
  // const [quantity, setQuantity] = useState(goods.buyCnt);

  // 배송비 정책에 따른 배송비 표시
  // const getShippingPrice = () => {
  //   switch (goods.shippingPolicyEnum.code) {
  //     case SHIPPING_POLICY_CODES.Pay:
  //       return numberWithCommas(shippingInfo.basicShippingPrice.number);
  //     case SHIPPING_POLICY_CODES.Condition:
  //       return numberWithCommas(shippingInfo.conditionPrice.number);
  //     case SHIPPING_POLICY_CODES.Section_2:
  //     case SHIPPING_POLICY_CODES.Section_3:
  //       return numberWithCommas(shippingInfo.addShippingPrice.number);
  //     default:
  //       return '무료';
  //   }
  // };

  // 장바구니 리스트업 - 테스트용 (나중에 지우기)
  // goods.displaySaleStatusEnum.code = GoodsDisplaySalesStatus.Stop;
  const navigate = useNavigate();

  const isInactive =
    goods.displaySaleStatusEnum.code === GoodsDisplaySalesStatus.Stop ||
    goods.displaySaleStatusEnum.code === GoodsDisplaySalesStatus.End;

  const queryClient = useQueryClient();

  const [isModifyOrderOpen, setIsModifyOrderOpen] = useState(false);

  const { mutate: deleteItem } = useMutation({
    mutationFn: (cartId: number) => shoppingCartApi.deleteCartList([cartId]),
    onSuccess: (resp) => {
      console.log(resp);
      queryClient.invalidateQueries({ queryKey: ['getShopsCarts'] });
    },
    onError: (error) => {
      console.error('삭제 중 오류 발생:', error);
    },
  });

  // 상품별 닫기 버튼 클릭 시 팝업 표시
  const handleEachDelete = () => {
    showModal.text('선택한 상품을 삭제하시겠습니까?', {
      buttonType: 'multi',

      rightonClick: () => {
        deleteItem(goods.cartId);
      },
    });
  };

  // 상품 판매 상태
  const getProductStatusText = (code: string) => {
    if (code === GoodsDisplaySalesStatus.SoldOut) return '일시품절';
    if (code === GoodsDisplaySalesStatus.Stop) return '판매중지';
    if (code === GoodsDisplaySalesStatus.End) return '판매종료';
    return null;
  };

  // 추가 상품 구매 가능여부 확인
  const checkAddGoodsSaleState = (): number[] => {
    return goods.addGoodsList.reduce((acc: number[], item) => {
      if (item.saleStatusEnum.code !== GoodsSaleStatus.OnSale) {
        acc.push(item.cartId);
      }
      return acc;
    }, []);
  };

  // 추가 상품 구매 가능여부 확인
  const checkAvalibaleItem = () => {
    return goods.addGoodsList.filter((item) => item.saleStock < item.buyCnt);
  };

  const buyAvaliableItem = (unSaledList: number[]) => {
    const allCartItem = goods.addGoodsList.map((item) => item.cartId);
    const avaliableItemList = difference(allCartItem, unSaledList);
    navigate(PAGE_ROUTES.ORDER.path, {
      state: { selectedCartId: avaliableItemList },
    });
  };

  const moveToProductDetail = () => {
    if (isInactive) {
      showModal.text('현재 판매하지 않는 상품입니다.');
    } else {
      const detailUrl = PAGE_ROUTES.PRODUCTDETAIL.path.replace(':goodsId', goods.goodsId.toString());
      navigate(detailUrl);
    }
  };

  const moveToRestockPage = () => {
    navigate(0);
  };

  const buyCartItem = () => {
    if (goods.addGoodsList.length > 0) {
      const unSaleList = checkAddGoodsSaleState();

      if (unSaleList.length > 0) {
        showModal.text('구매 불가능한 추가상품이 있습니다. 해당 상품 제외하고 구매하시겠습니까?', {
          buttonType: 'multi',
          leftTitle: '아니요',
          rightTitle: '예',
          rightonClick: () => {
            buyAvaliableItem(unSaleList);
          },
        });
        return;
      }

      const inventoryItem = checkAvalibaleItem();
      if (inventoryItem.length > 0) {
        showModal.text(
          `${inventoryItem[0].optionName} 주문 가능한 재고수량은 최대 ${inventoryItem[0].saleStock}개입니다`,
        );
        return;
      }
    } else {
      if (goods.soldStopYn) {
        showModal.text(
          `${goods.displayGoodsName}/${goods.goodsOption}]주문 가능한 수량은 최대 ${goods.saleStock}개입니다`,
        );
        return;
      }

      navigate(PAGE_ROUTES.ORDER.path, {
        state: { selectedCartId: [goods.cartId] },
      });
    }
  };

  // 상품 상태에 따른 버튼 노출 유무
  const renderButtons = (code: string) => {
    if (code === GoodsDisplaySalesStatus.SoldOut) {
      return (
        <S.OrderBtn>
          <Button
            width={103}
            title='주문수정'
            type='common.outline.bk'
            size='sm'
            onClick={() => setIsModifyOrderOpen(true)}
          />
          <Button
            width={103}
            title='재입고알림 신청'
            type='common'
            size='sm'
            onClick={moveToRestockPage}
          />
        </S.OrderBtn>
      );
    }

    if (code === GoodsDisplaySalesStatus.OnSale) {
      return (
        <S.OrderBtn>
          <Button
            width={103}
            title='주문수정'
            type='common.outline.bk'
            size='sm'
            onClick={() => setIsModifyOrderOpen(true)}
          />
          <Button
            width={103}
            title='구매하기'
            type='common'
            size='sm'
            onClick={buyCartItem}
          />
        </S.OrderBtn>
      );
    }

    return null;
  };

  return (
    <S.ProductItem key={goods.goodsId}>
      <S.ProductBox>
        <S.ProductPannel>
          <S.ProductImgBox>
            <Checkbox
              id={`product-${goods.goodsId}`}
              name={`product-${goods.goodsId}`}
              checked={checked}
              onChange={onCheckChange}
              disabled={
                goods.displaySaleStatusEnum.code === GoodsDisplaySalesStatus.Stop ||
                goods.displaySaleStatusEnum.code === GoodsDisplaySalesStatus.End
              }
            />
            {goods.adultYn ? (
              <span>19금</span>
            ) : (
              <S.ProductImg
                onClick={moveToProductDetail}
                style={{ width: 72, height: 72 }}
                src={goods.imageFilesUrl}
                alt=''
              />
            )}
          </S.ProductImgBox>
          <S.ProductText onClick={moveToProductDetail}>
            <S.ProductBrand $isInactive={isInactive}>{goods.brandName}</S.ProductBrand>
            <S.ProductName $isInactive={isInactive}>{goods.displayGoodsName}</S.ProductName>
            <S.ProductOption $isInactive={isInactive}>{goods.goodsOption}</S.ProductOption>
            <S.ProductQuantity $isInactive={isInactive}>수량 : {goods.buyCnt}</S.ProductQuantity>
            <S.ProductDesc>
              <S.DiscountPrice $isInactive={isInactive}>
                {numberWithCommas(goods.paymentPrice.number)}
                {currencyCodeToCurrency(goods.paymentPrice.currencyCode)}
              </S.DiscountPrice>
              <S.OriginPrice $isInactive={isInactive}>{goods.recommendPrice.number}</S.OriginPrice>
              {/* <S.ShipPrice>배송비 {getShippingPrice()}원</S.ShipPrice> */}
              {/* <S.ShipPrice>
              배송비 {numberWithCommas(shippingPrice.number)}
              {currencyCodeToCurrency(shippingPrice.currencyCode)}
            </S.ShipPrice> */}
              <S.ShipPrice $isInactive={isInactive}>배송비 {numberWithCommas(shippingPrice)}원</S.ShipPrice>
              <S.ProductStatus>{getProductStatusText(goods.displaySaleStatusEnum.code)}</S.ProductStatus>
            </S.ProductDesc>
          </S.ProductText>
        </S.ProductPannel>
        {goods.addGoodsList.map((list) => {
          return (
            <S.AddProductContainer key={list.cartId}>
              <S.AddOptionBedge>추가상품</S.AddOptionBedge>
              <S.ItName>{list.optionName}</S.ItName>
              <S.ItCount>수량 : {list.buyCnt}</S.ItCount>
              <S.ItPrice>
                {numberWithCommas(list.paymentPrice.number)}
                {currencyCodeToCurrency(list.paymentPrice.currencyCode)}
              </S.ItPrice>
              <S.OptionCloseBtn
                onClick={(e) => {
                  e.stopPropagation();
                  showModal.text('선택한 상품을 삭제하시겠습니까?] ', {
                    buttonType: 'multi',
                    rightonClick: () => {
                      deleteItem(list.cartId);
                    },
                  });
                }}
              >
                <CloseButtonSVG size={32} />
              </S.OptionCloseBtn>
            </S.AddProductContainer>
          );
        })}
      </S.ProductBox>
      <S.CloseBtn
        onClick={(e) => {
          e.stopPropagation();
          handleEachDelete();
          // deleteItem(goods.cartId);
        }}
      >
        <CloseButtonSVG size={32} />
      </S.CloseBtn>
      {/* <S.ShipBox>
        <QuantityCounter
          quantity={quantity}
          setQuantity={setQuantity}
          width={32}
        />
        <Button
          width={103}
          title='버튼'
          type='primary.outline'
          size='sm'
        />
      </S.ShipBox> */}
      {renderButtons(goods.displaySaleStatusEnum.code)}
      {/* <S.OrderBtn>
        <Button
          width={103}
          title='주문수정'
          type='common.outline.bk'
          size='sm'
          onClick={() => setIsModifyOrderOpen(true)}
        />
        <Button
          width={103}
          title='구매하기'
          type='common'
          size='sm'
        />
      </S.OrderBtn> */}
      {isModifyOrderOpen && (
        <Modal
          type='full'
          onClickBackDrop={() => setIsModifyOrderOpen(false)}
          onHide={() => setIsModifyOrderOpen(false)}
          showCloseBtn={false}
        >
          <ProductModify
            goodsOptionItem={goods}
            onHide={() => setIsModifyOrderOpen(false)}
          />
        </Modal>
      )}
    </S.ProductItem>
  );
};

export default ProductItem;
