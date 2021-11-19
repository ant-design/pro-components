import React, { useRef, useState, useMemo } from 'react';
import classNames from 'classnames';
import ResizeObserver from 'rc-resize-observer';
import type { SiderMenuProps, PrivateSiderMenuProps } from '../SiderMenu/SiderMenu';
import { defaultRenderLogoAndTitle, AppsLogoComponents } from '../SiderMenu/SiderMenu';
import './index.less';

import { BaseMenu } from '../SiderMenu/BaseMenu';
import type { GlobalHeaderProps } from '../GlobalHeader';
import { Avatar } from 'antd';

export type TopNavHeaderProps = SiderMenuProps & GlobalHeaderProps & PrivateSiderMenuProps;

/**
 * 抽离出来是为了防止 rightSize 经常改变导致菜单 render
 *
 * @param param0
 */
export const RightContent: React.FC<TopNavHeaderProps> = ({
  rightContentRender,
  actionsRender,
  avatarProps,
  prefixCls,
  ...props
}) => {
  const [rightSize, setRightSize] = useState<number | string>('auto');

  const avatarDom = useMemo(() => {
    if (!avatarProps) return null;
    const { title, ...rest } = avatarProps;
    return [
      <Avatar size="large" {...rest} />,
      title ? (
        <span
          style={{
            marginLeft: 8,
          }}
        >
          {title}
        </span>
      ) : undefined,
    ];
  }, [avatarProps]);

  const rightActionsRender = (restParams: any) => {
    let doms = actionsRender && actionsRender?.(restParams);

    if (!doms) return null;
    if (!Array.isArray(doms)) doms = [doms];
    const domLength = doms.length;
    return (
      <div className={`${prefixCls}-header-actions`}>
        {doms.map((dom, index) => (
          <span
            className={`${prefixCls}-header-actions-item`}
            style={{
              marginRight: index !== domLength ? 8 : undefined,
            }}
          >
            {dom}
          </span>
        ))}
        {avatarDom}
      </div>
    );
  };
  return (
    <div
      style={{
        minWidth: rightSize,
      }}
    >
      <div
        style={{
          paddingRight: 12,
        }}
      >
        <ResizeObserver
          onResize={({ width }: { width: number }) => {
            setRightSize(width);
          }}
        >
          {(rightContentRender || rightActionsRender) && (
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
              }}
            >
              {(rightContentRender || rightActionsRender)({
                ...props,
              })}
            </div>
          )}
        </ResizeObserver>
      </div>
    </div>
  );
};

const TopNavHeader: React.FC<TopNavHeaderProps> = (props) => {
  const ref = useRef(null);
  const {
    onMenuHeaderClick,
    contentWidth,
    rightContentRender,
    className: propsClassName,
    style,
    layout,
    actionsRender,
  } = props;
  const prefixCls = `${props.prefixCls || 'ant-pro'}-top-nav-header`;
  const headerDom = defaultRenderLogoAndTitle(
    { ...props, collapsed: false },
    layout === 'mix' ? 'headerTitleRender' : undefined,
  );

  const className = classNames(prefixCls, propsClassName, {
    light: true,
  });

  return (
    <div className={className} style={style}>
      <div ref={ref} className={`${prefixCls}-main ${contentWidth === 'Fixed' ? 'wide' : ''}`}>
        {headerDom && (
          <div className={`${prefixCls}-main-left`} onClick={onMenuHeaderClick}>
            {<AppsLogoComponents {...props} />}
            <div className={`${prefixCls}-logo`} key="logo" id="logo">
              {headerDom}
            </div>
          </div>
        )}
        <div style={{ flex: 1 }} className={`${prefixCls}-menu`}>
          <BaseMenu theme="light" {...props} {...props.menuProps} />
        </div>
        {(rightContentRender || actionsRender) && (
          <RightContent rightContentRender={rightContentRender} {...props} />
        )}
      </div>
    </div>
  );
};

export { TopNavHeader };
