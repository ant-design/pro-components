import { RightOutlined } from '@ant-design/icons';
import { useControlledState } from '@rc-component/util';
import { ConfigProvider, Space } from 'antd';
import { clsx } from 'clsx';
import React, { useCallback, useContext, useMemo } from 'react';
import { LabelIconTip, useRefFunction } from '../../../../utils';
import FieldContext from '../../../FieldContext';
import { useGridHelpers } from '../../../helpers/grid';
import { ProFormGroupProps } from '../../../typing';
import { useStyle } from './style';

const Group: React.FC<ProFormGroupProps> = React.forwardRef(
  (props, ref: any) => {
    const { groupProps } = React.useContext(FieldContext);
    const {
      children,
      collapsible,
      defaultCollapsed,
      style,
      labelLayout,
      title = props.label,
      tooltip,
      align = 'start',
      direction,
      size = 32,
      titleStyle,
      titleRender,
      spaceProps,
      extra,
      autoFocus,
    } = {
      ...groupProps,
      ...props,
    };

    const [collapsed, setCollapsedInner] = useControlledState(
      () => defaultCollapsed || false,
      props.collapsed,
    );

    /**
     * 使用 useRefFunction 包装回调，确保引用稳定
     */
    const onCollapseCallback = useRefFunction((c: boolean) => {
      props.onCollapse?.(c);
    });

    /**
     * 使用 queueMicrotask 延迟回调调用，避免在渲染阶段调用外部回调导致的 React 警告
     * "Cannot update a component while rendering a different component"
     */
    const setCollapsed = useCallback(
      (updater: boolean | ((prev: boolean) => boolean)) => {
        setCollapsedInner((prev) => {
          const next =
            typeof updater === 'function'
              ? (updater as (p: boolean) => boolean)(prev)
              : updater;
          queueMicrotask(() => {
            onCollapseCallback(next);
          });
          return next;
        });
      },
      [onCollapseCallback],
    );
    const { getPrefixCls } = useContext(ConfigProvider.ConfigContext);

    const { ColWrapper, RowWrapper } = useGridHelpers(props);

    const className = getPrefixCls('pro-form-group');
    const { wrapSSR, hashId } = useStyle(className);

    const collapsibleButton = collapsible && (
      <RightOutlined
        style={{
          marginInlineEnd: 8,
        }}
        rotate={!collapsed ? 90 : undefined}
      />
    );

    const label = (
      <LabelIconTip
        label={
          collapsibleButton ? (
            <div>
              {collapsibleButton}
              {title}
            </div>
          ) : (
            title
          )
        }
        tooltip={tooltip}
      />
    );

    const Wrapper = useCallback(
      ({ children: dom }: { children: React.ReactNode }) => (
        <Space
          {...spaceProps}
          className={clsx(
            `${className}-container ${hashId}`,
            spaceProps?.className,
          )}
          size={size}
          align={align}
          orientation={direction}
          style={{
            rowGap: 0,
            ...spaceProps?.style,
          }}
        >
          {dom}
        </Space>
      ),
      [align, className, direction, hashId, size, spaceProps],
    );

    const titleDom = titleRender ? titleRender(label, props) : label;
    const [childrenDoms, hiddenDoms] = useMemo(() => {
      const hiddenChildren: React.ReactNode[] = [];
      const childrenList = React.Children.toArray(children).map(
        (element, index) => {
          if (React.isValidElement(element) && element?.props?.hidden) {
            hiddenChildren.push(element);
            return null;
          }
          if (index === 0 && React.isValidElement(element) && autoFocus) {
            return React.cloneElement(element, {
              ...(element.props as any),
              autoFocus,
            });
          }
          return element;
        },
      );

      return [
        <RowWrapper key="children" Wrapper={Wrapper}>
          {childrenList}
        </RowWrapper>,
        hiddenChildren.length > 0 ? (
          <div
            key="hidden"
            style={{
              display: 'none',
            }}
          >
            {hiddenChildren}
          </div>
        ) : null,
      ];
    }, [children, RowWrapper, Wrapper, autoFocus]);

    return wrapSSR(
      <ColWrapper>
        <div
          className={clsx(className, hashId, {
            [`${className}-twoLine`]: labelLayout === 'twoLine',
          })}
          style={style}
          ref={ref}
        >
          {hiddenDoms}
          {(title || tooltip || extra) && (
            <div
              role="button"
              tabIndex={0}
              className={clsx(`${className}-title`, hashId)}
              style={titleStyle}
              onClick={() => {
                setCollapsed(!collapsed);
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  setCollapsed(!collapsed);
                }
              }}
            >
              {extra ? (
                <div
                  style={{
                    display: 'flex',
                    width: '100%',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}
                >
                  {titleDom}
                  <span
                    role="presentation"
                    onClick={(e) => e.stopPropagation()}
                    onKeyDown={(e) => e.stopPropagation()}
                  >
                    {extra}
                  </span>
                </div>
              ) : (
                titleDom
              )}
            </div>
          )}
          <div
            style={{
              display: collapsible && collapsed ? 'none' : undefined,
            }}
          >
            {childrenDoms}
          </div>
        </div>
      </ColWrapper>,
    );
  },
);

Group.displayName = 'ProForm-Group';

export default Group;
