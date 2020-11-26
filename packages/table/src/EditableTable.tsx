import React, { useContext, useImperativeHandle, useRef } from 'react';
import { ParamsType } from '@ant-design/pro-provider';
import { Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { ButtonProps } from 'antd/lib/button';
import ProTable from './Table';
import { ProTableProps, ActionType } from './typing';

export type RecordCreatorProps<T> = {
  record: T;
  position?: 'start' | 'end';
};

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

  /**
   * @name 新建按钮的设置
   */
  recordCreatorProps?:
    | (RecordCreatorProps<T> &
        ButtonProps & {
          creatorButtonText?: React.ReactNode;
        })
    | false;
};

const EditableTableActionContext = React.createContext<
  React.MutableRefObject<ActionType | undefined> | undefined
>(undefined);

/**
 * 可编辑表格的按钮
 */
function RecordCreator<T = {}>(props: RecordCreatorProps<T> & { children: JSX.Element }) {
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
  const { value, onTableChange, onChange, recordCreatorProps, ...rest } = props;
  const actionRef = useRef<ActionType>();

  useImperativeHandle(rest.actionRef, () => actionRef.current, [actionRef.current]);

  const { record, position, creatorButtonText, ...restButtonProps } = recordCreatorProps || {};

  return (
    <EditableTableActionContext.Provider value={actionRef}>
      <>
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
        {recordCreatorProps !== false && (
          <RecordCreator record={record || {}} position={position}>
            <Button
              type="dashed"
              style={{
                display: 'block',
                margin: '12px 36px',
                width: 'calc(100% - 72px)',
              }}
              icon={<PlusOutlined />}
              {...restButtonProps}
            >
              {creatorButtonText || '添加一行数据'}
            </Button>
          </RecordCreator>
        )}
      </>
    </EditableTableActionContext.Provider>
  );
}

EditableTable.RecordCreator = RecordCreator;

export default EditableTable;
