import { APIResponse, axiosInstance } from './api';
import { Price } from './apiCommonType';
import { Goods, ShoppingInfo } from './shoppingCartApi';
import { OrderUrl } from './urls';

export type OrderItem = {
  buyerAddress: {
    defaultYn: boolean;
    name: string;
    receiverName: string;
    receiverCellPhone: string;
    receiverZipCode: string;
    receiverAddress: string;
    receiverAddressDetail: string;
  };
  cartList: {
    shipping: ShoppingInfo;
    goodsList: Goods[];
  }[];
  clauseList: {
    clauseId: number;
    typeEnum: {
      code: string;
      codeName: string;
    };
    detailTypeEnum: {
      code: string;
      codeName: string;
    };
    necessaryYn: boolean;
    name: string;
    clauseHtml: string;
    desc: string;
  }[];
  mileage: {
    useYn: boolean;
    name: string;
    unit: string;
    useUnitEnum: {
      code: string;
      codeName: string;
    };
    minimumPriceYn: boolean;
    minimumPrice: {
      number: number;
      currencyCode: string;
    };
    maximumTypeEnum: {
      code: string;
      codeName: string;
    };
    maximumMileage: {
      number: number;
      currencyCode: string;
    };
    maximumRate: number;
    availableMileage: {
      number: number;
      currencyCode: string;
    };
    totalDepositExpectedMileage: {
      number: number;
      currencyCode: string;
    };
  };
  coupon: {
    availableCouponCnt: number;
    maxCouponDiscountPrice: {
      number: number;
      currencyCode: string;
    };
    usedCouponList: Array<{
      cartId: number;
      couponId: number;
      couponIssueId: number;
      couponDiscountPrice: Price;
      couponSalePrice: Price;
      goodsId: number;
      goodsOptionId: number;
      couponCode: string;
      displayName: string;
    }>;
  };
  shippingRequestEnumList: {
    code: string;
    codeName: string;
  }[];
  recentPaymentMethodEnum: {
    code: string;
    codeName: string;
  };
  firstOrderPaymentYn: boolean;
};

export type OrderSummaryData = {
  goodsPaymentPrice: Price;
  discountPrice: Price;
  immediateDiscountPrice: Price;
  planDiscountPrice: Price;
  buyerGroupDiscountPrice: Price;
  couponDiscountPrice: Price;
  shippingPaymentPrice: Price;
  shippingPrice: Price;
  addShippingPrice: Price;
  useMileage: Price;
  paymentPrice: Price;
  pgPaymentPrice: Price;
  totalDepositExpectedMileage: Price;
  maximumUsableMileage: Price;
  mileageUseYn: true;
};

export type OrderSummaryBody = {
  cartIdList: number[];
  zipCode: string;
  useCouponDiscountPrice?: Price;
  useMileage?: Price;
  usedCouponList?: {
    cartId: number;
    couponId: number;
    couponIssueId: number;
    goodsId: number;
    goodsOptionId: number;
    couponDiscountPrice: Price;
  }[];
};

export type OrderPageResp = APIResponse & {
  data: OrderItem;
};

export type OrderSummaryResp = APIResponse & {
  data: OrderSummaryData;
};

/**
 * getOrderPage: 주문서 작성 화면 정보 조회
 */
const orderApi = {
  getOrderPage: (cartIdList: number[]): Promise<OrderPageResp> => {
    const query = new URLSearchParams({ cartIdList: cartIdList.toString() });
    return axiosInstance
      .get(OrderUrl.getOrderPage + '?' + query.toString())
      .then((resp) => resp.data)
      .catch((e) => {
        console.error('API Error:', e);
        throw e;
      });
  },
  getOrderSummary: (body: OrderSummaryBody): Promise<OrderSummaryResp> => {
    return axiosInstance
      .post(OrderUrl.getOrderSummary, body)
      .then((resp) => resp.data)
      .catch((e) => {
        console.error('API Error:', e);
        throw e;
      });
  },
};

export default orderApi;
