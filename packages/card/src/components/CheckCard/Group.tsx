import { useMountMergeState } from '@ant-design/pro-utils';
import { ConfigProvider, Skeleton } from 'antd';

import { RightOutlined } from '@ant-design/icons';
import { ProConfigProvider, proTheme } from '@ant-design/pro-provider';
import classNames from 'classnames';
import omit from 'omit.js';
import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
} from 'react';
import CheckCard from './index';
import { useStyle } from './style';

export type CheckCardValueType = string | number | boolean;

/**
 * Represents the possible value types for a CheckGroup.
 * It can be an array of CheckCardValueTypes, a single CheckCardValueType, or undefined.
 */
export type CheckGroupValueType =
  | CheckCardValueType[]
  | CheckCardValueType
  | undefined;

/**
 * Represents an option for a CheckCard component.
 */
export interface CheckCardOptionType {
  /**
   * The title to be displayed.
   *
   * @title Title
   */
  title?: React.ReactNode;

  /**
   * The value of the option.
   *
   * @title Value
   */
  value: CheckCardValueType;

  /**
   * The description to be displayed.
   *
   * @title Description
   */
  description?: React.ReactNode;

  /**
   * The size of the component. Supports three default sizes: 'large', 'default', 'small'.
   * Users can also customize the width and height.
   *
   * @default default
   * @title Component Size
   */
  size?: 'large' | 'default' | 'small';

  /**
   * The avatar to be displayed on the left side. Can be a link or a ReactNode.
   *
   * @title Left Avatar Area
   */
  avatar?: React.ReactNode;

  /**
   * The cover image. In this mode, other display values are ignored.
   *
   * @title Cover Image
   */
  cover?: React.ReactNode;

  /**
   * Specifies if the option is disabled.
   *
   * @default false
   * @title Disabled
   */
  disabled?: boolean;

  /**
   * Change callback function.
   *
   * @param checked - Indicates whether the option is checked or not.
   * @title Change Callback
   */
  onChange?: (checked: boolean) => void;

  /**
   * Child options.
   */
  children?: CheckCardOptionType[];
}

export interface AbstractCheckCardGroupProps {
  /** @ignore */
  prefixCls?: string;
  /** @ignore */
  className?: string;
  /** 指定可选项 */
  options?: (CheckCardOptionType | string)[];
  /** 整组失效 */
  disabled?: boolean;
  /** @ignore */
  style?: React.CSSProperties;
  /**
   * 组件尺寸，支持大，中，小三种默认尺寸，用户可以自定义宽高
   *
   * @default default
   */
  size?: 'large' | 'default' | 'small';

  /**
   * @acceptions CheckCard
   * @ignore
   */
  children?: React.ReactNode;
}

export const CardLoading: React.FC<{
  prefixCls: string;
  hashId: string;
}> = ({ prefixCls, hashId }) => {
  return (
    <div className={classNames(`${prefixCls}-loading-content`, hashId)}>
      <Skeleton loading active paragraph={{ rows: 4 }} title={false} />
    </div>
  );
};

export interface CheckCardGroupProps extends AbstractCheckCardGroupProps {
  /**
   * 是否多选
   *
   * @title 是否多选
   */
  multiple?: boolean;
  /**
   * 默认选中的选项
   *
   * @title 默认选中的选项
   */
  defaultValue?: CheckGroupValueType;
  /**
   * 指定选中的选项
   *
   * @title 指定选中的选项
   */
  value?: CheckGroupValueType;
  /**
   * 当卡片组内容还在加载中时，可以用 loading 展示一个占位
   *
   * @title 加载中
   */
  loading?: boolean;
  /**
   * 是否显示边框
   *
   * @title 显示边框
   */
  bordered?: boolean;
  /** 变化时回调函数 */
  onChange?: (checkedValue: CheckGroupValueType) => void;
}

/**
 * Represents the state of a CheckCardGroup component.
 */
export interface CheckCardGroupState {
  value: CheckGroupValueType;
  registeredValues: CheckCardValueType[];
}

/**
 * Represents the props for the CheckCardGroup component.
 */
export type CheckCardGroupConnextType = {
  /**
   * A function to toggle the selected option.
   * @param option - The option to toggle.
   */
  toggleOption?: (option: CheckCardOptionType) => void;

  /**
   * The currently selected value.
   */
  value?: any;

  /**
   * Specifies whether the component is disabled.
   */
  disabled?: boolean;

  /**
   * The size of the component.
   */
  size?: any;

  /**
   * Specifies whether the component is in a loading state.
   */
  loading?: any;

  /**
   * Specifies whether the component has a border.
   */
  bordered?: any;

  /**
   * Specifies whether multiple options can be selected.
   */
  multiple?: any;

  /**
   * A function to register a value.
   * @param value - The value to register.
   */
  registerValue?: (value: any) => void;

  /**
   * A function to cancel a value.
   * @param value - The value to cancel.
   */
  cancelValue?: (value: any) => void;
};

export const CheckCardGroupConnext =
  createContext<CheckCardGroupConnextType | null>(null);

/**
 * SubCheckCardGroup component.
 *
 * @component
 * @param {React.ReactNode} title - The title of the group.
 * @param {React.ReactNode} children - The content of the group.
 * @param {string} prefix - The prefix for CSS class names.
 * @returns {React.ReactNode} The rendered SubCheckCardGroup component.
 */
