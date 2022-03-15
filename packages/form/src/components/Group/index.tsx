import React, { useContext, useMemo } from 'react';
import { Space, ConfigProvider } from 'antd';
import { RightOutlined } from '@ant-design/icons';
import FieldContext from '../../FieldContext';
import type { GroupProps } from '../../interface';
import './index.less';
import { LabelIconTip, useMountMergeState } from '@ant-design/pro-utils';
import classNames from 'classnames';
import { useGridHelpers } from '../../helpers';

const Group: React.FC<GroupProps> = React.forwardRef((props, ref: any) => {
  const { groupProps, grid } = React.useContext(FieldContext);
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

  const { WrapperCol, WrapperRow } = useGridHelpers(props);

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
  const titleDom = titleRender ? titleRender(label, props) : label;
  const childrenDoms = useMemo(() => {
    return (
      <WrapperRow>
        <>
          {React.Children.toArray(children)
            .map((element, index) => {
              if (React.isValidElement(element) && element?.props?.hidden) {
                return null;
              }
              if (index === 0 && React.isValidElement(element) && autoFocus) {
                return React.cloneElement(element, {
                  ...(element.props as any),
                  autoFocus,
                });
              }
              return element;
            })
            .filter(Boolean)}
        </>
      </WrapperRow>
    );
  }, [WrapperRow, children, autoFocus]);

  const groupDom = useMemo(
    () => (
      <div
        className={classNames(className, {
          [`${className}-twoLine`]: labelLayout === 'twoLine',
        })}
        style={style}
        ref={ref}
      >
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
        {collapsible && collapsed ? null : grid ? (
          <>{childrenDoms}</>
        ) : (
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
            {childrenDoms}
          </Space>
        )}
      </div>
    ),
    [
      align,
      childrenDoms,
      className,
      collapsed,
      collapsible,
      direction,
      extra,
      grid,
      labelLayout,
      ref,
      setCollapsed,
      size,
      spaceProps,
      style,
      title,
      titleDom,
      titleStyle,
      tooltip,
    ],
  );

  return <WrapperCol>{groupDom}</WrapperCol>;
});

Group.displayName = 'ProForm-Group';

export default Group;
