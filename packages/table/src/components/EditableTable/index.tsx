import React, { useContext, useImperativeHandle, useMemo, useRef } from 'react';
import type { ParamsType } from '@ant-design/pro-provider';
import { Button } from 'antd';
import useMergedState from 'rc-util/lib/hooks/useMergedState';
import { PlusOutlined } from '@ant-design/icons';
import type { ButtonProps } from 'antd/lib/button';
import ProTable from '../../Table';
import type { ProTableProps, ActionType } from '../../typing';

export type RecordCreatorProps<T> = {
  record: T;
  position?: 'top' | 'bottom';
};

export type EditableProTableProps<T, U extends ParamsType> = Omit<
  ProTableProps<T, U>,
  'onChange'
> & {
  value?: T[];
  onChange?: (value: T[]) => void;
  /** @name 原先的 table OnChange */
  onTableChange?: ProTableProps<T, U>['onChange'];

  /** @name 新建按钮的设置 */
  recordCreatorProps?:
    | (RecordCreatorProps<T> &
        ButtonProps & {
          creatorButtonText?: React.ReactNode;
        })
    | false;
  /** 最大行数 */
  maxLength?: number;
};

const EditableTableActionContext = React.createContext<
  React.MutableRefObject<ActionType | undefined> | undefined
>(undefined);

/** 可编辑表格的按钮 */
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
 *
 * @param props
 */
function EditableTable<T extends Record<string, any>, U extends ParamsType = ParamsType>(
  props: EditableProTableProps<T, U>,
) {
  const { onTableChange, maxLength, recordCreatorProps, ...rest } = props;
  const actionRef = useRef<ActionType>();
  useImperativeHandle(rest.actionRef, () => actionRef.current, [actionRef.current]);

  const [value, setValue] = useMergedState<T[]>(() => props.value || [], {
    value: props.value,
    onChange: props.onChange,
  });

  const { record, position, creatorButtonText, ...restButtonProps } = recordCreatorProps || {};
  const isTop = position === 'top';
  const creatorButtonDom = useMemo(() => {
    if (maxLength && maxLength <= value?.length) {
      return false;
    }
    return (
      recordCreatorProps !== false && (
        <RecordCreator record={record || {}} position={position}>
          <Button
            type="dashed"
            style={{
              display: 'block',
              margin: '10px 0',
              width: '100%',
            }}
            icon={<PlusOutlined />}
            {...restButtonProps}
          >
            {creatorButtonText || '添加一行数据'}
          </Button>
        </RecordCreator>
      )
    );
  }, [recordCreatorProps, maxLength, value.length]);

  const buttonRenderProps = useMemo(() => {
    if (!creatorButtonDom) {
      return {};
    }
    if (isTop) {
      return {
        components: {
          header: {
            wrapper: ({
              className,
              children,
            }: {
              className: string;
              children: React.ReactNode;
            }) => (
              <thead className={className}>
                {children}
                <tr>
                  <td colSpan={rest.columns?.length}>{creatorButtonDom}</td>
                </tr>
              </thead>
            ),
          },
        },
      };
    }
    return {
      tableViewRender: (_: any, dom: any) => {
        return (
          <>
            {dom}
            {creatorButtonDom}
          </>
        );
      },
    };
  }, [isTop, creatorButtonDom]);

  return (
    <EditableTableActionContext.Provider value={actionRef}>
      <ProTable<T, U>
        search={false}
        options={false}
        pagination={false}
        {...rest}
        {...buttonRenderProps}
        tableLayout="fixed"
        actionRef={actionRef}
        onChange={onTableChange}
        dataSource={value}
        onDataSourceChange={setValue}
      />
    </EditableTableActionContext.Provider>
  );
}

EditableTable.RecordCreator = RecordCreator;

export default EditableTable;
