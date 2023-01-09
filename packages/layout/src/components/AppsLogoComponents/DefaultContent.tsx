import React from 'react';
import { defaultRenderLogo } from './index';
import type { AppsLogoComponentsAppList } from './types';

export const DefaultContent: React.FC<{
  appList?: AppsLogoComponentsAppList;
  baseClassName: string;
  hashId?: string;
}> = (props) => {
  const { appList, baseClassName, hashId } = props;
  return (
    <div className={`${baseClassName}-content ${hashId}`}>
      <ul className={`${baseClassName}-content-list ${hashId}`}>
        {appList?.map((app, index) => {
          if (app?.children?.length) {
            return (
              <div className={`${baseClassName}-content-list-item-group ${hashId}`}>
                <div className={`${baseClassName}-content-list-item-group-title ${hashId}`}>
                  {app.title}
                </div>
                <DefaultContent
                  hashId={hashId}
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
              className={`${baseClassName}-content-list-item ${hashId}`}
            >
              <a
                href={app?.click ? 'javascript:;' : app.url}
                onClick={() => app?.click?.(app)}
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
