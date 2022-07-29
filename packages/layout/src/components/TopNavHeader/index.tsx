import { useDebounceFn } from '@ant-design/pro-utils';
import { Avatar, ConfigProvider } from 'antd';
import classNames from 'classnames';
import ResizeObserver from 'rc-resize-observer';
import React, { useContext, useMemo, useRef, useState } from 'react';
import { AppsLogoComponents } from '../AppsLogoComponents';
import type { GlobalHeaderProps } from '../GlobalHeader';
import { BaseMenu } from '../SiderMenu/BaseMenu';
import type { PrivateSiderMenuProps, SiderMenuProps } from '../SiderMenu/SiderMenu';
import { renderLogoAndTitle } from '../SiderMenu/SiderMenu';
import { useStyle } from './style';

export type TopNavHeaderProps = SiderMenuProps & GlobalHeaderProps & PrivateSiderMenuProps;

/**
 * 抽离出来是为了防止 rightSize 经常改变导致菜单 render
 *
 * @param param0
 */
export const RightContent: React.FC<TopNavHeaderProps> = ({
  rightContentRender,
  prefixCls,
  avatarProps,
  actionsRender,
  headerContentRender,
  ...props
}) => {
  const [rightSize, setRightSize] = useState<number | string>('auto');

  const avatarDom = useMemo(() => {
    if (!avatarProps) return null;
    const { title, ...rest } = avatarProps;
    return [
      <Avatar size="large" {...rest} key="avatar" />,
      title ? (
        <span
          key="name"
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

    if (!doms && !avatarDom) return null;
    if (!Array.isArray(doms)) doms = [doms];
    return (
      <div className={`${prefixCls}-header-actions`}>
        {doms.filter(Boolean).map((dom, index) => {
          let hideHover = false;
          // 如果配置了 hideHover 就不展示 hover 效果了
          if (React.isValidElement(dom)) {
            hideHover = !!dom?.props?.['aria-hidden'];
          }
          return (
            <div
              // eslint-disable-next-line react/no-array-index-key
              key={index}
              className={classNames(`${prefixCls}-header-actions-item`, {
                [`${prefixCls}-header-actions-hover`]: !hideHover,
              })}
            >
              {dom}
            </div>
          );
        })}
        {avatarDom && (
          <span className={`${prefixCls}-header-actions-avatar`}>
            <div>{avatarDom}</div>
          </span>
        )}
      </div>
    );
  };
  /** 减少一下渲染的次数 */
  const setRightSizeDebounceFn = useDebounceFn(async (width: number) => {
    setRightSize(width);
  }, 160);

  return (
    <div
      className={`${prefixCls}-right-content`}
      style={{
        minWidth: rightSize,
        height: '100%',
      }}
    >
      <div
        style={{
          height: '100%',
        }}
      >
        <ResizeObserver
          onResize={({ width }: { width: number }) => {
            setRightSizeDebounceFn.run(width);
          }}
        >
          {(rightContentRender || rightActionsRender) && (
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                height: '100%',
                justifyContent: 'flex-end',
              }}
            >
              {(rightContentRender || rightActionsRender)({
                ...props,
                // 测试专用
                //@ts-ignore
                rightContentSize: rightSize,
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
    headerContentRender,
    layout,
    actionsRender,
  } = props;
  const { getPrefixCls } = useContext(ConfigProvider.ConfigContext);

  const prefixCls = `${props.prefixCls || getPrefixCls('pro')}-top-nav-header`;

  const { wrapSSR, hashId } = useStyle(prefixCls);
  const headerDom = renderLogoAndTitle(
    { ...props, collapsed: false },
    layout === 'mix' ? 'headerTitleRender' : undefined,
  );

  const contentDom = useMemo(() => {
    const defaultDom = (
      <BaseMenu
        theme="light"
        {...props}
        className={`${prefixCls}-base-menu`}
        {...props.menuProps}
        collapsed={false}
        menuRenderType="header"
        mode="horizontal"
      />
    );

    if (headerContentRender) {
      return headerContentRender(props, defaultDom);
    }
    return defaultDom;
  }, [headerContentRender, prefixCls, props]);

  return wrapSSR(
    <div
      className={classNames(prefixCls, hashId, propsClassName, {
        [`${prefixCls}-light`]: true,
      })}
      style={style}
    >
      <div
        ref={ref}
        className={classNames(`${prefixCls}-main`, {
          [`${prefixCls}-wide`]: contentWidth === 'Fixed',
        })}
      >
        {headerDom && (
          <div className={classNames(`${prefixCls}-main-left`)} onClick={onMenuHeaderClick}>
            <AppsLogoComponents {...props} />
            <div className={`${prefixCls}-logo`} key="logo" id="logo">
              {headerDom}
            </div>
          </div>
        )}
        <div style={{ flex: 1 }} className={`${prefixCls}-menu`}>
          {contentDom}
        </div>
        {(rightContentRender || actionsRender || props.avatarProps) && (
          <RightContent rightContentRender={rightContentRender} {...props} prefixCls={prefixCls} />
        )}
      </div>
    </div>,
  );
};

export { TopNavHeader };
