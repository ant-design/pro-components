import React, { useCallback, useContext, useMemo } from 'react';
import { Space, ConfigProvider } from 'antd';
import { RightOutlined } from '@ant-design/icons';
import FieldContext from '../../FieldContext';
import type { GroupProps } from '../../interface';
import './index.less';
import { LabelIconTip, useMountMergeState } from '@ant-design/pro-utils';
import classNames from 'classnames';
import { useGridHelpers } from '../../helpers';

const Group: React.FC<GroupProps> = React.forwardRef((props, ref: any) => {
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

  const collapsibleButton = collapsible && (
    <RightOutlined
      style={{
        marginRight: 8,
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
    ({ children: dom }) => (
      <Space
        {...spaceProps}
        className={`${className}-container`}
        size={size}
        align={align}
        direction={direction}
        style={{
          rowGap: 0,
          ...spaceProps?.style,
        }}
      >
        {dom}
      </Space>
    ),
    [align, className, direction, size, spaceProps],
  );

  const titleDom = titleRender ? titleRender(label, props) : label;
  const [childrenDoms, hiddenDoms] = useMemo(() => {
    const hiddenChildren: React.ReactNode[] = [];
    const childrenList = React.Children.toArray(children).map((element, index) => {
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

  return (
    <ColWrapper>
      <div
        className={classNames(className, {
          [`${className}-twoLine`]: labelLayout === 'twoLine',
        })}
        style={style}
        ref={ref}
      >
        {hiddenDoms}
        {(title || tooltip || extra) && (
          <div
            className={`${className}-title`}
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
        {collapsible && collapsed ? null : childrenDoms}
      </div>
    </ColWrapper>
  );
});

Group.displayName = 'ProForm-Group';

export default Group;
