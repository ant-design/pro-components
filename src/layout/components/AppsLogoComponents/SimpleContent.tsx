import { clsx } from 'clsx';
import React from 'react';
import { isUrl } from '../../../utils';
import type { AppItemProps, AppListProps } from './types';

/**
 * simple 模式 logo 渲染：
 * - 函数：就地调用，业务方完全自控；
 * - URL 字符串：渲染 `<img>`；
 * - 非 URL 字符串：当作"字符 chip"渲染（如首字母）；
 * - logo 为空但 title 是字符串：取 title 首字作 chip 占位；
 * - 其他 ReactNode：直接返回。
 *
 * 使用 className `${baseClassName}-avatar` 而不是 `id`，避免列表内多次渲染造成重复 id。
 */
export const renderLogo = (
  logo: React.ReactNode | (() => React.ReactNode),
  title: React.ReactNode,
  avatarClassName: string,
  hashId?: string,
): React.ReactNode => {
  if (logo && typeof logo === 'string' && isUrl(logo)) {
    return <img src={logo} alt="logo" />;
  }
  if (typeof logo === 'function') {
    return logo();
  }
  if (logo && typeof logo === 'string') {
    return (
      <div
        className={clsx(avatarClassName, hashId)}
        data-testid="pro-layout-apps-logo-avatar"
      >
        {logo}
      </div>
    );
  }
  if (!logo && title && typeof title === 'string') {
    return (
      <div
        className={clsx(avatarClassName, hashId)}
        data-testid="pro-layout-apps-logo-avatar"
      >
        {title.substring(0, 1)}
      </div>
    );
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
  const avatarClassName = `${baseClassName}-avatar`;
  return (
    <div
      className={clsx(`${baseClassName}-content`, hashId)}
      data-testid="pro-layout-apps-logo-simple-content"
    >
      <ul
        className={clsx(`${baseClassName}-content-list`, hashId)}
        data-testid="pro-layout-apps-logo-simple-content-list"
      >
        {appList?.map((app, index) => {
          const itemKey = (typeof app.title === 'string' && app.title) || index;
          if (app?.children?.length) {
            /**
             * 分组节点用 `<li role="presentation">`（而非 `<div>`），
             * 与父 `<ul>` 语义对齐；内部再嵌一层 `<ul>`（由递归渲染的 SimpleContent 产生）。
             */
            return (
              <li
                key={itemKey}
                role="presentation"
                className={clsx(
                  `${baseClassName}-content-list-item-group`,
                  hashId,
                )}
                data-testid="pro-layout-apps-logo-simple-content-list-item-group"
              >
                <div
                  className={clsx(
                    `${baseClassName}-content-list-item-group-title`,
                    hashId,
                  )}
                  data-testid="pro-layout-apps-logo-simple-content-list-item-group-title"
                >
                  {app.title}
                </div>
                <SimpleContent
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
              data-testid="pro-layout-apps-logo-simple-content-list-item"
              onClick={(e) => {
                e.stopPropagation();
                itemClick?.(app);
              }}
            >
              {/**
               * 有外部 onItemClick 时，使用 `role="button"` 的 <a>（不带 href），
               * 避免 `javascript:;` 反模式被 CSP 拦截；否则作为普通外链。
               */}
              <a
                href={hasClick ? undefined : app.url}
                target={hasClick ? undefined : app.target}
                role={hasClick ? 'button' : undefined}
                tabIndex={hasClick ? 0 : undefined}
                rel="noreferrer"
              >
                {renderLogo(app.icon, app.title, avatarClassName, hashId)}
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
