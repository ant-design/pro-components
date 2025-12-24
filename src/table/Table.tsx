import type { TablePaginationConfig } from 'antd';
import { ConfigProvider, Table } from 'antd';
import {
  FilterValue as AntFilterValue,
  SorterResult,
} from 'antd/es/table/interface';
import type {
  GetRowKey,
  SortOrder,
  TableCurrentDataSource,
} from 'antd/lib/table/interface';
import classNames from 'classnames';
import isEmpty from 'lodash-es/isEmpty';
import isEqual from 'lodash-es/isEqual';
import type Summary from 'rc-table/lib/Footer/Summary';
import React, {
  Key,
  useCallback,
  useContext,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
} from 'react';
import type { ActionType } from '.';
import ProCard from '../card';
import ValueTypeToComponent from '../field/ValueTypeToComponent';
import ProForm, { GridContext } from '../form';
import type { ParamsType } from '../provider';
import ProConfigContext, {
  ProConfigProvider,
  proTheme,
  useIntl,
} from '../provider';
import {
  ErrorBoundary,
  editableRowByKey,
  omitUndefined,
  recordKeyToString,
  stringify,
  useDeepCompareEffect,
  useDeepCompareEffectDebounce,
  useEditableArray,
  useMountMergeState,
} from '../utils';
import Alert from './components/Alert';
import FormRender from './components/Form';
import Toolbar from './components/ToolBar';
import { Container, TableContext } from './Store/Provide';
import { useStyle } from './style';
import type {
  FilterValue,
  OptionSearchProps,
  PageInfo,
  ProTableProps,
  RequestData,
  TableRowSelection,
  UseFetchDataAction,
} from './typing';
import useFetchData from './useFetchData';
import {
  flattenColumns,
  genColumnKey,
  getServerFilterResult,
  getServerSorterResult,
  isBordered,
  mergePagination,
  parseServerDefaultColumnConfig,
  useActionType,
} from './utils';
import { columnSort } from './utils/columnSort';
import { genProColumnToColumn } from './utils/genProColumnToColumn';

type CreatorToolbarContext<T extends Record<string, any>> = {
  toolBarRender: ProTableProps<T, any, any>['toolBarRender'];
  headerTitle: ProTableProps<T, any, any>['headerTitle'];
  hideToolbar: boolean;
  selectedRows: T[];
  selectedRowKeys: (string | number | Key)[] | undefined;
  tableColumn: any[];
  tooltip: ProTableProps<T, any, any>['tooltip'];
  toolbar: ProTableProps<T, any, any>['toolbar'];
  isLightFilter: boolean;
  searchNode: React.ReactNode;
  options: ProTableProps<T, any, any>['options'];
  optionsRender: ProTableProps<T, any, any>['optionsRender'];
  actionRef: React.MutableRefObject<ActionType | undefined>;
  setFormSearch: (value: Record<string, any> | undefined) => void;
  formSearch: Record<string, any> | undefined;
};

function useEditableDataSource<T>({
  dataSource,
  editableUtils,
  pagination,
  getRowKey,
  childrenColumnName,
}: {
  dataSource: readonly T[] | undefined;
  editableUtils: {
    newLineRecord?: {
      options?: {
        position?: 'top' | 'bottom' | string;
        parentKey?: React.Key;
        recordKey?: React.Key;
      };
      defaultValue?: T;
    };
  };
  pagination: ProTableProps<T, any, any>['pagination'];
  getRowKey: GetRowKey<any>;
  childrenColumnName?: string;
}): T[] {
  return useMemo(() => {
    const baseData = Array.isArray(dataSource) ? [...dataSource] : [];
    const newLineConfig = editableUtils?.newLineRecord;
    const defaultValue = newLineConfig?.defaultValue;

    if (!newLineConfig || !defaultValue) {
      return baseData;
    }

    const { options: newLineOptions } = newLineConfig;
    const childrenName = childrenColumnName || 'children';

    if (newLineOptions?.parentKey) {
      const newRow = {
        ...defaultValue,
        map_row_parentKey: recordKeyToString(
          newLineOptions.parentKey,
        )?.toString(),
      };
      const actionProps = {
        data: baseData,
        getRowKey,
        row: newRow,
        key: newLineOptions?.recordKey ?? getRowKey(newRow as T, -1),
        childrenColumnName: childrenName,
      };

      return editableRowByKey(
        actionProps,
        newLineOptions?.position === 'top' ? 'top' : 'update',
      );
    }

    if (newLineOptions?.position === 'top') {
      return [defaultValue, ...baseData];
    }

    const pageConfig =
      pagination && typeof pagination === 'object' ? pagination : undefined;

    if (pageConfig?.current && pageConfig?.pageSize) {
      if (pageConfig.pageSize > baseData.length) {
        baseData.push(defaultValue);
        return baseData;
      }
      const insertIndex = pageConfig.current * pageConfig.pageSize - 1;
      baseData.splice(insertIndex, 0, defaultValue);
      return baseData;
    }

    baseData.push(defaultValue);
    return baseData;
  }, [
    childrenColumnName,
    dataSource,
    editableUtils?.newLineRecord,
    getRowKey,
    pagination,
  ]);
}

