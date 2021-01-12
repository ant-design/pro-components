import type { ProFieldEmptyText } from '@ant-design/pro-field';
import type { ProFormProps, QueryFilterProps } from '@ant-design/pro-form';
import type { ParamsType } from '@ant-design/pro-provider';
import type {
  ProCoreActionType,
  ProSchema,
  ProSchemaComponentTypes,
  SearchTransformKeyFn,
  ProTableEditableFnType,
  RowEditableConfig,
} from '@ant-design/pro-utils';
import type { CardProps } from 'antd/lib/card';
import type { SpinProps } from 'antd/lib/spin';
import type { TableProps } from 'antd/lib/table';

import type { ColumnFilterItem, ColumnType, SortOrder } from 'antd/lib/table/interface';
import type { CSSProperties } from 'react';
import type { AlertRenderType } from './components/Alert';
import type { ListToolBarProps } from './components/ListToolBar';
import type { OptionConfig, ToolBarProps } from './components/ToolBar';
import type { DensitySize } from './components/ToolBar/DensityIcon';
import type { ColumnsState, useContainer } from './container';
import type { SearchConfig, TableFormItem } from './components/Form';

export type PageInfo = {
  page: number;
  pageSize: number;
  total: number;
};

export type RequestData<T> = {
  data: T[];
  success?: boolean;
  total?: number;
  [key: string]: any;
};
export type UseFetchDataAction<T extends RequestData<any>> = {
  dataSource: T['data'];
  setDataSource: (dataSource: T['data']) => void;
  loading: boolean | SpinProps | undefined;
  current: number;
  pageSize: number;
  total: number;
  reload: () => Promise<void>;
  fullScreen?: () => void;
  resetPageIndex: () => void;
  reset: () => void;
  setPageInfo: (pageInfo: Partial<PageInfo>) => void;
};

/** 转化列的定义 */
export type ColumnRenderInterface<T> = {
  item: ProColumns<T>;
  text: any;
  row: T;
  index: number;
  columnEmptyText?: ProFieldEmptyText;
  type: ProSchemaComponentTypes;
  counter: ReturnType<typeof useContainer>;
};

export type TableRowSelection = TableProps<any>['rowSelection'];

export type ExtraProColumnType<T> = Omit<
  ColumnType<T>,
  'render' | 'children' | 'title' | 'filters' | 'onFilter'
>;

export type ProColumnType<T = unknown, ValueType = 'text'> = ProSchema<
  T,
  ExtraProColumnType<T> & {
    index?: number;

    /**
     * 每个表单占据的格子大小
     *
     * @param 总宽度 = span* colSize
     * @param 默认为 1
     */
    colSize?: number;

    /** 搜索表单的默认值 */
    initialValue?: any;

    /** 是否缩略 */
    ellipsis?: boolean;
    /** 是否拷贝 */
    copyable?: boolean;

    /** @deprecated Use `search=false` instead 在查询表单中隐藏 */
    hideInSearch?: boolean;

    /** 在查询表单中隐藏 */
    search?:
      | false
      | {
          /**
           * Transform: (value: any) => ({ startTime: value[0], endTime: value[1] }),
           *
           * @name 转化值的key, 一般用于事件区间的转化
           */
          transform: SearchTransformKeyFn;
        };

    /** 在 table 中隐藏 */
    hideInTable?: boolean;

    /** 在新建表单中删除 */
    hideInForm?: boolean;

    /** 表头的筛选菜单项 */
    filters?: boolean | ColumnFilterItem[];

    /** 筛选的函数，设置为 false 会关闭自带的本地筛选 */
    onFilter?: boolean | ColumnType<T>['onFilter'];

    /** Form 的排序 */
    order?: number;
    /** 可编辑表格是否可编辑 */
    editable?: boolean | ProTableEditableFnType<T>;
  },
  ProSchemaComponentTypes,
  ValueType
>;

export type ProColumnGroupType<RecordType, ValueType> = {
  children: ProColumns<RecordType>[];
} & ProColumnType<RecordType, ValueType>;

export type ProColumns<T = any, ValueType = 'text'> =
  | ProColumnGroupType<T, ValueType>
  | ProColumnType<T, ValueType>;

export type BorderedType = 'search' | 'table';

export type Bordered =
  | boolean
  | {
      search?: boolean;
      table?: boolean;
    };

