import React, { useRef, useState, useMemo, useContext } from 'react';
import ResizeObserver from 'rc-resize-observer';
import type { SiderMenuProps, PrivateSiderMenuProps } from '../SiderMenu/SiderMenu';
import { defaultRenderLogoAndTitle } from '../SiderMenu/SiderMenu';

import { BaseMenu } from '../SiderMenu/BaseMenu';
import type { GlobalHeaderProps } from '../GlobalHeader';
import { Avatar, ConfigProvider } from 'antd';
import { AppsLogoComponents } from '../AppsLogoComponents';
import { css, cx } from '@emotion/css';
import { useDebounceFn } from '@ant-design/pro-utils';

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

    if (!doms) return null;
    if (!Array.isArray(doms)) doms = [doms];
    const domLength = doms.length;
    return (
      <div
        className={cx(
          `${prefixCls}-header-actions`,
          css`
            display: flex;
          `,
        )}
      >
        {doms.map((dom, index) => (
          <span
            // eslint-disable-next-line react/no-array-index-key
            key={index}
            className={cx(
              `${prefixCls}-header-actions-item`,
              css`
                display: inline-flex;
                align-items: center;
                justify-content: center;
                padding: 6px;
                font-size: 16px;
                cursor: pointer;
              `,
            )}
            style={{
              marginRight: index !== domLength ? 8 : undefined,
            }}
          >
            {dom}
          </span>
        ))}
        <span
          className={cx(
            `${prefixCls}-header-actions-item`,
            css`
              display: inline-flex;
              align-items: center;
              justify-content: center;
            `,
          )}
        >
          {avatarDom}
        </span>
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
      }}
    >
      <div
        style={{
          paddingRight: 12,
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
    layout,
    actionsRender,
  } = props;
  const { getPrefixCls } = useContext(ConfigProvider.ConfigContext);
  const antdPreFix = getPrefixCls();

  const prefixCls = `${props.prefixCls || getPrefixCls('pro')}-top-nav-header`;

  const headerDom = defaultRenderLogoAndTitle(
    { ...props, collapsed: false },
    layout === 'mix' ? 'headerTitleRender' : undefined,
  );

  return (
    <div
      className={cx(
        prefixCls,
        propsClassName,
        {
          light: true,
        },
        css`
          position: relative;
          width: 100%;
          height: 100%;
          background: #fff;
          @supports (backdrop-filter: blur(20px) saturate(150%)) {
            background-color: rgba(240, 242, 245, 0.4);
            backdrop-filter: blur(20px) saturate(150%);
          }

          .${antdPreFix}-menu {
            background: transparent;
          }
          .anticon {
            color: inherit;
          }
        `,
      )}
      style={style}
    >
      <div
        ref={ref}
        className={cx(
          `${prefixCls}-main`,
          `${contentWidth === 'Fixed' ? 'wide' : ''}`,
          css`
            display: flex;
            height: 100%;
            padding-left: 16px;
          `,
        )}
      >
        {headerDom && (
          <div
            className={cx(
              `${prefixCls}-main-left`,
              css`
                display: flex;
                align-items: center;
                min-width: 192px;
                .${antdPreFix}-pro-basicLayout-apps-icon {
                  margin-right: 16px;
                }
              `,
            )}
            onClick={onMenuHeaderClick}
          >
            <AppsLogoComponents {...props} />
            <div
              className={cx(
                `${prefixCls}-logo`,
                css`
                  position: relative;
                  min-width: 165px;
                  height: 100%;
                  overflow: hidden;
                  a {
                    display: flex;
                    align-items: center;
                    min-height: 22px;
                    font-size: 22px;
                  }
                  img {
                    display: inline-block;
                    height: 32px;
                    vertical-align: middle;
                  }

                  h1 {
                    display: inline-block;
                    margin: 0 0 0 12px;
                    color: var(--ant-primary-color);
                    font-weight: 400;
                    font-size: 16px;
                    vertical-align: top;
                  }
                `,
              )}
              key="logo"
              id="logo"
            >
              {headerDom}
            </div>
          </div>
        )}
        <div
          style={{ flex: 1 }}
          className={cx(
            `${prefixCls}-menu`,
            css`
              min-width: 0;
              .${antdPreFix}-menu.${antdPreFix}-menu-horizontal {
                height: 100%;
                border: none;
              }
            `,
          )}
        >
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
