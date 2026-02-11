import { Summary } from '@rc-component/table';
import { useControlledState } from '@rc-component/util';
import type { TablePaginationConfig } from 'antd';
import { ConfigProvider, Table } from 'antd';
import type {
  FilterValue as AntFilterValue,
  SorterResult,
} from 'antd/es/table/interface';
import type {
  GetRowKey,
  SortOrder,
  TableCurrentDataSource,
} from 'antd/lib/table/interface';
import { clsx } from 'clsx';
import isEmpty from 'lodash-es/isEmpty';
import isEqual from 'lodash-es/isEqual';
import React, {
  Key,
  useContext,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
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
  editableRowByKey,
  ErrorBoundary,
  omitUndefined,
  recordKeyToString,
  stringify,
  useDeepCompareEffect,
  useDeepCompareEffectDebounce,
  useEditableArray,
  useRefFunction,
} from '../utils';
import Alert from './components/Alert';
import { Container, TableContext } from './Store/Provide';
import { useStyle } from './style';
import { TableSearch } from './TableSearch';
import { TableToolbar } from './TableToolbar';
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
import {
  genProColumnToColumn,
  type TableColumnContext,
} from './utils/genProColumnToColumn';

function getEditableDataSource<T>({
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
        parentKey?: React.Key | React.Key[];
        recordKey?: React.Key | React.Key[];
      };
      defaultValue?: T;
    };
  };
  pagination: ProTableProps<T, any, any>['pagination'];
  getRowKey: GetRowKey<any>;
  childrenColumnName?: string;
}): T[] {
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
}

