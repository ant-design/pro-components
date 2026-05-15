import { Popover } from 'antd';
import { clsx } from 'clsx';
import React, { useCallback, useMemo, useState } from 'react';
import { AppsLogo } from './AppsLogo';
import { DefaultContent } from './DefaultContent';
import { SimpleContent } from './SimpleContent';
import { useStyle } from './style';
import type { AppItemProps, AppListProps } from './types';

/**
 * 默认渲染 logo：string 当作图片 URL；函数就地调用；ReactNode 直接透出。
 */
export const defaultRenderLogo = (
  logo: React.ReactNode | (() => React.ReactNode),
): React.ReactNode => {
  if (typeof logo === 'string') {
    // 使用字面量字符串 "auto"，避免 TS 要求 img width 为 number 时的类型冲突
    return <img width="auto" height={22} src={logo} alt="logo" />;
  }
  if (typeof logo === 'function') {
    return logo();
  }
  return logo;
};

export type AppsLogoComponentsProps = {
  appList?: AppListProps;
  appListRender?: (
    props: AppListProps,
    defaultDom: React.ReactNode,
  ) => React.ReactNode;
  onItemClick?: (
    item: AppItemProps,
    popoverRef?: React.RefObject<HTMLSpanElement>,
  ) => void;
  prefixCls?: string;
};

/**
 * 相关品牌 icon 列表（九宫格按钮 + popover 面板）
 *
 * DOM 结构要点：
 * - 外层 `<span>` 同时作为 Popover 子节点（触发区）与 `popoverRef` 挂载点；
 * - `open` 受控于 `onOpenChange`，驱动 `&-icon-active` 与内部 svg 旋转态。
 */
export const AppsLogoComponents: React.FC<AppsLogoComponentsProps> = (
  props,
) => {
  const { appList, appListRender, prefixCls, onItemClick: itemClick } = props;
  const popoverRef = React.useRef<HTMLSpanElement>(null);
  const baseClassName = `${prefixCls}-layout-apps`;
  const { hashId } = useStyle(baseClassName);

  const [open, setOpen] = useState(false);

  /**
   * 把外部 `onItemClick(app, popoverRef)` 桥接成子组件需要的 `(app) => void`；
   * 用 useCallback 固定引用，`defaultDomContent` 的 useMemo 可以把它安全纳入依赖。
   */
  const handleItemClick = useCallback(
    (app: AppItemProps) => {
      itemClick?.(app, popoverRef);
    },
    [itemClick],
  );

  const defaultDomContent = useMemo(() => {
    const isSimple = appList?.some((app) => !app?.desc);
    const childItemClick = itemClick ? handleItemClick : undefined;
    if (isSimple) {
      return (
        <SimpleContent
          hashId={hashId}
          appList={appList}
          itemClick={childItemClick}
          baseClassName={`${baseClassName}-simple`}
        />
      );
    }
    return (
      <DefaultContent
        hashId={hashId}
        appList={appList}
        itemClick={childItemClick}
        baseClassName={`${baseClassName}-default`}
      />
    );
  }, [appList, baseClassName, hashId, itemClick, handleItemClick]);

  if (!props?.appList?.length) return null;

  const popoverContent = appListRender
    ? appListRender(props?.appList, defaultDomContent)
    : defaultDomContent;

  return (
    <Popover
      placement="bottomRight"
      trigger={['click']}
      zIndex={9999}
      arrow={false}
      open={open}
      onOpenChange={setOpen}
      classNames={{
        root: `${baseClassName}-popover ${hashId}`.trim(),
      }}
      content={popoverContent}
    >
      <span
        ref={popoverRef}
        onClick={(e) => e.stopPropagation()}
        className={clsx(`${baseClassName}-icon`, hashId, {
          [`${baseClassName}-icon-active`]: open,
        })}
        data-testid="pro-layout-apps-logo-icon"
      >
        <AppsLogo />
      </span>
    </Popover>
  );
};
