import { useMountMergeState } from '@ant-design/pro-utils';
import { Avatar, ConfigProvider } from 'antd';
import classNames from 'classnames';
import type { MouseEventHandler } from 'react';
import React, { useContext, useEffect, useMemo } from 'react';
import ProCardActions from '../Actions';
import type { CheckCardGroupProps } from './Group';
import CheckCardGroup, { CardLoading, CheckCardGroupConnext } from './Group';
import { useStyle } from './style';

/**
 * Props for the CheckCard component.
 */
interface CheckCardProps {
  /**
   * Custom prefix class.
   *
   * @ignore
   */
  prefixCls?: string;
  /**
   * Callback function for change event.
   *
   * @param checked - The checked state.
   */
  onChange?: (checked: boolean) => void;
  /**
   * Callback function for click event.
   *
   * @param event - The click event.
   */
  onClick?: (event: MouseEventHandler<HTMLDivElement> | undefined) => void;
  /**
   * Callback function for mouse enter event.
   *
   * @param event - The mouse enter event.
   */
  onMouseEnter?: MouseEventHandler<HTMLDivElement>;
  /**
   * Callback function for mouse leave event.
   *
   * @param event - The mouse leave event.
   */
  onMouseLeave?: (event: MouseEventHandler<HTMLDivElement> | undefined) => void;
  /**
   * Whether the card is initially checked.
   *
   * @default false
   * @title Default Checked
   */
  defaultChecked?: boolean;
  /**
   * Whether the card is checked.
   *
   * @default false
   * @title Checked
   */
  checked?: boolean;
  /**
   * Whether the card is disabled.
   *
   * @default false
   * @title Disabled
   */
  disabled?: boolean;
  /**
   * Custom style for the card.
   *
   * @ignore
   */
  style?: React.CSSProperties;
  /**
   * Custom class name for the card.
   *
   * @ignore
   */
  className?: string;
  /**
   * The avatar to display on the left side, can be a link or a ReactNode.
   *
   * @title Avatar
   */
  avatar?: React.ReactNode;
  /**
   * The title to display.
   *
   * @title Title
   */
  title?: React.ReactNode;
  /**
   * The subtitle to display.
   *
   * @title Subtitle
   */
  subTitle?: React.ReactNode;
  /**
   * The description to display.
   *
   * @title Description
   */
  description?: React.ReactNode;
  /**
   * The value of the card.
   *
   * @title Value
   */
  value?: any;
  /**
   * Whether the content is in loading state.
   *
   * @default false
   * @title Loading
   */
  loading?: boolean;
  /**
   * The cover image of the card. Other display values are ignored in this mode.
   *
   * @title Card Background Image
   */
  cover?: React.ReactNode;
  /**
   * The size of the component. Supports 'large', 'default', and 'small' sizes. Users can also customize the width and height.
   *
   * @default default
   * @title Checkbox Size
   */
  size?: 'large' | 'default' | 'small';
  /**
   * Whether to show the border.
   *
   * @default true
   * @title Show Border
   */
  bordered?: boolean;
  /**
   * The action area in the top right corner of the card.
   *
   * @title Actions
   */
  extra?: React.ReactNode;
  /**
   * The content of the card.
   */
  children?: React.ReactNode;
  /**
   * Custom style for the content area.
   */
  bodyStyle?: React.CSSProperties;
  /**
   * The action area in the bottom right corner.
   */
  actions?: React.ReactNode[];
  /**
   * Whether the card is in ghost mode.
   */
  ghost?: boolean;
}

export interface CheckCardState {
  checked: boolean;
}

