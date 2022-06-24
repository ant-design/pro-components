import { ConfigProvider, Popover } from 'antd';
import React, { useContext } from 'react';
import { cx } from '../../emotion';
import { ProLayoutContext } from '../../ProLayoutContext';
import { AppsLogo } from './AppsLogo';
import {
  appContentListCss,
  appIconsCss,
  getAntdPopoverContentListCss,
  getAppContentLisItem,
} from './css';

export type AppsLogoComponentsAppList = {
  title: React.ReactNode;
  desc: React.ReactNode;
  icon: React.ReactNode;
  url: string;
}[];

/**
 * 默认渲染logo的方式，如果是个string，用img。否则直接返回
 *
 * @param logo
 * @returns
 */
export const defaultRenderLogo = (
  logo: React.ReactNode | (() => React.ReactNode),
): React.ReactNode => {
  if (typeof logo === 'string') {
    return <img src={logo} alt="logo" />;
  }
  if (typeof logo === 'function') {
    return logo();
  }
  return logo;
};

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
  const designToken = useContext(ProLayoutContext);
  const { appList, prefixCls = 'ant' } = props;
  const antdContext = useContext(ConfigProvider.ConfigContext);
  const antdPreFixCls = antdContext.getPrefixCls();
  if (!props?.appList?.length) return null;

  return (
    <Popover
      placement="rightTop"
      trigger={['click', 'hover']}
      zIndex={9999}
      overlayClassName={cx(getAntdPopoverContentListCss(antdPreFixCls))}
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
                    getAppContentLisItem(designToken),
                  )}
                >
                  <a href={app.url} target="_blank" rel="noreferrer">
                    {defaultRenderLogo(app.icon)}
                    <div>
                      <div>{app.title}</div>
                      {app.desc ? <span>{app.desc}</span> : null}
                    </div>
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      }
    >
      <span className={cx(`${prefixCls}-basicLayout-apps-icon`, appIconsCss(designToken))}>
        <AppsLogo />
      </span>
    </Popover>
  );
};
