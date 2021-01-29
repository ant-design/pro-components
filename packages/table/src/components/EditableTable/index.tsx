import React, { useContext, useImperativeHandle, useMemo, useRef } from 'react';
import type { ParamsType } from '@ant-design/pro-provider';
import type { ButtonProps } from 'antd';
import { Button } from 'antd';
import useMergedState from 'rc-util/lib/hooks/useMergedState';
import { PlusOutlined } from '@ant-design/icons';
import { runFunction } from '@ant-design/pro-utils';
import ProTable from '../../Table';
import type { ProTableProps, ActionType } from '../../typing';

export type RecordCreatorProps<T> = {
  record: T | ((index: number) => T);
  position?: 'top' | 'bottom';
  /**
   * 新增一行的类型
   *
   * @augments dataSource 将会新增一行数据到 dataSource 中，不支持取消，只能删除
   * @augments cache 将会把数据放到缓存中，取消后消失
   */
  newRecordType?: 'dataSource' | 'cache';
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
  /** Table 的值发生改变，为了适应 Form 调整了顺序 */
  onValuesChange?: (values: T[], record: T) => void;
};

const EditableTableActionContext = React.createContext<
  React.MutableRefObject<ActionType | undefined> | undefined
>(undefined);

/** 可编辑表格的按钮 */
function RecordCreator<T = {}>(props: RecordCreatorProps<T> & { children: JSX.Element }) {
  const { children, record, position, newRecordType } = props;
  const actionRef = useContext(EditableTableActionContext);
  return React.cloneElement(children, {
    ...children.props,
    onClick: (e: any) => {
      actionRef?.current?.addEditRecord(record, { position, newRecordType });
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

  const { record, position, creatorButtonText, newRecordType, ...restButtonProps } =
    recordCreatorProps || {};
  const isTop = position === 'top';
  const creatorButtonDom = useMemo(() => {
    if (maxLength && maxLength <= value?.length) {
      return false;
    }
    return (
      recordCreatorProps !== false && (
        <RecordCreator
          record={runFunction(record, value.length) || {}}
          position={position}
          newRecordType={newRecordType}
        >
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
            {props.tableViewRender?.(_, dom) ?? dom}
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
        editable={{
          ...props.editable,
          onValuesChange:
            props?.onValuesChange || props.editable?.onValuesChange
              ? (r: T, dataSource: T[]) => {
                  props.editable?.onValuesChange?.(r, dataSource);
                  props.onValuesChange?.(dataSource, r);
                }
              : undefined,
        }}
        onDataSourceChange={setValue}
      />
    </EditableTableActionContext.Provider>
  );
}

EditableTable.RecordCreator = RecordCreator;

export default EditableTable;