/** ProTable 的类型定义 继承自 antd 的 Table */
export type ProTableProps<T, U extends ParamsType, ValueType = 'text'> = {
  columns?: ProColumns<T, ValueType>[];
  /** @name ListToolBar 的属性 */
  toolbar?: ListToolBarProps;
  params?: U;

  columnsStateMap?: Record<string, ColumnsState>;

  onColumnsStateChange?: (map: Record<string, ColumnsState>) => void;

  onSizeChange?: (size: DensitySize) => void;

  /** @name table 外面卡片的设置 */
  cardProps?: CardProps;

  /** @name 渲染 table */
  tableRender?: (
    props: ProTableProps<T, U, ValueType>,
    defaultDom: JSX.Element,
    /** 各个区域的 dom */
    domList: {
      toolbar: JSX.Element | undefined;
      alert: JSX.Element | undefined;
      table: JSX.Element | undefined;
    },
  ) => React.ReactNode;

  /** @name 渲染 table 视图，用于定制 ProList，不推荐直接使用 */
  tableViewRender?: (props: TableProps<T>, defaultDom: JSX.Element) => JSX.Element | undefined;

  tableExtraRender?: (props: ProTableProps<T, U>, dataSource: T[]) => React.ReactNode;

  /** @name 一个获得 dataSource 的方法 */
  request?: (
    params: U & {
      pageSize?: number;
      current?: number;
      keyword?: string;
    },
    sort: Record<string, SortOrder>,
    filter: Record<string, React.ReactText[]>,
  ) => Promise<RequestData<T>>;

  /** @name 对数据进行一些处理 */
  postData?: (data: any[]) => any[];
  /** @name 默认的数据 */
  defaultData?: T[];

  /** @name 初始化的参数，可以操作 table */
  actionRef?: React.MutableRefObject<ActionType | undefined> | ((actionRef: ActionType) => void);

  /** @name 操作自带的 form */
  formRef?: TableFormItem<T>['formRef'];
  /** @name 渲染操作栏 */
  toolBarRender?: ToolBarProps<T>['toolBarRender'] | false;

  /** @name 数据加载完成后触发 */
  onLoad?: (dataSource: T[]) => void;

  /** @name loading 被修改时触发，一般是网络请求导致的 */
  onLoadingChange?: (loading: boolean | SpinProps | undefined) => void;

  /** @name 数据加载失败时触发 */
  onRequestError?: (e: Error) => void;

  /** @name 给封装的 table 的 className */
  tableClassName?: string;

  /** @name 给封装的 table 的 style */
  tableStyle?: CSSProperties;

  /** @name 左上角的 title */
  headerTitle?: React.ReactNode;

  /** @name 操作栏配置 */
  options?: OptionConfig | false;
  /** @name 是否显示搜索表单 */
  search?: false | SearchConfig;

  /**
   * 基本配置与 antd Form 相同, 但是劫持了 form 的配置
   *
   * @name type="form" 和 搜索表单 的 Form 配置
   */
  form?: Omit<ProFormProps & QueryFilterProps, 'form'>;
  /**
   * 暂时只支持 moment - string 会格式化为 YYYY-DD-MM - number 代表时间戳
   *
   * @name 如何格式化日期
   */
  dateFormatter?: 'string' | 'number' | false;
  /** @name 格式化搜索表单提交数据 */
  beforeSearchSubmit?: (params: Partial<U>) => any;
  /**
   * 设置或者返回false 即可关闭
   *
   * @name 自定义 table 的 alert
   */
  tableAlertRender?: AlertRenderType<T>;
  /**
   * 设置或者返回false 即可关闭
   *
   * @name 自定义 table 的 alert 的操作
   */
  tableAlertOptionRender?: AlertRenderType<T>;

  /** @name 选择想配置 */
  rowSelection?: TableProps<T>['rowSelection'] | false;

  style?: React.CSSProperties;

  /** 支持 ProTable 的类型 */
  type?: ProSchemaComponentTypes;

  /** @name 提交表单时触发 */
  onSubmit?: (params: U) => void;

  /** @name 重置表单时触发 */
  onReset?: () => void;

  /** @name 空值时显示 */
  columnEmptyText?: ProFieldEmptyText;

  /** @name 是否手动触发请求 */
  manualRequest?: boolean;
  /** @name 编辑行相关的配置 */
  editable?: RowEditableConfig<T>;

  /** @name 可编辑表格修改数据的改变 */
  onDataSourceChange?: (dataSource: T[]) => void;
  /** @name 查询表单和 Table 的卡片 border 配置 */
  cardBordered?: Bordered;
} & Omit<TableProps<T>, 'columns' | 'rowSelection'>;

export type ActionType = ProCoreActionType & {
  fullScreen?: () => void;
};
