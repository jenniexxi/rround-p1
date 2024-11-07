import { DefaultTheme, css } from 'styled-components';

const lightTheme: DefaultTheme = {
  colors: {
    primary: '#407df7',
    point_2: '#ff7b00',
    point_3: '#00bdb6',
    point_3_dark: '#006363',
    black: '#111',
    white: '#fff',
    grey800: '#666',
    grey600: '#888',
    grey500: '#aaa',
    grey400: '#ccc',
    grey200: '#ddd',
    grey100: '#e8e8e8',
    grey80: '#f2f2f2',
    grey50: '#f8f8f8',
    bg_orange: '#fff8f5',
    bg_mint: '#e7fcfc',
    bg_blue: '#e6f3ff',
    syt_red: '#ff2d21',
    syt_green: '#00c751',
    syt_blue: '#33a3ff',
  },
  gradients: {
    vs_point: 'linear-gradient(to right, #47fc90, #29e5ad)',
  },
  fonts: {
    body: "'Pretendard', sans-serif",
    heading: '',
  },
  mixins: {
    ellipsis: (line = 1) => css`
      white-space: ${line > 1 ? 'normal' : 'nowrap'};
      word-wrap: break-word;
      display: -webkit-box;
      -webkit-line-clamp: ${line};
      -webkit-box-orient: vertical;
      overflow: hidden;
      text-overflow: ellipsis;
    `,
  },
};

// const darkTheme: DefaultTheme = {};

const theme = {
  lightTheme,
  // darkTheme,
};

export default theme;
