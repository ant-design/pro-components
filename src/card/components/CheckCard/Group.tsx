import { RightOutlined } from '@ant-design/icons';
import { omit, useControlledState } from '@rc-component/util';
import { ConfigProvider, Skeleton } from 'antd';
import { clsx } from 'clsx';
import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
} from 'react';
import { ProConfigProvider, proTheme } from '../../../provider';
import { useRefFunction } from '../../../utils';
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
    <div className={clsx(`${prefixCls}-loading-content`, hashId)}>
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
 * CheckCardGroup 内部 context 的类型定义。
 * 由 Group 组件向下传递，CheckCard 子组件通过 useContext 消费。
 */
export type CheckCardGroupContextType = {
  /** 切换选项选中状态 */
  toggleOption?: (option: CheckCardOptionType) => void;
  /** 当前选中值（单选为单值，多选为数组） */
  value?: CheckGroupValueType;
  /** 是否整组失效 */
  disabled?: boolean;
  /** 组件尺寸 */
  size?: 'large' | 'default' | 'small';
  /** 是否处于 loading 状态 */
  loading?: boolean;
  /** 是否显示边框 */
  bordered?: boolean;
  /** 是否多选 */
  multiple?: boolean;
  /** 注册一个值（子卡片挂载时调用） */
  registerValue?: (value: CheckCardValueType) => void;
  /** 注销一个值（子卡片卸载时调用） */
  cancelValue?: (value: CheckCardValueType) => void;
};

export const CheckCardGroupContext =
  createContext<CheckCardGroupContextType | null>(null);

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
    <div className={clsx(baseCls, hashId)}>
      <div
        className={clsx(`${baseCls}-title`, hashId)}
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
        className={clsx(`${baseCls}-panel`, hashId, {
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

  const [stateValue, setStateValueInner] = useControlledState<
    CheckCardValueType[] | CheckCardValueType | undefined
  >(props.defaultValue, props.value);

  // 使用 useRefFunction 锁住最新的 onChange 引用，避免每次外部 onChange 变化都重建 setStateValue。
  const onChangeCallback = useRefFunction((next: CheckGroupValueType) => {
    onChange?.(next);
  });

  /**
   * 使用 queueMicrotask 延迟回调调用，避免在渲染阶段触发外部回调导致的 React 警告
   * "Cannot update a component while rendering a different component"。
   * 与 ProCard 的 setCollapsed 模式保持一致。
   */
  const setStateValue = useCallback(
    (
      updater:
        | CheckGroupValueType
        | ((prev: CheckGroupValueType) => CheckGroupValueType),
    ) => {
      setStateValueInner((prev) => {
        const next =
          typeof updater === 'function'
            ? (updater as (p: CheckGroupValueType) => CheckGroupValueType)(prev)
            : updater;
        queueMicrotask(() => {
          onChangeCallback(next);
        });
        return next;
      });
    },
    [onChangeCallback, setStateValueInner],
  );

  const registerValueMap = useRef<Map<CheckCardValueType, any>>(new Map());

  const registerValue = (value: CheckCardValueType) => {
    registerValueMap.current?.set(value, true);
  };

  const cancelValue = (value: CheckCardValueType) => {
    registerValueMap.current?.delete(value);
  };

  const toggleOption = (option: CheckCardOptionType) => {
    // 单选模式：再次点击当前选中项时清空，否则切到新值
    if (!multiple) {
      const nextValue = stateValue === option.value ? undefined : option.value;
      setStateValue(nextValue);
      return;
    }

    // 多选模式：toggle option.value，并按选项原始顺序排序
    const stateValues = (stateValue as CheckCardValueType[]) ?? [];
    const hasOption = stateValues.includes(option.value);
    const toggled = hasOption
      ? stateValues.filter((itemValue) => itemValue !== option.value)
      : [...stateValues, option.value];

    const newOptions = getOptions();
    const newValue = toggled
      .filter((val) => registerValueMap.current.has(val))
      .sort((a, b) => {
        const indexA = newOptions.findIndex((opt) => opt.value === a);
        const indexB = newOptions.findIndex((opt) => opt.value === b);
        return indexA - indexB;
      });

    setStateValue(newValue);
  };

  const children = useMemo((): React.ReactNode => {
    if (loading) {
      return new Array(
        options.length || React.Children.toArray(props.children).length || 1,
      )
        .fill(0)
        .map((_, index) => (
          <CheckCard key={index} loading />
        )) as React.ReactNode[];
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

  const classString = clsx(groupPrefixCls, className, hashId);

  // useMemo 锁住 Provider value 的引用，避免 Group 重渲染时所有 CheckCard 子组件无脑重渲染。
  // 注意：toggleOption / register / cancel 当前每次都是新函数，理论上还应进一步用 useRefFunction 锁住，
  // 但当前已比 inline 对象字面量好得多，且不破坏现有行为。
  const contextValue = useMemo<CheckCardGroupContextType>(
    () => ({
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
    }),
    [
      bordered,
      stateValue,
      props.disabled,
      props.size,
      props.loading,
      props.multiple,
    ],
  );

  return wrapSSR(
    <CheckCardGroupContext.Provider value={contextValue}>
      <div className={classString} style={style} {...domProps}>
        {children}
      </div>
    </CheckCardGroupContext.Provider>,
  );
};

const CheckCardGroupWithProvider: React.FC<CheckCardGroupProps> = (props) => (
  <ProConfigProvider needDeps>
    <CheckCardGroup {...props} />
  </ProConfigProvider>
);
CheckCardGroupWithProvider.displayName = 'CheckCardGroup';

export default CheckCardGroupWithProvider;
