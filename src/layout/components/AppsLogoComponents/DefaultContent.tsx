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
    <div className={clsx(`${baseClassName}-content`, hashId)}>
      <ul className={clsx(`${baseClassName}-content-list`, hashId)}>
        {appList?.map((app, index) => {
          if (app?.children?.length) {
            return (
              <div
                key={index}
                className={clsx(
                  `${baseClassName}-content-list-item-group`,
                  hashId,
                )}
              >
                <div
                  className={clsx(
                    `${baseClassName}-content-list-item-group-title`,
                    hashId,
                  )}
                >
                  {app.title}
                </div>
                <DefaultContent
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
              key={index}
              className={clsx(`${baseClassName}-content-list-item`, hashId)}
              onClick={(e) => {
                e.stopPropagation();
                itemClick?.(app);
              }}
            >
              <a
                href={itemClick ? undefined : app.url}
                target={app.target}
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
