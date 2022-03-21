import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    red: string;
    text: string;
    textDarker: string;
    bgLighter: string;
    bgDarker: string;
}
}