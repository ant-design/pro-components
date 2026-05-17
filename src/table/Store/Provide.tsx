import { useControlledState } from '@rc-component/util';
import type { TableColumnType } from 'antd';
import merge from 'lodash-es/merge';
import { createContext, useEffect, useMemo, useRef, useState } from 'react';
import { useRefFunction } from '../../utils';
import type { DensitySize } from '../components/ToolBar/DensityIcon';
import type { ProTableProps } from '../index';
import type { ActionType, ProColumns } from '../typing';
import { genColumnKey } from '../utils';

export type ColumnsState = {
  show?: boolean;
  fixed?: 'right' | 'left' | undefined;
  order?: number;
  disable?:
    | boolean
    | {
        checkbox: boolean;
      };
};

export type ProTableColumn<T> = ColumnsState & TableColumnType<T>;

export type UseContainerProps<T = any> = {
  size?: DensitySize;
  defaultSize?: DensitySize;
  onSizeChange?: (size: DensitySize) => void;
  columns?: ProTableColumn<T>[] | ProColumns<T, T>[];
  columnsState?: ProTableProps<any, any, any>['columnsState'];
};

function useContainer(props: UseContainerProps = {}) {
  const actionRef = useRef<ActionType>();
  const rootDomRef = useRef<HTMLDivElement>(null);
  /** 父 form item 的 name */
  const prefixNameRef = useRef<any>();

  /** 自己 props 的引用 */
  const propsRef = useRef<ProTableProps<any, any, any>>();

  // 共享状态比较难，就放到这里了
  const [keyWords, setKeyWords] = useState<string | undefined>('');
  // 用于排序的数组
  const sortKeyColumns = useRef<string[]>([]);

  const [tableSize, setTableSizeInner] = useControlledState<DensitySize>(
    () => props.size || props.defaultSize || 'middle',
    props.size,
  );
  const setTableSize = useRefFunction(
    (updater: DensitySize | ((prev: DensitySize) => DensitySize)) => {
      setTableSizeInner((prev) => {
        const next =
          typeof updater === 'function'
            ? (updater as (p: DensitySize) => DensitySize)(prev)
            : updater;
        props.onSizeChange?.(next);
        return next;
      });
    },
  );

  /** 默认全选中 */
  const defaultColumnKeyMap = useMemo(() => {
    if (props?.columnsState?.defaultValue)
      return props.columnsState.defaultValue;
    const columnKeyMap = {} as Record<string, any>;
    props.columns?.forEach(({ key, dataIndex, fixed, disable }, index) => {
      const columnKey = genColumnKey(key ?? (dataIndex as React.Key), index);
      if (columnKey) {
        columnKeyMap[columnKey] = {
          show: true,
          fixed,
          disable,
        };
      }
    });
    return columnKeyMap;
  }, [props.columns]);

  const [columnsMap, setColumnsMapInner] = useControlledState<
    Record<string, ColumnsState>
  >(() => {
    const { persistenceType, persistenceKey } = props.columnsState || {};

    if (persistenceKey && persistenceType && typeof window !== 'undefined') {
      /** 从持久化中读取数据 */
      const storage = window[persistenceType];
      try {
        const storageValue = storage?.getItem(persistenceKey);
        if (storageValue) {
          if (props?.columnsState?.defaultValue) {
            // 实际生产中，defaultValue往往作为系统方默认配置，则优先级不应高于用户配置的storageValue
            return merge(
              {},
              props?.columnsState?.defaultValue,
              JSON.parse(storageValue),
            );
          }
          return JSON.parse(storageValue);
        }
      } catch (error) {
        console.warn(error);
      }
    }
    return (
      props.columnsState?.value ||
      props.columnsState?.defaultValue ||
      defaultColumnKeyMap
    );
  }, props.columnsState?.value);
  const onColumnsMapChange = props.columnsState?.onChange;
  const setColumnsMap = useRefFunction(
    (
      updater:
        | Record<string, ColumnsState>
        | ((
            prev: Record<string, ColumnsState>,
          ) => Record<string, ColumnsState>),
    ) => {
      setColumnsMapInner((prev) => {
        const next =
          typeof updater === 'function'
            ? (
                updater as (
                  p: Record<string, ColumnsState>,
                ) => Record<string, ColumnsState>
              )(prev)
            : updater;
        onColumnsMapChange?.(next);
        return next;
      });
    },
  );

  /**
   * 配置或列更改时对 columnsMap 重新赋值。
   *
   * 协议（被 `tests/table/dynamic-columns-state.test.tsx#51 columnSetting
   * columnsState.persistenceKey change` 明确锁定）：
   *   - persistenceKey / persistenceType 切换到新键时，
   *     - 新键 storage 中已有数据 → 用 storage 数据（含 defaultValue merge）覆盖；
   *     - 新键 storage 中无数据 → 必须把 columnsMap 重置回 defaultColumnKeyMap，
   *       不能保留旧键的修改痕迹。这是「切到新表/新场景应该用默认值打底」
   *       的有意行为，不是 bug。
   *   - defaultColumnKeyMap（依赖 props.columns）重算时同样按上述规则同步。
   *
   * 历史教训：曾经把 else 分支当成「覆盖用户修改」的 bug 删除，
   * 立刻击穿上面的测试用例（rerender 切 persistenceKey 后新键应回到默认全选）。
   * 不要再误判这是 bug。
   */
  useEffect(() => {
    const { persistenceType, persistenceKey, defaultValue } =
      props.columnsState || {};

    if (!persistenceKey || !persistenceType || typeof window === 'undefined') {
      return;
    }

    /** 从持久化中读取数据 */
    const storage = window[persistenceType];
    try {
      const storageValue = storage?.getItem(persistenceKey);
      if (!storageValue) {
        // 切到新的 persistenceKey 且 storage 中没有数据时，回退到默认值
        // （不能保留旧键的修改痕迹，详见上方注释）
        setColumnsMap(defaultColumnKeyMap);
        return;
      }
      if (defaultValue) {
        // defaultValue 作为系统方默认配置，优先级低于用户在 storage 中的修改
        setColumnsMap(merge({}, defaultValue, JSON.parse(storageValue)));
      } else {
        setColumnsMap(JSON.parse(storageValue));
      }
    } catch (error) {
      console.warn(error);
    }
  }, [
    props.columnsState?.persistenceKey,
    props.columnsState?.persistenceType,
    defaultColumnKeyMap,
  ]);

  /** 清空一下当前的 key */
  const clearPersistenceStorage = useRefFunction(() => {
    const { persistenceType, persistenceKey } = props.columnsState || {};

    if (!persistenceKey || !persistenceType || typeof window === 'undefined')
      return;

    /** 给持久化中设置数据 */
    const storage = window[persistenceType];
    try {
      storage?.removeItem(persistenceKey);
    } catch (error) {
      console.warn(error);
    }
  });

  useEffect(() => {
    if (
      !props.columnsState?.persistenceKey ||
      !props.columnsState?.persistenceType
    ) {
      return;
    }
    if (typeof window === 'undefined') return;
    /** 给持久化中设置数据 */
    const { persistenceType, persistenceKey } = props.columnsState;
    const storage = window[persistenceType];
    try {
      storage?.setItem(persistenceKey, JSON.stringify(columnsMap));
    } catch (error) {
      console.warn(error);
      clearPersistenceStorage();
    }
  }, [
    props.columnsState?.persistenceKey,
    columnsMap,
    props.columnsState?.persistenceType,
  ]);
  /**
   * Context value：暴露给所有 useContext(TableContext) 的消费者。
   *
   * 注意三点设计：
   * 1. `action` / `prefixName` / `sortKeyColumns` 用 ES6 getter 暴露 ref 的当前值，
   *    保证消费者每次读取都能拿到最新值（ref 写入不会触发重渲染，但读取必须实时）。
   *    使用 getter 语法而非 Object.defineProperty，让 TS 推导出的字段类型与 runtime
   *    行为一致（避免 IDE 类型提示停留在首次值）。
   * 2. `setSortKeyColumns` / `setPrefixName` 对外是 mutator 函数 API，内部直接写
   *    对应 ref，不触发重渲染。这是有意的协议，请勿改成 useState。
   * 3. 不要把 `props.columns` 放进 context —— 所有消费者都直接从 `props.columns`
   *    或 `columnsMap` 拿数据，加进来只会让 context value 因 columns 引用频繁变化
   *    而触发整片消费者无意义重渲染。
   */
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const renderValue = useMemo(
    () => ({
      setAction: (newAction?: ActionType) => {
        actionRef.current = newAction;
      },
      setSortKeyColumns: (keys: string[]) => {
        sortKeyColumns.current = keys;
      },
      propsRef,
      columnsMap,
      keyWords,
      setKeyWords,
      setTableSize,
      tableSize,
      setPrefixName: (name: any) => {
        prefixNameRef.current = name;
      },
      setColumnsMap,
      rootDomRef,
      clearPersistenceStorage,
      defaultColumnKeyMap,
      get action() {
        return actionRef.current;
      },
      get prefixName(): string {
        return prefixNameRef.current;
      },
      get sortKeyColumns(): string[] {
        return sortKeyColumns.current;
      },
    }),
    // setTableSize / setColumnsMap / clearPersistenceStorage 均为 useRefFunction，引用永远稳定
    // propsRef / rootDomRef 是 useRef，引用永远稳定，不需要加入 deps
    // setKeyWords 是 useState setter，引用永远稳定
    // 只有真正的 state 值变化才需要重建 context value
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [columnsMap, keyWords, tableSize, defaultColumnKeyMap],
  );

  return renderValue;
}
type ContainerReturnType = ReturnType<ContainerType>;

const TableContext = createContext<ContainerReturnType>({} as any);

export type ContainerType = typeof useContainer;

const TableProvider: React.FC<{
  initValue: UseContainerProps<any>;
  children: React.ReactNode;
}> = (props) => {
  const value = useContainer(props.initValue);
  return (
    <TableContext.Provider value={value}>
      {props.children}
    </TableContext.Provider>
  );
};

/**
 * @deprecated 使用 `TableProvider` 替代。`Container` 命名过于通用，与
 * antd Card.Container / 各种 IoC Container 重名严重，已重命名为 `TableProvider`。
 * 本别名仅用于向后兼容，将在后续主版本中移除。
 */
const Container = TableProvider;

export { Container, TableContext, TableProvider };
