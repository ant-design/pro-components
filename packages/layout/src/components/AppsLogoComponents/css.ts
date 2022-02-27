import { css } from '../../emotion';
import type { LayoutDesignToken } from '../../ProLayoutContext';

export const appContentListCss = css`
  box-sizing: content-box;
  width: 656px;
  margin: 0;
  padding: 0;
  list-style: none;
`;

export const getAntdPopoverContentListCss = (prefix: string) => css`
 .${prefix}-popover-inner-content{
    padding:8px;
 }
`;

export const getAppContentLisItem = (designToken: LayoutDesignToken) => css`
  position: relative;
  display: inline-block;
  width: 328px;
  height: 72px;
  padding: 16px;
  vertical-align: top;
  list-style-type: none;
  transition: transform 0.2s cubic-bezier(0.333, 0, 0, 1);
  border-radius: ${designToken.borderRadiusBase};

  &:hover {
    background-color: rgba(0, 0, 0, 0.03);
  }

  a {
    display: flex;
    height: 100%;
    font-size: 12px;
    text-decoration: none;
    & > img {
      width: 40px;
      height: 40px;
    }
    & > div {
      margin-left: 14px;
      color: ${designToken.headingColor};
      font-size: 14px;
      line-height: 22px;
      white-space: nowrap;
      text-overflow: ellipsis;
    }

    & > div > span {
      color: ${designToken.textColorSecondary};
      font-size: 12px;
      line-height: 20px;
    }
  }
`;

export const appIconsCss = css`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0 4px;
  font-size: 14px;
  line-height: 14px;
  height: 28px;
  width: 28px;
  cursor: pointer;
  &:hover {
    color: #2155f4;
    background-color: rgba(0, 87, 127, 0.06);
  }
`;
