import React, {
  useEffect,
  useContext,
  CSSProperties,
  useRef,
  useState,
  useCallback,
  useMemo,
} from 'react';
import { Table, ConfigProvider, Card, Space, Empty } from 'antd';
import { useIntl, ParamsType, ConfigProviderWrap } from '@ant-design/pro-provider';
import classNames from 'classnames';
import get from 'rc-util/lib/utils/get';
import useMergedState from 'rc-util/lib/hooks/useMergedState';
import { stringify } from 'use-json-comparison';
import { ColumnsType, TablePaginationConfig, TableProps, ColumnType } from 'antd/lib/table';
import { FormItemProps, FormProps } from 'antd/lib/form';
import {
  TableCurrentDataSource,
  SorterResult,
  SortOrder,
  ColumnFilterItem,
} from 'antd/lib/table/interface';
import {
  ProFieldEmptyText,
  ProFieldValueType,
  proFieldParsingValueEnumToArray,
  ProFieldValueObjectType,
} from '@ant-design/pro-field';
import {
  useDeepCompareEffect,
  ProSchema,
  ProSchemaComponentTypes,
  LabelIconTip,
  omitUndefinedAndEmptyArr,
  ProCoreActionType,
  SearchTransformKeyFn,
  isNil,
  omitUndefined,
} from '@ant-design/pro-utils';
import { CardProps } from 'antd/lib/card';

import { ListToolBarProps } from './component/ListToolBar';

import useFetchData, { RequestData, UseFetchDataAction } from './useFetchData';
import Container, { useCounter, ColumnsState } from './container';
import Toolbar, { OptionConfig, ToolBarProps } from './component/ToolBar';
import Alert, { AlertRenderType } from './component/Alert';
import FormSearch, { SearchConfig, TableFormItem } from './Form';
import {
  genColumnKey,
  genCopyable,
  genEllipsis,
  mergePagination,
  useActionType,
  postDataPipeline,
} from './utils';

import defaultRenderText from './defaultRender';
import { DensitySize } from './component/ToolBar/DensityIcon';
import ErrorBoundary from './component/ErrorBoundary';

import './index.less';

type TableRowSelection = TableProps<any>['rowSelection'];

export type ExtraProColumnType<T> = Omit<
  ColumnType<T>,
  'render' | 'children' | 'title' | 'filters'
>;

export type ProColumnType<T = unknown> = ProSchema<
  T,
  ProFieldValueType | ProFieldValueObjectType,
  ExtraProColumnType<T> & {
    index?: number;

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
     * @deprecated use `search=false` instead
     * 在查询表单中隐藏
     */
    hideInSearch?: boolean;

    /**
     * 在查询表单中隐藏
     */
    search?:
      | false
      | {
          /**
           * @name 转化值的key, 一般用于事件区间的转化
           * @description transform: (value: any) => ({ startTime: value[0], endTime: value[1] }),
           */
          transform: SearchTransformKeyFn;
        };

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
    /**
     * 传给 Form.Item 的 props
     */
    formItemProps?: Partial<Omit<FormItemProps, 'children'>>;
  }
>;

export interface ProColumnGroupType<RecordType> extends ProColumnType<RecordType> {
  children: ProColumns<RecordType>[];
}

export type ProColumns<T = any> = ProColumnGroupType<T> | ProColumnType<T>;

