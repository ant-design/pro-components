import './index.less';

import React, { useEffect, CSSProperties, useRef, useState, ReactNode, useCallback } from 'react';
import { Table, ConfigProvider, Card, Space, Typography, Empty, Tooltip } from 'antd';
import { useIntl, IntlType, ParamsType, ConfigProviderWarp } from '@ant-design/pro-provider';
import classNames from 'classnames';
import useMergeValue from 'use-merge-value';
import { stringify } from 'use-json-comparison';
import { ColumnsType, TablePaginationConfig, TableProps, ColumnType } from 'antd/es/table';
import { ColumnFilterItem } from 'antd/es/table/interface';
import { FormItemProps, FormProps, FormInstance } from 'antd/es/form';
import { TableCurrentDataSource, SorterResult } from 'antd/lib/table/interface';
import { ConfigConsumer, ConfigConsumerProps } from 'antd/lib/config-provider';
import {
  ProFieldEmptyText,
  ProFieldValueType,
  ProFieldValueEnumMap,
  ProFieldValueEnumObj,
} from '@ant-design/pro-field';
import { noteOnce } from 'rc-util/lib/warning';

import useFetchData, { UseFetchDataAction, RequestData } from './useFetchData';
import Container, { useCounter } from './container';
import Toolbar, { OptionConfig, ToolBarProps } from './component/toolBar';
import Alert from './component/alert';
import FormSearch, { SearchConfig, TableFormItem } from './form';
import get, {
  parsingText,
  parsingValueEnumToArray,
  checkUndefinedOrNull,
  useDeepCompareEffect,
  genColumnKey,
  removeObjectNull,
  ObjToMap,
  reduceWidth,
} from './component/util';
import defaultRenderText, { ProColumnsValueTypeFunction } from './defaultRender';
import { DensitySize } from './component/toolBar/DensityIcon';
import ErrorBoundary from './component/ErrorBoundary';

type TableRowSelection = TableProps<any>['rowSelection'];

/**
 * 操作类型
 */
export interface ActionType {
  reload: (resetPageIndex?: boolean) => void;
  reloadAndRest: () => void;
  fetchMore: () => void;
  reset: () => void;
  clearSelected: () => void;
}

export interface ColumnsState {
  show?: boolean;
  fixed?: 'right' | 'left' | undefined;
}

export interface ProColumnType<T = unknown>
  extends Omit<ColumnType<T>, 'render' | 'children' | 'title' | 'filters'>,
    Partial<Omit<FormItemProps, 'children'>> {
  index?: number;
  title?: ReactNode | ((config: ProColumnType<T>, type: ProTableTypes) => ReactNode);
  /**
   * 自定义 render
   */
  render?: (
    text: React.ReactNode,
    record: T,
    index: number,
    action: UseFetchDataAction<RequestData<T>>,
  ) => React.ReactNode | React.ReactNode[];

  /**
   * 自定义 render，但是需要返回 string
   */
  renderText?: (
    text: any,
    record: T,
    index: number,
    action: UseFetchDataAction<RequestData<T>>,
  ) => any;

  /**
   * 自定义搜索 form 的输入
   */
  renderFormItem?: (
    item: ProColumns<T>,
    config: {
      value?: any;
      onChange?: (value: any) => void;
      onSelect?: (value: any) => void;
      type: ProTableTypes;
      defaultRender: (newItem: ProColumns<any>) => JSX.Element | null;
    },
    form: FormInstance,
  ) => JSX.Element | false | null;

  /**
   * 搜索表单的 props
   */
  formItemProps?: { [prop: string]: any };

  /**
   * 搜索表单的默认值
   */
  initialValue?: any;

  /**
   * 是否缩略
   */
  ellipsis?: boolean;
  /**
   * 是否拷贝
   */
  copyable?: boolean;

  /**
   * 值的类型
   */
  valueType?: ProFieldValueType | ProColumnsValueTypeFunction<T>;

  /**
   * 值的枚举，如果存在枚举，Search 中会生成 select
   */
  valueEnum?: ProFieldValueEnumMap | ProFieldValueEnumObj;

  /**
   * 在查询表单中隐藏
   */
  hideInSearch?: boolean;

  /**
   * 在 table 中隐藏
   */
  hideInTable?: boolean;

  /**
   * 在新建表单中删除
   */
  hideInForm?: boolean;

  /**
   * 表头的筛选菜单项
   */
  filters?: boolean | ColumnFilterItem[];

  /**
   * form 的排序
   */
  order?: number;
}

