import { ConfigProvider, Popover } from 'antd';
import React, { useContext, useMemo } from 'react';
import { cx } from '../../emotion';
import { ProLayoutContext } from '../../ProLayoutContext';
import { AppsLogo } from './AppsLogo';
import { appIconsCss, getAntdPopoverContentListCss } from './css';
import { DefaultContent } from './DefaultContent';
import { SimpleContent } from './SimpleContent';
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
  const designToken = useContext(ProLayoutContext);
  const { appList, prefixCls = 'ant' } = props;
  const antdContext = useContext(ConfigProvider.ConfigContext);
  const antdPreFixCls = antdContext.getPrefixCls();

  const popoverContent = useMemo(() => {
    const isSimple = appList?.some((app) => {
      return !app?.desc;
    });
    if (isSimple) {
      return <SimpleContent appList={appList} prefixCls={prefixCls} />;
    }
    return <DefaultContent appList={appList} prefixCls={prefixCls} />;
  }, [appList, prefixCls]);

  if (!props?.appList?.length) return null;

  return (
    <Popover
      placement="bottomRight"
      trigger={['click']}
      zIndex={9999}
      arrowPointAtCenter
      overlayClassName={cx(getAntdPopoverContentListCss(antdPreFixCls))}
      content={popoverContent}
    >
      <span
        onClick={(e) => {
          e.stopPropagation();
        }}
        className={cx(`${prefixCls}-basicLayout-apps-icon`, appIconsCss(designToken))}
      >
        <AppsLogo />
      </span>
    </Popover>
  );
};
