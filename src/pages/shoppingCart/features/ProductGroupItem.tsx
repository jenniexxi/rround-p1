import { useCallback, useEffect } from 'react';

import { Tooltip } from '@components';
import { difference, every, includes, uniq } from 'lodash';

import { currencyCodeToCurrency, numberWithCommas } from '@utils/display';

import { CartGroup, Goods } from '@apis/shoppingCartApi';

import TooltipIcon from '@assets/svg/TooltipIcon';

import * as S from '../ShoppingCart.style';
import ProductItem from './ProductItem';

type Props = {
  item: CartGroup; // ProductSectionItem 에서 map 돌려서 가져옴 (ProductGroupItem 불러오는 곳 확인)
  cartIdList: React.MutableRefObject<number[]>; //useRef를 사용해 만든 참조 객체를 타입으로 정의할 때 사용
  // item: CartsList;
  selectedCartId: number[];
  checkAll: boolean;
  setCheckSection: (isSectionChecked: boolean) => void;
  setSelectedCartId: React.Dispatch<React.SetStateAction<number[]>>;
};

const ProductGroupItem = ({
  item,
  cartIdList,
  selectedCartId,
  checkAll,
  setCheckSection,
  setSelectedCartId,
}: Props) => {
  useEffect(() => {
    const allCartIdList = item.goodsList.reduce((acc: number[], goods) => {
      acc.push(goods.cartId);
      goods.addGoodsList.forEach((addGoods) => {
        acc.push(addGoods.cartId);
      });
      return acc;
    }, []);

    cartIdList.current = [...cartIdList.current, ...allCartIdList];
    const childChecked = every(cartIdList.current, (id) => includes(selectedCartId, id));
    setCheckSection(checkAll || childChecked);
  }, [checkAll, selectedCartId, item.goodsList]);

  // 개별 선택 핸들러
  const handleItemCheck = useCallback(
    (goods: Goods, checked: boolean) => {
      const addItemCartId = goods.addGoodsList?.map((item) => item.cartId);
      setSelectedCartId((prevSelected: number[]) => {
        if (checked) {
          return uniq([...prevSelected, goods.cartId, ...addItemCartId]);
        } else {
          return difference(prevSelected, [goods.cartId, ...addItemCartId]);
        }
      });
    },
    [setSelectedCartId],
  );

  return (
    <>
      {item.goodsList.map((goods) => (
        <ProductItem
          key={'goodsItemId' + goods.cartId}
          goods={goods}
          shippingPrice={item.shipping.shippingPaymentPrice.number}
          checked={selectedCartId.includes(goods.cartId)}
          onCheckChange={(checked) => handleItemCheck(goods, checked)}
        />
      ))}
      <S.ItemShipCost>
        {item.shipping.addShippingPriceUseYn ? <S.BindText>묶음배송</S.BindText> : <span />}
        <S.ShipItem>
          {item.shipping.shippingPaymentPrice.number === 0 ? (
            <span>무료배송</span>
          ) : (
            <>
              <span>배송비</span>
              {numberWithCommas(item.shipping.shippingPaymentPrice.number)}
              {currencyCodeToCurrency(item.shipping.shippingPaymentPrice.currencyCode)}
            </>
          )}

          <S.TooltipBox>
            <Tooltip
              items={[
                {
                  title: (
                    <S.TooltipIconBox>
                      <TooltipIcon />
                    </S.TooltipIconBox>
                  ),
                  content: (
                    <>
                      <S.TooltipTitle>배송비</S.TooltipTitle>
                      <p>* N 개마다 기본 배송비 부과</p>
                      <p>* 제주/도서산간 추가배송비 배송비 원</p>
                      <p>* 도서산간 추가배송비 배송비 원</p>
                    </>
                  ),
                },
              ]}
              position='bottom'
              showCloseButton={true}
              defaultShown={false}
              customStyles={{
                minWidth: '200px',
                color: '#fff',
                right: '-10px',
              }}
            />
          </S.TooltipBox>
        </S.ShipItem>
      </S.ItemShipCost>
    </>
  );
};

export default ProductGroupItem;