export interface ProColumnGroupType<RecordType> extends ProColumnType<RecordType> {
  children: ProColumns<RecordType>;
}

export type ProColumns<T = {}> = ProColumnGroupType<T> | ProColumnType<T>;

// table 支持的变形，还未完全支持完毕
export type ProTableTypes = 'form' | 'list' | 'table' | 'cardList' | undefined;

export interface ProTableProps<T, U extends ParamsType>
  extends Omit<TableProps<T>, 'columns' | 'rowSelection'> {
  columns?: ProColumns<T>[];

  params?: U;

  columnsStateMap?: {
    [key: string]: ColumnsState;
  };

  onColumnsStateChange?: (map: { [key: string]: ColumnsState }) => void;

  onSizeChange?: (size: DensitySize) => void;

  /**
   * 渲染 table
   */
  tableRender?: (
    props: ProTableProps<T, U>,
    defaultDom: JSX.Element,
    /**
     * 各个区域的 dom
     */
    domList: {
      toolbar: JSX.Element | undefined;
      alert: JSX.Element | undefined;
      table: JSX.Element | undefined;
    },
  ) => React.ReactNode;

  tableExtraRender?: (props: ProTableProps<T, U>, dataSource: T[]) => React.ReactNode;

  /**
   * 一个获得 dataSource 的方法
   */
  request?: (
    params: U & {
      pageSize?: number;
      current?: number;
    },
    sort: {
      [key: string]: 'ascend' | 'descend';
    },
    filter: { [key: string]: React.ReactText[] },
  ) => Promise<RequestData<T>>;

  /**
   * 对数据进行一些处理
   */
  postData?: (data: any[]) => any[];
  /**
   * 默认的数据
   */
  defaultData?: T[];

  /**
   * 初始化的参数，可以操作 table
   */
  actionRef?: React.MutableRefObject<ActionType | undefined> | ((actionRef: ActionType) => void);

  /**
   * 操作自带的 form
   */
  formRef?: TableFormItem<T>['formRef'];
  /**
   * 渲染操作栏
   */
  toolBarRender?: ToolBarProps<T>['toolBarRender'] | false;

  /**
   * 数据加载完成后触发
   */
  onLoad?: (dataSource: T[]) => void;

  /**
   * 数据加载失败时触发
   */
  onRequestError?: (e: Error) => void;

  /**
   * 给封装的 table 的 className
   */
  tableClassName?: string;

  /**
   * 给封装的 table 的 style
   */
  tableStyle?: CSSProperties;

  /**
   * 左上角的 title
   */
  headerTitle?: React.ReactNode;

  /**
   * 默认的操作栏配置
   */
  options?: OptionConfig<T> | false;
  /**
   * 是否显示搜索表单
   */
  search?: boolean | SearchConfig;

  /**
   * type="form" 和 搜索表单 的 Form 配置
   * 基本配置与 antd Form 相同
   *  但是劫持了 form 的配置
   */
  form?: Omit<FormProps, 'form'>;
  /**
   * 如何格式化日期
   * 暂时只支持 moment
   * string 会格式化为 YYYY-DD-MM
   * number 代表时间戳
   */
  dateFormatter?: 'string' | 'number' | false;
  /**
   * 格式化搜索表单提交数据
   */
  beforeSearchSubmit?: (params: Partial<U>) => Partial<U>;
  /**
   * 自定义 table 的 alert
   * 设置或者返回false 即可关闭
   */
  tableAlertRender?:
    | ((props: {
        intl: IntlType;
        selectedRowKeys: (string | number)[];
        selectedRows: T[];
      }) => React.ReactNode)
    | false;
  /**
   * 自定义 table 的 alert 的操作
   * 设置或者返回false 即可关闭
   */
  tableAlertOptionRender?:
    | ((props: { intl: IntlType; onCleanSelected: () => void }) => React.ReactNode)
    | false;

  rowSelection?: TableProps<T>['rowSelection'] | false;

  style?: React.CSSProperties;

  /**
   * 支持 ProTable 的类型
   */
  type?: ProTableTypes;

  /**
   * 提交表单时触发
   */
  onSubmit?: (params: U) => void;

  /**
   * 重置表单时触发
   */
  onReset?: () => void;

  /**
   * 空值时显示
   */
  columnEmptyText?: ProFieldEmptyText;

  /**
   * 是否手动触发请求
   */
  manualRequest?: boolean;
}