const SubCheckCardGroup: React.FC<{
  title: React.ReactNode;
  children: React.ReactNode;
  prefix: string;
}> = (props) => {
  const [collapse, setCollapse] = useState(false);
  const { hashId } = proTheme.useToken();
  const baseCls = `${props.prefix}-sub-check-card`;
  return (
    <div className={classNames(baseCls, hashId)}>
      <div
        className={classNames(`${baseCls}-title`, hashId)}
        onClick={() => {
          setCollapse(!collapse);
        }}
      >
        <RightOutlined
          style={{
            transform: `rotate(${collapse ? 90 : 0}deg)`,
            transition: 'transform 0.3s',
          }}
        />
        {props.title}
      </div>
      <div
        className={classNames(`${baseCls}-panel`, hashId, {
          [`${baseCls}-panel-collapse`]: collapse,
        })}
      >
        {props.children}
      </div>
    </div>
  );
};

const CheckCardGroup: React.FC<CheckCardGroupProps> = (props) => {
  const {
    prefixCls: customizePrefixCls,
    className,
    style,
    options = [],
    loading = false,
    multiple = false,
    bordered = true,
    onChange,
    ...restProps
  } = props;

  const antdContext = useContext(ConfigProvider.ConfigContext);

  const getOptions = useCallback(() => {
    return (options as CheckCardOptionType[])?.map((option) => {
      if (typeof option === 'string') {
        return {
          title: option,
          value: option,
        } as CheckCardOptionType;
      }
      return option;
    });
  }, [options]);

  const prefixCls = antdContext.getPrefixCls(
    'pro-checkcard',
    customizePrefixCls,
  );

  const { wrapSSR, hashId } = useStyle(prefixCls);
  const groupPrefixCls = `${prefixCls}-group`;

  const domProps = omit(restProps, [
    'children',
    'defaultValue',
    'value',
    'disabled',
    'size',
  ]);

  const [stateValue, setStateValue] = useMountMergeState<
    CheckCardValueType[] | CheckCardValueType | undefined
  >(props.defaultValue, {
    value: props.value,
    onChange: props.onChange,
  });

  const registerValueMap = useRef<Map<CheckCardValueType, any>>(new Map());

  const registerValue = (value: string) => {
    registerValueMap.current?.set(value, true);
  };

  const cancelValue = (value: string) => {
    registerValueMap.current?.delete(value);
  };

  const toggleOption = (option: CheckCardOptionType) => {
    if (!multiple) {
      let changeValue;

      changeValue = stateValue;
      // 单选模式
      if (changeValue === option.value) {
        changeValue = undefined;
      } else {
        changeValue = option.value;
      }
      setStateValue?.(changeValue);
    }

    if (multiple) {
      let changeValue = [];
      const stateValues = stateValue as CheckCardValueType[];
      const hasOption = stateValues?.includes(option.value);
      changeValue = [...(stateValues || [])];
      if (!hasOption) {
        changeValue.push(option.value);
      }
      if (hasOption) {
        changeValue = changeValue.filter(
          (itemValue) => itemValue !== option.value,
        );
      }
      const newOptions = getOptions();
      const newValue = changeValue
        ?.filter((val) => registerValueMap.current.has(val))
        ?.sort((a, b) => {
          const indexA = newOptions.findIndex((opt) => opt.value === a);
          const indexB = newOptions.findIndex((opt) => opt.value === b);
          return indexA - indexB;
        });

      setStateValue(newValue);
    }
  };

  const children = useMemo((): React.ReactNode => {
    if (loading) {
      return (
        new Array(
          options.length || React.Children.toArray(props.children).length || 1,
        )
          .fill(0)
          // eslint-disable-next-line react/no-array-index-key
          .map((_, index) => (
            <CheckCard key={index} loading />
          )) as React.ReactNode[]
      );
    }

    if (options && options.length > 0) {
      const optionValue = stateValue as
        | CheckCardValueType[]
        | CheckCardValueType;

      const renderOptions = (list: CheckCardOptionType[]) => {
        return list.map((option) => {
          if (option.children && option.children.length > 0) {
            return (
              <SubCheckCardGroup
                title={option.title}
                prefix={groupPrefixCls}
                key={option.value?.toString() || option.title?.toString()}
              >
                {renderOptions(option.children)}
              </SubCheckCardGroup>
            );
          }
          return (
            <CheckCard
              key={option.value.toString()}
              disabled={option.disabled}
              size={option.size ?? props.size}
              value={option.value}
              checked={
                multiple
                  ? (optionValue as CheckCardValueType[])?.includes(
                      option.value,
                    )
                  : (optionValue as CheckCardValueType) === option.value
              }
              onChange={option.onChange}
              title={option.title}
              avatar={option.avatar}
              description={option.description}
              cover={option.cover}
            />
          );
        }) as React.ReactNode[];
      };
      return renderOptions(getOptions()) as React.ReactNode[];
    }
    return props.children as React.ReactNode;
  }, [
    getOptions,
    loading,
    multiple,
    options,
    props.children,
    props.size,
    stateValue,
  ]);

  const classString = classNames(groupPrefixCls, className, hashId);

  return wrapSSR(
    <CheckCardGroupConnext.Provider
      value={{
        toggleOption,
        bordered,
        value: stateValue,
        disabled: props.disabled,
        size: props.size,
        loading: props.loading,
        multiple: props.multiple,
        // https://github.com/ant-design/ant-design/issues/16376
        registerValue,
        cancelValue,
      }}
    >
      <div className={classString} style={style} {...domProps}>
        {children}
      </div>
    </CheckCardGroupConnext.Provider>,
  );
};

export default (props: CheckCardGroupProps) => (
  <ProConfigProvider needDeps>
    <CheckCardGroup {...props} />
  </ProConfigProvider>
);
