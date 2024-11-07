import { useCallback, useRef, useState } from 'react';

import { useNavigate, useParams } from 'react-router-dom';

import { useQuery } from '@tanstack/react-query';

import { hideModal, showModal } from '@components/modal/ModalManager';

import { useHeader } from '@hooks/useHeader';

import { parseEscapeToHtml } from '@utils/display';

import GoodsAPI from '@apis/goodsApi';
import shoppingCartApi from '@apis/shoppingCartApi';

import * as S from './ProductDetail.style';
import BottomButton from './features/BottomButton';
import ProductBuyModal from './features/ProductBuyModal';

export type ItemProp = {
  name: string;
  minCount?: number;
  quantity: number;
  price: number;
  goodsId?: number;
  goodsOptionId?: number;
};

export const ProductDetail = () => {
  const { goodsId } = useParams<{ goodsId: string }>();

  const [selectOption, setSelectOption] = useState<number>(-1);
  const [buyItems, setBuyItems] = useState<ItemProp[]>([]);

  const navigate = useNavigate();
  const buyModalId = useRef('');

  useHeader('', { showRightButton: false });
  const { data } = useQuery({
    queryKey: ['getDetails', Number(goodsId)],
    queryFn: () => {
      return GoodsAPI.getDetails(Number(goodsId));
    },
  });

  const { data: miniCartData } = useQuery({
    queryKey: ['getMiniCartItem', Number(goodsId)],
    queryFn: () => {
      return shoppingCartApi.getMiniCartList(Number(goodsId));
    },
    enabled: !!data,
  });

  const selectOptionId = useCallback((id: number) => {
    console.log('Selecting option:', id);
    setSelectOption(id);
  }, []);

  const handleBuyItemsUpdate = useCallback((newItems: ItemProp[]) => {
    console.log('Updating buy items:', newItems);
    setBuyItems(newItems);
  }, []);

  const getInitialItems = useCallback((): ItemProp[] => {
    if (buyItems.length > 0) return buyItems;

    if (miniCartData?.data.optionNameList && miniCartData?.data.optionNameList.length === 0) {
      return [
        {
          name: data?.data.displayGoodsName || '',
          minCount: data?.data.minBuyCnt || 1,
          quantity: data?.data.minBuyCnt || 1,
          price: data?.data.salePrice.number || 0,
          goodsId: goodsId ? parseInt(goodsId) : undefined,
        },
      ];
    }
    return [];
  }, [buyItems, miniCartData, data, goodsId]);

  const clickBuyButton = () => {
    const initialItems = getInitialItems();

    buyModalId.current = showModal.custom(
      <ProductBuyModal
        goodsId={parseInt(goodsId || '-1')}
        miniCartData={miniCartData}
        selectOptionId={selectOptionId}
        buyItem={initialItems}
        navigate={navigate}
        hideBuyModal={hideBuyModal}
        onItemsUpdate={handleBuyItemsUpdate}
        initialSelectOption={selectOption}
      />,
      {
        type: 'bottomSheet',
        showCloseBtn: true,
        radius: 0,
        backDropColor: '#00000030',
        closeBtnPosition: { right: 5, top: 5, size: 26 },
      },
    );
  };

  const hideBuyModal = useCallback(() => {
    hideModal(buyModalId.current);
    buyModalId.current = '';
  }, []);

  return (
    <S.ProductDetailContainer>
      <S.ProdListThumbBox>
        <S.ProdListThumb
          src={data?.data?.originImageFilesUrl}
          width={'100%'}
        />
      </S.ProdListThumbBox>
      <S.ProdListInfoName>
        <S.ProdListBradnName>{data?.data?.brand?.name}</S.ProdListBradnName>
        <S.ProdListDisplayName>{data?.data?.displayGoodsName}</S.ProdListDisplayName>
      </S.ProdListInfoName>

      {data?.data?.goodsDetailHtml && (
        <S.DetailInfo dangerouslySetInnerHTML={{ __html: parseEscapeToHtml(data?.data.goodsDetailHtml) }} />
      )}
      <BottomButton onClickButton={clickBuyButton} />
    </S.ProductDetailContainer>
  );
};

export default ProductDetail;
