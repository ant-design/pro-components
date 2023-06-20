import React from 'react';
import { defaultRenderLogo } from './index';
import type { AppItemProps } from './types';

export const DefaultContent: React.FC<{
  appListRender?: AppItemProps[];
  itemClick?: (item: AppItemProps) => void;
  baseClassName: string;
  hashId?: string;
}> = (props) => {
  const { appListRender, baseClassName, hashId, itemClick } = props;
  return (
    <div className={`${baseClassName}-content ${hashId}`.trim()}>
      <ul className={`${baseClassName}-content-list ${hashId}`.trim()}>
        {appListRender?.map((app, index) => {
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
                <DefaultContent
                  hashId={hashId}
                  itemClick={itemClick}
                  appListRender={app?.children}
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
            >
              <a
                href={itemClick ? undefined : app.url}
                onClick={() => itemClick?.(app)}
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
