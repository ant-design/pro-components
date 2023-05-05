import type { ImageProps } from 'antd';
import type { AnchorHTMLAttributes } from 'react';
import React from 'react';

/**
 * ProHelp 数据源子项内容类型。
 * 该类型定义了多种数据源子项内容类型，例如 h1、h2、link、text、image等。
 * 其中，link 和 inlineLink 属性都是链接类型的数据源子项内容，不同的是 inlineLink 是内联链接，而 link 是块级链接。
 *
 * @typedef {object} ProHelpDataSourceContentType
 * @property {string} h1 标题1类型的数据源子项内容。
 * @property {string} h2 标题2类型的数据源子项内容。
 * @property {{ children: string } & React.AnchorHTMLAttributes<HTMLAnchorElement>} link 链接类型的数据源子项内容。
 * @property {{ children: string } & React.AnchorHTMLAttributes<HTMLAnchorElement>} inlineLink 内联链接类型的数据源子项内容。
 * @property {string} text 文本类型的数据源子项内容。
 * @property {ImageProps} image 图片类型的数据源子项内容。
 */
type ProHelpDataSourceContentType = {
  /**
   * h1 标题1类型的数据源子项内容。
   */
  h1: string;
  /**
   * h2 标题1类型的数据源子项内容。
   */
  h2: string;
  /**
   * link 链接类型的数据源子项内容。
   */
  link: {
    children: string;
  } & AnchorHTMLAttributes<HTMLAnchorElement>;
  /**
   * 行内链接类型的数据源子项内容。
   */
  inlineLink: {
    children: string;
  } & AnchorHTMLAttributes<HTMLAnchorElement>;

  /**
   * navigation 类型链接，或切换菜单
   */
  navigationSwitch: {
    selectKey: string;
    children: string;
  };

  /**
   * text 文本类型的数据源子项内容。
   */
  text: string;

  /**
   * image 图片类型的数据源子项内容。
   */
  image: ImageProps;

  /**
   * markdown 类型的渲染，支持 基本的 markdown 语法
   * 会包在一个叫 inner-html 为 markdown 的 div 中
   */
  html: {
    className: string;
    children: string;
  };
};

/**
 * ProHelp 数据源子项内容类型的类型，可能的取值为 "h1"、"h2"、"link"、"inlineLink"、"text" 和 "image"。
 * @typedef {'h1' | 'h2' | 'link' | 'inlineLink' | 'text' | 'image'} ProHelpDataSourceChildrenType
 */
type ProHelpDataSourceChildrenType = Extract<
  keyof ProHelpDataSourceContentType,
  any
>;

/**
 * ProHelp 数据源子项内容属性类型。
 * @template ValueType 数据源项值的类型，默认为 'text'。
 * 该类型定义了一个名为 children 的对象属性，根据 valueType 属性的值来确定该属性对象的具体类型，
 * 如果 valueType 的类型是 ProHelpDataSourceChildrenType，
 * 则使用 ProHelpDataSourceContentType 中 ProHelpDataSourceChildrenType 所对应的属性类型；
 * 否则，使用 ProHelpDataSourceContentType 中 ValueType 所对应的属性类型。
 */
type ProHelpDataSourceContentProps<ValueTypeMap, ValueType> =
  ValueType extends ProHelpDataSourceChildrenType
    ? ProHelpDataSourceContentType[ValueType]
    : ValueType extends keyof ValueTypeMap
    ? ValueTypeMap[ValueType]
    : ProHelpDataSourceContentType[ProHelpDataSourceChildrenType];

/**
 * ProHelp 数据源子项类型。
 * @template ValueTypeMap 数据源项值的类型，默认为 'text'。
 * @property {(ValueType | ProHelpDataSourceChildrenType)} valueType 数据源子项值的类型，可以为指定的类型，也可以是自定义类型。
 * @property {ProHelpDataSourceContentProps<ValueType>} children 包含数据源子项内容的对象。
 */
export type ProHelpDataSourceChildren<
  ValueTypeMap = {
    text: string;
  },
> = {
  /**
   * 包含数据源子项内容的对象。
   * @template ValueType 数据源项值的类型，默认为 'text'。
   */
  valueType: ValueTypeMap extends Map<infer ValueType, any>
    ? ValueType
    : keyof ValueTypeMap | ProHelpDataSourceChildrenType;
  /**
   * 数据源子项值的类型。
   * @typedef {(ValueTypeMap | ProHelpDataSourceChildrenType)} ProHelpDataSourceChildrenType
   */
  children: ProHelpDataSourceContentProps<
    ValueTypeMap,
    keyof ValueTypeMap | ProHelpDataSourceChildrenType
  >;
};

/**
 * ProHelp 数据源类型。
 * @template ValueType 数据源项值的类型，默认为 'text'。
 * @property {string} key 数据源项的唯一标识。
 * @property {string} title 数据源项的标题。
 * @property children 包含子项的数组，每个子项包含一个唯一标识，标题以及子子项数组。
 */
export type ProHelpDataSource<ValueType = 'text'> = {
  /**
   * key 数据源项的唯一标识
   */
  key: string;
  /**
   * title 数据源项的标题。
   */
  title: string;

  /**
   * 在一页内加载所有的 children 内容
   */
  infiniteScrollFull?: boolean;
  /**
   * children 包含子项的数组，每个子项包含一个唯一标识，标题以及子子项数组。
   */
  children: {
    key: string;
    title: string;
    /**
     * 是否远程加载children
     */
    asyncLoad?: boolean;
    children?: ProHelpDataSourceChildren<ValueType>[];
  }[];
};

/**
 * 这段代码定义了一个名为 ProHelpProvide 的 React 上下文对象，并且指定了该上下文对象的初始值为 { dataSource: [] }。
 * 这个上下文对象中包含了一个名为 dataSource 的属性，该属性的值是一个数组，类型为 ProHelpDataSource<any>[]。
 * 该上下文对象通常用于在 React 组件树中共享数据，即可以通过在组件中使用 ProHelpProvide.Provider 包裹一组组件，
 * 将 dataSource 和 valueTypeMap 数据源传递给这些组件，这些组件即可从上下文中获取 dataSource 数据源，实现数据的共享和传递。
 */
export const ProHelpProvide = React.createContext<{
  /**
   * 帮助文档的数据源，包含一组帮助文档数据，每个数据包含标题和内容等信息。
   */
  dataSource: ProHelpDataSource<any>[];
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
  valueTypeMap: Map<
    string,
    (item: ProHelpDataSourceChildren<any>, index: number) => React.ReactNode
  >;
  /**
   * 加载数据源的函数,如果把数据源设置为 async load就可以使用这个功能。
   */
  onLoadContext?: (
    key: React.Key,
    context: ProHelpDataSource<any>['children'][number],
  ) => Promise<ProHelpDataSourceChildren<any>[]>;
}>({ dataSource: [], valueTypeMap: new Map() });
