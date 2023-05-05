import { useMountMergeState } from '@ant-design/pro-utils';
import { Col, ConfigProvider, Row } from 'antd';

import classNames from 'classnames';
import omit from 'omit.js';
import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useRef,
} from 'react';
import CheckCard from './index';

export type CheckCardValueType = string | number | boolean;

export type CheckGroupValueType =
  | CheckCardValueType[]
  | CheckCardValueType
  | undefined;

export interface CheckCardOptionType {
  /**
   * 标题展示
   *
   * @title 标题
   */
  title?: React.ReactNode;
  /**
   * 选项值
   *
   * @title 值
   */
  value: CheckCardValueType;
  /**
   * 描述展示
   *
   * @title 描述
   */
  description?: React.ReactNode;
  /**
   * 组件尺寸，支持大，中，小三种默认尺寸，用户可以自定义宽高
   *
   * @default default
   * @title 组件尺寸
   */
  size?: 'large' | 'default' | 'small';
  /**
   * 左侧头像展示，可以是一个链接也可以是是一个 ReactNode
   *
   * @title 左侧头像区域
   */
  avatar?: React.ReactNode;
  /**
   * 图片封面默认，该模式下其他展示值被忽略
   *
   * @title 图片封面
   */
  cover?: React.ReactNode;
  /**
   * 不可用
   *
   * @default false
   * @title 不可用
   */
  disabled?: boolean;
  /** Change 回调 */
  onChange?: (checked: boolean) => void;
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
}> = ({ prefixCls }) => {
  const loadingBlockClass = `${prefixCls}-loading-block`;
  return (
    <div className={`${prefixCls}-loading-content`}>
      <Row gutter={8}>
        <Col span={22}>
          <div className={loadingBlockClass} />
        </Col>
      </Row>
      <Row gutter={8}>
        <Col span={8}>
          <div className={loadingBlockClass} />
        </Col>
        <Col span={14}>
          <div className={loadingBlockClass} />
        </Col>
      </Row>
      <Row gutter={8}>
        <Col span={6}>
          <div className={loadingBlockClass} />
        </Col>
        <Col span={16}>
          <div className={loadingBlockClass} />
        </Col>
      </Row>
      <Row gutter={8}>
        <Col span={13}>
          <div className={loadingBlockClass} />
        </Col>
        <Col span={9}>
          <div className={loadingBlockClass} />
        </Col>
      </Row>
      <Row gutter={8}>
        <Col span={4}>
          <div className={loadingBlockClass} />
        </Col>
        <Col span={3}>
          <div className={loadingBlockClass} />
        </Col>
        <Col span={14}>
          <div className={loadingBlockClass} />
        </Col>
      </Row>
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

export interface CheckCardGroupState {
  value: CheckGroupValueType;
  registeredValues: CheckCardValueType[];
}

export type CheckCardGroupConnextType = {
  toggleOption?: (option: CheckCardOptionType) => void;
  value?: any;
  disabled?: boolean;
  size?: any;
  loading?: any;
  bordered?: any;
  multiple?: any;
  registerValue?: (value: any) => void;
  cancelValue?: (value: any) => void;
};

export const CheckCardGroupConnext =
  createContext<CheckCardGroupConnextType | null>(null);

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
      return getOptions().map((option) => (
        <CheckCard
          key={option.value.toString()}
          disabled={option.disabled}
          size={option.size ?? props.size}
          value={option.value}
          checked={
            multiple
              ? (optionValue as CheckCardValueType[])?.includes(option.value)
              : (optionValue as CheckCardValueType) === option.value
          }
          onChange={option.onChange}
          title={option.title}
          avatar={option.avatar}
          description={option.description}
          cover={option.cover}
        />
      )) as React.ReactNode[];
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

  const classString = classNames(groupPrefixCls, className);

  return (
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
    </CheckCardGroupConnext.Provider>
  );
};

export default CheckCardGroup;
