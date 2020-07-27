import React, { ReactNode } from 'react';
import { ConfigConsumer, ConfigConsumerProps } from 'antd/lib/config-provider/context';
import { Spin, Tooltip } from 'antd';
import { QuestionCircleOutlined } from '@ant-design/icons';
import classNames from 'classnames';
import './style/index.less';

type ProCardType = React.FC<ProCardProps>;
type ProCardChildType = React.ReactElement<ProCardProps, ProCardType>;

export type ProCardProps = {
  /**
   * 类名
   */
  className?: string;
  /**
   * 样式属性
   */
  style?: React.CSSProperties;
  /**
   * 标题样式
   */
  headStyle?: React.CSSProperties;
  /**
   * 内容样式
   */
  bodyStyle?: React.CSSProperties;
  /**
   * 页头是否有分割线
   */
  headerBordered?: boolean;
  /**
   * 卡片标题
   */
  title?: React.ReactNode;
  /**
   * 标题说明
   */
  tip?: string;
  /**
   * 右上角自定义区域
   */
  extra?: React.ReactNode;
  /**
   * 布局，center 代表垂直居中
   */
  layout?: 'default' | 'center';
  /**
   * 加载中
   */
  loading?: boolean | ReactNode;
  /**
   * 栅格布局宽度，24 栅格，支持指定宽度或百分，需要支持响应式 colSpan={{ xs: 12, sm: 6 }}
   */
  colSpan?: number | string;
  /**
   * 栅格间距
   */
  gutter?: number | number[];
  /**
   * 拆分卡片方式
   */
  split?: 'vertical' | 'horizontal';
  /**
   * 是否有边框
   */
  bordered?: boolean;
};

/**
 * 根据条件返回 style，负责返回空对象
 * @param withStyle 是否符合条件
 * @param appendStyle 如果符合条件要返回的 style 属性
 */
const getStyle = (withStyle: boolean, appendStyle: React.CSSProperties) => {
  return withStyle ? appendStyle : {};
};

const ProCard: ProCardType = (props) => (
  <ConfigConsumer>
    {({ getPrefixCls }: ConfigConsumerProps) => {
      const prefixCls = getPrefixCls('pro-card');
      const {
        className,
        style,
        bodyStyle,
        headStyle,
        title,
        extra,
        tip,
        layout,
        loading,
        colSpan,
        gutter,
        split,
        headerBordered,
        bordered,
        children,
      } = props;

      const normalizedGutter = Array.isArray(gutter) ? gutter : [gutter, 0];

      // 判断是否套了卡片，如果套了的话将自身卡片内部内容的 padding 设置为0
      let containProCard;
      const childrenArray = React.Children.toArray(children) as ProCardChildType[];

      const childrenModified = childrenArray.map((element, index) => {
        if (element?.type?.displayName === 'ProCard') {
          containProCard = true;

          // 右侧空隙
          const gutterRightStyle = getStyle(
            normalizedGutter[0]! > 0 && index !== childrenArray.length - 1,
            {
              marginRight: normalizedGutter[0],
            },
          );
          // 下方空隙
          const gutterBottomStyle = getStyle(normalizedGutter[1]! > 0, {
            marginBottom: normalizedGutter[1],
          });

          return React.cloneElement(element, {
            className: classNames(element.props.className, {
              // 横纵切割
              [`${prefixCls}-split-vertical`]:
                split === 'vertical' && index !== childrenArray.length - 1,
              [`${prefixCls}-split-horizontal`]:
                split === 'horizontal' && index !== childrenArray.length - 1,
            }),
            style: {
              ...gutterRightStyle,
              ...gutterBottomStyle,
              // 被嵌套时进入布局模式，内部卡片 radius 设置为 0
              ...{
                borderRadius: 0,
              },
              ...element.props.style,
            },
          });
        }
        return element;
      });

      // 当 colSpan 为 30% 或 300px 时
      const colSpanStyle = getStyle(typeof colSpan === 'string' && /\d%|\dpx/i.test(colSpan), {
        flexBasis: colSpan,
        flexShrink: 0,
      });

      const cardStyle = {
        ...colSpanStyle,
        ...style,
      };

      const cardCls = classNames(`${prefixCls}`, className, {
        [`${prefixCls}-span-${colSpan}`]:
          typeof colSpan === 'number' && colSpan > 0 && colSpan <= 24,
        [`${prefixCls}-border`]: bordered,
        [`${prefixCls}-contain-card`]: containProCard,
      });

      const headerCls = classNames(`${prefixCls}-header`, {
        [`${prefixCls}-header-border`]: headerBordered,
      });

      const bodyCls = classNames(`${prefixCls}-body`, {
        [`${prefixCls}-body-center`]: layout === 'center' || loading,
        [`${prefixCls}-body-column`]: split === 'horizontal',
      });

      const loadingDOM = React.isValidElement(loading) ? loading : <Spin />;

      const tipDom = tip && (
        <Tooltip title={tip}>
          <QuestionCircleOutlined style={{ marginLeft: 8 }} />
        </Tooltip>
      );

      return (
        <div className={cardCls} style={cardStyle}>
          {(title || extra) && (
            <div className={headerCls} style={headStyle}>
              <div className={`${prefixCls}-title`}>
                {title}
                {tipDom}
              </div>
              <div className={`${prefixCls}-extra`}>{extra}</div>
            </div>
          )}
          <div className={bodyCls} style={bodyStyle}>
            {loading ? loadingDOM : childrenModified}
          </div>
        </div>
      );
    }}
  </ConfigConsumer>
);

ProCard.displayName = 'ProCard';

export default ProCard;
