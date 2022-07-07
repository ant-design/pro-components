import { css } from '../../emotion';
import type { LayoutDesignToken } from '../../ProLayoutContext';

export const appContentListCss = css`
  box-sizing: content-box;
  max-width: 376px;
  margin: 0;
  padding: 0;
  list-style: none;
`;

export const getAntdPopoverContentListCss = (prefix: string) => css`
  .${prefix}-popover-inner {
    border-radius: 8px;
  }
  
 .${prefix}-popover-inner-content{
    padding:8px;
 }

 .${prefix}-popover-arrow{
    display: none;
  }
`;

export const getAppContentLisItem = (designToken: LayoutDesignToken) => css`
  position: relative;
  display: inline-block;
  width: 104px;
  height: 104px;
  padding: 24px;
  margin: 8px;
  vertical-align: top;
  list-style-type: none;
  transition: transform 0.2s cubic-bezier(0.333, 0, 0, 1);
  border-radius: ${designToken.borderRadiusBase};

  &:hover {
    background-color: rgba(0, 0, 0, 0.03);
  }

  a {
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 100%;
    font-size: 12px;
    text-decoration: none;
    & > #avatarLogo {
      width: 40px;
      height: 40px;
      margin: 0 auto;
      color: #1890ff;
      font-size: 22px;
      line-height: 40px;
      text-align: center;
      background-color: #e8f0fb;
      border-radius: 50%;
    }

    & > img {
      width: 40px;
      height: 40px;
    }

    & > div {
      margin-top: 5px;
      margin-left: 0px;
      color: ${designToken.colorHeading};
      font-size: 14px;
      line-height: 22px;
      white-space: nowrap;
      text-overflow: ellipsis;
    }

    & > div > span {
      color: ${designToken.colorTextSecondary};
      font-size: 12px;
      line-height: 20px;
    }
  }
`;

export const appIconsCss = (designToken: LayoutDesignToken) => css`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0 4px;
  font-size: 14px;
  line-height: 14px;
  height: 28px;
  width: 28px;
  cursor: pointer;
  color: ${designToken.appListIconTextColor};
  &:hover {
    color: ${designToken.appListIconHoverTextColor};
    background-color: ${designToken.appListIconHoverBgColor};
  }
`;