const CheckCard: React.FC<CheckCardProps> & {
  Group: typeof CheckCardGroup;
} = (props) => {
  const [stateChecked, setStateChecked] = useMountMergeState<boolean>(
    props.defaultChecked || false,
    {
      value: props.checked,
      onChange: props.onChange,
    },
  );
  const checkCardGroup = useContext(CheckCardGroupConnext);
  const { getPrefixCls } = useContext(ConfigProvider.ConfigContext);

  const handleClick = (e: any) => {
    props?.onClick?.(e);
    const newChecked = !stateChecked;
    checkCardGroup?.toggleOption?.({ value: props.value });
    setStateChecked?.(newChecked);
  };

  // small => sm large => lg
  const getSizeCls = (size?: string) => {
    if (size === 'large') return 'lg';
    if (size === 'small') return 'sm';
    return '';
  };

  useEffect(() => {
    checkCardGroup?.registerValue?.(props.value);
    return () => checkCardGroup?.cancelValue?.(props.value);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.value]);

  const {
    prefixCls: customizePrefixCls,
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
  const prefixCls = getPrefixCls('pro-checkcard', customizePrefixCls);

  const { wrapSSR, hashId } = useStyle(prefixCls);

  /**
   * 头像自定义
   *
   * @param cls
   * @param coverDom
   * @returns
   */
  const renderCover = (cls: string, coverDom: string | React.ReactNode) => {
    return (
      <div className={classNames(`${cls}-cover`, hashId)}>
        {typeof coverDom === 'string' ? (
          <img src={coverDom} alt="checkcard" />
        ) : (
          coverDom
        )}
      </div>
    );
  };

  checkCardProps.checked = stateChecked;

  let multiple = false;

  if (checkCardGroup) {
    // 受组控制模式
    checkCardProps.disabled = props.disabled || checkCardGroup.disabled;
    checkCardProps.loading = props.loading || checkCardGroup.loading;
    checkCardProps.bordered = props.bordered || checkCardGroup.bordered;

    multiple = checkCardGroup.multiple;

    const isChecked = checkCardGroup.multiple
      ? checkCardGroup.value?.includes(props.value)
      : checkCardGroup.value === props.value;

    // loading时check为false
    checkCardProps.checked = checkCardProps.loading ? false : isChecked;
    checkCardProps.size = props.size || checkCardGroup.size;
  }

  const {
    disabled = false,
    size,
    loading: cardLoading,
    bordered = true,
    checked,
  } = checkCardProps;
  const sizeCls = getSizeCls(size);

  const classString = classNames(prefixCls, className, hashId, {
    [`${prefixCls}-loading`]: cardLoading,
    [`${prefixCls}-${sizeCls}`]: sizeCls,
    [`${prefixCls}-checked`]: checked,
    [`${prefixCls}-multiple`]: multiple,
    [`${prefixCls}-disabled`]: disabled,
    [`${prefixCls}-bordered`]: bordered,
    [`${prefixCls}-ghost`]: props.ghost,
  });

  const metaDom = useMemo(() => {
    if (cardLoading) {
      return <CardLoading prefixCls={prefixCls || ''} hashId={hashId} />;
    }

    if (cover) {
      return renderCover(prefixCls || '', cover);
    }

    const avatarDom = avatar ? (
      <div className={classNames(`${prefixCls}-avatar`, hashId)}>
        {typeof avatar === 'string' ? (
          <Avatar size={48} shape="square" src={avatar} />
        ) : (
          avatar
        )}
      </div>
    ) : null;

    const headerDom = (title ?? extra) != null && (
      <div className={classNames(`${prefixCls}-header`, hashId)}>
        <div className={classNames(`${prefixCls}-header-left`, hashId)}>
          <div
            className={classNames(`${prefixCls}-title`, hashId, {
              [`${prefixCls}-title-with-ellipsis`]: typeof title === 'string',
            })}
          >
            {title}
          </div>
          {props.subTitle ? (
            <div className={classNames(`${prefixCls}-subTitle`, hashId)}>
              {props.subTitle}
            </div>
          ) : null}
        </div>
        {extra && (
          <div className={classNames(`${prefixCls}-extra`, hashId)}>
            {extra}
          </div>
        )}
      </div>
    );

    const descriptionDom = description ? (
      <div className={classNames(`${prefixCls}-description`, hashId)}>
        {description}
      </div>
    ) : null;

    const metaClass = classNames(`${prefixCls}-content`, hashId, {
      [`${prefixCls}-avatar-header`]: avatarDom && headerDom && !descriptionDom,
    });

    return (
      <div className={metaClass}>
        {avatarDom}
        {headerDom || descriptionDom ? (
          <div className={classNames(`${prefixCls}-detail`, hashId)}>
            {headerDom}
            {descriptionDom}
          </div>
        ) : null}
      </div>
    );
  }, [
    avatar,
    cardLoading,
    cover,
    description,
    extra,
    hashId,
    prefixCls,
    props.subTitle,
    title,
  ]);

  return wrapSSR(
    <div
      className={classString}
      style={style}
      onClick={(e) => {
        if (!cardLoading && !disabled) {
          handleClick(e);
        }
      }}
      onMouseEnter={props.onMouseEnter}
    >
      {metaDom}
      {props.children ? (
        <div
          className={classNames(`${prefixCls}-body`, hashId)}
          style={props.bodyStyle}
        >
          {props.children}
        </div>
      ) : null}
      {props.actions ? (
        <ProCardActions actions={props.actions} prefixCls={prefixCls} />
      ) : null}
    </div>,
  );
};

CheckCard.Group = CheckCardGroup;

export type { CheckCardGroupProps, CheckCardProps };

export default CheckCard;
