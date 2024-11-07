import { useEffect, useState } from 'react';

import { Selector, TwoButton } from '@components';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { showModal } from '@components/modal/ModalManager';
import QuantityCounter from '@components/quantityCounter/QuantityCounter';
import OptionSelector from '@components/selector/OptionSelector';

import { currencyCodeToCurrency, numberWithCommas } from '@utils/display';

import { GoodsOptionsList } from '@apis/goodsApi';
import shoppingCartApi, { Goods, MiniCartAddGoods } from '@apis/shoppingCartApi';

import CloseButtonSVG from '@assets/svg/CloseButtonSVG';

import CloseButton from '@commons/CloseButton';

import * as S from '../ShoppingCart.style';

type Props = {
  goodsOptionItem: Goods;
  onHide: () => void;
};

type ChildItemType = {
  goodsId: number;
  buyCnt: number;
  name: string;
  goodsOptionId?: number;
  minBuyCnt?: number;
  cartId?: number;
  price: number;
  isAddItemShow: boolean;
};

const ProductModify = ({ goodsOptionItem, onHide }: Props) => {
  const [newChildItem, setNewChildItem] = useState<ChildItemType[]>([]); // 다른 옵션 추가 및 추가상품

  useEffect(() => {
    const item: ChildItemType = {
      goodsId: goodsOptionItem.goodsId,
      buyCnt: goodsOptionItem.buyCnt,
      name: goodsOptionItem.displayGoodsName,
      goodsOptionId: goodsOptionItem.goodsOptionId || 0,
      cartId: goodsOptionItem.cartId,
      price: goodsOptionItem.paymentPricePerOne.number,
      isAddItemShow: false,
    };

    const addGoodsItem = goodsOptionItem.addGoodsList.map((goods): ChildItemType => {
      return {
        goodsId: goodsOptionItem.goodsId,
        buyCnt: goods.buyCnt,
        name: goods.optionName,
        goodsOptionId: goods.goodsOptionId,
        cartId: goods.cartId,
        price: goods.paymentPricePerOne.number,
        isAddItemShow: true,
      };
    });

    setNewChildItem([item, ...addGoodsItem]);
  }, [goodsOptionItem]);

  const { data } = useQuery({
    queryKey: ['getMiniCarts', goodsOptionItem.goodsId],
    queryFn: () => shoppingCartApi.getMiniCartList(goodsOptionItem.goodsId),
  });

  const queryClient = useQueryClient();

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

  const handleOptionAddChange = (value: GoodsOptionsList) => {
    const item: ChildItemType = {
      goodsId: goodsOptionItem.goodsId,
      buyCnt: 1,
      name: value.valueStr,
      goodsOptionId: value.goodsOptionId,
      price: value.price.number,
      isAddItemShow: true,
    };

    // 중복 체크
    const otherOpAddId = newChildItem.find((option) => item.goodsOptionId === option.goodsOptionId);

    if (!otherOpAddId) {
      setNewChildItem((prev) => [...prev, item]);
    }
  };

  const modifyOrder = () => {
    showModal.text('변경된 옵션 정보로 주문수정하시겠습니까?', {
      buttonType: 'multi',
      rightonClick: () => {
        //추구 구매수정 작업 필요
      },
    });
  };

  const closeModify = () => {
    // 추후 변경사항 감지 후 팝업 필요
    onHide();
  };

  // 상품 수량 변경 핸들러
  const handleGoodsQuantityChange = (goodsOptionId: number, newQuantity: number) => {
    console.log(goodsOptionId, newQuantity);

    setNewChildItem((prevItems) =>
      prevItems.map((item) => (item.goodsOptionId === goodsOptionId ? { ...item, buyCnt: newQuantity } : item)),
    );
  };

  // 추가상품 Box 추가 핸들러
  const handleAddNewChild = (value: MiniCartAddGoods) => {
    const item: ChildItemType = {
      goodsId: goodsOptionItem.goodsId,
      buyCnt: 1,
      name: value.valueStr,
      goodsOptionId: value.goodsOptionId,
      price: value.price.number,
      isAddItemShow: true,
    };

    // 중복 체크
    const otherOpAddId = newChildItem.find((option) => item.goodsOptionId === option.goodsOptionId);

    if (!otherOpAddId) {
      setNewChildItem((prev) => [...prev, item]);
    }
  };

  const getTotalPrice = () => {
    const total = newChildItem.reduce((acc, item) => {
      acc += item.buyCnt * item.price;
      return acc;
    }, 0);
    return total;
  };

  return (
    <S.ProductModifyWrap>
      <S.HeaderGroup>
        <S.Title>주문수정</S.Title>
        <S.OrderModifyCloseBtn>
          <CloseButton onClick={onHide} />
        </S.OrderModifyCloseBtn>
      </S.HeaderGroup>
      <S.OrderModifyContainer>
        <S.ProductPart>
          <img
            src={goodsOptionItem.imageFilesUrl}
            alt={goodsOptionItem.displayGoodsName}
          />
          <S.TextBox>
            <div>{goodsOptionItem.brandName}</div>
            <S.BrandName>{goodsOptionItem.displayGoodsName}</S.BrandName>
            <S.TextPrice>
              <S.OrigPrice>
                {numberWithCommas(goodsOptionItem.recommendPrice.number)}
                {currencyCodeToCurrency(goodsOptionItem.recommendPrice.currencyCode)}
              </S.OrigPrice>
              <S.DiscPrice>
                {numberWithCommas(goodsOptionItem.paymentPrice.number)}
                {currencyCodeToCurrency(goodsOptionItem.paymentPrice.currencyCode)}
              </S.DiscPrice>
            </S.TextPrice>
          </S.TextBox>
        </S.ProductPart>

        {/* 다른 옵션 추가 selector */}
        {data?.data?.optionNameList && data?.data?.optionNameList.length > 0 && (
          <S.OtherOpPart>
            <h3>다른 옵션 추가</h3>
            <OptionSelector
              options={data?.data}
              optionCount={data?.data.optionNameList.length | 0}
              onChange={(value: number) => {
                console.log(handleOptionAddChange);
                console.log(value);
              }}
              // onChange={(value: GoodsOptionsList) => {
              //   handleOptionAddChange(value);
              // }}
            />
          </S.OtherOpPart>
        )}

        {/* 추가상품 selector */}
        {data?.data?.addGoodsList && data?.data?.addGoodsList.length > 0 && (
          <S.AddOpPart>
            <h3>+ 추가상품</h3>
            {data?.data.addGoodsList?.map((item, index) => {
              const options = item.addGoodsList.map((goods) => ({
                label: goods.valueStr,
                value: goods,
              }));

              return (
                <Selector<MiniCartAddGoods>
                  key={index + item.valueStr}
                  options={options}
                  onChange={(value: MiniCartAddGoods) => {
                    handleAddNewChild(value);
                  }}
                  placeholder={item.valueStr}
                />
              );
            })}
          </S.AddOpPart>
        )}

        {newChildItem.map((item, index) => (
          <S.OptionBoxWrap key={item.name + index}>
            <S.Info>
              {item.isAddItemShow ? <S.Bedge>추가상품</S.Bedge> : <></>}
              <S.Name>{item.name}</S.Name>
            </S.Info>
            <S.QuantityInfo>
              <QuantityCounter
                quantity={item.buyCnt}
                setQuantity={(newQuantity) => handleGoodsQuantityChange(item.goodsOptionId || 0, newQuantity)}
                width={32}
              />
              <S.OptionPrice>{item.price * item.buyCnt}원</S.OptionPrice>
            </S.QuantityInfo>
            <S.BasicOptionBtn
              onClick={(e) => {
                e.stopPropagation();
                if (item.cartId) {
                  deleteItem(item.cartId);
                } else {
                  setNewChildItem((prev) => prev.filter((childItem) => childItem.goodsOptionId !== item.goodsOptionId));
                }
              }}
            >
              <CloseButtonSVG size={32} />
            </S.BasicOptionBtn>
          </S.OptionBoxWrap>
        ))}
        <S.AmountPart>
          <S.PrdDl>
            <S.PrdDt>상품 금액</S.PrdDt>
            <S.PrdDd>{numberWithCommas(getTotalPrice())}원</S.PrdDd>
          </S.PrdDl>
        </S.AmountPart>
      </S.OrderModifyContainer>
      <S.BtnBox>
        <TwoButton
          leftTitle={'취소'}
          rightTitle={'주문수정'}
          leftSize={5}
          rightSize={5}
          btnGap={10}
          leftType='common.outline.grey'
          rightType='common'
          size='md'
          leftonClick={closeModify}
          rightonClick={modifyOrder}
        />
      </S.BtnBox>
    </S.ProductModifyWrap>
  );
};

export default ProductModify;
