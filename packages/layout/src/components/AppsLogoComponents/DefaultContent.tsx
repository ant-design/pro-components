import React, { useContext } from 'react';
import { cx } from '../../emotion';
import { ProLayoutContext } from '../../ProLayoutContext';
import { appContentListCss, getAppContentLisItem } from './css';
import { defaultRenderLogo } from './index';
import type { AppsLogoComponentsAppList } from './types';

export const DefaultContent: React.FC<{
  appList?: AppsLogoComponentsAppList;
  prefixCls?: string;
}> = (props) => {
  const designToken = useContext(ProLayoutContext);
  const { appList, prefixCls = 'ant' } = props;
  return (
    <div className={`${prefixCls}-basicLayout-apps-content`}>
      <ul className={cx(`${prefixCls}-basicLayout-apps-content-list`, appContentListCss(false))}>
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