export interface ProTableProps<T, U extends ParamsType>
  extends Omit<TableProps<T>, 'columns' | 'rowSelection'> {
  columns?: ProColumns<T>[];
  /**
   * @name  ListToolBar 的属性
   */
  toolbar?: ListToolBarProps;
  params?: U;

  columnsStateMap?: {
    [key: string]: ColumnsState;
  };

  onColumnsStateChange?: (map: { [key: string]: ColumnsState }) => void;

  onSizeChange?: (size: DensitySize) => void;

  /**
   * @name table 外面卡片的设置
   */
  cardProps?: CardProps;

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

  /**
   * 渲染 table 视图，用于定制 ProList，不推荐直接使用
   */
  tableViewRender?: (props: TableProps<T>) => JSX.Element | undefined;

  tableExtraRender?: (props: ProTableProps<T, U>, dataSource: T[]) => React.ReactNode;

  /**
   * 一个获得 dataSource 的方法
   */
  request?: (
    params: U & {
      pageSize?: number;
      current?: number;
      keyword?: string;
    },
    sort: {
      [key: string]: SortOrder;
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
  actionRef?:
    | React.MutableRefObject<ProCoreActionType | undefined>
    | ((actionRef: ProCoreActionType) => void);

  /**
   * 操作自带的 form
   */
  formRef?: TableFormItem<T, U>['formRef'];
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
  search?: false | SearchConfig;

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
  beforeSearchSubmit?: (params: Partial<U>) => any;
  /**
   * 自定义 table 的 alert
   * 设置或者返回false 即可关闭
   */
  tableAlertRender?: AlertRenderType<T>;
  /**
   * 自定义 table 的 alert 的操作
   * 设置或者返回false 即可关闭
   */
  tableAlertOptionRender?: AlertRenderType<T>;

  rowSelection?: TableProps<T>['rowSelection'] | false;

  style?: React.CSSProperties;

  /**
   * 支持 ProTable 的类型
   */
  type?: ProSchemaComponentTypes;

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

/**
 * 转化列的定义
 */
interface ColumnRenderInterface<T> {
  item: ProColumns<T>;
  text: any;
  row: T;
  index: number;
  columnEmptyText?: ProFieldEmptyText;
  type: ProSchemaComponentTypes;
  counter: ReturnType<typeof useCounter>;
}

/**
 * 这个组件负责单元格的具体渲染
 * @param param0
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const columnRender = <T, _U = any>({
  item,
  text,
  row,
  index,
  columnEmptyText,
  counter,
  type,
}: ColumnRenderInterface<T>): any => {
  const { action } = counter;
  const { renderText = (val: any) => val } = item;
  const renderTextStr = renderText(
    text,
    row,
    index,
    action.current as UseFetchDataAction<RequestData<any>>,
  );
  const textDom = defaultRenderText<T, {}>(
    renderTextStr,
    (item.valueType as ProFieldValueType) || 'text',
    index,
    row,
    columnEmptyText,
    item,
    type,
  );

  const dom: React.ReactNode = genEllipsis(
    genCopyable(textDom, item, renderTextStr),
    item,
    renderTextStr,
  );

  if (item.render) {
    const renderDom = item.render(
      dom,
      row,
      index,
      action.current as UseFetchDataAction<RequestData<any>>,
      item,
    );

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
      return <Space size={16}>{renderDom}</Space>;
    }
    return renderDom as React.ReactNode;
  }
  return !isNil(dom) ? dom : null;
};

/**
 * render 的 title
 * @param item
 */
const renderColumnsTitle = (item: ProColumns<any>) => {
  const { title } = item;
  if (title && typeof title === 'function') {
    return title(item, 'table', <LabelIconTip label={title} tooltip={item.tooltip || item.tip} />);
  }
  return <LabelIconTip label={title} tooltip={item.tooltip || item.tip} />;
};

const defaultOnFilter = (value: string, record: any, dataIndex: string | string[]) => {
  const recordElement = Array.isArray(dataIndex)
    ? get(record, dataIndex as string[])
    : record[dataIndex];
  const itemValue = String(recordElement) as string;

  return String(itemValue) === String(value);
};

/**
 * 转化 columns 到 pro 的格式
 * 主要是 render 方法的自行实现
 * @param columns
 * @param map
 * @param columnEmptyText
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const genColumnList = <T, _U = {}>(
  columns: ProColumns<T>[],
  map: {
    [key: string]: ColumnsState;
  },
  counter: ReturnType<typeof useCounter>,
  columnEmptyText: ProFieldEmptyText,
  type: ProSchemaComponentTypes,
): (ColumnsType<T>[number] & { index?: number })[] => {
  return (columns
    .map((item, columnsIndex) => {
      const { key, dataIndex, valueEnum, valueType, filters = [] } = item;
      const columnKey = genColumnKey(key, columnsIndex);
      const noNeedPro = !dataIndex && !valueEnum && !valueType;
      if (noNeedPro) {
        return item;
      }
      const { propsRef } = counter;
      const config = columnKey ? map[columnKey] || { fixed: item.fixed } : { fixed: item.fixed };
      const tempColumns = {
        onFilter: propsRef.current?.request
          ? undefined
          : (value: string, row: T) => defaultOnFilter(value, row, dataIndex as string[]),
        index: columnsIndex,
        ...item,
        title: renderColumnsTitle(item),
        valueEnum,
        filters:
          filters === true
            ? proFieldParsingValueEnumToArray(valueEnum).filter(
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
              type,
            )
          : undefined,
        render: (text: any, row: T, index: number) =>
          columnRender<T>({ item, text, row, index, columnEmptyText, counter, type }),
      };
      return omitUndefinedAndEmptyArr(tempColumns);
    })
    .filter((item) => !item.hideInTable) as unknown) as Array<
    ColumnsType<T>[number] & {
      index?: number;
    }
  >;
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
    cardProps,
    tableStyle,
    tableClassName,
    columnsStateMap,
    onColumnsStateChange,
    options,
    search,
    rowSelection: propsRowSelection = false,
    beforeSearchSubmit = (searchParams: Partial<U>) => searchParams,
    tableAlertRender,
    defaultClassName,
    formRef,
    type = 'table',
    columnEmptyText = '-',
    manualRequest = false,
    toolbar,
    ...rest
  } = props;

  const [selectedRowKeys, setSelectedRowKeys] = useMergedState<React.ReactText[]>([], {
    value: propsRowSelection ? propsRowSelection.selectedRowKeys : undefined,
  });

  const [selectedRows, setSelectedRows] = useMergedState<T[]>([]);

  const setSelectedRowsAndKey = (keys: React.ReactText[], rows: T[]) => {
    setSelectedRowKeys(keys);
    setSelectedRows(rows);
  };

  const [formSearch, setFormSearch] = useState<{} | undefined>(undefined);

  const [proFilter, setProFilter] = useState<{
    [key: string]: React.ReactText[];
  }>({});
  const [proSort, setProSort] = useState<{
    [key: string]: SortOrder;
  }>({});

  /**
   * 获取 table 的 dom ref
   */
  const rootRef = useRef<HTMLDivElement>(null);
  const fullScreen = useRef<() => void>();
  const intl = useIntl();

  /**
   * 是否首次加载的指示器
   */
  const manualRequestRef = useRef<boolean>(manualRequest);

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
    async (pageParams) => {
      // 需要手动触发的首次请求
      if (!request || manualRequestRef.current) {
        manualRequestRef.current = false;
        return {
          data: props.dataSource || [],
          success: true,
        } as RequestData<T>;
      }

      const actionParams = {
        ...(pageParams || {}),
        ...formSearch,
        ...params,
      };

      // eslint-disable-next-line no-underscore-dangle
      delete (actionParams as any)._timestamp;

      const response = await request((actionParams as unknown) as U, proSort, proFilter);
      const responseData = postDataPipeline<T[], U>(
        response.data,
        [postData].filter((item) => item) as any,
      );
      if (Array.isArray(response)) {
        return response;
      }
      const msgData = { ...response, data: responseData } as RequestData<T>;
      return msgData;
    },
    defaultData,
    {
      ...fetchPagination,
      pagination: propsPagination !== false,
      onLoad,
      onRequestError,
      manual: !request || (!formSearch && search !== false),
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
    setSelectedRowsAndKey([], []);
  }, [setSelectedRowKeys, propsRowSelection]);
  /**
   * 绑定 action
   */
  useActionType(actionRef, counter, () => {
    // 清空选中行
    onCleanSelected();
    // 清空筛选
    setProFilter({});
    // 清空排序
    setProSort({});
    // 清空 toolbar 搜索
    counter.setKeyWords(undefined);
  });
  counter.setAction(action);
  counter.propsRef.current = props;

  const tableColumn = useMemo(() => {
    return genColumnList<T>(propsColumns, counter.columnsMap, counter, columnEmptyText, type).sort(
      (a, b) => {
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
        const aKey = a.key || `${aIndex}`;
        const bKey = b.key || `${bIndex}`;
        return (counter.columnsMap[aKey]?.order || 0) - (counter.columnsMap[bKey]?.order || 0);
      },
    );
  }, [propsColumns, counter.columnsMap]);

  /**
   * Table Column 变化的时候更新一下，这个参数将会用于渲染
   */
  useDeepCompareEffect(() => {
    if (tableColumn && tableColumn.length > 0) {
      // 重新生成key的字符串用于排序
      const columnKeys = tableColumn.map((item, index) => genColumnKey(item.key, index));
      counter.setSortKeyColumns(columnKeys);
    }
  }, [tableColumn]);

  /**
   * 同步 Pagination，支持受控的 页码 和 pageSize
   */
  useDeepCompareEffect(() => {
    const { current, pageSize } = propsPagination || {};
    if (
      propsPagination &&
      (current || pageSize) &&
      (pageSize !== action.pageSize || current !== action.current)
    ) {
      action.setPageInfo({
        pageSize: pageSize || action.pageSize,
        page: current || action.current,
      });
    }
  }, [propsPagination && propsPagination.pageSize, propsPagination && propsPagination.current]);

  const rowSelection: TableRowSelection = {
    selectedRowKeys,
    ...propsRowSelection,
    onChange: (keys, rows) => {
      if (propsRowSelection && propsRowSelection.onChange) {
        propsRowSelection.onChange(keys, rows);
      }
      setSelectedRowsAndKey(keys, rows);
    },
  };

  const onSubmit = useCallback(
    (value, firstLoad) => {
      if (type !== 'form') {
        const submitParams = {
          ...value,
          _timestamp: Date.now(),
        };
        setFormSearch(beforeSearchSubmit(submitParams));
        if (!firstLoad) {
          // back first page
          action.resetPageIndex();
        }
      }
      // 不是第一次提交就不触发，第一次提交是 js 触发的
      // 为了解决 https://github.com/ant-design/pro-components/issues/579
      if (props.onSubmit && !firstLoad) {
        props.onSubmit(value);
      }
    },
    [props.onSubmit],
  );

  const onReset = useCallback(
    (value) => {
      setFormSearch(beforeSearchSubmit(value));
      // back first page
      action.resetPageIndex();
      props.onReset?.();
    },
    [props.onReset],
  );

  if ((!props.columns || props.columns.length < 1) && !props.tableViewRender) {
    return (
      <Card bordered={false} bodyStyle={{ padding: 50 }}>
        <Empty />
      </Card>
    );
  }

  const className = classNames(defaultClassName, propsClassName);

  /**
   * 查询表单相关的配置
   */
  const searchNode =
    search !== false || type === 'form' ? (
      <FormSearch<U, T>
        columns={propsColumns}
        type={type}
        formRef={formRef}
        onSubmit={onSubmit}
        onReset={onReset}
        dateFormatter={rest.dateFormatter}
        search={search}
        form={rest.form}
      />
    ) : null;
  const isLightFilter: boolean = search !== false && search?.filterType === 'light';

  const toolbarProps = isLightFilter
    ? {
        filter: searchNode,
        ...toolbar,
      }
    : toolbar;

  const toolbarDom =
    toolBarRender !== false &&
    (options !== false || headerTitle || toolBarRender || toolbarProps) ? (
      // if options= false & headerTitle=== false, hide Toolbar
      <Toolbar<T>
        columns={tableColumn}
        options={options}
        headerTitle={headerTitle}
        action={action}
        onSearch={(keyword) => {
          if (!options || !options.search) {
            return;
          }
          const { name = 'keyword' } = options.search === true ? {} : options.search;
          setFormSearch(
            omitUndefined({
              ...formSearch,
              _timestamp: Date.now(),
              [name]: keyword,
            }),
          );
        }}
        selectedRows={selectedRows}
        selectedRowKeys={selectedRowKeys}
        toolBarRender={toolBarRender}
        toolbar={toolbarProps}
      />
    ) : undefined;

  const alertDom =
    propsRowSelection !== false && tableAlertRender !== false ? (
      <Alert<T>
        selectedRowKeys={selectedRowKeys}
        selectedRows={selectedRows}
        onCleanSelected={onCleanSelected}
        alertOptionRender={rest.tableAlertOptionRender}
        alertInfoRender={tableAlertRender}
      />
    ) : null;
  const dataSource = request ? (action.dataSource as T[]) : props.dataSource || [];
  const loading = props.loading !== undefined ? props.loading : action.loading;
  const tableProps = {
    ...rest,
    size: counter.tableSize,
    rowSelection: propsRowSelection === false ? undefined : rowSelection,
    className: tableClassName,
    style: tableStyle,
    columns: tableColumn.filter((item) => {
      // 删掉不应该显示的
      const columnKey = genColumnKey(item.key, item.index);
      const config = counter.columnsMap[columnKey];
      if (config && config.show === false) {
        return false;
      }
      return true;
    }),
    loading,
    dataSource: request ? (action.dataSource as T[]) : props.dataSource || [],
    pagination,
    onChange: (
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
      setProFilter(omitUndefined<any>(filters));
      // 制造一个排序的数据
      if (Array.isArray(sorter)) {
        const data = sorter.reduce<{
          [key: string]: any;
        }>((pre, value) => {
          return {
            ...pre,
            [`${value.field}`]: value.order,
          };
        }, {});
        setProSort(omitUndefined<any>(data));
      } else {
        setProSort(omitUndefined({ [`${sorter.field}`]: sorter.order as SortOrder }));
      }
    },
  };
  /**
   * 如果有 ellipsis ，设置 tableLayout 为 fixed
   */
  const tableLayout = props.columns?.some((item) => item.ellipsis) ? 'fixed' : 'auto';
  const tableDom = props.tableViewRender ? (
    props.tableViewRender(tableProps)
  ) : (
    <Table<T> {...tableProps} tableLayout={tableLayout} />
  );
  /**
   * table 区域的 dom，为了方便 render
   */
  const tableAreaDom = (
    <Card
      bordered={false}
      style={{
        height: '100%',
      }}
      bodyStyle={
        toolbarDom
          ? {
              paddingTop: 0,
              paddingBottom: 0,
            }
          : {
              padding: 0,
            }
      }
      {...cardProps}
    >
      {toolbarDom}
      {alertDom}
      {tableDom}
    </Card>
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

  const proTableDom = (
    <div className={className} id="ant-design-pro-table" style={style} ref={rootRef}>
      {isLightFilter ? null : searchNode}
      {/* 渲染一个额外的区域，用于一些自定义 */}
      {type !== 'form' && props.tableExtraRender && (
        <div className={`${className}-extra`}>{props.tableExtraRender(props, dataSource)}</div>
      )}
      {type !== 'form' && renderTable()}
    </div>
  );

  // 如果不需要的全屏，ConfigProvider 没有意义
  if (!options || !options?.fullScreen) {
    return proTableDom;
  }
  return (
    <ConfigProvider
      getPopupContainer={() => ((rootRef.current || document.body) as any) as HTMLElement}
    >
      {proTableDom}
    </ConfigProvider>
  );
};

/**
 * 🏆 Use Ant Design Table like a Pro!
 * 更快 更好 更方便
 * @param props
 */
const ProviderWarp = <T, U extends { [key: string]: any } = {}>(props: ProTableProps<T, U>) => {
  const { getPrefixCls } = useContext(ConfigProvider.ConfigContext);
  return (
    <Container.Provider initialState={props}>
      <ConfigProviderWrap>
        <ErrorBoundary>
          <ProTable defaultClassName={getPrefixCls('pro-table')} {...props} />
        </ErrorBoundary>
      </ConfigProviderWrap>
    </Container.Provider>
  );
};

export default ProviderWarp;
