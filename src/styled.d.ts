import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    headerBgColor: string;
    headerFontColor: string;
    btnBgColor: string;
    toggleCircleColor: string;

    bodyBgColor: string;
    boardBgColor: string;
    boardTop: string;
    itemBgColor: string;

    deleteBtnBgColor: string;
    deleteBtnFontColor: string;
  }
}
