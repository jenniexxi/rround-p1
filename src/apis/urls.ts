export const DisplayUrl = {
  salesList: '/displays/sale',
};

export const GoodsDetailsUrl = {
  goodsDetails: (goodsId: number) => `/goods/${goodsId}/details`,
  goodsOptions: (goodsId: number) => `/goods/${goodsId}/options`,
};

export const ShoppingUrl = {
  getShoppingCart: '/shops/carts',
  getShoppingCartTotal: '/shops/carts/summary',
  updateShoppingCart: () => `/shops/carts`,
  createShoppingCart: '/shops/carts',
  deleteShoppingCart: '/shops/carts',
  getShoppingMiniCart: (goodsId: number) => `/shops/carts/goods/${goodsId}/mini-cart`,
  getCartBuyAvailableCheck: '/shops/carts/buy-available-check',
};

export const SystemUrl = {
  forceLogin: '/systems/logins/force-auth',
};

export const BuyersUrl = {
  createBuyers: '/buyers/addresses',
  getBuyers: (buyerAddressIdEncrypt: string) => `buyers/addresses/${buyerAddressIdEncrypt}`,
  updateBuyers: (buyerAddressIdEncrypt: string) => `/buyers/addresses/${buyerAddressIdEncrypt}`,
  deleteBuyers: (buyerAddressIdEncrypt: string) => `/buyers/addresses/${buyerAddressIdEncrypt}`,
  getMyAddress: '/buyers/addresses/me',
  getMyAddressCount: '/buyers/addresses/me-address-count',
};

export const OrderUrl = {
  getOrderPage: '/shops/pages/order',
  getOrderSummary: '/shops/orders/summary',
};
