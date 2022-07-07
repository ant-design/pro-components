import React, { useContext } from 'react';
import { cx } from '../../emotion';
import { ProLayoutContext } from '../../ProLayoutContext';
import { appContentListCss, getAppContentLisItem } from './SimpleCss';
import type { AppsLogoComponentsAppList } from './types';

/**
 * simple模式渲染logo的方式
 *
 * @param logo
 * @param title
 * @returns
 */
export const renderLogo = (
  logo: React.ReactNode | (() => React.ReactNode),
  title?: React.ReactNode,
): React.ReactNode => {
  if (logo && typeof logo === 'string') {
    return <img src={logo} alt="logo" />;
  }
  if (typeof logo === 'function') {
    return logo();
  }
  if (!logo && title && typeof title === 'string') {
    const symbol = title.substring(0, 1);
    return <div id="avatarLogo">{symbol}</div>;
  }
  return logo;
};

export const SimpleContent: React.FC<{
  appList?: AppsLogoComponentsAppList;
  prefixCls?: string;
}> = (props) => {
  const designToken = useContext(ProLayoutContext);
  const { appList, prefixCls = 'ant' } = props;
  return (
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
              <a href={app.url} target={app.target} rel="noreferrer">
                {renderLogo(app.icon, app.title)}
                <div>
                  <div>{app.title}</div>
                </div>
              </a>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
