import {
  AddShippingPriceAreaCode,
  GoodsDisplaySalesStatusKey,
  GoodsNoticeDisplayTypeCodeEnum,
  GoodsSaleStatusKey,
  ShippingChargeStandardTypeCode,
  ShippingPolicyTypeCode,
} from '@type';

import { APIResponse, axiosInstance } from './api';
import { Badge, Code, Exhibition, Price } from './apiCommonType.d';
import { GoodsDetailsUrl } from './urls';

export type GoodsInfo = {
  goodsId: number;
  imageFilesUrl: string;
  brandName: string;
  displayGoodsName: string;
  recommendPrice: Price;
  paymentPrice: Price;
  saleRate: number;
  displaySaleStatusEnum: Code<GoodsDisplaySalesStatusKey>;
  soldOutYn: boolean;
  soldStopYn: boolean;
  soldEndYn: boolean;
  adultYn: boolean;
  delYn: boolean;
  badgeList: Badge[];
};

type ShippingInfo = {
  shippingPolicyConditionText: string;
  shippingPolicyCode: Code<ShippingPolicyTypeCode>;
  basicShippingPrice: Price;
  shippingPolicyCondition: number;
  shippingPolicyConditionPrice: Price;
  shippingPolicyCondition2: number;
  shippingPolicyConditionPrice2: Price;
  addShippingPriceUseYn: boolean;
  shippingAreaEnum: Code<AddShippingPriceAreaCode>;
  addShippingPrice: Price;
  addShippingPrice2: Price;
  shippingPolicyGroupYn: boolean;
  chargeStandardEnum: Code<ShippingChargeStandardTypeCode>;
};

export type DetailsContent = {
  categoryStoreId: number;
  displaySaleStatusEnum: Code<GoodsDisplaySalesStatusKey>;
  adultYn: boolean;
  originImageFilesUrl: string;
  addImageFilesUrlList: string[];
  brand?: {
    storeBrandYn: boolean;
    brandId: number;
    name: string;
  };
  displayGoodsName: string;
  descriptionSummary: string;
  feedbackTotalScore: number;
  feedbackTotal: number;
  recommendPrice: Price;
  salePrice: Price;
  saleRate: number;
  immediateDiscountPrice: Price;
  planDiscountPrice: Price;
  buyerGroupDiscountPrice: Price;
  totalDiscountPrice: Price;
  expectCouponPrice: Price;
  sellerManageCode: string;
  cardBenefitContentsHtml: string;
  shippingInfo: ShippingInfo;
  minBuyCnt: number;
  maxBuyCnt: number;
  buyerMaxBuyCnt: number;
  goodsExpectMileage: Price;
  buyerGroupExpectMileage: Price;
  totalExpectMileage: Price;
  companyName: string;
  noticeList: [
    {
      name: string;
      displayTypeEnum: Code<GoodsNoticeDisplayTypeCodeEnum>;
      topContentHtml: string;
      bottomContentHtml: string;
    },
  ];
  goodsDetailHtml: string;
  announcementList: [
    {
      typeEnum: {
        code: string;
        codeName: string;
      };
      itemTypeEnum: {
        code: string;
        codeName: string;
      };
      itemContent: string;
    },
  ];
  safetyList: [
    {
      infoTypeEnum: {
        code: string;
        codeName: string;
      };
      safetyAgency: string;
      safetyNumber: string;
      safetyMutual: string;
      safetyDatetime: string;
      safetyMarkUseYn: boolean;
    },
  ];
  relationGoodsList: GoodsInfo[];
  bestGoodsList: [
    {
      goodsInfo: GoodsInfo[];
      sort: number;
    },
  ];
  exhibitionList: Exhibition[];
  goodsQnaTotal: number;
  couponExistYn: boolean;
  restockAlertYn: boolean;
};

export type DetailsResp = APIResponse & {
  data: DetailsContent;
};

export type GoodsOptionsList = {
  valueStr: string;
  goodsOptionId: number;
  price: Price;
  optionSalePrice: Price;
  totalStock: number;
  buyerAvailableBuyCnt: number;
  saleStatusEnum: Code<GoodsSaleStatusKey>;
  optionList?: GoodsOptionsList[];
};

export type GoodsOptions = {
  brandName: string;
  displayGoodsName: string;
  imageFilesUrl: string;
  optionNameList: string[];
  optionList: GoodsOptionsList[];
};
export type GoodsOptionResp = APIResponse & {
  data: GoodsOptions;
};

const GoodsAPI = {
  getDetails: (goodsId: number): Promise<DetailsResp> => {
    return axiosInstance
      .get(GoodsDetailsUrl.goodsDetails(goodsId))
      .then((resp) => resp.data)
      .catch((e) => {
        console.error('API Error:', e);
        throw e;
      });
  },
  getGoodsOption: (goodsId: number): Promise<GoodsOptionResp> => {
    return axiosInstance
      .get(GoodsDetailsUrl.goodsOptions(goodsId))
      .then((resp) => resp.data)
      .catch((e) => {
        console.error('API Error:', e);
        throw e;
      });
  },
};

export default GoodsAPI;
