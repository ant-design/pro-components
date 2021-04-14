/* eslint max-classes-per-file: ["error", 3] */
import React, { useContext, useRef, useCallback, useMemo, useEffect } from 'react';
import type { TablePaginationConfig } from 'antd';
import { Table, ConfigProvider, Form, Card } from 'antd';
import type { ParamsType } from '@ant-design/pro-provider';
import { useIntl, ConfigProviderWrap } from '@ant-design/pro-provider';
import classNames from 'classnames';
import { stringify } from 'use-json-comparison';
import type { TableCurrentDataSource, SorterResult, SortOrder } from 'antd/lib/table/interface';
import {
  useDeepCompareEffect,
  omitUndefined,
  useMountMergeState,
  useEditableArray,
  ErrorBoundary,
} from '@ant-design/pro-utils';

import useFetchData from './useFetchData';
import Container from './container';
import Toolbar from './components/ToolBar';
import Alert from './components/Alert';
import FormRender from './components/Form';
import {
  genColumnKey,
  mergePagination,
  useActionType,
  isBordered,
  parseDefaultColumnConfig,
} from './utils';
import { genProColumnToColumn } from './utils/genProColumnToColumn';

import './index.less';
import type {
  PageInfo,
  ProTableProps,
  RequestData,
  TableRowSelection,
  UseFetchDataAction,
} from './typing';
import type { ActionType } from '.';
import { columnSort } from './utils/columnSort';