function useTableCardBodyStyle({
  propsCardProps,
  notNeedCardDom,
  name,
  hideToolbar,
  toolbarDom,
  pagination,
}: {
  propsCardProps: ProTableProps<any, any, any>['cardProps'];
  notNeedCardDom: boolean;
  name: ProTableProps<any, any, any>['name'];
  hideToolbar: boolean;
  toolbarDom: React.ReactNode;
  pagination: ProTableProps<any, any, any>['pagination'];
}): React.CSSProperties {
  return useMemo(() => {
    if (propsCardProps === false || notNeedCardDom || !!name) {
      return {};
    }

    if (hideToolbar) {
      return { padding: 0 };
    }

    if (toolbarDom) {
      return { paddingBlockStart: 0 };
    }

    if (toolbarDom && pagination === false) {
      return { paddingBlockStart: 0 };
    }

    return { padding: 0 };
  }, [
    hideToolbar,
    name,
    notNeedCardDom,
    pagination,
    propsCardProps,
    toolbarDom,
  ]);
}

function useTableContent<T>({
  editable,
  name,
  toolbarDom,
  alertDom,
  tableDom,
  dateFormatter,
  editableOnValuesChange,
}: {
  editable: ProTableProps<T, any, any>['editable'];
  name: ProTableProps<T, any, any>['name'];
  toolbarDom: React.ReactNode;
  alertDom: React.ReactNode;
  tableDom: React.ReactNode;
  dateFormatter: ProTableProps<T, any, any>['dateFormatter'];
  editableOnValuesChange: ((record: T, dataSource: T[]) => void) | undefined;
}): React.ReactNode {
  return useMemo(() => {
    if (editable && !name) {
      return (
        <>
          {toolbarDom}
          {alertDom}
          <ProForm
            {...(editable.formProps as any)}
            formRef={editable.formProps?.formRef as any}
            component={false}
            form={editable.form}
            onValuesChange={editableOnValuesChange}
            key="table"
            submitter={false}
            omitNil={false}
            dateFormatter={dateFormatter}
          >
            {tableDom}
          </ProForm>
        </>
      );
    }

    return (
      <>
        {toolbarDom}
        {alertDom}
        {tableDom}
      </>
    );
  }, [
    alertDom,
    dateFormatter,
    editable,
    editableOnValuesChange,
    name,
    tableDom,
    toolbarDom,
  ]);
}

function useRowKey<T>({
  rowKey,
  name,
}: {
  rowKey: ProTableProps<T, any, any>['rowKey'];
  name: ProTableProps<T, any, any>['name'];
}): GetRowKey<any> {
  return useMemo(() => {
    if (typeof rowKey === 'function') {
      return rowKey;
    }
    return (record: T, index?: number) => {
      if (index === -1) {
        return (record as any)?.[rowKey as string];
      }
      if (name) {
        return index?.toString();
      }
      return (record as any)?.[rowKey as string] ?? index?.toString();
    };
  }, [name, rowKey]);
}

function useMergedPagination<T>({
  propsPagination,
  action,
  intl,
  request,
  type,
}: {
  propsPagination: ProTableProps<T, any, any>['pagination'];
  action: UseFetchDataAction<T>;
  intl: ReturnType<typeof useIntl>;
  request: ProTableProps<T, any, any>['request'];
  type: ProTableProps<T, any, any>['type'];
}): ProTableProps<T, any, any>['pagination'] {
  return useMemo(() => {
    const newPropsPagination =
      propsPagination === false ? false : { ...(propsPagination || {}) };
    const pageConfig = {
      ...action.pageInfo,
      setPageInfo: ({ pageSize, current }: PageInfo) => {
        const { pageInfo } = action;
        if (pageSize === pageInfo.pageSize || pageInfo.current === 1) {
          action.setPageInfo({ pageSize, current });
          return;
        }

        if (request) action.setDataSource([]);
        action.setPageInfo({
          pageSize,
          current: type === 'list' ? current : 1,
        });
      },
    };
    if (request && newPropsPagination) {
      delete newPropsPagination.onChange;
      delete newPropsPagination.onShowSizeChange;
    }
    return mergePagination<T>(
      newPropsPagination as TablePaginationConfig | false | undefined,
      pageConfig,
      intl,
    );
  }, [action, intl, propsPagination, request, type]);
}