const mergePagination = <T, U>(
  pagination: TablePaginationConfig | boolean | undefined = {},
  action: UseFetchDataAction<RequestData<T>>,
  intl: IntlType,
): TablePaginationConfig | false | undefined => {
  if (pagination === false) {
    return undefined;
  }
  let defaultPagination: TablePaginationConfig | {} = pagination || {};
  const { current, pageSize } = action;
  if (pagination === true) {
    defaultPagination = {};
  }
  return {
    showTotal: (all, range) =>
      `${intl.getMessage('pagination.total.range', '第')} ${range[0]}-${range[1]} ${intl.getMessage(
        'pagination.total.total',
        '条/总共',
      )} ${all} ${intl.getMessage('pagination.total.item', '条')}`,
    showSizeChanger: true,
    total: action.total,
    ...(defaultPagination as TablePaginationConfig),
    current,
    pageSize,
    onChange: (page: number, newPageSize?: number) => {
      // pageSize 改变之后就没必要切换页码
      if (newPageSize !== pageSize && current !== page) {
        action.setPageInfo({ pageSize: newPageSize, page });
      } else {
        if (newPageSize !== pageSize) {
          action.setPageInfo({ pageSize: newPageSize });
        }
        if (current !== page) {
          action.setPageInfo({ page });
        }
      }

      const { onChange } = pagination as TablePaginationConfig;
      if (onChange) {
        onChange(page, newPageSize || 20);
      }
    },
  };
};

interface ColumnRenderInterface<T> {
  item: ProColumns<T>;
  text: any;
  row: T;
  index: number;
  columnEmptyText?: ProFieldEmptyText;
  counter: ReturnType<typeof useCounter>;
}

/**
 * 生成 Ellipsis 的 tooltip
 * @param dom
 * @param item
 * @param text
 */
const genEllipsis = (dom: React.ReactNode, item: ProColumns<any>, text: string) => {
  if (!item.ellipsis) {
    return dom;
  }
  return (
    <Tooltip title={text}>
      <span>{dom}</span>
    </Tooltip>
  );
};

const genCopyable = (dom: React.ReactNode, item: ProColumns<any>) => {
  if (item.copyable || item.ellipsis) {
    return (
      <Typography.Paragraph
        style={{
          width: reduceWidth(item.width),
          margin: 0,
          padding: 0,
        }}
        copyable={item.copyable}
        ellipsis={item.ellipsis}
      >
        {dom}
      </Typography.Paragraph>
    );
  }
  return dom;
};

/**
 * 这个组件负责单元格的具体渲染
 * @param param0
 */
