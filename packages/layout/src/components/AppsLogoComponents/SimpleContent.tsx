import React from 'react';
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
  baseClassName: string;
}> = (props) => {
  const { appList, baseClassName } = props;
  return (
    <div className={`${baseClassName}-content`}>
      <ul className={`${baseClassName}-content-list`}>
        {appList?.map((app, index) => {
          return (
            <li
              // eslint-disable-next-line react/no-array-index-key
              key={index}
              className={`${baseClassName}-content-list-item`}
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
