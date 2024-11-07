import { useEffect, useRef, useState } from 'react';

import { useNavigate } from 'react-router-dom';

import { Button, Checkbox, Modal, TwoButton } from '@components';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { showModal } from '@components/modal/ModalManager';

import { useHeader } from '@hooks/useHeader';

import { PAGE_ROUTES } from '@router/Routes';

import { currencyCodeToCurrency, numberWithCommas } from '@utils/display';

import shoppingCartApi from '@apis/shoppingCartApi';

import ArrowTop from '@assets/svg/ArrowTop';

import * as S from './ShoppingCart.style';
import ProductSectionItem from './features/ProductSectionItem';

const ShoppingCart = () => {
  const [checkAll, setCheckall] = useState(true);
  const [selectedCartId, setSelectedCartId] = useState<number[]>([]);
  const [isModifyPayTotalOpen, setIsModifyPayTotalOpen] = useState(false);
  const navigate = useNavigate();
  useHeader('장바구니', { isStick: false });

  const cartItemCount = useRef(-1);
  const initCart = useRef(false); // 최초 진입 시, 초기화 여부 확인 (진입할 때마다 false)
  const queryClient = useQueryClient();

  const { data: cartData, isLoading } = useQuery({
    queryKey: ['getShopsCarts'],
    queryFn: () => shoppingCartApi.getCartList(),
  });

  const { data: totalData } = useQuery({
    queryKey: ['getShopsTotalCarts', selectedCartId],
    queryFn: () => shoppingCartApi.getCartTotal(selectedCartId),
    enabled: cartData?.data.length !== 0,
  });

  useEffect(() => {
    let count = 0;
    cartData?.data.forEach((item) => {
      item.shippingList.forEach((ships) => {
        count += ships.goodsList.length;
        ships.goodsList.forEach((item) => (count += item.addGoodsList.length || 0));
      });
    });

    cartItemCount.current = count;

    if (cartData?.data && cartData.data.length > 0 && !initCart.current) {
      const allCartIds: number[] = [];
      cartData.data.forEach((item) => {
        item.shippingList.forEach((ships) => {
          ships.goodsList.forEach((goods) => {
            allCartIds.push(goods.cartId);
            goods.addGoodsList.forEach((addGoods) => {
              allCartIds.push(addGoods.cartId);
            });
          });
        });
      });
      setSelectedCartId(allCartIds);
      initCart.current = true;
    }
  }, [cartData]);

  useEffect(() => {
    setCheckall(selectedCartId.length === cartItemCount.current);
  }, [selectedCartId]);

  const { mutate: deleteItem } = useMutation({
    mutationFn: (cartId: number[]) => shoppingCartApi.deleteCartList(cartId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['getShopsCarts'] });
    },
    onError: (error) => {
      console.error('삭제 중 오류 발생:', error);
    },
  });

  const soldOutCartIds = cartData?.data.flatMap((i) =>
    i.shippingList.flatMap((ships) =>
      ships.goodsList
        .filter((item) => {
          const code = item.displaySaleStatusEnum.code;
          return (
            code === 'GOODS.DISPLAY_SALE_STATUS.OUT_OF_STOCK' ||
            code === 'GOODS.DISPLAY_SALE_STATUS.STOP' ||
            code === 'GOODS.DISPLAY_SALE_STATUS.FIN_SALE'
          );
        })
        .map((item) => item.cartId),
    ),
  );

  const { mutate: deleteSoldOutItem } = useMutation({
    mutationFn: (soldOutCartIds: number[]) => shoppingCartApi.deleteCartList(soldOutCartIds),
    onSuccess: (resp) => {
      console.log(resp);
      queryClient.invalidateQueries({ queryKey: ['deleteSoldOutCarts'] });
    },
    onError: (error) => {
      console.error('삭제 중 오류 발생:', error);
    },
  });

  // 전체 선택/해제 핸들러 (그룹핑)
  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      cartData?.data.forEach((item) => {
        item.shippingList.forEach((ships) => {
          ships.goodsList.forEach((goods) => {
            const index = selectedCartId.findIndex((selectedItem) => selectedItem === goods.cartId);
            if (index === -1) {
              setSelectedCartId((prev) => [...prev, goods.cartId]);
            }
          });
        });
      });
    } else {
      setSelectedCartId([]);
    }
  };

  // 선택된 아이템 주문결제로 전달하기
  const movoToOrder = () => {
    shoppingCartApi.getCartBuyAvailableCheck(selectedCartId).then((resp) => {
      if (resp.success) {
        if (!resp.data) {
          navigate(PAGE_ROUTES.ORDER.path, {
            state: { selectedCartId },
          });
        } else {
          //TO-DO: 주문 가능 상태가 아닐때 처리로직
        }
      }
    });
  };

  // 카드 비었을 때 쇼핑히러 가기
  const gotoShopping = () => {
    navigate('/');
  };

  // 선택 삭제 버튼 클릭 시 팝업 표시
  const handleSelectDelete = () => {
    if (selectedCartId.length === 0) {
      showModal.text('삭제할 상품을 선택하세요');
    } else {
      showModal.text('선택한 상품을 삭제하시겠습니까?', {
        buttonType: 'multi',
        rightonClick: () => {
          deleteItem(selectedCartId);
        },
      });
    }
  };

  const checkAllItem = (checked: boolean) => {
    setCheckall(checked);
    handleSelectAll(checked);
  };

  // 품절 삭제 버튼 클릭 시 팝업 표시
  const handleSoldOutDelete = () => {
    showModal.text('품절 및 판매중지된 상품을 모두 삭제하겠습니까?', {
      buttonType: 'multi',
      rightonClick: () => {
        if (soldOutCartIds) deleteSoldOutItem(soldOutCartIds);
      },
    });
  };

  if (isLoading) {
    return <></>;
  }

  return (
    <div>
      <S.CartWrapper>
        {/* 카드 비었을때 조건 추가 */}
        {cartData?.data.length === 0 ? (
          <S.NonContsSection>
            <p>장바구니에 담긴 상품이 없습니다.</p>
            <Button
              width={160}
              title='쇼핑하러 가기'
              type='primary'
              size='lg'
              onClick={gotoShopping}
            />
          </S.NonContsSection>
        ) : (
          <S.ContsSection>
            <S.PickSummary>
              <Checkbox
                id='allChoice'
                name='allChoice'
                value='전체선택'
                checked={checkAll}
                onChange={(checked) => {
                  checkAllItem(checked);
                }}
              />
              <TwoButton
                leftTitle={'선택삭제'}
                rightTitle={'품절삭제'}
                leftSize={5}
                rightSize={5}
                btnGap={6}
                leftType='common.outline.grey'
                rightType='common.outline.grey'
                size='sm'
                leftonClick={handleSelectDelete}
                rightonClick={handleSoldOutDelete}
              />
            </S.PickSummary>

            {cartData?.data.map((item, groupIndex) => {
              return (
                <ProductSectionItem
                  key={groupIndex}
                  item={item.shippingList}
                  companyInfo={item.company}
                  selectedCartId={selectedCartId}
                  setSelectedCartId={setSelectedCartId}
                  checkAll={checkAll}
                />
                // <S.ProductList key={groupIndex}>
                //   <S.BrandBox>
                //     <Checkbox
                //       checked={checkAll || false}
                //       id='storeCheck'
                //       name='storeCheck'
                //       value={item.goodsList[0]?.brandName || ''}
                //       onChange={() => {}}
                //     />
                //   </S.BrandBox>
                //   {item.goodsList.map((goods) => (
                //     <ProductItem
                //       key={'goodsItemId' + goods.cartId}
                //       goods={goods}
                //       checked={selectedCartId.includes(goods.cartId)}
                //       onCheckChange={(checked) => handleItemCheck(goods.cartId, checked)}
                //       // shippingInfo={{
                //       //   basicShippingPrice: item.shipping.basicShippingPrice,
                //       //   conditionPrice: item.shipping.policyConditionPrice,
                //       //   addShippingPrice: item.shipping.addShippingPrice,
                //       // }}
                //       // ship={goods.shippingPaymentPrice}
                //       // ship={item.shipping.shippingPaymentPrice}
                //     />
                //   ))}
                //   <S.ItemShipCost>
                //     <S.BindText>묶음배송</S.BindText>
                //     <S.ShipItem>
                //       <span>배송비</span> {numberWithCommas(item.shipping.shippingPaymentPrice.number)}
                //       {currencyCodeToCurrency(item.shipping.shippingPaymentPrice.currencyCode)}
                //     </S.ShipItem>
                //   </S.ItemShipCost>
                // </S.ProductList>
              );
            })}

            <S.ProductTotal>
              <S.ItemDl>
                <S.ItemTitle>총 상품금액</S.ItemTitle>
                <S.ItemPrice>
                  {numberWithCommas(totalData?.data.goodsPaymentPrice.number)}
                  {currencyCodeToCurrency(totalData?.data.goodsPaymentPrice.currencyCode)}
                </S.ItemPrice>
              </S.ItemDl>
              <S.ItemDl>
                <S.ItemTitle>총 할인금액</S.ItemTitle>
                <S.ItemPrice>
                  {selectedCartId.length > 0 ? '-' : ''}
                  {numberWithCommas(totalData?.data.discountPrice.number)}
                  {currencyCodeToCurrency(totalData?.data.discountPrice.currencyCode)}
                </S.ItemPrice>
              </S.ItemDl>
              <S.ItemDl>
                <S.ItemTitle>총 배송비</S.ItemTitle>
                <S.ItemPrice>
                  {numberWithCommas(totalData?.data.shippingPaymentPrice.number)}
                  {currencyCodeToCurrency(totalData?.data.shippingPaymentPrice.currencyCode)}
                </S.ItemPrice>
              </S.ItemDl>
              <S.ItemTotal>
                <dt>총 결제 예정 금액</dt>
                <dd>
                  {numberWithCommas(totalData?.data.paymentPrice.number)}
                  {currencyCodeToCurrency(totalData?.data.paymentPrice.currencyCode)}
                </dd>
              </S.ItemTotal>
            </S.ProductTotal>
            <S.InfoList>
              <li>
                장바구니에 담긴 상품은 30일 동안 보관됩니다.장바구니에 담긴 상품은 30일 동안 보관됩니다.장바구니에 담긴
                상품은 30일 동안 보관됩니다.
              </li>
              <li>장바구니에 담긴 상품은 30일 동안 보관됩니다.</li>
              <li>장바구니에 담긴 상품은 30일 동안 보관됩니다.</li>
              <li>장바구니에 담긴 상품은 30일 동안 보관됩니다.</li>
              <li>장바구니에 담긴 상품은 30일 동안 보관됩니다.</li>
            </S.InfoList>
            <S.TotalBottom>
              <S.TotalText>
                총 <span>{selectedCartId.length}</span>개 상품
              </S.TotalText>
              <S.PriceBox>
                <button
                  type='button'
                  // // 선택된 아이템 주문결제로 전달하기
                  onClick={movoToOrder}
                >
                  {numberWithCommas(totalData?.data.paymentPrice.number)}
                  {currencyCodeToCurrency(totalData?.data.paymentPrice.currencyCode)} 구매하기
                </button>
                <S.Arrow onClick={() => setIsModifyPayTotalOpen(!isModifyPayTotalOpen)}>
                  <ArrowTop />
                </S.Arrow>
              </S.PriceBox>
            </S.TotalBottom>
          </S.ContsSection>
        )}
      </S.CartWrapper>
      {isModifyPayTotalOpen && (
        <Modal
          type='bottomSheet'
          onClickBackDrop={() => setIsModifyPayTotalOpen(false)}
          onHide={() => setIsModifyPayTotalOpen(false)}
        >
          <S.TotalBtWrap>
            <h2>구매금액</h2>
            <S.PayBox>
              <S.TotalBePayDl>
                <S.PayDt>총 결제예정금액</S.PayDt>
                <S.PayDd>
                  {numberWithCommas(totalData?.data.paymentPrice.number)}
                  {currencyCodeToCurrency(totalData?.data.paymentPrice.currencyCode)}
                </S.PayDd>
              </S.TotalBePayDl>
              <S.AmountDl>
                <S.AmountDt>선택상품금액</S.AmountDt>
                <S.AmountDd>
                  {numberWithCommas(totalData?.data.goodsPaymentPrice.number)}
                  {currencyCodeToCurrency(totalData?.data.goodsPaymentPrice.currencyCode)}
                </S.AmountDd>
              </S.AmountDl>
              <S.AmountDl>
                <S.AmountDt>즉시할인금액</S.AmountDt>
                <S.AmountDd>
                  -{numberWithCommas(totalData?.data.discountPrice.number)}
                  {currencyCodeToCurrency(totalData?.data.discountPrice.currencyCode)}
                </S.AmountDd>
              </S.AmountDl>
              <S.AmountDl>
                <S.AmountDt>총 배송비</S.AmountDt>
                <S.AmountDd>
                  {numberWithCommas(totalData?.data.shippingPaymentPrice.number)}
                  {currencyCodeToCurrency(totalData?.data.shippingPaymentPrice.currencyCode)}
                </S.AmountDd>
              </S.AmountDl>
            </S.PayBox>
          </S.TotalBtWrap>
        </Modal>
      )}
    </div>
  );
};

export default ShoppingCart;
