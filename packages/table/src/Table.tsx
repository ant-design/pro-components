import React, {
  useContext,
  useRef,
  useCallback,
  useMemo,
  useImperativeHandle,
  useEffect,
} from 'react';
import type { TablePaginationConfig } from 'antd';
import { Table, ConfigProvider, Form, Card, Spin } from 'antd';
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
import omit from 'omit.js';

import useFetchData from './useFetchData';
import Container from './container';
import Toolbar from './components/ToolBar';
import Alert from './components/Alert';
import FormSearch from './components/Form';
import {
  genColumnKey,
  mergePagination,
  useActionType,
  tableColumnSort,
  genColumnList,
} from './utils';

import './index.less';
import type {
  Bordered,
  BorderedType,
  PageInfo,
  ProTableProps,
  RequestData,
  TableRowSelection,
} from './typing';
import type { ActionType } from '.';

const isBordered = (borderType: BorderedType, border?: Bordered) => {
  if (border === undefined) {
    return false;
  }
  // debugger
  if (typeof border === 'boolean') {
    return border;
  }
  return border[borderType];
};

/**
 * 🏆 Use Ant Design Table like a Pro! 更快 更好 更方便
 *
 * @param props
 */
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
    beforeSearchSubmit = (searchParams: Partial<U>) => searchParams,
    tableAlertRender,
    defaultClassName,
    formRef: propRef,
    type = 'table',
    columnEmptyText = '-',
    toolbar,
    rowKey,
    manualRequest,
    polling,
    ...rest
  } = props;
  const actionRef = useRef<ActionType>();

  const defaultFormRef = useRef();
  const formRef = propRef || defaultFormRef;

  useEffect(() => {
    if (typeof propsActionRef === 'function' && actionRef.current) {
      propsActionRef(actionRef.current);
    }
  }, [propsActionRef]);

  const [selectedRowKeys, setSelectedRowKeys] = useMountMergeState<React.ReactText[]>([], {
    value: propsRowSelection ? propsRowSelection.selectedRowKeys : undefined,
  });

  const [selectedRows, setSelectedRows] = useMountMergeState<T[]>([]);

  const setSelectedRowsAndKey = useCallback(
    (keys: React.ReactText[], rows: T[]) => {
      setSelectedRowKeys(keys);
      setSelectedRows(rows);
    },
    [setSelectedRowKeys, setSelectedRows],
  );

  const [formSearch, setFormSearch] = useMountMergeState<Record<string, any> | undefined>(() => {
    // 如果手动模式，或者 search 不存在的时候设置为 undefined
    // undefined 就不会触发首次加载
    if (manualRequest || search !== false) {
      return undefined;
    }
    return {};
  });

  const manual = useMemo(() => {
    //  formSearch = undefined  满足条件就不触发加载
    if (formSearch === undefined) {
      return true;
    }
    return false;
  }, [formSearch === undefined, search]);

  const [proFilter, setProFilter] = useMountMergeState<Record<string, React.ReactText[]>>({});
  const [proSort, setProSort] = useMountMergeState<Record<string, SortOrder>>({});

  /** 获取 table 的 dom ref */
  const rootRef = useRef<HTMLDivElement>(null);
  const intl = useIntl();

  /** 需要初始化 不然默认可能报错 这里取了 defaultCurrent 和 current 为了保证不会重复刷新 */
  const fetchPagination =
    typeof propsPagination === 'object'
      ? (propsPagination as TablePaginationConfig)
      : { defaultCurrent: 1, defaultPageSize: 20, pageSize: 20, current: 1 };

  // ============================ useFetchData ============================
  const action = useFetchData(
    request
      ? async (pageParams) => {
          const actionParams = {
            ...(pageParams || {}),
            ...formSearch,
            ...params,
          };
          // eslint-disable-next-line no-underscore-dangle
          delete (actionParams as any)._timestamp;
          const response = await request((actionParams as unknown) as U, proSort, proFilter);
          return response as RequestData<T>;
        }
      : undefined,
    defaultData,
    {
      pageInfo: propsPagination === false ? false : fetchPagination,
      loading: props.loading,
      dataSource: props.dataSource,
      onDataSourceChange: props.onDataSourceChange,
      onLoad,
      onLoadingChange,
      onRequestError,
      postData,
      manual,
      polling,
      effects: [stringify(params), stringify(formSearch), stringify(proFilter), stringify(proSort)],
      debounceTime: props.debounceTime,
    },
  );
  // ============================ END ============================

  /** 页面编辑的计算 */
  const pagination = useMemo(
    () =>
      mergePagination<T>(
        propsPagination,
        {
          ...action.pageInfo,
          setPageInfo: ({ pageSize, current }: PageInfo) => {
            // pageSize 发生改变，并且你不是在第一页，切回到第一页
            // 这样可以防止出现 跳转到一个空的数据页的问题
            if (
              pageSize !== action.pageInfo.pageSize &&
              // 当前页码
              action.pageInfo.current !== 1
            ) {
              action.setDataSource([]);
              requestAnimationFrame(() => {
                action.setPageInfo({
                  pageSize,
                  current: 1,
                });
              });
            }
            action.setPageInfo({ pageSize, current });
          },
        },
        intl,
      ),
    [propsPagination, action, intl],
  );

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
  /** 绑定 action ref */
  useImperativeHandle(
    propsActionRef,
    () => {
      return actionRef.current;
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [editableUtils.editableKeys.join(',')],
  );

  // ---------- 列计算相关 start  -----------------
  const tableColumn = useMemo(() => {
    return genColumnList<T>({
      columns: propsColumns,
      map: counter.columnsMap,
      counter,
      columnEmptyText,
      type,
      editableUtils,
    }).sort(tableColumnSort(counter.columnsMap));
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
  // ---------- 列计算相关 end-----------------

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
  /** 查询表单相关的配置 */
  const searchNode = useMemo(() => {
    if (search === false && type !== 'form') {
      return null;
    }

    const onSubmit = (value: U, firstLoad: boolean) => {
      if (type !== 'form') {
        // 只传入 pagination 中的 current 和 pageSize 参数
        const pageInfo = pagination
          ? omitUndefined({
              current: pagination.current,
              pageSize: pagination.pageSize,
            })
          : {};

        const submitParams = {
          ...value,
          _timestamp: Date.now(),
          ...pageInfo,
        };
        const omitParams = omit(beforeSearchSubmit(submitParams), Object.keys(pageInfo!));
        setFormSearch(omitParams);
        if (!firstLoad) {
          // back first page
          action.setPageInfo({
            current: 1,
          });
        }
      }
      // 不是第一次提交就不触发，第一次提交是 js 触发的
      // 为了解决 https://github.com/ant-design/pro-components/issues/579
      if (props.onSubmit && !firstLoad) {
        props.onSubmit(value);
      }
    };

    const onReset = (value: Partial<U>) => {
      const pageInfo = pagination
        ? omitUndefined({
            current: pagination.current,
            pageSize: pagination.pageSize,
          })
        : {};

      const omitParams = omit(
        beforeSearchSubmit({ ...value, ...pageInfo }),
        Object.keys(pageInfo!),
      );
      setFormSearch(omitParams);
      // back first page
      action.setPageInfo({
        current: 1,
      });
      props.onReset?.();
    };

    return (
      <FormSearch<U, T>
        submitButtonLoading={!!action.loading}
        columns={propsColumns}
        type={type}
        formRef={formRef}
        onSubmit={onSubmit}
        manualRequest={manualRequest}
        onReset={onReset}
        dateFormatter={rest.dateFormatter}
        search={search}
        form={rest.form}
        bordered={isBordered('search', cardBordered)}
      />
    );
  }, [
    action,
    beforeSearchSubmit,
    cardBordered,
    formRef,
    manualRequest,
    pagination,
    props,
    propsColumns,
    rest.dateFormatter,
    rest.form,
    search,
    setFormSearch,
    type,
  ]);

  /** 是不是 LightFilter, LightFilter 有一些特殊的处理 */
  const isLightFilter: boolean = search !== false && search?.filterType === 'light';

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const lightForm = useMemo(() => (isLightFilter ? searchNode : null), [
    isLightFilter,
    // eslint-disable-next-line react-hooks/exhaustive-deps
    isLightFilter && searchNode,
  ]);

  const className = classNames(defaultClassName, propsClassName);

  const toolbarDom = useMemo(() => {
    // 不展示 toolbar
    if (toolBarRender === false) {
      return null;
    }
    if (options === false && !headerTitle && !toolBarRender && !toolbar && !isLightFilter) {
      return null;
    }
    /** 根据表单类型的不同决定是否生成 toolbarProps */
    const toolbarProps = isLightFilter
      ? {
          filter: lightForm,
          ...toolbar,
        }
      : toolbar;

    const onSearch = (keyword: string) => {
      if (!options || !options.search) {
        return;
      }
      const { name = 'keyword' } = options.search === true ? {} : options.search;

      // 查询的时候的回到第一页
      action.setPageInfo({
        current: 1,
      });

      setFormSearch(
        omitUndefined({
          ...formSearch,
          _timestamp: Date.now(),
          [name]: keyword,
        }),
      );
    };
    return (
      <Toolbar<T>
        columns={tableColumn}
        options={options}
        headerTitle={headerTitle}
        action={actionRef}
        onSearch={onSearch}
        selectedRows={selectedRows}
        selectedRowKeys={selectedRowKeys}
        toolBarRender={toolBarRender}
        toolbar={toolbarProps}
      />
    );
  }, [
    action,
    formSearch,
    headerTitle,
    isLightFilter,
    lightForm,
    options,
    selectedRowKeys,
    selectedRows,
    setFormSearch,
    tableColumn,
    toolBarRender,
    toolbar,
  ]);

  /** 内置的多选操作栏 */
  const alertDom = propsRowSelection !== false && (
    <Alert<T>
      selectedRowKeys={selectedRowKeys}
      selectedRows={selectedRows}
      onCleanSelected={onCleanSelected}
      alertOptionRender={rest.tableAlertOptionRender}
      alertInfoRender={tableAlertRender}
    />
  );

  /** 如果所有列中的 filters=true| undefined 说明是用的是本地筛选 任何一列配置 filters=false，就能绕过这个判断 */
  const useLocaleFilter = propsColumns.every(
    (column) =>
      (column.filters === true && column.onFilter === true) ||
      (column.filters === undefined && column.onFilter === undefined),
  );

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
    size: counter.tableSize,
    rowSelection: propsRowSelection === false ? undefined : rowSelection,
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
      if (rest.onChange) {
        rest.onChange(changePagination, filters, sorter, extra);
      }
      if (!useLocaleFilter) {
        setProFilter(omitUndefined<any>(filters));
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
        setProSort(omitUndefined<any>(data));
      } else {
        setProSort(omitUndefined({ [`${sorter.field}`]: sorter.order as SortOrder }));
      }
    },
  });

  /** 如果有 ellipsis ，设置 tableLayout 为 fixed */
  const tableLayout = props.columns?.some((item) => item.ellipsis) ? 'fixed' : 'auto';

  /** 默认的 table dom，如果是编辑模式，外面还要包个 form */
  const baseTableDom =
    action.dataSource !== undefined || manualRequest ? (
      <Form
        component={false}
        form={props.editable?.form}
        onValuesChange={editableUtils.onValuesChange}
        key="table"
      >
        <Table<T> {...getTableProps()} rowKey={rowKey} tableLayout={tableLayout} />
      </Form>
    ) : (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          padding: 50,
        }}
      >
        <Spin size="large" />
      </div>
    );

  /** 自定义的 render */
  const tableDom = props.tableViewRender
    ? props.tableViewRender(
        {
          ...getTableProps(),
          rowSelection,
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
      id="ant-design-pro-table"
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

export default ProviderWarp;