const columnRender = <T, U = any>({
  item,
  text,
  row,
  index,
  columnEmptyText,
  counter,
}: ColumnRenderInterface<T>): any => {
  const { action } = counter;
  const { renderText = (val: any) => val, valueEnum = {} } = item;
  if (!action.current) {
    return null;
  }

  const renderTextStr = renderText(
    parsingText(text, ObjToMap(valueEnum)),
    row,
    index,
    action.current,
  );
  const textDom = defaultRenderText<T, {}>(
    renderTextStr,
    item.valueType || 'text',
    index,
    row,
    columnEmptyText,
  );

  const dom: React.ReactNode = genEllipsis(
    genCopyable(textDom, item),
    item,
    renderText(parsingText(text, ObjToMap(valueEnum), true), row, index, action.current),
  );

  if (item.render) {
    const renderDom = item.render(dom, row, index, action.current);

    // 如果是合并单元格的，直接返回对象
    if (
      renderDom &&
      typeof renderDom === 'object' &&
      (renderDom as { props: { colSpan: number } }).props &&
      (renderDom as { props: { colSpan: number } }).props.colSpan
    ) {
      return renderDom;
    }

    if (renderDom && item.valueType === 'option' && Array.isArray(renderDom)) {
      return <Space>{renderDom}</Space>;
    }
    return renderDom as React.ReactNode;
  }
  return checkUndefinedOrNull(dom) ? dom : null;
};

/**
 * 转化 columns 到 pro 的格式
 * 主要是 render 方法的自行实现
 * @param columns
 * @param map
 * @param columnEmptyText
 */
const genColumnList = <T, U = {}>(
  columns: ProColumns<T>[],
  map: {
    [key: string]: ColumnsState;
  },
  counter: ReturnType<typeof useCounter>,
  columnEmptyText?: ProFieldEmptyText,
): (ColumnsType<T>[number] & { index?: number })[] =>
  (columns
    .map((item, columnsIndex) => {
      const { key, dataIndex, title, filters = [] } = item;
      const columnKey = genColumnKey(key, dataIndex, columnsIndex);
      const config = columnKey ? map[columnKey] || { fixed: item.fixed } : { fixed: item.fixed };
      const valueEnum = ObjToMap(item.valueEnum);
      const tempColumns = {
        onFilter: (value: string, record: T) => {
          let recordElement = get(record, item.dataIndex || '');
          if (typeof recordElement === 'number') {
            recordElement = recordElement.toString();
          }
          const itemValue = String(recordElement || '') as string;
          return String(itemValue) === String(value);
        },
        index: columnsIndex,
        ...item,
        title: title && typeof title === 'function' ? title(item, 'table') : title,
        valueEnum,
        filters:
          filters === true
            ? parsingValueEnumToArray(valueEnum).filter(
                (valueItem) => valueItem && valueItem.value !== 'all',
              )
            : filters,
        ellipsis: false,
        fixed: config.fixed,
        width: item.width || (item.fixed ? 200 : undefined),
        children: (item as ProColumnGroupType<T>).children
          ? genColumnList(
              (item as ProColumnGroupType<T>).children as ProColumns<T>[],
              map,
              counter,
              columnEmptyText,
            )
          : undefined,
        render: (text: any, row: T, index: number) =>
          columnRender<T>({ item, text, row, index, columnEmptyText, counter }),
      };
      if (!tempColumns.children || !tempColumns.children.length) {
        delete tempColumns.children;
      }
      if (!tempColumns.dataIndex) {
        delete tempColumns.dataIndex;
      }
      if (!tempColumns.filters || !tempColumns.filters.length) {
        delete tempColumns.filters;
      }
      return tempColumns;
    })
    .filter((item) => !item.hideInTable) as unknown) as ColumnsType<T>[number] &
    {
      index?: number;
    }[];

type PostDataType<T> = (data: T) => T;

/**
 * 一个转化的 pipeline 列表
 * @param data
 * @param pipeline
 */
const defaultPostData = <T, U>(data: T, pipeline: (PostDataType<T> | undefined)[]) => {
  if (pipeline.filter((item) => item).length < 1) {
    return data;
  }
  return pipeline.reduce((pre, postData) => {
    if (postData) {
      return postData(pre);
    }
    return pre;
  }, data);
};

