import React from 'react';
import type {
  ProHelpDataSource,
  ProHelpDataSourceChildren,
} from './HelpProvide';
import { ProHelpProvide } from './HelpProvide';
import { ProHelpSelect } from './Search';

export * from './ProHelpContentPanel';
export * from './ProHelpDrawer';
export * from './ProHelpModal';
export * from './ProHelpPanel';
export * from './ProHelpPopover';
export * from './RenderContentPanel';
export type { ProHelpDataSource, ProHelpDataSourceChildren };
export { ProHelpProvide, ProHelpSelect };

export type ProHelpProps<ValueType> = {
  /**
   * 帮助文档的数据源，包含一组帮助文档数据，每个数据包含标题和内容等信息。
   */
  dataSource: ProHelpDataSource<ValueType>[];
  /**
   * 帮助组件的子组件，用于渲染自定义的帮助内容。
   * 是一个键值对结构的集合，其中：
   * 键（key）为字符串类型；
   * 值（value）为一个函数类型，该函数接受两个参数：一个名为 item 的 ProHelpDataSourceChildren 类型的对象，表示一个 ProHelp 数据源子项的子项；
   * 一个名为 index 的数字类型参数，表示该子项在父级子项数组中的索引。
   * 该函数返回一个 ReactNode 类型的元素，用于表示该 ProHelp 数据源子项子项应该渲染的 UI 元素。
   * 这个 Map 的作用是将 ProHelp 数据源子项子项的 valueType 属性与对应的渲染函数进行映射，从而实现在渲染 ProHelp 数据源时动态地选择渲染方法。
   * 在实际使用时，我们可以通过判断子项的 valueType 属性，从 valueTypeMap 中取出对应的渲染函数，再将该子项和渲染函数作为参数传入 renderDataSourceItem 函数中即可。
   */
  valueTypeMap?: Map<
    string,
    (
      item: ProHelpDataSourceChildren<ValueType>,
      index: number,
    ) => React.ReactNode
  >;
  /**
   * 帮助组件的子组件，用于渲染自定义的帮助内容。
   */
  children?: React.ReactNode;

  /**
   * 加载数据源的函数,如果把数据源设置为 async load就可以使用这个功能。
   */
  onLoadContext?: (
    key: React.Key,
    context: ProHelpDataSource<ValueType>['children'][number],
  ) => Promise<ProHelpDataSourceChildren<ValueType>[]>;
};

export type ProHelpContentPanelProps = {
  /**
   * 控制当前选中的帮助文档
   */
  selectedKey: React.Key;
  className?: string;
  parentItem?: ProHelpDataSource<any>;

  onScroll?: (key?: string) => void;
};

export const ProHelp = <ValueTypeMap = { text: any },>({
  dataSource,
  valueTypeMap = new Map(),
  onLoadContext,
  ...props
}: ProHelpProps<ValueTypeMap>) => {
  return (
    <ProHelpProvide.Provider
      value={{ onLoadContext, dataSource, valueTypeMap }}
    >
      {props.children}
    </ProHelpProvide.Provider>
  );
};