function TableRender<T extends Record<string, any>, U, ValueType>(
  props: ProTableProps<T, U, ValueType> & {
    action: UseFetchDataAction<any>;
    tableColumn: any[];
    toolbarDom: JSX.Element | null;
    searchNode: JSX.Element | null;
    alertDom: JSX.Element | null;
    isLightFilter: boolean;
    onSortChange: (sort: any) => void;
    onFilterChange: (sort: any) => void;
    editableUtils: any;
    rootRef: React.RefObject<HTMLDivElement>;
  },
) {
  const {
    rowKey,
    tableClassName,
    action,
    tableColumn,
    type,
    pagination,
    rowSelection,
    size,
    tableStyle,
    toolbarDom,
    searchNode,
    style,
    cardProps,
    alertDom,
    onSortChange,
    onFilterChange,
    options,
    isLightFilter,
    className,
    cardBordered,
    editableUtils,
    rootRef,
    ...rest
  } = props;
  const counter = Container.useContainer();

  const columns = useMemo(() => {
    return tableColumn.filter((item) => {
      // 删掉不应该显示的
      const columnKey = genColumnKey(item.key, item.index);
      const config = counter.columnsMap[columnKey];
      if (config && config.show === false) {
        return false;
      }
      return true;
    });
  }, [counter.columnsMap, tableColumn]);

  /** 如果所有列中的 filters=true| undefined 说明是用的是本地筛选 任何一列配置 filters=false，就能绕过这个判断 */
  const useLocaleFilter = useMemo(
    () =>
      columns?.every(
        (column) =>
          (column.filters === true && column.onFilter === true) ||
          (column.filters === undefined && column.onFilter === undefined),
      ),
    [columns],
  );

  /**
   * 如果是分页的新增，总是加到最后一行
   *
   * @returns
   */
  const editableDataSource = (): T[] => {
    const { options: newLineOptions, defaultValue: row } = editableUtils.newLineRecord || {};

    if (newLineOptions?.position === 'top') {
      return [row, ...action.dataSource];
    }
    // 如果有分页的功能，我们加到这一页的末尾
    if (pagination && pagination?.current && pagination?.pageSize) {
      return [...action.dataSource].splice(pagination?.current * pagination?.pageSize - 1, 0, row);
    }
    return [...action.dataSource, row];
  };

  const getTableProps = () => ({
    ...rest,
    size,
    rowSelection: rowSelection === false ? undefined : rowSelection,
    className: tableClassName,
    style: tableStyle,
    columns,
    loading: action.loading,
    dataSource: editableUtils.newLineRecord ? editableDataSource() : action.dataSource,
    pagination,
    onChange: (
      changePagination: TablePaginationConfig,
      filters: Record<string, (React.Key | boolean)[] | null>,
      sorter: SorterResult<T> | SorterResult<T>[],
      extra: TableCurrentDataSource<T>,
    ) => {
      rest.onChange?.(changePagination, filters, sorter, extra);
      if (!useLocaleFilter) {
        onFilterChange(omitUndefined<any>(filters));
      }
      // 制造筛选的数据
      // 制造一个排序的数据
      if (Array.isArray(sorter)) {
        const data = sorter.reduce<Record<string, any>>(
          (pre, value) => ({
            ...pre,
            [`${value.field}`]: value.order,
          }),
          {},
        );
        onSortChange(omitUndefined<any>(data));
      } else {
        const sorterOfColumn = sorter.column?.sorter;
        const isSortByField = sorterOfColumn?.toString() === sorterOfColumn;
        onSortChange(
          omitUndefined({
            [`${isSortByField ? sorterOfColumn : sorter.field}`]: sorter.order as SortOrder,
          }),
        );
      }
    },
  });

  /** 如果有 ellipsis ，设置 tableLayout 为 fixed */
  const tableLayout =
    // 优先以用户设置为准
    props.tableLayout ?? props.columns?.some((item) => item.ellipsis) ? 'fixed' : 'auto';

  /** 默认的 table dom，如果是编辑模式，外面还要包个 form */
  const baseTableDom = (
    <Form
      component={false}
      form={props.editable?.form}
      onValuesChange={editableUtils.onValuesChange}
      key="table"
    >
      <Table<T> {...getTableProps()} rowKey={rowKey} tableLayout={tableLayout} />
    </Form>
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

  /** Table 区域的 dom，为了方便 render */
  const tableAreaDom = (
    <Card
      bordered={isBordered('table', cardBordered)}
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
    <div
      className={classNames(className, {
        [`${className}-polling`]: action.pollingLoading,
      })}
      style={style}
      ref={rootRef}
    >
      {isLightFilter ? null : searchNode}
      {/* 渲染一个额外的区域，用于一些自定义 */}
      {type !== 'form' && props.tableExtraRender && action.dataSource && (
        <div className={`${className}-extra`}>
          {props.tableExtraRender(props, action.dataSource)}
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
      getPopupContainer={() => ((rootRef.current || document.body) as any) as HTMLElement}
    >
      {proTableDom}
    </ConfigProvider>
  );
}

const ProTable = <T extends Record<string, any>, U extends ParamsType, ValueType>(
  props: ProTableProps<T, U, ValueType> & {
    defaultClassName: string;
  },
) => {
  const {
    cardBordered,
    request,
    className: propsClassName,
    params = {},
    defaultData,
    headerTitle,
    postData,
    pagination: propsPagination,
    actionRef: propsActionRef,
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
    ...rest
  } = props;

  const className = classNames(defaultClassName, propsClassName);

  /** 通用的来操作子节点的工具类 */
  const actionRef = useRef<ActionType>();

  const defaultFormRef = useRef();
  const formRef = propRef || defaultFormRef;

  useEffect(() => {
    if (typeof propsActionRef === 'function' && actionRef.current) {
      propsActionRef(actionRef.current);
    }
  }, [propsActionRef]);

  /** 单选多选的相关逻辑 */
  const [selectedRowKeys, setSelectedRowKeys] = useMountMergeState<React.ReactText[]>([], {
    value: propsRowSelection ? propsRowSelection.selectedRowKeys : undefined,
  });

  const selectedRowsRef = useRef<T[]>([]);

  const setSelectedRowsAndKey = useCallback(
    (keys: React.ReactText[], rows: T[]) => {
      setSelectedRowKeys(keys);
      selectedRowsRef.current = rows;
    },
    [setSelectedRowKeys],
  );

  const [formSearch, setFormSearch] = useMountMergeState<Record<string, any> | undefined>(() => {
    // 如果手动模式，或者 search 不存在的时候设置为 undefined
    // undefined 就不会触发首次加载
    if (manualRequest || search !== false) {
      return undefined;
    }
    return {};
  });

  const [proFilter, setProFilter] = useMountMergeState<Record<string, React.ReactText[]>>({});
  const [proSort, setProSort] = useMountMergeState<Record<string, SortOrder>>({});

  /** 设置默认排序和筛选值 */
  useEffect(() => {
    const { sort, filter } = parseDefaultColumnConfig(propsColumns);
    setProFilter(filter);
    setProSort(sort);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /** 获取 table 的 dom ref */
  const rootRef = useRef<HTMLDivElement>(null);
  const intl = useIntl();

  /** 需要初始化 不然默认可能报错 这里取了 defaultCurrent 和 current 为了保证不会重复刷新 */
  const fetchPagination =
    typeof propsPagination === 'object'
      ? (propsPagination as TablePaginationConfig)
      : { defaultCurrent: 1, defaultPageSize: 20, pageSize: 20, current: 1 };

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
      const response = await request((actionParams as unknown) as U, proSort, proFilter);
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
    manual: formSearch === undefined,
    polling,
    effects: [stringify(params), stringify(formSearch), stringify(proFilter), stringify(proSort)],
    debounceTime: props.debounceTime,
    onPageInfoChange: (pageInfo) => {
      // 总是触发一下 onChange 和  onShowSizeChange
      if (propsPagination) {
        propsPagination?.onChange?.(pageInfo.current, pageInfo.pageSize);
        propsPagination?.onShowSizeChange?.(pageInfo.current, pageInfo.pageSize);
      }
    },
  });
  // ============================ END ============================

  /** 页面编辑的计算 */
  const pagination = useMemo(() => {
    const pageConfig = {
      ...action.pageInfo,
      setPageInfo: ({ pageSize, current }: PageInfo) => {
        const { pageInfo } = action;
        // pageSize 发生改变，并且你不是在第一页，切回到第一页
        // 这样可以防止出现 跳转到一个空的数据页的问题
        if (pageSize === pageInfo.pageSize || pageInfo.current === 1) {
          action.setPageInfo({ pageSize, current });
          return;
        }

        // 通过request的时候清空数据，然后刷新不然可能会导致 pageSize 没有数据多
        if (request) action.setDataSource([]);

        requestAnimationFrame(() => {
          action.setPageInfo({
            pageSize,
            current: 1,
          });
        });
      },
    };
    return mergePagination<T>(propsPagination, pageConfig, intl);
  }, [propsPagination, action, intl]);

  const counter = Container.useContainer();

  /** 清空所有的选中项 */
  const onCleanSelected = useCallback(() => {
    if (propsRowSelection && propsRowSelection.onChange) {
      propsRowSelection.onChange([], []);
    }
    setSelectedRowsAndKey([], []);
  }, [propsRowSelection, setSelectedRowsAndKey]);

  counter.setAction(actionRef.current);
  counter.propsRef.current = props;

  // ============================ RowKey ============================
  const getRowKey = React.useMemo<any>(() => {
    if (typeof rowKey === 'function') {
      return rowKey;
    }
    return (record: T, index: number) => (record as any)?.[rowKey as string] ?? index;
  }, [rowKey]);

  /** 可编辑行的相关配置 */
  const editableUtils = useEditableArray<any>({
    ...props.editable,
    getRowKey,
    childrenColumnName: props.expandable?.childrenColumnName,
    dataSource: action.dataSource || [],
    setDataSource: (data) => {
      props.editable?.onValuesChange?.(undefined as any, data);
      action.setDataSource(data);
    },
  });

  /** 绑定 action */
  useActionType(actionRef, action, {
    fullScreen: () => {
      if (!rootRef.current || !document.fullscreenEnabled) {
        return;
      }
      if (document.fullscreenElement) {
        document.exitFullscreen();
      } else {
        rootRef.current.requestFullscreen();
      }
    },
    onCleanSelected: () => {
      // 清空选中行
      onCleanSelected();
    },
    resetAll: () => {
      // 清空选中行
      onCleanSelected();
      // 清空筛选
      setProFilter({});
      // 清空排序
      setProSort({});
      // 清空 toolbar 搜索
      counter.setKeyWords(undefined);
      // 重置页码
      action.setPageInfo({
        current: 1,
      });

      // 重置表单
      formRef?.current?.resetFields();
      setFormSearch({});
    },
    editableUtils,
  });

  if (propsActionRef) {
    // @ts-ignore
    propsActionRef.current = actionRef.current;
  }

  // ---------- 列计算相关 start  -----------------
  const tableColumn = useMemo(() => {
    return genProColumnToColumn<T>({
      columns: propsColumns,
      counter,
      columnEmptyText,
      type,
      editableUtils,
    }).sort(columnSort(counter.columnsMap));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [propsColumns, counter, columnEmptyText, type, editableUtils.editableKeys.join(',')]);

  /** Table Column 变化的时候更新一下，这个参数将会用于渲染 */
  useDeepCompareEffect(() => {
    if (tableColumn && tableColumn.length > 0) {
      // 重新生成key的字符串用于排序
      const columnKeys = tableColumn.map((item) => genColumnKey(item.key, item.index));
      counter.setSortKeyColumns(columnKeys);
    }
  }, [tableColumn]);

  /** 同步 Pagination，支持受控的 页码 和 pageSize */
  useDeepCompareEffect(() => {
    const { pageInfo } = action;
    const { current = pageInfo.current, pageSize = pageInfo.pageSize } = propsPagination || {};
    if (
      propsPagination &&
      (current || pageSize) &&
      (pageSize !== pageInfo.pageSize || current !== pageInfo.current)
    ) {
      action.setPageInfo({
        pageSize: pageSize || pageInfo.pageSize,
        current: current || pageInfo.current,
      });
    }
  }, [propsPagination && propsPagination.pageSize, propsPagination && propsPagination.current]);

  /** 行选择相关的问题 */
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

  /** 是不是 LightFilter, LightFilter 有一些特殊的处理 */
  const isLightFilter: boolean = search !== false && search?.filterType === 'light';

  const searchNode =
    search === false && type !== 'form' ? null : (
      <FormRender<T, U>
        pagination={pagination}
        beforeSearchSubmit={beforeSearchSubmit}
        action={actionRef}
        columns={propsColumns}
        onFormSearchSubmit={(values) => {
          setFormSearch(values);
        }}
        onReset={props.onReset}
        onSubmit={props.onSubmit}
        loading={!!action.loading}
        manualRequest={manualRequest}
        search={search}
        form={props.form}
        formRef={formRef}
        type={props.type || 'table'}
        cardBordered={props.cardBordered}
        dateFormatter={props.dateFormatter}
      />
    );

  /** 内置的工具栏 */
  const toolbarDom =
    toolBarRender === false ? null : (
      <Toolbar<T>
        headerTitle={headerTitle}
        hideToolbar={
          options === false && !headerTitle && !toolBarRender && !toolbar && !isLightFilter
        }
        selectedRows={selectedRowsRef.current}
        selectedRowKeys={selectedRowKeys}
        tableColumn={tableColumn}
        tooltip={tooltip}
        toolbar={toolbar}
        onFormSearchSubmit={setFormSearch}
        searchNode={isLightFilter ? searchNode : null}
        options={options}
        actionRef={actionRef}
        toolBarRender={toolBarRender}
      />
    );

  /** 内置的多选操作栏 */
  const alertDom =
    propsRowSelection !== false ? (
      <Alert<T>
        selectedRowKeys={selectedRowKeys}
        selectedRows={selectedRowsRef.current}
        onCleanSelected={onCleanSelected}
        alertOptionRender={rest.tableAlertOptionRender}
        alertInfoRender={tableAlertRender}
      />
    ) : null;

  return (
    <TableRender
      {...props}
      rootRef={rootRef}
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
      onSortChange={setProSort}
      onFilterChange={setProFilter}
      editableUtils={editableUtils}
    />
  );
};

/**
 * 🏆 Use Ant Design Table like a Pro! 更快 更好 更方便
 *
 * @param props
 */
const ProviderWarp = <
  T extends Record<string, any>,
  U extends ParamsType = ParamsType,
  ValueType = 'text'
>(
  props: ProTableProps<T, U, ValueType>,
) => {
  const { getPrefixCls } = useContext(ConfigProvider.ConfigContext);
  return (
    <Container.Provider initialState={props}>
      <ConfigProviderWrap>
        <ErrorBoundary>
          <ProTable<T, U, ValueType> defaultClassName={getPrefixCls('pro-table')} {...props} />
        </ErrorBoundary>
      </ConfigProviderWrap>
    </Container.Provider>
  );
};

ProviderWarp.Summary = Table.Summary;

export default ProviderWarp;
