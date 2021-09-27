import React from 'react';

import classNames from 'classnames';
import { ConfigProvider } from 'antd';
import * as PropTypes from 'prop-types';
import omit from 'lodash/omit';
import shallowEqual from 'shallowequal';
import CheckCard from './index';
import './index.less';

export type CheckCardValueType = string | number | boolean;

export type CheckGroupValueType = CheckCardValueType[] | CheckCardValueType | undefined;

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

export interface CheckCardGroupProps extends AbstractCheckCardGroupProps {
  /**
   * CheckCardGroup 下所有选项卡 的 name 属性
   *
   * @title name 属性
   */
  name?: string;
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

export interface CheckCardGroupContext {
  checkCardGroup: {
    toggleOption: (option: CheckCardOptionType) => void;
    value: any;
    disabled: boolean;
  };
}

class CheckCardGroup extends React.Component<CheckCardGroupProps, CheckCardGroupState> {
  static defaultProps = {
    options: [],
    multiple: false,
    loading: false,
    bordered: true,
  };

  static childContextTypes = {
    checkCardGroup: PropTypes.any,
  };

  static getDerivedStateFromProps(nextProps: CheckCardGroupProps) {
    if ('value' in nextProps) {
      return {
        value: nextProps.value || [],
      };
    }
    return null;
  }

  constructor(props: CheckCardGroupProps) {
    super(props);
    this.state = {
      value: props.value || props.defaultValue || (props.multiple ? [] : undefined),
      registeredValues: [],
    };
  }

  getChildContext() {
    return {
      checkCardGroup: {
        toggleOption: this.toggleOption,
        value: this.state.value,
        disabled: this.props.disabled,
        size: this.props.size,
        name: this.props.name,
        loading: this.props.loading,
        bordered: this.props.bordered,
        multiple: this.props.multiple,

        // https://github.com/ant-design/ant-design/issues/16376
        registerValue: this.registerValue,
        cancelValue: this.cancelValue,
      },
    };
  }

  shouldComponentUpdate(nextProps: CheckCardGroupProps, nextState: CheckCardGroupState) {
    return !shallowEqual(this.props, nextProps) || !shallowEqual(this.state, nextState);
  }

  registerValue = (value: string) => {
    this.setState(({ registeredValues }) => ({
      registeredValues: [...registeredValues, value],
    }));
  };

  cancelValue = (value: string) => {
    this.setState(({ registeredValues }) => ({
      registeredValues: registeredValues.filter((val) => val !== value),
    }));
  };

  getOptions() {
    const { options } = this.props;
    // https://github.com/Microsoft/TypeScript/issues/7960
    return (options as CheckCardOptionType[]).map((option) => {
      if (typeof option === 'string') {
        return {
          title: option,
          value: option,
        } as CheckCardOptionType;
      }
      return option;
    });
  }

  toggleOption = (option: CheckCardOptionType) => {
    const { registeredValues } = this.state;
    const { multiple } = this.props;
    let value;

    // 多选模式时
    if (multiple) {
      const stateValues = this.state.value as CheckCardValueType[];
      const optionIndex = stateValues.indexOf(option.value);
      value = [...stateValues];
      if (optionIndex === -1) {
        value.push(option.value);
      } else {
        value.splice(optionIndex, 1);
      }
    } else {
      value = this.state.value;
      // 单选模式
      if (value === option.value) {
        value = undefined;
      } else {
        value = option.value;
      }
    }

    if (!('value' in this.props)) {
      this.setState({ value });
    }
    const { onChange } = this.props;
    if (onChange) {
      if (multiple) {
        const options = this.getOptions();

        onChange(
          value && Array.isArray(value)
            ? value
                .filter((val) => registeredValues.indexOf(val) !== -1)
                .sort((a, b) => {
                  const indexA = options.findIndex((opt) => opt.value === a);
                  const indexB = options.findIndex((opt) => opt.value === b);
                  return indexA - indexB;
                })
            : [],
        );
      } else {
        onChange(value);
      }
    }
  };

  render() {
    const { props, state } = this;
    const {
      prefixCls: customizePrefixCls,
      className,
      style,
      options,
      loading,
      multiple,
      ...restProps
    } = props;

    const { getPrefixCls } = this.context;

    const prefixCls = getPrefixCls('pro-checkcard');

    const groupPrefixCls = `${prefixCls}-group`;

    const domProps = omit(restProps, [
      'children',
      'defaultValue',
      'value',
      'onChange',
      'disabled',
      'bordered',
      'size',
    ]);

    let { children } = props;

    if (loading) {
      children = <CheckCard loading />;
    } else if (options && options.length > 0) {
      const stateValue = state.value as CheckCardValueType[];
      children = this.getOptions().map((option) => (
        <CheckCard
          key={option.value.toString()}
          disabled={'disabled' in option ? option.disabled : props.disabled}
          size={'size' in option ? option.size : props.size}
          value={option.value}
          checked={
            multiple ? stateValue.indexOf(option.value) !== -1 : state.value === option.value
          }
          onChange={option.onChange}
          title={option.title}
          avatar={option.avatar}
          description={option.description}
          cover={option.cover}
        />
      ));
    }

    const classString = classNames(groupPrefixCls, className);
    return (
      <div className={classString} style={style} {...domProps}>
        {children}
      </div>
    );
  }
}

CheckCardGroup.contextType = ConfigProvider.ConfigContext;

export default CheckCardGroup;
