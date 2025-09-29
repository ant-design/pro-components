import { RightOutlined } from '@ant-design/icons';
import { ConfigProvider, Space } from 'antd';
import classNames from 'classnames';
import React, { useCallback, useContext, useMemo } from 'react';
import { LabelIconTip, useMountMergeState } from '../../../../utils';
import FieldContext from '../../../FieldContext';
import { useGridHelpers } from '../../../helpers/grid';
import type { ProFormGroupProps } from '../../../typing';
import { useStyle } from './style';

const Group: React.FC<
  ProFormGroupProps & {
    ref?: React.Ref<any>;
  }
> = ({ ref, ...props }) => {
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

  const [collapsed, setCollapsed] = useMountMergeState(() => defaultCollapsed || false, {
    value: props.collapsed,
    onChange: props.onCollapse,
  });
  const { getPrefixCls } = useContext(ConfigProvider.ConfigContext);

  const { ColWrapper, RowWrapper } = useGridHelpers(props);

  const className = getPrefixCls('pro-form-group');
  const { wrapSSR, hashId } = useStyle(className);

  const collapsibleButton = collapsible && (
    <RightOutlined
      rotate={!collapsed ? 90 : undefined}
      style={{
        marginInlineEnd: 8,
      }}
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
        align={align}
        className={classNames(`${className}-container ${hashId}`, spaceProps?.className)}
        direction={direction}
        size={size}
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
    const childrenList = React.Children.toArray(children).map((element, index) => {
      // @ts-ignore
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
    });

    return [
      <RowWrapper key="children" Wrapper={Wrapper}>
        {childrenList}
      </RowWrapper>,
      hiddenChildren.length > 0 ? (
        <div
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
        ref={ref}
        className={classNames(className, hashId, {
          [`${className}-twoLine`]: labelLayout === 'twoLine',
        })}
        style={style}
      >
        {hiddenDoms}
        {(title || tooltip || extra) && (
          <div
            className={`${className}-title ${hashId}`.trim()}
            style={titleStyle}
            onClick={() => {
              setCollapsed(!collapsed);
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
                <span onClick={(e) => e.stopPropagation()}>{extra}</span>
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
};

Group.displayName = 'ProForm-Group';

export default Group;