const useActionType = <T, U = any>(
  actionRef: ProTableProps<T, any>['actionRef'],
  counter: ReturnType<typeof useCounter>,
  onCleanSelected: () => void,
) => {
  /**
   * 这里生成action的映射，保证 action 总是使用的最新
   * 只需要渲染一次即可
   */
  useEffect(() => {
    const userAction: ActionType = {
      reload: async (resetPageIndex?: boolean) => {
        const {
          action: { current },
        } = counter;
        if (!current) {
          return;
        }
        noteOnce(!!resetPageIndex, ' reload 的 resetPageIndex 将会失效，建议使用 reloadAndRest。');
        noteOnce(
          !!resetPageIndex,
          'reload resetPageIndex will remove and reloadAndRest is recommended.',
        );

        // 如果为 true，回到第一页
        if (resetPageIndex) {
          await current.resetPageIndex();
        }
        await current.reload();
      },
      reloadAndRest: async () => {
        const {
          action: { current },
        } = counter;
        if (!current) {
          return;
        }
        // reload 之后大概率会切换数据，清空一下选择。
        onCleanSelected();
        // 如果为 true，回到第一页
        await current.resetPageIndex();
        await current.reload();
      },
      fetchMore: async () => {
        const {
          action: { current },
        } = counter;
        if (!current) {
          return;
        }
        await current.fetchMore();
      },
      reset: () => {
        const {
          action: { current },
        } = counter;
        if (!current) {
          return;
        }
        current.reset();
      },
      clearSelected: () => onCleanSelected(),
    };
    if (actionRef && typeof actionRef === 'function') {
      actionRef(userAction);
    }
    if (actionRef && typeof actionRef !== 'function') {
      // eslint-disable-next-line no-param-reassign
      actionRef.current = userAction;
    }
  }, []);
};

/**
 * 🏆 Use Ant Design Table like a Pro!
 * 更快 更好 更方便
 * @param props
 */
