import { MenuOutlined } from '@ant-design/icons';
import type { ParamsType } from '@ant-design/pro-provider';
import { ConfigProvider } from 'antd';
import useMergedState from 'rc-util/lib/hooks/useMergedState';
import React, { useCallback, useContext, useMemo, useRef } from 'react';
import { SortableHandle } from 'react-sortable-hoc';
import ProTable from '../../Table';
import type { ProColumns, ProTableProps } from '../../typing';
import { useDragSort } from '../../utils/useDragSort';
import { useStyle } from './style';

export type DragTableProps<T, U> = {
  /** @name 拖动排序列key值 如配置此参数，则会在该 key 对应的行显示拖拽排序把手，允许拖拽排序 */
  dragSortKey?: string;
  /** @name 渲染自定义拖动排序把手的函数 如配置了 dragSortKey 但未配置此参数，则使用默认把手图标 */
  dragSortHandlerRender?: (rowData: T, idx: number) => React.ReactNode;
  /** @name 拖动排序完成回调 */
  onDragSortEnd?: (newDataSource: T[]) => Promise<void> | void;
} & ProTableProps<T, U>;

// 用于创建可拖拽把手组件的工厂
const handleCreator = (handle: React.ReactNode) =>
  SortableHandle(() => <>{handle}</>);

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
    columns: propsColumns,
    defaultData,
    dataSource: originDataSource,
    onLoad,
    ...otherProps
  } = props;
  const { getPrefixCls } = useContext(ConfigProvider.ConfigContext);
  const [dataSource, setMergedDs] = useMergedState<T[]>(
    () => defaultData || [],
    {
      value: originDataSource as T[],
      onChange: onDataSourceChange,
    },
  );

  // 默认拖拽把手
  const DragHandle = useMemo(
    () =>
      handleCreator(
        <MenuOutlined className={getPrefixCls('pro-table-drag-icon')} />,
      ),
    [getPrefixCls],
  );

  const { wrapSSR } = useStyle(getPrefixCls('pro-table-drag-icon'));

  const isDragSortColumn = useCallback(
    (item: ProColumns<T, any>) => {
      return item.key === dragSortKey || item.dataIndex === dragSortKey;
    },
    [dragSortKey],
  );
  // 根据 dragSortKey 查找目标列配置
  const handleColumn = useMemo(() => {
    return propsColumns?.find((item) => isDragSortColumn(item));
  }, [propsColumns, isDragSortColumn]);

  // 记录原始列配置
  const originColumnRef = useRef<ProColumns<T, 'text'> | undefined>({
    ...handleColumn,
  });
  // 使用自定义hooks获取拖拽相关组件的components集合
  const { components } = useDragSort<T>({
    dataSource: dataSource?.slice(),
    dragSortKey,
    onDragSortEnd,
    components: props.components,
    rowKey,
  });

  // 重写列配置的render
  const columns: any = useMemo(() => {
    const originColumn = originColumnRef.current!;
    if (!handleColumn) return propsColumns;
    const dargRender = (...args: any[]) => {
      const [dom, rowData, index, action, schema] = args;
      const RealHandle = dragSortHandlerRender
        ? handleCreator(dragSortHandlerRender(rowData, index))
        : DragHandle;
      return (
        <div className={getPrefixCls('pro-table-drag-visible-cell')}>
          <>
            <RealHandle />
            {originColumn.render?.(dom, rowData, index, action, schema)}
          </>
        </div>
      );
    };
    // 重新生成数据
    return propsColumns?.map((item) => {
      if (!isDragSortColumn(item)) {
        return item;
      }
      return {
        ...item,
        render: dargRender,
      };
    });
  }, [
    DragHandle,
    dragSortHandlerRender,
    getPrefixCls,
    handleColumn,
    isDragSortColumn,
    propsColumns,
  ]);

  const wrapOnload = async (ds: T[]) => {
    setMergedDs(ds);
    return onLoad?.(ds);
  };

  return wrapSSR(
    handleColumn ? (
      <ProTable<T, U, ValueType>
        {...(otherProps as ProTableProps<T, U, ValueType>)}
        onLoad={wrapOnload}
        rowKey={rowKey}
        dataSource={dataSource}
        components={components}
        columns={columns}
        onDataSourceChange={onDataSourceChange}
      />
    ) : (
      /* istanbul ignore next */
      <ProTable<T, U, ValueType>
        {...(otherProps as ProTableProps<T, U, ValueType>)}
        onLoad={wrapOnload}
        rowKey={rowKey}
        dataSource={dataSource}
        columns={columns}
        onDataSourceChange={onDataSourceChange}
      />
    ),
  );
}

export default DragSortTable;
