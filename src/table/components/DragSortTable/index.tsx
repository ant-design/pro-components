import { HolderOutlined } from '@ant-design/icons';
import { useControlledState } from '@rc-component/util';
import { ConfigProvider } from 'antd';
import { clsx } from 'clsx';
import React, { useContext, useMemo } from 'react';
import type { ParamsType } from '../../../provider';
import { useRefFunction } from '../../../utils';
import ProTable from '../../Table';
import type { ProTableProps } from '../../typing';
import { resolveTableViewDefaultDom } from '../../utils';
import { useDragSort } from '../../utils/useDragSort';
import { useStyle } from './style';

export type DragTableProps<T, U> = {
  /** @name 拖动排序列key值 如配置此参数，则会在该 key 对应的行显示拖拽排序把手，允许拖拽排序 */
  dragSortKey?: string;
  /** @name 渲染自定义拖动排序把手的函数 如配置了 dragSortKey 但未配置此参数，则使用默认把手图标 */
  dragSortHandlerRender?: (rowData: T, idx: number) => React.ReactNode;
  /** @name 拖动排序完成回调 */
  onDragSortEnd?: (
    beforeIndex: number,
    afterIndex: number,
    newDataSource: T[],
  ) => Promise<void> | void;
} & ProTableProps<T, U>;

function DragSortTable<
  T extends Record<string, any>,
  U extends ParamsType = ParamsType,
  ValueType = 'text',
>(props: DragTableProps<T, U>) {
  const {
    rowKey,
    dragSortKey,
    dragSortHandlerRender,
    onDragSortEnd,
    onDataSourceChange,
    defaultData,
    dataSource: originDataSource,
    onLoad,
    ...otherProps
  } = props;
  const { getPrefixCls } = useContext(ConfigProvider.ConfigContext);
  const [dataSource, setDataSourceInner] = useControlledState<T[]>(
    () => defaultData || [],
    originDataSource as T[],
  );
  const setDataSource = useRefFunction(
    (updater: T[] | ((prev: T[]) => T[])) => {
      setDataSourceInner((prev) => {
        const next =
          typeof updater === 'function'
            ? (updater as (p: T[]) => T[])(prev)
            : updater;
        // 使用 queueMicrotask 延迟回调，避免在渲染期间更新其他组件状态
        queueMicrotask(() => {
          onDataSourceChange?.(next);
        });
        return next;
      });
    },
  );

  const { wrapSSR, hashId } = useStyle(getPrefixCls('pro-table-drag'));

  const wrapOnload = useRefFunction(async (ds: T[]) => {
    setDataSource(ds);
    return onLoad?.(ds);
  });

  // 用 useMemo 稳定 DragHandle 组件身份：deps 包含所有闭包变量
  const DragHandle = useMemo(() => {
    const dragHandlePrefixCls = getPrefixCls('pro-table-drag-icon');
    return function DragHandleInner(dragHandleProps: any) {
      const {
        rowData: _rowData,
        index: _index,
        className,
        ...rest
      } = dragHandleProps;
      const defaultDom = (
        <HolderOutlined
          {...rest}
          className={clsx(dragHandlePrefixCls, className, hashId)}
        />
      );
      const handel = dragSortHandlerRender
        ? dragSortHandlerRender(
            dragHandleProps?.rowData,
            dragHandleProps?.index,
          )
        : defaultDom;
      return <div {...rest}>{handel}</div>;
    };
  }, [getPrefixCls, hashId, dragSortHandlerRender]);

  const processedColumns = useMemo(
    () =>
      otherProps.columns?.map((item): any => {
        if (item.dataIndex == dragSortKey || item.key === dragSortKey) {
          return { ...item, render: item.render ?? (() => null) };
        }
        return item;
      }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [otherProps.columns, dragSortKey],
  );

  // 使用自定义hooks获取拖拽相关组件的components集合
  const { components, DndContext } = useDragSort<T>({
    dataSource: dataSource?.slice(),
    dragSortKey,
    onDragSortEnd,
    components: props.components,
    rowKey,
    DragHandle,
  });

  return wrapSSR(
    <ProTable<T, U, ValueType>
      {...(otherProps as ProTableProps<T, U, ValueType>)}
      columns={processedColumns}
      onLoad={wrapOnload}
      rowKey={rowKey}
      tableViewRender={(_, defaultDom) => {
        return (
          <DndContext>{resolveTableViewDefaultDom(defaultDom)}</DndContext>
        );
      }}
      dataSource={dataSource}
      components={components}
      onDataSourceChange={onDataSourceChange}
    />,
  );
}

export default DragSortTable;
