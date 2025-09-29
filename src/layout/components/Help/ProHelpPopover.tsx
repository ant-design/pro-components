﻿import type { PopoverProps } from 'antd';
import { ConfigProvider, Popover } from 'antd';
import classNames from 'classnames';
import React, { useContext } from 'react';
import { ProProvider } from '../../../provider';
import { ProHelpContentPanel } from './ProHelpContentPanel';
import { useStyle } from './style';

export type ProHelpPopoverProps = Omit<PopoverProps, 'content'> & {
  /**
   * 悬浮提示文字的 CSS 类名
   */
  textClassName?: string;

  /**
   * Popover 内容的 content 的 CSS 类名
   */
  popoverContextClassName?: string;

  /**
   * 悬浮提示文字的 CSS 样式对象
   */
  textStyle?: React.CSSProperties;

  /**
   * 当前选中的帮助文档的 key 值
   */
  selectedKey: string;

  /**
   * 可选的悬浮提示 Popover 组件的 Props，用于自定义悬浮提示的样式和行为。
   * 该属性可以传递 Ant Design Popover 组件的 props，如位置、大小、触发方式等等
   * @see 注意，content 属性已经被从 PopoverProps 中删除，因为这个属性由 ProHelpPopover 内部控制。
   */
  popoverProps?: PopoverProps;
};

/**
 * 渲染一个弹出式提示框，其中显示了一个ProHelpContentPanel，展示帮助文案的详情
 * @param popoverProps 要传递给 Drawer 组件的属性。
 * @param props 要传递给 ProHelpPanel 组件的属性。
 */
export const ProHelpPopover: React.FC<ProHelpPopoverProps> = (props) => {
  const { getPrefixCls } = useContext(ConfigProvider.ConfigContext);
  const className = getPrefixCls('pro-help');
  const { hashId } = useContext(ProProvider);

  const { wrapSSR } = useStyle(className);
  return wrapSSR(
    <Popover
      content={
        <div className={classNames(`${className}-popover-content`, hashId, props.popoverContextClassName)}>
          <ProHelpContentPanel selectedKey={props.selectedKey} />
        </div>
      }
      styles={{
        body: {
          padding: 0,
        },
      }}
      {...props.popoverProps}
    >
      <span className={classNames(`${className}-popover-text`, hashId, props.textClassName)}>{props.children}</span>
    </Popover>,
  );
};
