interface RouteConfig {
  path: string;
  filePath: string;
}

type RouteConfigMap = {
  [key: string]: RouteConfig;
};

// src/constants/routes/mainRoutes.ts
export const PAGE_ROUTES: RouteConfigMap = {
  HOME: {
    path: '/',
    filePath: 'productlist/productlist',
  },
  PRODUCTDETAIL: {
    path: '/productdetail/:goodsId',
    filePath: 'productdetail/productdetail',
  },
  SHOPPINGCART: {
    path: '/shoppingcart',
    filePath: 'shoppingcart/shoppingcart',
  },
  ORDER: {
    path: '/order',
    filePath: 'order/order',
  },
  BUYERS: {
    path: '/buyers',
    filePath: 'buyers/buyers',
  },
  EXAMPLEROOT: {
    path: '/examples',
    filePath: 'exampleroot/exampleroot',
  },
} as const;

export const EXAMPLE_ROUTES: RouteConfigMap = {
  TESTARCCORIDAN: {
    path: '/examples/testaccordion',
    filePath: 'examples/testaccordion',
  },
  TESTBUTTON: {
    path: '/examples/testbutton',
    filePath: 'examples/testbutton',
  },
  TESTCHECKBOX: {
    path: '/examples/TestCheckbox',
    filePath: 'examples/TestCheckbox',
  },
  TESTCOUNTER: {
    path: '/examples/TestCounter',
    filePath: 'examples/TestCounter',
  },
  TESTHORIZONTALSCROLL: {
    path: '/examples/testhorizontalscroll',
    filePath: 'examples/testhorizontalscroll',
  },
  TESTINPUT: {
    path: '/examples/testinput',
    filePath: 'examples/testinput',
  },
  TESTMODAL: {
    path: '/examples/testmodal',
    filePath: 'examples/testmodal',
  },
  TESTRADIO: {
    path: '/examples/testradio',
    filePath: 'examples/testradio',
  },
  TESTSELECTOR: {
    path: '/examples/testselector',
    filePath: 'examples/testselector',
  },
  TESTSWIPER: {
    path: '/examples/testswiper',
    filePath: 'examples/testswiper',
  },
  TESTTAB: {
    path: '/examples/testtab',
    filePath: 'examples/testtab',
  },
  TESTTOOLTIP: {
    path: '/examples/testtooltip',
    filePath: 'examples/testtooltip',
  },
  VIRTUALSCROLLEX: {
    path: '/examples/virtualscrollex',
    filePath: 'examples/virtualscrollex',
  },
} as const;
