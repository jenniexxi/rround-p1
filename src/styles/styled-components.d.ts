import 'styled-components';
import { CSSProp } from 'styled-components';

type ThemeColors = {
  primary: string;
  point_2: string;
  point_3: string;
  point_3_dark: string;
  black: string;
  white: string;
  grey800: string;
  grey600: string;
  grey500: string;
  grey400: string;
  grey200: string;
  grey100: string;
  grey80: string;
  grey50: string;
  bg_orange: string;
  bg_mint: string;
  bg_blue: string;
  syt_red: string;
  syt_green: string;
  syt_blue: string;
};

type ThemeFonts = {
  body: string;
  heading: string;
};

type ThemeGradients = {
  vs_point: string;
};

type ThemeMixins = {
  ellipsis: (line?: number) => CSSProp;
};

declare module 'styled-components' {
  export type DefaultTheme = {
    colors: ThemeColors;
    fonts: ThemeFonts;
    gradients: ThemeGradients;
    mixins: ThemeMixins;
  };
}
