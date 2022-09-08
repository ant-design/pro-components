import { compareVersions } from '@ant-design/pro-utils';
import { Popover, version } from 'antd';
import classNames from 'classnames';
import React, { useMemo, useState } from 'react';
import { AppsLogo } from './AppsLogo';
import { DefaultContent } from './DefaultContent';
import { SimpleContent } from './SimpleContent';
import { useStyle } from './style/index';
import type { AppsLogoComponentsAppList } from './types';
export type { AppsLogoComponentsAppList };

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
    return <img src={logo} alt="logo" />;
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
  appList?: AppsLogoComponentsAppList;
  prefixCls?: string;
}> = (props) => {
  const { appList, prefixCls = 'ant-pro' } = props;
  const ref = React.useRef<HTMLDivElement>(null);
  const baseClassName = `${prefixCls}-layout-apps`;
  const { wrapSSR, hashId } = useStyle(baseClassName);

  const [open, setOpen] = useState(false);

  const popoverContent = useMemo(() => {
    const isSimple = appList?.some((app) => {
      return !app?.desc;
    });
    if (isSimple) {
      return (
        <SimpleContent
          hashId={hashId}
          appList={appList}
          baseClassName={`${baseClassName}-simple`}
        />
      );
    }
    return (
      <DefaultContent
        hashId={hashId}
        appList={appList}
        baseClassName={`${baseClassName}-default`}
      />
    );
  }, [appList, baseClassName, hashId]);

  if (!props?.appList?.length) return null;

  const popoverOpenProps = compareVersions(version, '4.23.0')
    ? {
        onOpenChange: setOpen,
      }
    : {
        onVisibleChange: () => setOpen,
      };

  return wrapSSR(
    <>
      <div ref={ref} />
      <Popover
        placement="bottomRight"
        trigger={['click']}
        zIndex={9999}
        arrowPointAtCenter
        {...popoverOpenProps}
        overlayClassName={`${baseClassName}-popover ${hashId}`}
        content={popoverContent}
        getPopupContainer={() => ref.current || document.body}
      >
        <span
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
