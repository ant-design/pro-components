import React, { useContext, useEffect, useImperativeHandle, useMemo, useRef } from 'react';
import type { ParamsType } from '@ant-design/pro-provider';
import type { ButtonProps } from 'antd';
import { Button, Form } from 'antd';
import useMergedState from 'rc-util/lib/hooks/useMergedState';
import { PlusOutlined } from '@ant-design/icons';
import { runFunction } from '@ant-design/pro-utils';
import ProTable from '../../Table';
import type { ProTableProps, ActionType } from '../../typing';
import type { GetRowKey } from 'antd/lib/table/interface';

export type RecordCreatorProps<DataSourceType> = {
  record: DataSourceType | ((index: number, dataSource: DataSourceType[]) => DataSourceType);
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
  /** 是否受控，如果为 true，每次 value 更新都会重置表单 */
  controlled?: boolean;
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
function EditableTable<
  DataType extends Record<string, any>,
  Params extends ParamsType = ParamsType,
>(props: EditableProTableProps<DataType, Params>) {
  const { onTableChange, maxLength, recordCreatorProps, rowKey, controlled, ...rest } = props;
  const actionRef = useRef<ActionType>();
  const [form] = Form.useForm();
  // 设置 ref
  useImperativeHandle(rest.actionRef, () => actionRef.current);

  const [value, setValue] = useMergedState<DataType[]>(() => props.value || [], {
    value: props.value,
    onChange: props.onChange,
  });

  const getRowKey = React.useMemo<GetRowKey<DataType>>((): GetRowKey<DataType> => {
    if (typeof rowKey === 'function' && rowKey) {
      return rowKey;
    }
    return (record: DataType, index?: number) => (record as any)[rowKey as string] || index;
  }, [rowKey]);

  useEffect(() => {
    if (!props.controlled) return;
    value.forEach((current, index) => {
      form.setFieldsValue({
        [getRowKey(current, index)]: current,
      });
    }, {});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, props.controlled]);

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
          record={runFunction(record, value.length, value) || {}}
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
                <tr style={{ position: 'relative' }}>
                  {/* 占位 */}
                  <td colSpan={0} style={{ visibility: 'hidden' }}>
                    {creatorButtonDom}
                  </td>
                  <td
                    style={{ position: 'absolute', left: 0, width: '100%' }}
                    colSpan={rest.columns?.length}
                  >
                    {creatorButtonDom}
                  </td>
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isTop, creatorButtonDom]);

  return (
    <EditableTableActionContext.Provider value={actionRef}>
      <ProTable<DataType, Params>
        search={false}
        options={false}
        pagination={false}
        rowKey={rowKey}
        {...rest}
        {...buttonRenderProps}
        tableLayout="fixed"
        actionRef={actionRef}
        onChange={onTableChange}
        dataSource={value}
        editable={{
          form,
          ...props.editable,
          onValuesChange:
            props?.onValuesChange ||
            props.editable?.onValuesChange ||
            // 受控模式需要触发 onchange
            (props.controlled && props?.onChange)
              ? (r: DataType, dataSource: DataType[]) => {
                  props.editable?.onValuesChange?.(r, dataSource);
                  props.onValuesChange?.(dataSource, r);
                  if (props.controlled) {
                    props?.onChange?.(dataSource);
                  }
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
