import { useDebounceFn } from '@ant-design/pro-utils';
import { Avatar, ConfigProvider } from 'antd';

import classNames from 'classnames';
import ResizeObserver from 'rc-resize-observer';
import React, { useContext, useMemo, useState } from 'react';
import type { GlobalHeaderProps } from '.';
import { useStyle } from './rightContentStyle';
/**
 * 抽离出来是为了防止 rightSize 经常改变导致菜单 render
 *
 * @param param0
 */
export const ActionsContent: React.FC<GlobalHeaderProps> = ({
  rightContentRender,
  avatarProps,
  actionsRender,
  headerContentRender,
  ...props
}) => {
  const { getPrefixCls } = useContext(ConfigProvider.ConfigContext);
  const prefixCls = `${getPrefixCls()}-pro-global-header`;
  const { wrapSSR, hashId } = useStyle(prefixCls);

  const [rightSize, setRightSize] = useState<number | string>('auto');

  const avatarDom = useMemo(() => {
    if (!avatarProps) return null;
    const { title, render, ...rest } = avatarProps;
    const domList = [
      <Avatar {...rest} size={28} key="avatar" />,
      title ? (
        <span
          key="name"
          style={{
            marginInlineStart: 8,
          }}
        >
          {title}
        </span>
      ) : undefined,
    ];

    if (render) {
      return render(avatarProps, <div>{domList}</div>);
    }
    return <div>{domList}</div>;
  }, [avatarProps]);

  const rightActionsRender =
    actionsRender || avatarDom
      ? (restParams: any) => {
          let doms = actionsRender && actionsRender?.(restParams);

          if (!doms && !avatarDom) return null;
          if (!Array.isArray(doms)) doms = [doms];
          return wrapSSR(
            <div className={`${prefixCls}-header-actions ${hashId}`.trim()}>
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
                    className={classNames(
                      `${prefixCls}-header-actions-item ${hashId}`,
                      {
                        [`${prefixCls}-header-actions-hover`]: !hideHover,
                      },
                    )}
                  >
                    {dom}
                  </div>
                );
              })}
              {avatarDom && (
                <span
                  className={`${prefixCls}-header-actions-avatar ${hashId}`.trim()}
                >
                  {avatarDom}
                </span>
              )}
            </div>,
          );
        }
      : undefined;
  /** 减少一下渲染的次数 */
  const setRightSizeDebounceFn = useDebounceFn(async (width: number) => {
    setRightSize(width);
  }, 160);

  const contentRender = rightActionsRender || rightContentRender;
  return (
    <div
      className={`${prefixCls}-right-content ${hashId}`.trim()}
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
          {contentRender ? (
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                height: '100%',
                justifyContent: 'flex-end',
              }}
            >
              {contentRender({
                ...props,
                // 测试专用
                //@ts-ignore
                rightContentSize: rightSize,
              })}
            </div>
          ) : null}
        </ResizeObserver>
      </div>
    </div>
  );
};
