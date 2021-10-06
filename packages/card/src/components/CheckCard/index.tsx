import React, { Component, useContext } from 'react';
import classNames from 'classnames';
import { Avatar, Row, Col, ConfigProvider } from 'antd';
import CheckCardGroup from './Group';
import type { CheckCardGroupProps } from './Group';

import './index.less';

interface CheckCardProps {
  /**
   * 自定义前缀
   *
   * @ignore
   */
  prefixCls?: string;
  /** Change 回调 */
  onChange?: (checked: boolean) => void;
  /** Click 回调 */
  onClick?: (e: Event) => void;
  /** 鼠标进入时的回调 */
  onMouseEnter?: (event: MouseEvent) => void;
  /** 鼠标出来时的回调 */
  onMouseLeave?: (event: MouseEvent) => void;
  /**
   * 默认是否勾选
   *
   * @default false
   * @title 默认勾选
   */
  defaultChecked?: boolean;
  /**
   * 强制勾选
   *
   * @default false
   * @title 强制勾选
   */
  checked?: boolean;
  /**
   * 不可用
   *
   * @default false
   * @title 禁用
   */
  disabled?: boolean;
  /**
   * 选项卡样式
   *
   * @ignore
   */
  style?: React.CSSProperties;
  /**
   * 选项卡 className
   *
   * @ignore
   */
  className?: string;
  /** 选项卡名称，用于标识同一个选项卡组，类似checkbox的表单name */
  name?: string;
  /**
   * 左侧头像展示，可以是一个链接也可以是是一个 ReactNode
   *
   * @title 头像
   */
  avatar?: React.ReactNode;
  /**
   * 标题展示
   *
   * @title 标题
   */
  title?: React.ReactNode;
  /**
   * 描述展示
   *
   * @title 描述
   */
  description?: React.ReactNode;
  /**
   * 选项值
   *
   * @title 值
   */
  value?: any;
  /**
   * 内容是否在加载中
   *
   * @default false
   * @title 加载中
   */
  loading?: boolean;
  /**
   * 图片封面默认，该模式下其他展示值被忽略
   *
   * @title 卡片背景图片
   */
  cover?: React.ReactNode;
  /**
   * 组件尺寸，支持大，中，小三种默认尺寸，用户可以自定义宽高
   *
   * @default default
   * @title 选择框大小
   */
  size?: 'large' | 'default' | 'small' | undefined;
  /**
   * 是否显示边框
   *
   * @default true
   * @title 显示边框
   */
  bordered?: boolean;
  /**
   * 卡片右上角的操作区域
   *
   * @title 操作栏
   */
  extra?: React.ReactNode;
}

export interface CheckCardState {
  checked: boolean;
  hovered: boolean;
}

class CheckCard extends Component<CheckCardProps, CheckCardState> {
  static Group: typeof CheckCardGroup;

  constructor(props: CheckCardProps) {
    super(props);
    const checked = props.checked || props.defaultChecked || false;

    this.state = {
      checked,
      hovered: false,
    };
  }

  componentDidMount() {
    const { value } = this.props;
    const { checkCardGroup = {} } = this.context || {};
    if (checkCardGroup.registerValue) {
      checkCardGroup.registerValue(value);
    }
  }

  componentDidUpdate({ value: prevValue }: CheckCardProps) {
    const { value } = this.props;
    const { checkCardGroup = {} } = this.context || {};
    if (value !== prevValue && checkCardGroup.registerValue && checkCardGroup.cancelValue) {
      checkCardGroup.cancelValue(prevValue);
      checkCardGroup.registerValue(value);
    }
  }

  componentWillUnmount() {
    const { value } = this.props;
    const { checkCardGroup = {} } = this.context || {};
    if (checkCardGroup.cancelValue) {
      checkCardGroup.cancelValue(value);
    }
  }

  static getDerivedStateFromProps(nextProps: CheckCardProps) {
    if ('checked' in nextProps) {
      const { checked } = nextProps;
      return {
        checked,
      };
    }
    return null;
  }

  handleClick = (e: any) => {
    const { props, context } = this;
    const { value, onChange, onClick } = props;
    onClick?.(e);

    const { checked } = this.state;
    const newChecked = !checked;

    if (!('checked' in props)) {
      this.setState({
        checked: newChecked,
      });
    }

    const { checkCardGroup } = context;

    if (checkCardGroup) {
      checkCardGroup.toggleOption({ value });
    }

    if (onChange) onChange(newChecked);
  };

