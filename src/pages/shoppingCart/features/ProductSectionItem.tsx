import { useCallback, useEffect, useRef, useState } from 'react';

import { Link } from 'react-router-dom';

import { Checkbox } from '@components';
import { difference, intersection, uniq } from 'lodash';

import { currencyCodeToCurrency, numberWithCommas } from '@utils/display';

import shoppingCartApi, { CartGroup, CartsTotal, CompanyInfo } from '@apis/shoppingCartApi';

import ArrowTop from '@assets/svg/ArrowTop';

import * as S from '../ShoppingCart.style';
import ProductGroupItem from './ProductGroupItem';

type Props = {
  companyInfo: CompanyInfo;
  item: CartGroup[];
  // item: CartsList;
  checkAll: boolean;
  selectedCartId: number[];
  setSelectedCartId: React.Dispatch<React.SetStateAction<number[]>>;
};

const ProductSectionItem = ({ item, companyInfo, selectedCartId, checkAll, setSelectedCartId }: Props) => {
  const [checkSection, setCheckSection] = useState(false);
  const [storePerTotal, setStorePerTotal] = useState<CartsTotal>();

  const cartIdList = useRef<number[]>([]);

  useEffect(() => {
    const intersectionArray = intersection(selectedCartId, cartIdList.current);
    shoppingCartApi.getCartTotal(intersectionArray).then((resp) => setStorePerTotal(resp.data));
  }, [selectedCartId, cartIdList.current]);

  // 상점 선택 핸들러
  const handleSectionItemCheck = useCallback(
    (checked: boolean) => {
      setSelectedCartId((prevSelected: number[]) => {
        if (checked) {
          return uniq([...prevSelected, ...cartIdList.current]);
        } else {
          return difference(prevSelected, cartIdList.current);
        }
      });
      setCheckSection(checked);
    },
    [setSelectedCartId],
  );

  return (
    <S.ProductList>
      <S.BrandBox>
        <Checkbox
          checked={checkSection}
          id={`storeCheck-${companyInfo.companyId || ''}-${companyInfo.storeName}`}
          name={`storeCheck-${companyInfo.companyId || ''}-${companyInfo.storeName}`}
          value={companyInfo.storeName || '스토어명'}
          onChange={(checked) => {
            handleSectionItemCheck(checked);
          }}
        />
        <Link to='/'>
          <ArrowTop size={18} />
        </Link>
      </S.BrandBox>
      {item.map((item, index) => (
        <ProductGroupItem
          key={companyInfo.storeName + index}
          item={item}
          cartIdList={cartIdList}
          selectedCartId={selectedCartId}
          setSelectedCartId={setSelectedCartId}
          checkAll={checkAll}
          setCheckSection={setCheckSection}
        />
      ))}
      <S.BrandPerTotal>
        <S.BrandPayDl>
          <S.BrandPayDt>선택상품금액</S.BrandPayDt>
          <S.BrandPayDd>
            {numberWithCommas(storePerTotal?.goodsPaymentPrice.number)}
            {currencyCodeToCurrency(storePerTotal?.goodsPaymentPrice.currencyCode)}
          </S.BrandPayDd>
        </S.BrandPayDl>
        <S.BrandPayDl>
          <S.BrandPayDt>즉시할인금액</S.BrandPayDt>
          <S.BrandPayDd>
            {storePerTotal?.discountPrice.number === 0 ? '' : '-'}
            {numberWithCommas(storePerTotal?.discountPrice.number)}
            {currencyCodeToCurrency(storePerTotal?.discountPrice.currencyCode)}
          </S.BrandPayDd>
        </S.BrandPayDl>
        <S.BrandPayDl>
          <S.BrandPayDt>총 배송비</S.BrandPayDt>
          <S.BrandPayDd>
            {numberWithCommas(storePerTotal?.shippingPaymentPrice.number)}
            {currencyCodeToCurrency(storePerTotal?.shippingPaymentPrice.currencyCode)}
          </S.BrandPayDd>
        </S.BrandPayDl>
        <S.BrandPayTotal>
          <S.PayTitle>결제예정금액</S.PayTitle>
          <S.PayAmount>{storePerTotal?.paymentPrice.number}</S.PayAmount>
        </S.BrandPayTotal>
      </S.BrandPerTotal>
    </S.ProductList>
  );
};

export default ProductSectionItem;
