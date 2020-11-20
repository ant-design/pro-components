import React from 'react';
import { ParamsType } from '@ant-design/pro-provider';
import { ProTableProps } from './typing';
import ProTable from './Table';

export type EditorProTableProps<T, U extends ParamsType> = Omit<ProTableProps<T, U>, 'onChange'> & {
  value?: T[];
  onChange?: (value: T[]) => void;
  /**
   * @name 原先的 table OnChange
   */
  onTableChange?: ProTableProps<T, U>['onChange'];
};

/**
 * 可以直接放到 Form 中的可编辑表格
 * @param props
 */
function EditorTable<T, U extends ParamsType = {}>(props: EditorProTableProps<T, U>) {
  const { value, onTableChange, onChange, ...rest } = props;
  return (
    <ProTable
      search={false}
      toolBarRender={false}
      options={false}
      pagination={false}
      {...rest}
      onChange={onTableChange}
      dataSource={value}
      onDataSourceChange={onChange}
    />
  );
}

export default EditorTable;