  // large => lg
  // small => sm
  getSizeCls = (size: string | undefined) => {
    if (size === 'large') return 'lg';
    if (size === 'small') return 'sm';
    return '';
  };

  renderLoading = (prefixCls: string) => {
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
          <Col span={15}>
            <div className={loadingBlockClass} />
          </Col>
        </Row>
        <Row gutter={8}>
          <Col span={6}>
            <div className={loadingBlockClass} />
          </Col>
          <Col span={18}>
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
          <Col span={16}>
            <div className={loadingBlockClass} />
          </Col>
        </Row>
      </div>
    );
  };

  renderCover = (prefixCls: string, cover: string | React.ReactNode) => {
    return (
      <div className={`${prefixCls}-cover`}>
        {typeof cover === 'string' ? <img src={cover} alt="checkcard" /> : cover}
      </div>
    );
  };

  render() {
    const { checked: stateChecked } = this.state;
    const { props, context } = this;
    const {
      prefixCls = '',
      className,
      avatar,
      title,
      description,
      cover,
      extra,
      style = {},
      ...others
    } = props;

    const checkCardProps: CheckCardProps = { ...others };

    const { checkCardGroup } = context;

    checkCardProps.checked = stateChecked;

    let multiple = false;

    if (checkCardGroup) {
      // 受组控制模式
      checkCardProps.name = checkCardGroup.name;
      checkCardProps.disabled = props.disabled || checkCardGroup.disabled;
      checkCardProps.loading = props.loading || checkCardGroup.loading;
      checkCardProps.bordered = props.bordered || checkCardGroup.bordered;

      multiple = checkCardGroup.multiple;

      // loading时check为false
      checkCardProps.checked =
        !checkCardProps.loading &&
        (checkCardGroup.multiple
          ? checkCardGroup.value.indexOf(props.value) !== -1
          : checkCardGroup.value === props.value);
      checkCardProps.size = props.size || checkCardGroup.size;
    }

    const {
      disabled = false,
      checked,
      size,
      loading: cardLoading,
      bordered = true,
    } = checkCardProps;

    const sizeCls = this.getSizeCls(size);

    const classString = classNames(prefixCls, className, {
      [`${prefixCls}-loading`]: cardLoading,
      [`${prefixCls}-${sizeCls}`]: sizeCls,
      [`${prefixCls}-checked`]: checked,
      [`${prefixCls}-multiple`]: multiple,
      [`${prefixCls}-disabled`]: disabled,
      [`${prefixCls}-bordered`]: bordered,
    });

    let metaDom = null;

    if (cardLoading) {
      metaDom = this.renderLoading(prefixCls);
    } else if (cover) {
      metaDom = this.renderCover(prefixCls, cover);
    } else {
      const avatarDom = avatar ? (
        <div className={`${prefixCls}-avatar`}>
          {typeof avatar === 'string' ? <Avatar size={48} shape="square" src={avatar} /> : avatar}
        </div>
      ) : null;

      const headerDom = (title || extra) && (
        <div className={`${prefixCls}-header`}>
          <div className={`${prefixCls}-title`}>{title}</div>
          {extra && <div className={`${prefixCls}-extra`}>{extra}</div>}
        </div>
      );

      const descriptionDom = description ? (
        <div className={`${prefixCls}-description`}>{description}</div>
      ) : null;

      const metaClass = classNames(`${prefixCls}-content`, {
        [`${prefixCls}-avatar-header`]: avatarDom && headerDom && !descriptionDom,
      });
      metaDom = (
        <div className={metaClass}>
          {avatarDom}
          <div className={`${prefixCls}-detail`}>
            {headerDom}
            {descriptionDom}
          </div>
        </div>
      );
    }

    return (
      <div
        className={classString}
        style={style}
        onClick={(e) => {
          if (!cardLoading && !disabled) {
            this.handleClick(e);
          }
        }}
      >
        {metaDom}
      </div>
    );
  }
}

const CheckCardWrap: React.FC<CheckCardProps> & {
  Group: typeof CheckCardGroup;
} = (props) => {
  const { prefixCls: customizePrefixCls, ...others } = props;
  const { getPrefixCls } = useContext(ConfigProvider.ConfigContext);
  const prefixCls = getPrefixCls('pro-checkcard', customizePrefixCls);

  return <CheckCard prefixCls={prefixCls} {...others} />;
};

CheckCardWrap.Group = CheckCardGroup;

export type { CheckCardGroupProps, CheckCardProps };

export default CheckCardWrap;