function useSearchNode<T extends Record<string, any>, U, ValueType>({
  search,
  type,
  pagination,
  beforeSearchSubmit,
  actionRef,
  columns,
  onFormSearchSubmit,
  ghost,
  onReset,
  onSubmit,
  loading,
  manualRequest,
  form,
  formRef,
  cardBordered,
  dateFormatter,
  searchFormRender,
  proTableProps,
}: {
  search: ProTableProps<T, U, ValueType>['search'];
  type: ProTableProps<T, U, ValueType>['type'];
  pagination: ProTableProps<T, U, ValueType>['pagination'];
  beforeSearchSubmit: ProTableProps<T, U, ValueType>['beforeSearchSubmit'];
  actionRef: React.MutableRefObject<ActionType | undefined>;
  columns: ProTableProps<T, U, ValueType>['columns'];
  onFormSearchSubmit: <Y extends ParamsType>(values: Y) => any;
  ghost: ProTableProps<T, U, ValueType>['ghost'];
  onReset: ProTableProps<T, U, ValueType>['onReset'];
  onSubmit: ProTableProps<T, U, ValueType>['onSubmit'];
  loading: boolean;
  manualRequest: ProTableProps<T, U, ValueType>['manualRequest'];
  form: ProTableProps<T, U, ValueType>['form'];
  formRef: React.MutableRefObject<any>;
  cardBordered: ProTableProps<T, U, ValueType>['cardBordered'];
  dateFormatter: ProTableProps<T, U, ValueType>['dateFormatter'];
  searchFormRender: ProTableProps<T, U, ValueType>['searchFormRender'];
  proTableProps: ProTableProps<T, U, ValueType>;
}): React.ReactNode {
  return useMemo(() => {
    const node =
      search === false && type !== 'form' ? null : (
        <FormRender<T, U>
          pagination={pagination}
          beforeSearchSubmit={beforeSearchSubmit}
          action={actionRef}
          columns={columns}
          onFormSearchSubmit={(values) => {
            onFormSearchSubmit(values as any);
          }}
          ghost={ghost}
          onReset={onReset}
          onSubmit={onSubmit}
          loading={loading}
          manualRequest={manualRequest}
          search={search}
          form={form}
          formRef={formRef}
          type={type || 'table'}
          cardBordered={cardBordered}
          dateFormatter={dateFormatter}
        />
      );

    if (searchFormRender && node) {
      return <>{searchFormRender(proTableProps, node)}</>;
    }
    return node;
  }, [
    actionRef,
    beforeSearchSubmit,
    cardBordered,
    columns,
    dateFormatter,
    form,
    formRef,
    ghost,
    loading,
    manualRequest,
    onFormSearchSubmit,
    onReset,
    onSubmit,
    pagination,
    proTableProps,
    search,
    searchFormRender,
    type,
  ]);
}

function useToolbarDom<T extends Record<string, any>>(
  context: CreatorToolbarContext<T>,
): React.ReactNode {
  const {
    toolBarRender,
    headerTitle,
    hideToolbar,
    selectedRows,
    selectedRowKeys,
    tableColumn,
    tooltip,
    toolbar,
    isLightFilter,
    searchNode,
    options,
    optionsRender,
    actionRef,
    setFormSearch,
    formSearch,
  } = context;

  return useMemo(() => {
    if (toolBarRender === false) {
      return null;
    }
    return (
      <Toolbar<T>
        headerTitle={headerTitle}
        hideToolbar={hideToolbar}
        selectedRows={selectedRows}
        selectedRowKeys={selectedRowKeys!}
        tableColumn={tableColumn}
        tooltip={tooltip}
        toolbar={toolbar}
        onFormSearchSubmit={(newValues) => {
          setFormSearch({
            ...(formSearch || {}),
            ...newValues,
          });
        }}
        searchNode={isLightFilter ? searchNode : null}
        options={options}
        optionsRender={optionsRender}
        actionRef={actionRef}
        toolBarRender={toolBarRender}
      />
    );
  }, [
    actionRef,
    formSearch,
    headerTitle,
    hideToolbar,
    isLightFilter,
    options,
    optionsRender,
    searchNode,
    selectedRowKeys,
    selectedRows,
    setFormSearch,
    tableColumn,
    toolBarRender,
    tooltip,
    toolbar,
  ]);
}

