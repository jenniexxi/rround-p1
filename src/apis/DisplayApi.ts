import { DisplayGoodsSortTypeCode } from '@type';

import { APIResponse, axiosInstance } from './api';
import { GoodsInfo } from './goodsApi';
import { DisplayUrl } from './urls';

export type SalesListData = {
  content: GoodsInfo[];
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
  first: boolean;
  last: boolean;
};

export type SalesListResp = APIResponse & {
  data: SalesListData;
};

const DisplayAPI = {
  getSalesList: (page: number, size: number, goodsSortTypeEnum: DisplayGoodsSortTypeCode): Promise<SalesListData> => {
    const query = new URLSearchParams({
      page: page.toString(),
      size: size.toString(),
      goodsSortTypeEnum: goodsSortTypeEnum.toString(),
    });

    return axiosInstance
      .get(DisplayUrl.salesList + '?' + query.toString())
      .then((resp) => resp.data.data)
      .catch((e) => {
        console.error('API Error:', e);
      });
  },
};

export default DisplayAPI;
