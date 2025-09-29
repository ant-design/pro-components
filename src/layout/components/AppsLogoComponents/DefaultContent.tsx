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
    <div className={`${baseClassName}-content ${hashId}`.trim()}>
      <ul className={`${baseClassName}-content-list ${hashId}`.trim()}>
        {appList?.map((app, index) => {
          if (app?.children?.length) {
            return (
              <div key={index} className={`${baseClassName}-content-list-item-group ${hashId}`.trim()}>
                <div className={`${baseClassName}-content-list-item-group-title ${hashId}`.trim()}>{app.title}</div>
                <DefaultContent
                  appList={app?.children}
                  baseClassName={baseClassName}
                  hashId={hashId}
                  itemClick={itemClick}
                />
              </div>
            );
          }
          return (
            <li
              key={index}
              className={`${baseClassName}-content-list-item ${hashId}`.trim()}
              onClick={(e) => {
                e.stopPropagation();
                itemClick?.(app);
              }}
            >
              <a href={itemClick ? undefined : app.url} rel="noreferrer" target={app.target}>
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
