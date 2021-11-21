import { cx, css } from '@emotion/css';
import { Popover } from 'antd';
import React from 'react';

export type AppsLogoComponentsAppList = {
  title: React.ReactNode;
  icon: React.ReactNode;
  url: string;
}[];

/**
 * 默认的应用列表的图标
 *
 * @returns
 */
const AppsLogo = () => (
  <svg width="1em" height="1em" viewBox="0 0 12 12" fill="currentColor" aria-hidden="true">
    <path d="M0 0h3v3H0V0zm4.5 0h3v3h-3V0zM9 0h3v3H9V0zM0 4.5h3v3H0v-3zm4.503 0h3v3h-3v-3zM9 4.5h3v3H9v-3zM0 9h3v3H0V9zm4.503 0h3v3h-3V9zM9 9h3v3H9V9z" />
  </svg>
);

/**
 * 默认渲染logo的方式，如果是个string，用img。否则直接返回
 *
 * @param logo
 * @returns
 */
export const defaultRenderLogo = (logo: React.ReactNode): React.ReactNode => {
  if (typeof logo === 'string') {
    return <img src={logo} alt="logo" />;
  }
  if (typeof logo === 'function') {
    return logo();
  }
  return logo;
};

const appContentListCss = css`
  box-sizing: content-box;
  width: 210px;
  margin: 0;
  padding: 0;
  list-style: none;
`;

const appContentLisItem = css`
  position: relative;
  display: inline-block;
  width: 70px;
  height: 70px;
  padding: 0;
  vertical-align: top;
  list-style-type: none;
  -webkit-transition: transform 0.2s cubic-bezier(0.333, 0, 0, 1);
  transition: transform 0.2s cubic-bezier(0.333, 0, 0, 1);
  a {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    height: 100%;
    padding: 10px;
    font-size: 12px;
    text-align: center;
    text-decoration: none;
    &:hover {
      background-color: #e8f0fe;
      border-radius: 8px;
    }
    & > img {
      width: 32px;
      height: 32px;
    }
    & > span {
      width: 100%;
      height: 14px;
      overflow: hidden;
      line-height: 14px;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
  }
`;

const AppIconsCss = css`
  display: inline-block;
  padding: 5px;
  font-size: 14px;
  line-height: 14px;
  &:hover {
    color: #2155f4;
    background-color: rgba(0, 87, 127, 0.06);
  }
`;

/**
 * 相关品牌额icon 列表。用于展示相关的品牌
 *
 * @param props
 * @returns
 */
export const AppsLogoComponents: React.FC<{
  appList?: AppsLogoComponentsAppList;
  prefixCls?: string;
}> = (props) => {
  const { appList, prefixCls = 'ant-pro' } = props;
  if (!props?.appList?.length) return null;
  return (
    <Popover
      content={
        <div className={`${prefixCls}-basicLayout-apps-content`}>
          <ul className={cx(`${prefixCls}-basicLayout-apps-content-list`, appContentListCss)}>
            {appList?.map((app, index) => {
              return (
                <li
                  // eslint-disable-next-line react/no-array-index-key
                  key={index}
                  className={cx(
                    `${prefixCls}-basicLayout-apps-content-list-item`,
                    appContentLisItem,
                  )}
                >
                  <a href={app.url} target="_blank">
                    {defaultRenderLogo(app.icon)}
                    <span>{app.title}</span>
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      }
    >
      <span className={cx(`${prefixCls}-basicLayout-apps-icon`, AppIconsCss)}>
        <AppsLogo />
      </span>
    </Popover>
  );
};
