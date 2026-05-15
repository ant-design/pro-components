import { EllipsisOutlined } from '@ant-design/icons';
import ResizeObserver from '@rc-component/resize-observer';
import { Avatar, ConfigProvider, Dropdown } from 'antd';
import { clsx } from 'clsx';
import React, { useContext, useMemo, useState } from 'react';
import type { GlobalHeaderProps } from '.';
import { useDebounceFn } from '../../../utils';
import { useStyle } from './rightContentStyle';

const MAX_VISIBLE_MOBILE_ACTIONS = 2;

export const ActionsContent: React.FC<GlobalHeaderProps> = ({
  avatarProps,
  actionsRender,
  headerContentRender: _headerContentRender,
  ...props
}) => {
  const { isMobile } = props;
  const { getPrefixCls } = useContext(ConfigProvider.ConfigContext);
  const prefixCls = `${getPrefixCls()}-pro-global-header`;
  const { hashId } = useStyle(prefixCls);

  const [rightSize, setRightSize] = useState<number | string>('auto');

  const avatarDom = useMemo(() => {
    if (!avatarProps) return null;
    const { title, render, ...rest } = avatarProps;
    const domList = [
      rest?.src || rest?.srcSet || rest.icon || rest.children ? (
        <Avatar {...rest} size={28} key="avatar" />
      ) : null,
      !isMobile && title ? (
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
      return render(avatarProps, <div>{domList}</div>, props);
    }
    return <div>{domList}</div>;
  }, [avatarProps, isMobile]);

  const rightActionsRender =
    actionsRender || avatarDom
      ? (restParams: any) => {
          const doms = actionsRender && actionsRender?.(restParams);

          if (!doms && !avatarDom) return null;
          if (!Array.isArray(doms))
            return (
              <div
                className={clsx(`${prefixCls}-header-actions`, hashId)}
                data-testid="pro-layout-global-header-actions"
              >
                {doms}
                {avatarDom && (
                  <span
                    className={clsx(
                      `${prefixCls}-header-actions-avatar`,
                      hashId,
                    )}
                    data-testid="pro-layout-global-header-actions-avatar"
                  >
                    {avatarDom}
                  </span>
                )}
              </div>
            );

          const validDoms = doms.filter(Boolean);
          const needCollapse =
            isMobile && validDoms.length > MAX_VISIBLE_MOBILE_ACTIONS;
          const visibleDoms = needCollapse
            ? validDoms.slice(0, MAX_VISIBLE_MOBILE_ACTIONS)
            : validDoms;
          const overflowDoms = needCollapse
            ? validDoms.slice(MAX_VISIBLE_MOBILE_ACTIONS)
            : [];

          return (
            <div
              className={clsx(`${prefixCls}-header-actions`, hashId)}
              data-testid="pro-layout-global-header-actions"
            >
              {visibleDoms.map((dom, index) => {
                let hideHover = false;
                if (React.isValidElement(dom)) {
                  hideHover = !!dom?.props?.['aria-hidden'];
                }
                return (
                  <div
                    key={index}
                    className={clsx(
                      `${prefixCls}-header-actions-item`,
                      hashId,
                      {
                        [`${prefixCls}-header-actions-hover`]: !hideHover,
                      },
                    )}
                    data-testid="pro-layout-global-header-actions-item"
                  >
                    {dom}
                  </div>
                );
              })}
              {overflowDoms.length > 0 && (
                <Dropdown
                  trigger={['click']}
                  menu={{
                    items: overflowDoms.map((dom, index) => ({
                      key: `overflow-${index}`,
                      label: dom,
                    })),
                  }}
                >
                  <div
                    className={clsx(
                      `${prefixCls}-header-actions-item`,
                      `${prefixCls}-header-actions-hover`,
                      hashId,
                    )}
                    data-testid="pro-layout-global-header-actions-more"
                  >
                    <EllipsisOutlined />
                  </div>
                </Dropdown>
              )}
              {avatarDom && (
                <span
                  className={clsx(`${prefixCls}-header-actions-avatar`, hashId)}
                  data-testid="pro-layout-global-header-actions-avatar"
                >
                  {avatarDom}
                </span>
              )}
            </div>
          );
        }
      : undefined;

  const setRightSizeDebounceFn = useDebounceFn(async (width: number) => {
    setRightSize(width);
  }, 160);

  const contentRender = rightActionsRender;
  return (
    <div
      className={clsx(`${prefixCls}-right-content`, hashId)}
      style={{
        minWidth: rightSize,
        height: '100%',
      }}
      data-testid="pro-layout-global-header-right-content"
    >
      {contentRender ? (
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
            {(ref) => (
              <div
                ref={ref}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  height: '100%',
                  justifyContent: 'flex-end',
                }}
              >
                {contentRender
                  ? contentRender({
                      ...props,
                      rightContentSize: rightSize,
                    })
                  : null}
              </div>
            )}
          </ResizeObserver>
        </div>
      ) : null}
    </div>
  );
};
