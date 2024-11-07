import React, { useCallback, useRef, useState } from 'react';

import { useNavigate } from 'react-router-dom';

import { useInfiniteQuery } from '@tanstack/react-query';
import { DISPLAY_GOODS_SORT_TYPE, DisplayGoodsSortTypeCode } from '@type';

import { useHeader } from '@hooks/useHeader';

import { PAGE_ROUTES } from '@router/Routes';

import DisplayAPI, { SalesListData } from '@apis/DisplayApi';

import * as S from './ProductList.style';

const PAGE_LIMIT = 20;

export const ProductList = () => {
  const [type, setType] = useState<DisplayGoodsSortTypeCode>(DISPLAY_GOODS_SORT_TYPE.BEST);

  const navigate = useNavigate();
  useHeader('', {
    showHeader: false,
  });

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfiniteQuery<SalesListData>({
    queryKey: ['produceList', type],
    queryFn: ({ pageParam }) => DisplayAPI.getSalesList(pageParam as number, PAGE_LIMIT, type),
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.last || allPages.length >= lastPage.totalPages) {
        return undefined;
      }
      return allPages.length;
    },
  });

  const observer = useRef<IntersectionObserver>();
  const lastElementRef = useCallback(
    (node: HTMLLIElement | null) => {
      if (isFetchingNextPage) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasNextPage) {
          fetchNextPage();
        }
      });
      if (node) observer.current.observe(node);
    },
    [isFetchingNextPage, hasNextPage, fetchNextPage],
  );

  // 장바구니 이동버튼 추가
  const gotoCart = () => {
    navigate(PAGE_ROUTES.SHOPPINGCART.path);
  };

  return (
    <S.ProdListContainer>
      <div
        style={{ position: 'absolute', top: 10, right: 10, padding: 4 }}
        onClick={gotoCart}
      >
        장바구니
      </div>
      {data?.pages.map((page, pageIndex) => (
        <React.Fragment key={pageIndex}>
          {page.content.map((item, itemIndex) => (
            <S.ProdListItem
              key={item.goodsId}
              ref={pageIndex === data.pages.length - 1 && itemIndex === page.content.length - 1 ? lastElementRef : null}
            >
              <S.ProdListItemLink to={`/productdetail/${item.goodsId}`} />
              <S.ProdListThumbBox>
                <S.ProdListThumb
                  src={item.imageFilesUrl}
                  alt={item.displayGoodsName}
                />
              </S.ProdListThumbBox>
              <S.ProdListInfoName>
                <S.ProdListBradnName>{item.goodsId}</S.ProdListBradnName>
                <S.ProdListBradnName>{item.brandName}</S.ProdListBradnName>
                <S.ProdListDisplayName>{item.displayGoodsName}</S.ProdListDisplayName>
              </S.ProdListInfoName>
              <S.ProdListInfoPrice>
                <S.ProdListSaleRate>{item.saleRate}</S.ProdListSaleRate>
                <S.ProdListPaymentPrice>
                  {item.paymentPrice.number}
                  {item.paymentPrice.currencyCode}
                </S.ProdListPaymentPrice>
                <S.ProdListRecommendPrice>
                  {item.recommendPrice.number}
                  {item.recommendPrice.currencyCode}
                </S.ProdListRecommendPrice>
              </S.ProdListInfoPrice>
            </S.ProdListItem>
          ))}
        </React.Fragment>
      ))}
      {isFetchingNextPage && <div>Loading more...</div>}
    </S.ProdListContainer>
  );
};

export default ProductList;
