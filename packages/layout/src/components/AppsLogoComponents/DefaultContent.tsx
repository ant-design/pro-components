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
          return (
            <li
              // eslint-disable-next-line react/no-array-index-key
              key={index}
              className={`${baseClassName}-content-list-item ${hashId}`}
            >
              <a href={app.url} target={app.target} rel="noreferrer">
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