const ProTable = <T extends {}, U extends ParamsType>(
  props: ProTableProps<T, U> & {
    defaultClassName: string;
  },
) => {
  const {
    request,
    className: propsClassName,
    params = {},
    defaultData = [],
    headerTitle,
    postData,
    pagination: propsPagination,
    actionRef,
    columns: propsColumns = [],
    toolBarRender,
    onLoad,
    onRequestError,
    style,
    tableStyle,
    tableClassName,
    columnsStateMap,
    onColumnsStateChange,
    options,
    search = true,
    rowSelection: propsRowSelection = false,
    beforeSearchSubmit = (searchParams: Partial<U>) => searchParams,
    tableAlertRender,
    defaultClassName,
    formRef,
    type = 'table',
    onReset = () => {},
    columnEmptyText = '-',
    manualRequest = false,
    ...rest
  } = props;

  const [selectedRowKeys, setSelectedRowKeys] = useMergeValue<React.ReactText[]>([], {
    value: propsRowSelection ? propsRowSelection.selectedRowKeys : undefined,
  });
  const [formSearch, setFormSearch] = useState<{}>(() => rest.form?.initialValues);
  const [selectedRows, setSelectedRows] = useState<T[]>([]);
  const [dataSource, setDataSource] = useState<T[]>([]);
  const [proFilter, setProFilter] = useState<{
    [key: string]: React.ReactText[];
  }>({});
  const [proSort, setProSort] = useState<{
    [key: string]: 'ascend' | 'descend';
  }>({});
  const rootRef = useRef<HTMLDivElement>(null);
  const fullScreen = useRef<() => void>();
  const intl = useIntl();

  /**
   * 需要初始化 不然默认可能报错
   * 这里取了 defaultCurrent 和 current
   * 为了保证不会重复刷新
   */
  const fetchPagination =
    typeof propsPagination === 'object'
      ? (propsPagination as TablePaginationConfig)
      : { defaultCurrent: 1, defaultPageSize: 20, pageSize: 20, current: 1 };

  const action = useFetchData(
    async ({ pageSize, current }) => {
      // 需要手动触发的首次请求
      const needManualFirstReq = manualRequest && !formSearch;

      if (!request || needManualFirstReq) {
        return {
          data: props.dataSource || [],
          success: true,
        } as RequestData<T>;
      }

      const actionParams = {
        current,
        pageSize,
        ...formSearch,
        ...params,
      };

      const response = await request((actionParams as unknown) as U, proSort, proFilter);
      const responseData = defaultPostData<T[], U>(response.data, [postData]);
      if (Array.isArray(response)) {
        return response;
      }
      const msgData = { ...response, data: responseData } as RequestData<T>;
      return msgData;
    },
    defaultData,
    {
      defaultCurrent: fetchPagination.current || fetchPagination.defaultCurrent,
      defaultPageSize: fetchPagination.pageSize || fetchPagination.defaultPageSize,
      onLoad,
      onRequestError,
      effects: [stringify(params), stringify(formSearch), stringify(proFilter), stringify(proSort)],
    },
  );

  useEffect(() => {
    fullScreen.current = () => {
      if (!rootRef.current || !document.fullscreenEnabled) {
        return;
      }
      if (document.fullscreenElement) {
        document.exitFullscreen();
      } else {
        rootRef.current.requestFullscreen();
      }
    };
  }, [rootRef.current]);

  action.fullScreen = fullScreen.current;

  const pagination = mergePagination<T, {}>(propsPagination, action, intl);

  const counter = Container.useContainer();

  const onCleanSelected = useCallback(() => {
    if (propsRowSelection && propsRowSelection.onChange) {
      propsRowSelection.onChange([], []);
    }
    setSelectedRowKeys([]);
    setSelectedRows([]);
  }, [setSelectedRowKeys, setSelectedRows]);

  /**
   * 绑定 action
   */
  useActionType(actionRef, counter, onCleanSelected);

  /**
   * 数据列表的更新
   */
  useEffect(() => {
    setDataSource(request ? (action.dataSource as T[]) : props.dataSource || []);
  }, [props.dataSource, action.dataSource]);

  /**
   *  保存一下 propsColumns
   *  生成 form 需要用
   */
  useDeepCompareEffect(() => {
    counter.setProColumns(propsColumns);
  }, [propsColumns]);

  counter.setAction(action);

  /**
   * Table Column 变化的时候更新一下，这个参数将会用于渲染
   */
  useDeepCompareEffect(() => {
    const tableColumn = genColumnList<T>(
      propsColumns,
      counter.columnsMap,
      counter,
      columnEmptyText,
    );
    if (tableColumn && tableColumn.length > 0) {
      counter.setColumns(tableColumn);
      // 重新生成key的字符串用于排序
      counter.setSortKeyColumns(
        tableColumn.map((item, index) => {
          const key =
            genColumnKey(item.key, (item as ProColumnType).dataIndex, index) || `${index}`;
          return `${key}_${item.index}`;
        }),
      );
    }
  }, [propsColumns]);

  /**
   * 这里主要是为了排序，为了保证更新及时，每次都重新计算
   */
  useDeepCompareEffect(() => {
    const keys = counter.sortKeyColumns.join(',');
    let tableColumn = genColumnList<T>(propsColumns, counter.columnsMap, counter, columnEmptyText);
    if (keys.length > 0) {
      // 用于可视化的排序
      tableColumn = tableColumn.sort((a, b) => {
        const { fixed: aFixed, index: aIndex } = a;
        const { fixed: bFixed, index: bIndex } = b;
        if (
          (aFixed === 'left' && bFixed !== 'left') ||
          (bFixed === 'right' && aFixed !== 'right')
        ) {
          return -2;
        }
        if (
          (bFixed === 'left' && aFixed !== 'left') ||
          (aFixed === 'right' && bFixed !== 'right')
        ) {
          return 2;
        }
        // 如果没有index，在 dataIndex 或者 key 不存在的时候他会报错
        const aKey = `${genColumnKey(a.key, (a as ProColumnType).dataIndex, aIndex)}_${aIndex}`;
        const bKey = `${genColumnKey(b.key, (b as ProColumnType).dataIndex, bIndex)}_${bIndex}`;
        return keys.indexOf(aKey) - keys.indexOf(bKey);
      });
    }
    if (tableColumn && tableColumn.length > 0) {
      counter.setColumns(tableColumn);
    }
  }, [counter.columnsMap, counter.sortKeyColumns.join('-')]);

  /**
   * 同步 Pagination，支持受控的 页码 和 pageSize
   */
  useDeepCompareEffect(() => {
    if (propsPagination && propsPagination.current && propsPagination.pageSize) {
      action.setPageInfo({
        pageSize: propsPagination.pageSize,
        page: propsPagination.current,
      });
    }
  }, [propsPagination]);

  // 映射 selectedRowKeys 与 selectedRow
  useEffect(() => {
    if (action.loading !== false || propsRowSelection === false) {
      return;
    }
    const tableKey = rest.rowKey;

    // dataSource maybe is a null
    // eg: api has 404 error
    const duplicateRemoveMap = new Map();
    if (Array.isArray(dataSource)) {
      // 根据当前选中和当前的所有数据计算选中的行
      // 因为防止翻页以后丢失，所有还增加了当前选择选中的
      const rows = [...dataSource, ...selectedRows].filter((item, index) => {
        let rowKey = tableKey;
        if (!tableKey) {
          return (selectedRowKeys as any).includes(index);
        }
        if (typeof tableKey === 'function') {
          rowKey = tableKey(item, index) as string;
        } else {
          rowKey = item[tableKey];
        }
        if (duplicateRemoveMap.has(rowKey)) {
          return false;
        }
        duplicateRemoveMap.set(rowKey, true);
        return (selectedRowKeys as any).includes(rowKey);
      });
      setSelectedRows(rows);
      return;
    }
    setSelectedRows([]);
  }, [selectedRowKeys.join('-'), action.loading, propsRowSelection === false]);

  const rowSelection: TableRowSelection = {
    selectedRowKeys,
    ...propsRowSelection,
    onChange: (keys, rows) => {
      if (propsRowSelection && propsRowSelection.onChange) {
        propsRowSelection.onChange(keys, rows);
      }
      setSelectedRowKeys([...keys]);
    },
  };

  useEffect(() => {
    counter.setTableSize(rest.size || 'middle');
  }, [rest.size]);

  if (counter.columns.length < 1) {
    return (
      <Card bordered={false} bodyStyle={{ padding: 50 }}>
        <Empty />
      </Card>
    );
  }

  const className = classNames(defaultClassName, propsClassName);
  const toolbarDom = toolBarRender !== false &&
    (options !== false || headerTitle || toolBarRender) && (
      // if options= false & headerTitle=== false, hide Toolbar
      <Toolbar<T>
        options={options}
        headerTitle={headerTitle}
        action={action}
        onSearch={(keyword) => {
          if (options && options.search) {
            const { name = 'keyword' } =
              options.search === true
                ? {
                    name: 'keyword',
                  }
                : options.search;
            setFormSearch({
              ...formSearch,
              [name]: keyword,
            });
          }
        }}
        selectedRows={selectedRows}
        selectedRowKeys={selectedRowKeys}
        toolBarRender={toolBarRender}
      />
    );

  const alertDom = propsRowSelection !== false && (
    <Alert<T>
      selectedRowKeys={selectedRowKeys}
      selectedRows={selectedRows}
      onCleanSelected={onCleanSelected}
      alertOptionRender={rest.tableAlertOptionRender}
      alertInfoRender={tableAlertRender}
    />
  );

  const tableDom = (
    <Table<T>
      {...rest}
      size={counter.tableSize}
      rowSelection={propsRowSelection === false ? undefined : rowSelection}
      className={tableClassName}
      style={tableStyle}
      columns={counter.columns.filter((item) => {
        // 删掉不应该显示的
        const { key, dataIndex } = item;
        const columnKey = genColumnKey(key, dataIndex);
        if (!columnKey) {
          return true;
        }
        const config = counter.columnsMap[columnKey];
        if (config && config.show === false) {
          return false;
        }
        return true;
      })}
      loading={action.loading || props.loading}
      dataSource={dataSource}
      pagination={pagination}
      onChange={(
        changePagination: TablePaginationConfig,
        filters: {
          [string: string]: React.ReactText[] | null;
        },
        sorter: SorterResult<T> | SorterResult<T>[],
        extra: TableCurrentDataSource<T>,
      ) => {
        if (rest.onChange) {
          rest.onChange(changePagination, filters, sorter, extra);
        }

        // 制造筛选的数据
        setProFilter(removeObjectNull(filters));

        // 制造一个排序的数据
        if (Array.isArray(sorter)) {
          const data = sorter.reduce<{
            [key: string]: any;
          }>((pre, value) => {
            if (!value.order) {
              return pre;
            }
            return {
              ...pre,
              [`${value.field}`]: value.order,
            };
          }, {});
          setProSort(data);
        } else if (sorter.order) {
          setProSort({ [`${sorter.field}`]: sorter.order });
        }
      }}
    />
  );
  /**
   * table 区域的 dom，为了方便 render
   */
  const tableAreaDom = (
    <>
      {toolbarDom}
      {alertDom}
      {tableDom}
    </>
  );

  const renderTable = () => {
    if (props.tableRender) {
      return props.tableRender(props, tableAreaDom, {
        toolbar: toolbarDom || undefined,
        alert: alertDom || undefined,
        table: tableDom || undefined,
      });
    }
    return tableAreaDom;
  };

  return (
    <ConfigProvider
      getPopupContainer={() => ((rootRef.current || document.body) as any) as HTMLElement}
    >
      <div className={className} id="ant-design-pro-table" style={style} ref={rootRef}>
        {(search || type === 'form') && (
          <FormSearch<U>
            {...rest}
            type={props.type}
            formRef={formRef}
            onSubmit={(value) => {
              if (type !== 'form') {
                const submitParams = {
                  ...value,
                  _timestamp: Date.now(),
                };
                setFormSearch(beforeSearchSubmit(submitParams));
                // back first page
                action.resetPageIndex();
              }

              if (props.onSubmit) {
                props.onSubmit(value);
              }
            }}
            onReset={() => {
              setFormSearch(beforeSearchSubmit({}));
              // back first page
              action.resetPageIndex();
              onReset();
            }}
            dateFormatter={rest.dateFormatter}
            search={search}
          />
        )}
        {/* 渲染一个额外的区域，用于一些自定义 */}
        {type !== 'form' && props.tableExtraRender && (
          <div className={`${className}-extra`}>{props.tableExtraRender(props, dataSource)}</div>
        )}
        {type !== 'form' && (
          <Card
            bordered={false}
            style={{
              height: '100%',
            }}
            bodyStyle={{
              padding: 0,
            }}
          >
            {renderTable()}
          </Card>
        )}
      </div>
    </ConfigProvider>
  );
};

/**
 * 🏆 Use Ant Design Table like a Pro!
 * 更快 更好 更方便
 * @param props
 */
const ProviderWarp = <T, U extends { [key: string]: any } = {}>(props: ProTableProps<T, U>) => (
  <Container.Provider initialState={props}>
    <ConfigConsumer>
      {({ getPrefixCls }: ConfigConsumerProps) => (
        <ConfigProviderWarp>
          <ErrorBoundary>
            <ProTable defaultClassName={getPrefixCls('pro-table')} {...props} />
          </ErrorBoundary>
        </ConfigProviderWarp>
      )}
    </ConfigConsumer>
  </Container.Provider>
);

export default ProviderWarp;
