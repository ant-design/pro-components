import { isUrl } from '@ant-design/pro-utils';
import React from 'react';
import type { AppItemProps, AppListProps } from './types';

/**
 * simple 模式渲染logo的方式
 *
 * @param logo
 * @param title
 * @returns
 */
export const renderLogo = (
  logo: React.ReactNode | (() => React.ReactNode),
  title?: React.ReactNode,
): React.ReactNode => {
  if (logo && typeof logo === 'string' && isUrl(logo)) {
    return <img src={logo} alt="logo" />;
  }

  if (typeof logo === 'function') {
    return logo();
  }

  if (logo && typeof logo === 'string') {
    return <div id="avatarLogo">{logo}</div>;
  }

  if (!logo && title && typeof title === 'string') {
    const symbol = title.substring(0, 1);
    return <div id="avatarLogo">{symbol}</div>;
  }
  return logo;
};

export const SimpleContent: React.FC<{
  appList?: AppListProps;
  itemClick?: (item: AppItemProps) => void;
  baseClassName: string;
  hashId?: string;
}> = (props) => {
  const { appList, baseClassName, hashId, itemClick } = props;
  return (
    <div className={`${baseClassName}-content ${hashId}`.trim()}>
      <ul className={`${baseClassName}-content-list ${hashId}`.trim()}>
        {appList?.map((app, index) => {
          if (app?.children?.length) {
            return (
              <div
                // eslint-disable-next-line react/no-array-index-key
                key={index}
                className={`${baseClassName}-content-list-item-group ${hashId}`.trim()}
              >
                <div
                  className={`${baseClassName}-content-list-item-group-title ${hashId}`.trim()}
                >
                  {app.title}
                </div>
                <SimpleContent
                  hashId={hashId}
                  itemClick={itemClick}
                  appList={app?.children}
                  baseClassName={baseClassName}
                />
              </div>
            );
          }
          return (
            <li
              // eslint-disable-next-line react/no-array-index-key
              key={index}
              className={`${baseClassName}-content-list-item ${hashId}`.trim()}
              onClick={(e) => {
                e.stopPropagation();
                itemClick?.(app);
              }}
            >
              <a
                href={itemClick ? 'javascript:;' : app.url}
                target={app.target}
                rel="noreferrer"
              >
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
