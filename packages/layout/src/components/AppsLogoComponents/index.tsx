import { Popover } from 'antd';
import React, { useMemo } from 'react';
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
  const baseClassName = `${prefixCls}-layout-apps`;
  const { wrapSSR } = useStyle(baseClassName);

  const popoverContent = useMemo(() => {
    const isSimple = appList?.some((app) => {
      return !app?.desc;
    });
    if (isSimple) {
      return <SimpleContent appList={appList} baseClassName={`${baseClassName}-simple`} />;
    }
    return <DefaultContent appList={appList} baseClassName={`${baseClassName}-default`} />;
  }, [appList, baseClassName]);

  if (!props?.appList?.length) return null;

  return wrapSSR(
    <Popover
      placement="bottomRight"
      trigger={['click']}
      zIndex={9999}
      arrowPointAtCenter
      overlayClassName={`${baseClassName}-popover`}
      content={popoverContent}
      getPopupContainer={() => document.querySelector('.ant-pro') || document.body}
    >
      <span
        onClick={(e) => {
          e.stopPropagation();
        }}
        className={`${baseClassName}-icon`}
      >
        <AppsLogo />
      </span>
    </Popover>,
  );
};
