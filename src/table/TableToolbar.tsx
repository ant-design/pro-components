import React, { useMemo } from 'react';
import type { Key } from 'react';
import type { ActionType } from '.';
import type { ProTableProps } from './typing';
import Toolbar from './components/ToolBar';

export type TableToolbarProps<T extends Record<string, any>> = {
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

export function TableToolbar<T extends Record<string, any>>(
  props: TableToolbarProps<T>,
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
  } = props;

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

