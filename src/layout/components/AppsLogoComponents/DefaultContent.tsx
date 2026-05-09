import { clsx } from 'clsx';
import React from 'react';
import { defaultRenderLogo } from './index';
import type { AppItemProps, AppListProps } from './types';

export const DefaultContent: React.FC<{
  appList?: AppListProps;
  itemClick?: (item: AppItemProps) => void;
  baseClassName: string;
  hashId?: string;
}> = (props) => {
  const { appList, baseClassName, hashId, itemClick } = props;
  return (
    <div
      className={clsx(`${baseClassName}-content`, hashId)}
      data-testid="pro-layout-apps-logo-content"
    >
      <ul
        className={clsx(`${baseClassName}-content-list`, hashId)}
        data-testid="pro-layout-apps-logo-content-list"
      >
        {appList?.map((app, index) => {
          const itemKey = (typeof app.title === 'string' && app.title) || index;
          if (app?.children?.length) {
            /** 分组节点用 `<li role="presentation">`，保持 `<ul>` 只直含 `<li>` 的语义 */
            return (
              <li
                key={itemKey}
                role="presentation"
                className={clsx(
                  `${baseClassName}-content-list-item-group`,
                  hashId,
                )}
                data-testid="pro-layout-apps-logo-content-list-item-group"
              >
                <div
                  className={clsx(
                    `${baseClassName}-content-list-item-group-title`,
                    hashId,
                  )}
                  data-testid="pro-layout-apps-logo-content-list-item-group-title"
                >
                  {app.title}
                </div>
                <DefaultContent
                  hashId={hashId}
                  itemClick={itemClick}
                  appList={app?.children}
                  baseClassName={baseClassName}
                />
              </li>
            );
          }
          const hasClick = !!itemClick;
          return (
            <li
              key={itemKey}
              className={clsx(`${baseClassName}-content-list-item`, hashId)}
              data-testid="pro-layout-apps-logo-content-list-item"
              onClick={(e) => {
                e.stopPropagation();
                itemClick?.(app);
              }}
            >
              <a
                href={hasClick ? undefined : app.url}
                target={hasClick ? undefined : app.target}
                role={hasClick ? 'button' : undefined}
                tabIndex={hasClick ? 0 : undefined}
                rel="noreferrer"
              >
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
  );
};