function getTableCardBodyStyle({
  propsCardProps,
  notNeedCardDom,
  name,
  hideToolbar,
  toolbarDom,
}: {
  propsCardProps: ProTableProps<any, any, any>['cardProps'];
  notNeedCardDom: boolean;
  name: ProTableProps<any, any, any>['name'];
  hideToolbar: boolean;
  toolbarDom: React.ReactNode;
}): React.CSSProperties {
  // cardProps === false 或存在 name 的场景不需要额外 padding 处理
  if (propsCardProps === false || notNeedCardDom || !!name) {
    return {};
  }

  // 显式隐藏 toolbar 时，统一不留 padding（避免误用 paddingBlockStart）
  if (hideToolbar) {
    return { padding: 0 };
  }

  // 有 toolbar 的场景，需要让 ProCard body 顶部与 toolbar 对齐
  if (toolbarDom) {
    return { paddingBlockStart: 0 };
  }

  return { padding: 0 };
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

  const className = clsx(defaultClassName, propsClassName, hashId);

  /** 通用的来操作子节点的工具类 */
  const actionRef = useRef<ActionType>();
  // antd Table 实例 ref（仅用于转发 scrollTo 能力）
  const antTableRef = useRef<any>(null);

  const defaultFormRef = useRef();
  const formRef = propRef || defaultFormRef;

  useImperativeHandle(propsActionRef, () => actionRef.current);

  /** 单选多选的相关逻辑 */
  const [selectedRowKeys, setSelectedRowKeys] = useControlledState<
    (string | number)[] | Key[] | undefined
  >(
    propsRowSelection
      ? propsRowSelection?.defaultSelectedRowKeys || []
      : undefined,
    propsRowSelection ? propsRowSelection.selectedRowKeys : undefined,
  );

  const [formSearch, setFormSearch] = useState<Record<string, any> | undefined>(
    () => {
      // 如果手动模式，或者 search 不存在的时候设置为 undefined
      // undefined 就不会触发首次加载
      if (manualRequest || search !== false) {
        return undefined;
      }
      return {};
    },
  );

  /**
   * `actionRef.current?.reset()` 会在同一事件循环里同步调用 `action.reload()`。
   * 由于 React state 更新是异步的，如果仅 setState，reload 可能仍读取到旧的 formSearch。
   * 使用 ref 作为请求参数的同步来源，保证 reset/toolbar 等场景下参数与表单展示一致。
   */
  const formSearchRef = useRef<Record<string, any> | undefined>(formSearch);
  const setFormSearchWithRef = useRefFunction(
    (next: React.SetStateAction<Record<string, any> | undefined>) => {
      const nextValue =
        typeof next === 'function' ? next(formSearchRef.current) : next;
      formSearchRef.current = nextValue;
      setFormSearch(nextValue);
    },
  );

  const { columns: propsColumns = [], columnsState } = props;

  const { defaultProFilter, defaultProSort } = useMemo(() => {
    const { sort, filter } = parseServerDefaultColumnConfig(
      flattenColumns(propsColumns),
    );
    return {
      defaultProFilter: filter,
      defaultProSort: sort,
    };
  }, [propsColumns]);

  const [proFilter, setProFilter] =
    useState<Record<string, FilterValue>>(defaultProFilter);
  const [proSort, setProSort] =
    useState<Record<string, SortOrder>>(defaultProSort);

  /**
   * 只有在 proColumns 变化的时候，才会重新更新 proFilter 和 proSort
   * 这样可以避免 columns 变化的时候，filter 和 sort 被重置
   */
  useDeepCompareEffect(() => {
    setProFilter(defaultProFilter);
    setProSort(defaultProSort);
  }, [defaultProFilter, defaultProSort]);

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
        ...(formSearchRef.current || {}),
        ...params,
      };

      delete actionParams._timestamp;
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

  // 监听 pagination 的变化，修正 pageSize
  useDeepCompareEffect(() => {
    if (
      pagination &&
      (pagination.current !== action.pageInfo.current ||
        pagination.pageSize !== action.pageInfo.pageSize)
    ) {
      action.setPageInfo({
        current: pagination.current,
        pageSize: pagination.pageSize,
      });
    }
  }, [pagination]);
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
  }, [params]);

  // 设置 name 到 store 中，里面用了 ref ，所以不用担心直接 set
  counter.setPrefixName(props.name);

  // 设置 columnsState 到 store 中（仅在受控 value 时同步，避免在仅传 onChange 时用 {} 覆盖默认 state 导致多余 onChange）
  useEffect(() => {
    if (columnsState?.value !== undefined) {
      counter.setColumnsMap(columnsState.value);
    }
  }, [columnsState?.value]);

  /** 清空所有的选中项 */
  const onCleanSelected = useRefFunction(() => {
    if (propsRowSelection && propsRowSelection.onChange) {
      propsRowSelection.onChange([], [], {
        type: 'none',
      });
    }
    setSelectedRowKeys([]);
  });

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
    nativeElement: counter.rootDomRef?.current || undefined,
    focus: () => {
      // 聚焦到表格根元素
      counter.rootDomRef?.current?.focus();
    },
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

      // 同步更新请求参数，避免 resetFields 后请求仍使用旧的 formSearch
      const resetValues =
        formRef?.current?.getFieldsFormatValue?.(true) ??
        formRef?.current?.getFieldsValue?.(true) ??
        {};
      const nextSearch = beforeSearchSubmit
        ? beforeSearchSubmit(resetValues)
        : resetValues;
      setFormSearchWithRef((nextSearch ?? {}) as any);
    },
    editableUtils,
    scrollTo: (arg) => (antTableRef as any)?.current?.scrollTo?.(arg),
  });

  /** 同步 action */
  counter.setAction(actionRef.current);

  // ---------- 列计算相关 start  -----------------
  const tableColumn = useMemo(() => {
    const columnContext: TableColumnContext<T> = {
      counter,
      columnEmptyText,
      type,
      editableUtils,
      marginSM: token.marginSM,
      rowKey: rowKey ?? 'id',
      childrenColumnName: props.expandable?.childrenColumnName ?? 'children',
      proFilter,
      proSort,
    };
    return genProColumnToColumn<T>({
      columns: propsColumns,
      context: columnContext,
    }).sort(columnSort(counter.columnsMap ?? {}));
  }, [
    propsColumns,
    counter?.sortKeyColumns,
    counter?.columnsMap,
    columnEmptyText,
    type,
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

  const onFormSearchSubmit = useRefFunction(
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
          setFormSearchWithRef({
            ...values,
            [name]: counter.keyWords,
          });
          return;
        }
      }

      setFormSearchWithRef(values);
    },
  );

  const loading = useMemo(() => {
    if (typeof action.loading === 'object') {
      return action.loading?.spinning || false;
    }
    return action.loading;
  }, [action.loading]);

  const searchNode = (
    <TableSearch<T, U, ValueType>
      search={search}
      type={type}
      pagination={pagination}
      beforeSearchSubmit={beforeSearchSubmit}
      actionRef={actionRef}
      columns={propsColumns}
      onFormSearchSubmit={onFormSearchSubmit}
      ghost={ghost}
      onReset={props.onReset}
      onSubmit={props.onSubmit}
      loading={!!loading}
      manualRequest={manualRequest}
      form={props.form}
      formRef={formRef}
      cardBordered={props.cardBordered}
      dateFormatter={props.dateFormatter}
      searchFormRender={searchFormRender}
      proTableProps={props}
    />
  );

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

  const toolbarDom = (
    <TableToolbar<T>
      toolBarRender={toolBarRender}
      headerTitle={headerTitle}
      hideToolbar={hideToolbar}
      selectedRows={selectedRows}
      selectedRowKeys={selectedRowKeys}
      tableColumn={tableColumn}
      tooltip={tooltip}
      toolbar={toolbar}
      isLightFilter={isLightFilter}
      searchNode={searchNode}
      options={options}
      optionsRender={optionsRender}
      actionRef={actionRef}
      setFormSearch={setFormSearchWithRef}
      formSearch={formSearch}
    />
  );

  const alertDom = useAlertDom<T>({
    propsRowSelection,
    selectedRowKeys,
    selectedRows,
    onCleanSelected,
    tableAlertOptionRender: rest.tableAlertOptionRender,
    tableAlertRender,
  });

  const mergedDataSource = useMemo(() => {
    return getEditableDataSource<T>({
      dataSource: action.dataSource,
      editableUtils,
      pagination,
      getRowKey,
      childrenColumnName: props.expandable?.childrenColumnName || 'children',
    });
  }, [
    action.dataSource,
    editableUtils?.newLineRecord,
    getRowKey,
    pagination,
    props.expandable?.childrenColumnName,
  ]);

  const columns = useMemo(() => {
    const loopFilter = (column: any[]): any[] => {
      return column
        .map((item) => {
          const columnKey = genColumnKey(item.key, item.index);
          const config = counter.columnsMap?.[columnKey];
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
    return loopFilter(tableColumn);
  }, [counter.columnsMap, tableColumn]);

  const useFilterColumns = useMemo(() => {
    const _columns: any[] = flattenColumns(columns);
    return _columns.filter((column) => !!column.filters);
  }, [columns]);

  const onSortChange = (sortConfig?: Record<string, SortOrder>) => {
    if (isEqual(sortConfig, proSort)) return;
    setProSort(sortConfig ?? {});
  };

  const onFilterChange = (filterConfig: Record<string, FilterValue>) => {
    if (isEqual(filterConfig, proFilter)) return;
    setProFilter(filterConfig ?? {});
  };

  const getTableProps = () => ({
    ...rest,
    size: counter.tableSize,
    rowSelection: propsRowSelection === false ? undefined : rowSelection,
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

      const serverFilter = getServerFilterResult(filters, useFilterColumns);
      onFilterChange(omitUndefined(serverFilter));

      const serverSorter = getServerSorterResult(sorter);
      onSortChange(omitUndefined(serverSorter));
    },
  });

  const notNeedCardDom = search === false && !headerTitle && !toolBarRender;

  const baseTableDom = (
    <GridContext.Provider
      value={{
        grid: false,
        colProps: undefined,
        rowProps: undefined,
      }}
    >
      <Table<T> {...getTableProps()} rowKey={rowKey} ref={antTableRef} />
    </GridContext.Provider>
  );

  const tableDom = props.tableViewRender
    ? props.tableViewRender(
        {
          ...getTableProps(),
          rowSelection: propsRowSelection !== false ? rowSelection : undefined,
        },
        baseTableDom,
      )
    : baseTableDom;

  const tableContentDom =
    props.editable && !isEditorTable ? (
      <>
        {toolbarDom}
        {alertDom}
        <ProForm
          {...(props.editable.formProps as any)}
          formRef={props.editable.formProps?.formRef as any}
          component={false}
          form={props.editable.form}
          onValuesChange={editableUtils.onValuesChange}
          key="table"
          submitter={false}
          omitNil={false}
          dateFormatter={props.dateFormatter}
        >
          {tableDom}
        </ProForm>
      </>
    ) : (
      <>
        {toolbarDom}
        {alertDom}
        {tableDom}
      </>
    );

  const cardBodyStyle = getTableCardBodyStyle({
    propsCardProps: cardProps,
    notNeedCardDom,
    name: props.name,
    hideToolbar,
    toolbarDom,
  });

  /** ProTable：有搜索/工具栏/标题时使用卡片包裹；可编辑表格（name）不包裹 */
  /** ProList：始终使用卡片包裹（除非 cardProps 为 false） */
  const useCard = useMemo(() => {
    const useCardForTable =
      cardProps !== false && !props.name && !notNeedCardDom;
    const useCardForList = cardProps !== false && type === 'list';
    return useCardForTable || useCardForList;
  }, [cardProps, props.name, type, notNeedCardDom]);

  const resolvedCardProps = cardProps === false ? {} : cardProps ?? {};

  const tableAreaDom = useCard ? (
    <ProCard
      ghost={ghost}
      variant={isBordered('table', cardBordered) ? 'outlined' : 'borderless'}
      styles={{
        body: {
          ...cardBodyStyle,
          ...(resolvedCardProps.styles?.body ?? {}),
        },
        header: resolvedCardProps.styles?.header,
      }}
      {...resolvedCardProps}
    >
      {tableContentDom}
    </ProCard>
  ) : (
    tableContentDom
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
      className={clsx(className, {
        [`${defaultClassName}-polling`]: action.pollingLoading,
      })}
      style={style}
      ref={counter.rootDomRef}
    >
      {isLightFilter ? null : searchNode}
      {type !== 'form' && props.tableExtraRender && (
        <div className={clsx(className, `${defaultClassName}-extra`)}>
          {props.tableExtraRender(props, action.dataSource || [])}
        </div>
      )}
      {type !== 'form' && renderTable()}
    </div>
  );

  if (!options || !options?.fullScreen) {
    return wrapSSR(proTableDom);
  }
  return wrapSSR(
    <ConfigProvider
      getPopupContainer={() => {
        return (counter.rootDomRef.current ||
          document.body) as any as HTMLElement;
      }}
    >
      {proTableDom}
    </ConfigProvider>,
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
    <Container
      initValue={{
        ...props,
        columnsState: props.columnsState,
        columns: props.columns,
        onSizeChange: props.onSizeChange,
        size: (props.size as any) || undefined,
        defaultSize: (props.defaultSize as any) || undefined,
      }}
    >
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
