import { openVisibleCompatible } from '@ant-design/pro-utils';
import { Popover } from 'antd';
import classNames from 'classnames';
import React, {isValidElement, useMemo, useState} from 'react';
import { AppsLogo } from './AppsLogo';
import { DefaultContent } from './DefaultContent';
import { SimpleContent } from './SimpleContent';
import { useStyle } from './style/index';
import type { AppItemProps, AppListProps } from './types';

/**
 * 默认渲染logo的方式，如果是个string，用img。否则直接返回
 *
 * @param logo
 * @returns
 */
export const defaultRenderLogo = (
  logo: React.ReactNode | (() => React.ReactNode),
): React.ReactNode => {
  if (typeof logo === 'string') {
    return <img width="auto" height={22} src={logo} alt="logo" />;
  }
  if (typeof logo === 'function') {
    return logo();
  }
  return logo;
};

/**
 * 相关品牌额icon 列表。用于展示相关的品牌
 *
 * @param props
 * @returns
 */
export const AppsLogoComponents: React.FC<{
  appListRender?: AppListProps;
  onItemClick?: (
    item: AppItemProps,
    popoverRef?: React.RefObject<HTMLSpanElement>,
  ) => void;
  prefixCls?: string;
}> = (props) => {
  const { appListRender, prefixCls = 'ant-pro', onItemClick: itemClick } = props;
  const ref = React.useRef<HTMLDivElement>(null);
  const popoverRef = React.useRef<HTMLSpanElement>(null);
  const baseClassName = `${prefixCls}-layout-apps`;
  const { wrapSSR, hashId } = useStyle(baseClassName);

  const [open, setOpen] = useState(false);

  const cloneItemClick = (app: AppItemProps) => {
    itemClick?.(app, popoverRef);
  };

  const popoverContent = useMemo(() => {
    if (isValidElement(appListRender)) {
      return appListRender as React.ReactNode
    }
    const isSimple = appListRender?.some((app) => {
      return !app?.desc;
    });
    if (isSimple) {
      return (
          <SimpleContent
              hashId={hashId}
              appListRender={appListRender}
              itemClick={itemClick ? cloneItemClick : undefined}
              baseClassName={`${baseClassName}-simple`}
          />
      );
    }
    return (
        <DefaultContent
            hashId={hashId}
            appListRender={appListRender}
            itemClick={itemClick ? cloneItemClick : undefined}
            baseClassName={`${baseClassName}-default`}
        />
    );
  }, [appListRender, baseClassName, hashId]);

  if(!appListRender) return null;
  if(isValidElement(appListRender) && !appListRender) return null;
  if(Array.isArray(appListRender) && !appListRender.length) return null;

  const popoverOpenProps = openVisibleCompatible(
    undefined,
    (openChange: boolean) => setOpen(openChange),
  );

  return wrapSSR(
    <>
      <div
        ref={ref}
        onClick={(e) => {
          e.stopPropagation();
          e.preventDefault();
        }}
      />
      <Popover
        placement="bottomRight"
        trigger={['click']}
        zIndex={9999}
        arrow={false}
        {...popoverOpenProps}
        overlayClassName={`${baseClassName}-popover ${hashId}`.trim()}
        content={popoverContent}
        getPopupContainer={() => ref.current || document.body}
      >
        <span
          ref={popoverRef}
          onClick={(e) => {
            e.stopPropagation();
          }}
          className={classNames(`${baseClassName}-icon`, hashId, {
            [`${baseClassName}-icon-active`]: open,
          })}
        >
          <AppsLogo />
        </span>
      </Popover>
    </>,
  );
};
