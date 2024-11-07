import { GoodsSaleStatus } from '@type';

import { Option } from '@components/selector/Selector';

import { GoodsOptionsList } from '@apis/goodsApi';

export const convertMinicartOptionFormat = (options: GoodsOptionsList[]): Option<string>[] => {
  if (!options?.length) return [];

  return (
    options.map((data) => ({
      label: data?.valueStr ?? '',
      value: data?.goodsOptionId ? data?.goodsOptionId.toString() : data?.valueStr,
      disabled: !!data?.saleStatusEnum && data.saleStatusEnum.code !== GoodsSaleStatus.OnSale, //품절상태 체크
    })) || []
  );
};