function useAlertDom<T extends Record<string, any>>({
  propsRowSelection,
  selectedRowKeys,
  selectedRows,
  onCleanSelected,
  tableAlertOptionRender,
  tableAlertRender,
}: {
  propsRowSelection: ProTableProps<T, any, any>['rowSelection'];
  selectedRowKeys: (string | number | Key)[] | undefined;
  selectedRows: T[];
  onCleanSelected: () => void;
  tableAlertOptionRender: ProTableProps<T, any, any>['tableAlertOptionRender'];
  tableAlertRender: ProTableProps<T, any, any>['tableAlertRender'];
}): React.ReactNode {
  return useMemo(() => {
    if (propsRowSelection === false) {
      return null;
    }
    return (
      <Alert<T>
        selectedRowKeys={selectedRowKeys!}
        selectedRows={selectedRows}
        onCleanSelected={onCleanSelected}
        alertOptionRender={tableAlertOptionRender}
        alertInfoRender={tableAlertRender}
        alwaysShowAlert={propsRowSelection?.alwaysShowAlert}
      />
    );
  }, [
    onCleanSelected,
    propsRowSelection,
    selectedRowKeys,
    selectedRows,
    tableAlertOptionRender,
    tableAlertRender,
  ]);
}

function TableRender<T extends Record<string, any>, U, ValueType>(
  props: ProTableProps<T, U, ValueType> & {
    action: UseFetchDataAction<any>;
    defaultClassName: string;
    tableColumn: any[];
    toolbarDom: React.ReactNode;
    hideToolbar: boolean;
    searchNode: React.ReactNode;
    alertDom: React.ReactNode;
    isLightFilter: boolean;
    onSortChange: (sort?: Record<string, SortOrder>) => void;
    onFilterChange: (filter: Record<string, FilterValue>) => void;
    editableUtils: any;
    getRowKey: GetRowKey<any>;
    tableRef: React.MutableRefObject<any>;
  },
) {
  const {
    rowKey,
    tableClassName,
    defaultClassName,
    action,
    tableColumn: tableColumns,
    type,
    pagination,
    rowSelection,
    size,
    defaultSize,
    tableStyle,
    toolbarDom,
    hideToolbar,
    searchNode,
    style,
    cardProps: propsCardProps,
    alertDom,
    name,
    onSortChange,
    onFilterChange,
    options,
    isLightFilter,
    className,
    cardBordered,
    editableUtils,
    getRowKey,
    tableRef,
    ...rest
  } = props;
  const counter = useContext(TableContext);
  const mergedDataSource = useEditableDataSource<T>({
    dataSource: action.dataSource,
    editableUtils,
    pagination,
    getRowKey,
    childrenColumnName: props.expandable?.childrenColumnName || 'children',
  });

  /** 需要遍历一下，不然不支持嵌套表格 */
  const columns = useMemo(() => {
    const loopFilter = (column: any[]): any[] => {
      return column
        .map((item) => {
          // 删掉不应该显示的
          const columnKey = genColumnKey(item.key, item.index);
          const config = counter.columnsMap[columnKey];
          if (config && config.show === false) {
            return false;
          }
          if (item.children) {
            return {
              ...item,
              children: loopFilter(item.children),
            };
          }
          return item;
        })
        .filter(Boolean);
    };
    return loopFilter(tableColumns);
  }, [counter.columnsMap, tableColumns]);

  // 需要进行筛选的列
  const useFilterColumns = useMemo(() => {
    const _columns: any[] = flattenColumns(columns);
    return _columns.filter((column) => !!column.filters);
  }, [columns]);

  const getTableProps = () => ({
    ...rest,
    size,
    rowSelection: rowSelection === false ? undefined : rowSelection,
    className: tableClassName,
    style: tableStyle,
    columns,
    loading: action.loading,
    dataSource: mergedDataSource,
    pagination,
    onChange: (
      changePagination: TablePaginationConfig,
      filters: Record<string, AntFilterValue | null>,
      sorter: SorterResult<T> | SorterResult<T>[],
      extra: TableCurrentDataSource<T>,
    ) => {
      rest.onChange?.(changePagination, filters, sorter, extra);

      // 传递服务端筛选数据
      const serverFilter = getServerFilterResult(filters, useFilterColumns);
      onFilterChange(omitUndefined(serverFilter));

      // 传递服务端排序数据
      const serverSorter = getServerSorterResult(sorter);
      onSortChange(omitUndefined(serverSorter));
    },
  });

  /**
   * 是否需要 card 来包裹
   */
  const notNeedCardDom = useMemo(() => {
    if (
      props.search === false &&
      !props.headerTitle &&
      props.toolBarRender === false
    ) {
      return true;
    }
    return false;
  }, []);

  /** 默认的 table dom，如果是编辑模式，外面还要包个 form */
  const baseTableDom = (
    <GridContext.Provider
      value={{
        grid: false,
        colProps: undefined,
        rowProps: undefined,
      }}
    >
      <Table<T> {...getTableProps()} rowKey={rowKey} ref={tableRef as any} />
    </GridContext.Provider>
  );

  /** 自定义的 render */
  const tableDom = props.tableViewRender
    ? props.tableViewRender(
        {
          ...getTableProps(),
          rowSelection: rowSelection !== false ? rowSelection : undefined,
        },
        baseTableDom,
      )
    : baseTableDom;

  const tableContentDom = useTableContent<T>({
    editable: props.editable,
    name: props.name,
    toolbarDom,
    alertDom,
    tableDom,
    dateFormatter: props.dateFormatter,
    editableOnValuesChange: editableUtils.onValuesChange,
  });

  const cardBodyStyle = useTableCardBodyStyle({
    propsCardProps,
    notNeedCardDom,
    name: props.name,
    hideToolbar,
    toolbarDom,
    pagination,
  });

  /** Table 区域的 dom，为了方便 render */
  const tableAreaDom =
    // cardProps 或者 有了name 就不需要这个padding了，不然会导致不好对齐
    propsCardProps === false || notNeedCardDom === true || !!props.name ? (
      tableContentDom
    ) : (
      <ProCard
        ghost={props.ghost}
        variant={isBordered('table', cardBordered) ? 'outlined' : 'borderless'}
        bodyStyle={cardBodyStyle}
        {...propsCardProps}
      >
        {tableContentDom}
      </ProCard>
    );

  const renderTable = () => {
    if (props.tableRender) {
      return props.tableRender(props, tableAreaDom!, {
        toolbar: toolbarDom || undefined,
        alert: alertDom || undefined,
        table: tableDom || undefined,
      });
    }
    return tableAreaDom;
  };

  const proTableDom = (
    <div
      className={classNames(className, {
        [`${defaultClassName}-polling`]: action.pollingLoading,
      })}
      style={style}
      ref={counter.rootDomRef}
    >
      {isLightFilter ? null : searchNode}
      {/* 渲染一个额外的区域，用于一些自定义 */}
      {type !== 'form' && props.tableExtraRender && (
        <div className={classNames(className, `${defaultClassName}-extra`)}>
          {props.tableExtraRender(props, action.dataSource || [])}
        </div>
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
      getPopupContainer={() => {
        return (counter.rootDomRef.current ||
          document.body) as any as HTMLElement;
      }}
    >
      {proTableDom}
    </ConfigProvider>
  );
}

const emptyObj = {} as Record<string, any>;

const ProTable = <
  T extends Record<string, any>,
  U extends ParamsType,
  ValueType,
>(
  props: ProTableProps<T, U, ValueType> & {
    defaultClassName: string;
  },
) => {
  const {
    cardBordered,
    request,
    className: propsClassName,
    params = emptyObj,
    defaultData,
    headerTitle,
    postData,
    ghost,
    pagination: propsPagination,
    actionRef: propsActionRef,
    columns: propsColumns = [],
    toolBarRender,
    optionsRender,
    onLoad,
    onRequestError,
    style,
    cardProps,
    tableStyle,
    tableClassName,

    options,
    search,
    name: isEditorTable,
    onLoadingChange,
    rowSelection: propsRowSelection = false,
    beforeSearchSubmit,
    tableAlertRender,
    defaultClassName,
    formRef: propRef,
    type = 'table',
    columnEmptyText = '-',
    toolbar,
    rowKey,
    manualRequest,
    polling,
    tooltip,
    revalidateOnFocus = false,
    searchFormRender,
    ...rest
  } = props;
  const { wrapSSR, hashId } = useStyle(props.defaultClassName);

  const className = classNames(defaultClassName, propsClassName, hashId);

  /** 通用的来操作子节点的工具类 */
  const actionRef = useRef<ActionType>();
  // antd Table 实例 ref（仅用于转发 scrollTo 能力）
  const antTableRef = useRef<any>(null);

  const defaultFormRef = useRef();
  const formRef = propRef || defaultFormRef;

  useImperativeHandle(propsActionRef, () => actionRef.current);

  /** 单选多选的相关逻辑 */
  const [selectedRowKeys, setSelectedRowKeys] = useMountMergeState<
    (string | number)[] | Key[] | undefined
  >(
    propsRowSelection
      ? propsRowSelection?.defaultSelectedRowKeys || []
      : undefined,
    {
      value: propsRowSelection ? propsRowSelection.selectedRowKeys : undefined,
    },
  );

  const [formSearch, setFormSearch] = useMountMergeState<
    Record<string, any> | undefined
  >(() => {
    // 如果手动模式，或者 search 不存在的时候设置为 undefined
    // undefined 就不会触发首次加载
    if (manualRequest || search !== false) {
      return undefined;
    }
    return {};
  });

  const { defaultProFilter, defaultProSort } = useMemo(() => {
    const { sort, filter } = parseServerDefaultColumnConfig(flattenColumns(propsColumns));
    return {
      defaultProFilter: filter,
      defaultProSort: sort,
    };
  }, [propsColumns]);
  const [proFilter, setProFilter] =
    useMountMergeState<Record<string, FilterValue>>(defaultProFilter);
  const [proSort, setProSort] =
    useMountMergeState<Record<string, SortOrder>>(defaultProSort);

  const intl = useIntl();

  /** 需要初始化 不然默认可能报错 这里取了 defaultCurrent 和 current 为了保证不会重复刷新 */
  const fetchPagination =
    typeof propsPagination === 'object'
      ? (propsPagination as TablePaginationConfig)
      : { defaultCurrent: 1, defaultPageSize: 20, pageSize: 20, current: 1 };

  const counter = useContext(TableContext);

  // ============================ useFetchData ============================
  const fetchData = useMemo(() => {
    if (!request) return undefined;
    return async (pageParams?: Record<string, any>) => {
      const actionParams = {
        ...(pageParams || {}),
        ...formSearch,
        ...params,
      };

      // eslint-disable-next-line no-underscore-dangle
      delete (actionParams as any)._timestamp;
      const response = await request(
        actionParams as unknown as U,
        proSort,
        proFilter,
      );
      return response as RequestData<T>;
    };
  }, [formSearch, params, proFilter, proSort, request]);

  const action = useFetchData(fetchData, defaultData, {
    pageInfo: propsPagination === false ? false : fetchPagination,
    loading: props.loading,
    dataSource: props.dataSource,
    onDataSourceChange: props.onDataSourceChange,
    onLoad,
    onLoadingChange,
    onRequestError,
    postData,
    revalidateOnFocus,
    manual: formSearch === undefined,
    polling,
    effects: [
      stringify(params),
      stringify(formSearch),
      stringify(proFilter),
      stringify(proSort),
    ],
    debounceTime: props.debounceTime,
    onPageInfoChange: (pageInfo) => {
      if (!propsPagination || !fetchData) return;

      // 总是触发一下 onChange 和  onShowSizeChange
      // 目前只有 List 和 Table 支持分页, List 有分页的时候打断 Table 的分页
      propsPagination?.onChange?.(pageInfo.current, pageInfo.pageSize);
      propsPagination?.onShowSizeChange?.(pageInfo.current, pageInfo.pageSize);
    },
  });
  // ============================ END ============================

  /** 聚焦的时候重新请求数据，这样可以保证数据都是最新的。 */
  useEffect(() => {
    // 手动模式和 request 为空都不生效
    if (
      props.manualRequest ||
      !props.request ||
      !revalidateOnFocus ||
      props.form?.ignoreRules
    )
      return;

    // 聚焦时重新请求事件
    const visibilitychange = () => {
      if (document.visibilityState === 'visible') {
        action.reload();
      }
    };

    document.addEventListener('visibilitychange', visibilitychange);
    return () =>
      document.removeEventListener('visibilitychange', visibilitychange);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /** SelectedRowKeys受控处理selectRows */
  const preserveRecordsRef = React.useRef(new Map<any, T>());

  // ============================ RowKey ============================
  const getRowKey = useRowKey<T>({ rowKey, name: props.name });

  useMemo(() => {
    if (action.dataSource?.length) {
      const keys = action.dataSource.map((data) => {
        const dataRowKey = getRowKey(data, -1);
        preserveRecordsRef.current.set(dataRowKey, data);
        return dataRowKey;
      });
      return keys;
    }
    return [];
  }, [action.dataSource, getRowKey]);

  /** 页面编辑的计算 */
  const pagination = useMergedPagination<T>({
    propsPagination,
    action,
    intl,
    request,
    type,
  });
  useDeepCompareEffect(() => {
    // request 存在且params不为空，且已经请求过数据才需要设置。
    if (
      props.request &&
      !isEmpty(params) &&
      action.dataSource &&
      !isEqual(action.dataSource, defaultData) &&
      action?.pageInfo?.current !== 1
    ) {
      action.setPageInfo({
        current: 1,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params]);

  // 设置 name 到 store 中，里面用了 ref ，所以不用担心直接 set
  counter.setPrefixName(props.name);

  /** 清空所有的选中项 */
  const onCleanSelected = useCallback(() => {
    if (propsRowSelection && propsRowSelection.onChange) {
      propsRowSelection.onChange([], [], {
        type: 'none',
      });
    }
    setSelectedRowKeys([]);
  }, [propsRowSelection, setSelectedRowKeys]);

  counter.propsRef.current = props as ProTableProps<any, any, any>;

  /** 可编辑行的相关配置 */
  const editableUtils = useEditableArray<any>({
    ...props.editable,
    tableName: props.name,
    getRowKey,
    childrenColumnName: props.expandable?.childrenColumnName || 'children',
    dataSource: action.dataSource || [],
    setDataSource: (data) => {
      props.editable?.onValuesChange?.(undefined as any, data);
      action.setDataSource(data);
    },
  });

  // ============================ Render ============================
  const { token } = proTheme?.useToken();

  /** 绑定 action */
  useActionType(actionRef, action, {
    fullScreen: () => {
      if (!counter.rootDomRef?.current || !document.fullscreenEnabled) {
        return;
      }
      if (document.fullscreenElement) {
        document.exitFullscreen();
      } else {
        counter.rootDomRef?.current.requestFullscreen();
      }
    },
    onCleanSelected: () => {
      // 清空选中行
      onCleanSelected();
    },
    resetAll: () => {
      // 清空选中行
      onCleanSelected();

      // 清空 toolbar 搜索
      counter.setKeyWords(undefined);
      // 重置页码
      action.setPageInfo({
        current: 1,
      });

      // 重置绑定筛选值
      setProFilter(defaultProFilter);
      // 重置绑定排序值
      setProSort(defaultProSort);

      // 重置表单
      formRef?.current?.resetFields();
    },
    editableUtils,
    scrollTo: (arg) => (antTableRef as any)?.current?.scrollTo?.(arg),
  });

  /** 同步 action */
  counter.setAction(actionRef.current);

  // ---------- 列计算相关 start  -----------------
  const tableColumn = useMemo(() => {
    return genProColumnToColumn<T>({
      columns: propsColumns,
      counter,
      columnEmptyText,
      type,
      marginSM: token.marginSM,
      editableUtils,
      rowKey,
      childrenColumnName: props.expandable?.childrenColumnName,
      proFilter,
      proSort,
    }).sort(columnSort(counter.columnsMap));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    propsColumns,
    counter?.sortKeyColumns,
    counter?.columnsMap,
    columnEmptyText,
    type,
    // eslint-disable-next-line react-hooks/exhaustive-deps
    editableUtils.editableKeys && editableUtils.editableKeys.join(','),
    proFilter,
    proSort,
  ]);

  /** Table Column 变化的时候更新一下，这个参数将会用于渲染 */
  useDeepCompareEffectDebounce(
    () => {
      if (tableColumn && tableColumn.length > 0) {
        // 重新生成key的字符串用于排序
        const columnKeys = tableColumn.map((item) =>
          genColumnKey(item.key, item.index),
        );
        counter.setSortKeyColumns(columnKeys);
      }
    },
    [tableColumn],
    ['render', 'formItemRender'],
    100,
  );

  /** 同步 Pagination，支持受控的 页码 和 pageSize */
  useDeepCompareEffect(() => {
    const { pageInfo } = action;
    const { current = pageInfo?.current, pageSize = pageInfo?.pageSize } =
      propsPagination || {};
    if (
      propsPagination &&
      (current || pageSize) &&
      (pageSize !== pageInfo?.pageSize || current !== pageInfo?.current)
    ) {
      action.setPageInfo({
        pageSize: pageSize || pageInfo.pageSize,
        current: current || pageInfo.current,
      });
    }
  }, [
    propsPagination && propsPagination.pageSize,
    propsPagination && propsPagination.current,
  ]);

  /** 行选择相关的问题 */
  const rowSelection: TableRowSelection = {
    selectedRowKeys,
    ...propsRowSelection,
    onChange: (keys, rows, info) => {
      if (propsRowSelection && propsRowSelection.onChange) {
        propsRowSelection.onChange(keys, rows, info);
      }
      setSelectedRowKeys(keys);
    },
  };

  /** 是不是 LightFilter, LightFilter 有一些特殊的处理 */
  const isLightFilter: boolean =
    search !== false && search?.filterType === 'light';

  const onFormSearchSubmit = useCallback(
    <Y extends ParamsType>(values: Y): any => {
      // 判断search.onSearch返回值决定是否更新formSearch
      if (options && options.search) {
        const { name = 'keyword' } =
          options.search === true ? {} : options.search;

        /** 如果传入的 onSearch 返回值为 false，则不要把options.search.name对应的值set到formSearch */
        const success = (options.search as OptionSearchProps)?.onSearch?.(
          counter.keyWords!,
        );

        if (success !== false) {
          setFormSearch({
            ...values,
            [name]: counter.keyWords,
          });
          return;
        }
      }

      setFormSearch(values);
    },
    [counter.keyWords, options, setFormSearch],
  );

  const loading = useMemo(() => {
    if (typeof action.loading === 'object') {
      return action.loading?.spinning || false;
    }
    return action.loading;
  }, [action.loading]);

  const searchNode = useSearchNode<T, U, ValueType>({
    search,
    type,
    pagination,
    beforeSearchSubmit,
    actionRef,
    columns: propsColumns,
    onFormSearchSubmit,
    ghost,
    onReset: props.onReset,
    onSubmit: props.onSubmit,
    loading: !!loading,
    manualRequest,
    form: props.form,
    formRef,
    cardBordered: props.cardBordered,
    dateFormatter: props.dateFormatter,
    searchFormRender,
    proTableProps: props,
  });

  const selectedRows = useMemo(
    () => selectedRowKeys?.map((key) => preserveRecordsRef.current?.get(key)),
    [action.dataSource, selectedRowKeys],
  ) as T[];

  const hideToolbar = useMemo(
    () =>
      options === false &&
      !headerTitle &&
      !toolBarRender &&
      !toolbar &&
      !isLightFilter,
    [options, headerTitle, toolBarRender, toolbar, isLightFilter],
  );

  const toolbarDom = useToolbarDom<T>({
    toolBarRender,
    headerTitle,
    hideToolbar,
    selectedRows,
    selectedRowKeys,
    tableColumn,
    tooltip,
    toolbar,
    isLightFilter,
    searchNode,
    options,
    optionsRender,
    actionRef,
    setFormSearch,
    formSearch,
  });

  const alertDom = useAlertDom<T>({
    propsRowSelection,
    selectedRowKeys,
    selectedRows,
    onCleanSelected,
    tableAlertOptionRender: rest.tableAlertOptionRender,
    tableAlertRender,
  });
  return wrapSSR(
    <TableRender
      {...props}
      name={isEditorTable}
      defaultClassName={defaultClassName}
      size={counter.tableSize}
      onSizeChange={counter.setTableSize}
      pagination={pagination}
      searchNode={searchNode}
      rowSelection={propsRowSelection !== false ? rowSelection : undefined}
      className={className}
      tableColumn={tableColumn}
      isLightFilter={isLightFilter}
      action={action}
      alertDom={alertDom}
      toolbarDom={toolbarDom}
      hideToolbar={hideToolbar}
      onSortChange={(sortConfig) => {
        if (isEqual(sortConfig, proSort)) return;
        setProSort(sortConfig ?? {});
      }}
      onFilterChange={(filterConfig) => {
        if (isEqual(filterConfig, proFilter)) return;
        setProFilter(filterConfig ?? {});
      }}
      editableUtils={editableUtils}
      getRowKey={getRowKey}
      tableRef={antTableRef}
    />,
  );
};

/**
 * 🏆 Use Ant Design Table like a Pro! 更快 更好 更方便
 *
 * @param props
 */
const ProviderTableContainer = <
  DataType extends Record<string, any>,
  Params extends ParamsType = ParamsType,
  ValueType = 'text',
>(
  props: ProTableProps<DataType, Params, ValueType>,
) => {
  const { getPrefixCls } = useContext(ConfigProvider.ConfigContext);

  const ErrorComponent =
    props.ErrorBoundary === false
      ? React.Fragment
      : props.ErrorBoundary || ErrorBoundary;

  const context = useContext(ProConfigContext);
  return (
    <Container initValue={props}>
      <ProConfigProvider
        valueTypeMap={{ ...context.valueTypeMap, ...ValueTypeToComponent }}
        needDeps
      >
        <ErrorComponent>
          <ProTable<DataType, Params, ValueType>
            defaultClassName={`${getPrefixCls('pro-table')}`}
            {...props}
          />
        </ErrorComponent>
      </ProConfigProvider>
    </Container>
  );
};

ProviderTableContainer.Summary = Table.Summary as typeof Summary;

export default ProviderTableContainer;
