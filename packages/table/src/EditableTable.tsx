import React, { useContext, useImperativeHandle, useRef } from 'react';
import { ParamsType } from '@ant-design/pro-provider';
import { ProTableProps } from './typing';
import ProTable from './Table';
import { ActionType } from '.';

export type EditableProTableProps<T, U extends ParamsType> = Omit<
  ProTableProps<T, U>,
  'onChange'
> & {
  value?: T[];
  onChange?: (value: T[]) => void;
  /**
   * @name 原先的 table OnChange
   */
  onTableChange?: ProTableProps<T, U>['onChange'];
};

const EditableTableActionContext = React.createContext<
  React.MutableRefObject<ActionType | undefined> | undefined
>(undefined);

/**
 * 可编辑表格的按钮
 */
function RecordCreator<T = {}>(props: {
  record: T;
  position?: 'start' | 'end';
  children: JSX.Element;
}) {
  const { children, record, position } = props;
  const actionRef = useContext(EditableTableActionContext);
  return React.cloneElement(children, {
    ...children.props,
    onClick: (e: any) => {
      actionRef?.current?.addEditRecord(record, { position });
      children.props.onClick?.(e);
    },
  });
}

/**
 * 可以直接放到 Form 中的可编辑表格
 * @param props
 */
function EditableTable<T, U extends ParamsType = {}>(props: EditableProTableProps<T, U>) {
  const { value, onTableChange, onChange, ...rest } = props;
  const actionRef = useRef<ActionType>();

  useImperativeHandle(rest.actionRef, () => actionRef.current, [actionRef.current]);

  return (
    <EditableTableActionContext.Provider value={actionRef}>
      <ProTable
        search={false}
        toolBarRender={false}
        options={false}
        pagination={false}
        {...rest}
        actionRef={actionRef}
        onChange={onTableChange}
        dataSource={value}
        onDataSourceChange={onChange}
      />
    </EditableTableActionContext.Provider>
  );
}

EditableTable.RecordCreator = RecordCreator;

export default EditableTable;
