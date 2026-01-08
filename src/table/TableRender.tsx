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
import classNames from 'clsx';
import React, { useContext, useMemo } from 'react';
import ProCard from '../card';
import ProForm, { GridContext } from '../form';
import { editableRowByKey, omitUndefined, recordKeyToString } from '../utils';
import { TableContext } from './Store/Provide';
import type { FilterValue, ProTableProps, UseFetchDataAction } from './typing';
import {
  flattenColumns,
  genColumnKey,
  getServerFilterResult,
  getServerSorterResult,
  isBordered,
} from './utils';

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

export function TableRender<T extends Record<string, any>, U, ValueType>(
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
    alertDom,
    style,
    cardProps: propsCardProps,
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
  const notNeedCardDom =
    props.search === false &&
    !props.headerTitle &&
    props.toolBarRender === false;

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

  const tableContentDom =
    props.editable && !props.name ? (
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
    propsCardProps,
    notNeedCardDom,
    name: props.name,
    hideToolbar,
    toolbarDom,
  });

  /** Table 区域的 dom，为了方便 render */
  const tableAreaDom =
    // cardProps 或者 有了name 就不需要这个padding了，不然会导致不好对齐
    propsCardProps === false || notNeedCardDom || !!props.name ? (
      tableContentDom
    ) : (
      <ProCard
        ghost={props.ghost}
        variant={isBordered('table', cardBordered) ? 'outlined' : 'borderless'}
        styles={{
          body: {
            ...cardBodyStyle,
            ...(propsCardProps && typeof propsCardProps === 'object'
              ? propsCardProps.styles?.body || propsCardProps.bodyStyle
              : {}),
          },
          ...(propsCardProps &&
          typeof propsCardProps === 'object' &&
          (propsCardProps.styles?.header || propsCardProps.headStyle)
            ? {
                header:
                  propsCardProps.styles?.header || propsCardProps.headStyle,
              }
            : {}),
        }}
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
