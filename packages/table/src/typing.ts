import type { ProCardProps } from '@ant-design/pro-card';
import type { ProFieldEmptyText } from '@ant-design/pro-field';
import type {
  LightWrapperProps,
  ProFormProps,
  QueryFilterProps,
} from '@ant-design/pro-form';
import type {
  ProCoreActionType,
  ProSchema,
  ProSchemaComponentTypes,
  ProTableEditableFnType,
  RowEditableConfig,
  SearchTransformKeyFn,
} from '@ant-design/pro-utils';
import type { SpinProps, TableProps } from 'antd';
import type { SizeType } from 'antd/lib/config-provider/SizeContext';
import type { LabelTooltipType } from 'antd/lib/form/FormItemLabel';
import type { NamePath } from 'antd/lib/form/interface';
import type { SearchProps } from 'antd/lib/input';
import type {
  ColumnFilterItem,
  ColumnType,
  CompareFn,
  SortOrder,
} from 'antd/lib/table/interface';
import type dayjs from 'dayjs';
import type React from 'react';
import type { CSSProperties } from 'react';
import type { ColumnsState, ContainerType } from './Store/Provide';
import type { AlertRenderType } from './components/Alert';
import type { SearchConfig, TableFormItem } from './components/Form/FormRender';
import type { ListToolBarProps } from './components/ListToolBar';
import type { OptionConfig, ToolBarProps } from './components/ToolBar';
import type { DensitySize } from './components/ToolBar/DensityIcon';

export type PageInfo = {
  pageSize: number;
  total: number;
  current: number;
};

export type RequestData<T> = {
  data: T[] | undefined;
  success?: boolean;
  total?: number;
} & Record<string, any>;

export type UseFetchDataAction<T = any> = {
  dataSource: T[];
  setDataSource: (dataSource: T[]) => void;
  loading: boolean | SpinProps | undefined;
  pageInfo: PageInfo;
  reload: () => Promise<void>;
  fullScreen?: () => void;
  reset: () => void;
  pollingLoading: boolean;
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
  counter: ReturnType<ContainerType>;
};

export type TableRowSelection = TableProps<any>['rowSelection'];

export type ExtraProColumnType<T> = Omit<
  ColumnType<T>,
  'render' | 'children' | 'title' | 'filters' | 'onFilter' | 'sorter'
> & {
  sorter?:
    | string
    | boolean
    | CompareFn<T>
    | {
        compare?: CompareFn<T>;
        /** Config multiple sorter order priority */
        multiple?: number;
      };
};

export type ProColumnType<T = unknown, ValueType = 'text'> = ProSchema<
  T,
  ExtraProColumnType<T> & {
    children?: ProColumns<T>[];
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

    /** @name 是否缩略 */
    ellipsis?: ColumnType<T>['ellipsis'];
    /** @name 是否拷贝 */
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

    /** @name 在 table 中隐藏 */
    hideInTable?: boolean;

    /** @name 在新建表单中删除 */
    hideInForm?: boolean;

    /** @name 不在配置工具中显示 */
    hideInSetting?: boolean;

    /** @name 表头的筛选菜单项 */
    filters?: boolean | ColumnFilterItem[];

    /** @name 筛选的函数，设置为 false 会关闭自带的本地筛选 */
    onFilter?: boolean | ColumnType<T>['onFilter'];

    /** @name Form 的排序 */
    order?: number;

    /** @name 可编辑表格是否可编辑 */
    editable?: boolean | ProTableEditableFnType<T>;

    /** @private */
    listKey?: string;

    /** @name 只读 */
    readonly?: boolean;

    /** @name 列设置的 disabled */
    disable?:
      | boolean
      | {
          checkbox: boolean;
        };
  },
  ProSchemaComponentTypes,
  ValueType,
  {
    lightProps?: LightWrapperProps;
  }
>;

export type ProColumns<T = any, ValueType = 'text'> = ProColumnType<
  T,
  ValueType
>;

export type BorderedType = 'search' | 'table';

export type Bordered =
  | boolean
  | {
      search?: boolean;
      table?: boolean;
    };

export type ColumnStateType = {
  /**
   * 持久化的类型，支持 localStorage 和 sessionStorage
   *
   * @param localStorage 设置在关闭浏览器后也是存在的
   * @param sessionStorage 关闭浏览器后会丢失
   */
  persistenceType?: 'localStorage' | 'sessionStorage';
  /** 持久化的key，用于存储到 storage 中 */
  persistenceKey?: string;
  /** ColumnsState 的值，columnsStateMap将会废弃 */
  defaultValue?: Record<string, ColumnsState>;
  /** ColumnsState 的值，columnsStateMap将会废弃 */
  value?: Record<string, ColumnsState>;
  onChange?: (map: Record<string, ColumnsState>) => void;
};

/** ProTable 的类型定义 继承自 antd 的 Table */
export type ProTableProps<DataSource, U, ValueType = 'text'> = {
  /**
   * @name 列配置能力，支持一个数组
   */
  columns?: ProColumns<DataSource, ValueType>[];
  /**
   * @name ListToolBar 的属性
   */
  toolbar?: ListToolBarProps;
  /**
   * @name 幽灵模式，即是否取消卡片内容区域的 padding 和 卡片的背景颜色。
   */
  ghost?: boolean;

  /**
   * request 的参数，修改之后会触发更新
   *
   * @example pathname 修改重新触发 request
   * params={{ pathName }}
   */
  params?: U;

  /**
   * 列状态配置，可以配置是否浮动和是否展示
   *
   * @deprecated 请使用 columnsState.value 代替
   */
  columnsStateMap?: Record<string, ColumnsState>;
  /**
   * 列状态配置修改触发事件
   *
   * @deprecated 请使用 columnsState.onChange 代替
   */
  onColumnsStateChange?: (map: Record<string, ColumnsState>) => void;

  /** @name 列状态的配置，可以用来操作列功能 */
  columnsState?: ColumnStateType;

  onSizeChange?: (size: DensitySize) => void;

  /**
   * @name table 外面卡片的设置
   */
  cardProps?: ProCardProps | false;

  /**
   * @name 渲染 table
   */
  tableRender?: (
    props: ProTableProps<DataSource, U, ValueType>,
    defaultDom: JSX.Element,
    /** 各个区域的 dom */
    domList: {
      toolbar: JSX.Element | undefined;
      alert: JSX.Element | undefined;
      table: JSX.Element | undefined;
    },
  ) => React.ReactNode;

  /**
   * @name 渲染 table 视图，用于定制 ProList，不推荐直接使用
   */
  tableViewRender?: (
    props: TableProps<DataSource>,
    defaultDom: JSX.Element,
  ) => JSX.Element | undefined;

  /**
   * @name table 和搜索表单之间的 dom 渲染
   *
   * @example 在table 上方增加一个统计表单
   *
   * tableExtraRender={()=> <Statistic title="统计" value={10} />}
   */
  tableExtraRender?: (
    props: ProTableProps<DataSource, U, ValueType>,
    dataSource: DataSource[],
  ) => React.ReactNode;

  /**
   * @name 渲染搜索表单
   */
  searchFormRender?: (
    props: ProTableProps<DataSource, U, ValueType>,
    defaultDom: JSX.Element,
  ) => React.ReactNode;

  /** @name 一个获得 dataSource 的方法 */
  request?: (
    params: U & {
      pageSize?: number;
      current?: number;
      keyword?: string;
    },
    sort: Record<string, SortOrder>,
    filter: Record<string, (string | number)[] | null>,
  ) => Promise<Partial<RequestData<DataSource>>>;

  /** @name 对数据进行一些处理 */
  postData?: any;
  /** @name 默认的数据 */
  defaultData?: DataSource[];

  /**
   * @name 初始化的参数，可以操作 table
   *
   * @example 重新刷新表格
   * actionRef.current?.reload();
   *
   * @example 重置表格
   * actionRef.current?.reset();
   */
  actionRef?: React.Ref<ActionType | undefined>;

  /**
   * @name 操作自带的 form
   */
  formRef?: TableFormItem<DataSource>['formRef'];
  /**
   * @name 渲染操作栏
   */
  toolBarRender?: ToolBarProps<DataSource>['toolBarRender'] | false;

  optionsRender?: ToolBarProps<DataSource>['optionsRender'];

  /**
   * @name 数据加载完成后触发
   */
  onLoad?: (dataSource: DataSource[]) => void;

  /**
   * @name loading 被修改时触发，一般是网络请求导致的
   */
  onLoadingChange?: (loading: boolean | SpinProps | undefined) => void;

  /**
   * @name 数据加载失败时触发
   */
  onRequestError?: (e: Error) => void;

  /**
   * 是否轮询 ProTable 它不会自动提交表单，如果你想自动提交表单的功能，需要在 onValueChange 中调用 formRef.current?.submit()
   * @property {number} polling 表示轮询的时间间隔，0 表示关闭轮询，大于 0 表示开启轮询，最小的轮询时间为 2000ms
   * @param dataSource 返回当前的表单数据，你可以用它判断要不要打开轮询
   */
  polling?: number | ((dataSource: DataSource[]) => number);

  /** @name 给封装的 table 的 className */
  tableClassName?: string;

  /** @name 给封装的 table 的 style */
  tableStyle?: CSSProperties;

  /** @name 左上角的 title */
  headerTitle?: React.ReactNode;

  /** @name 标题旁边的 tooltip */
  tooltip?: string | LabelTooltipType;

  /** @name 操作栏配置 */
  options?: OptionConfig | false;

  /**
   * @type SearchConfig
   * @name 是否显示搜索表单
   */
  search?: false | SearchConfig;

  /**
   * 基本配置与 antd Form 相同, 但是劫持了 form onFinish 的配置
   *
   * @name type="form" 和 搜索表单 的 Form 配置
   */
  form?: Omit<ProFormProps & QueryFilterProps, 'form'>;
  /**
   * 暂时只支持 dayjs - string 会格式化为 YYYY-DD-MM - number 代表时间戳
   *
   * @name 如何格式化日期
   */
  dateFormatter?:
    | (string & {})
    | 'string'
    | 'number'
    | ((value: dayjs.Dayjs, valueType: string) => string | number)
    | false;
  /** @name 格式化搜索表单提交数据 */
  beforeSearchSubmit?: (params: Partial<U>) => any;
  /**
   * 设置或者返回false 即可关闭
   *
   * @name 自定义 table 的 alert
   */
  tableAlertRender?: AlertRenderType<DataSource>;
  /**
   * 设置或者返回false 即可关闭
   *
   * @name 自定义 table 的 alert 的操作
   */
  tableAlertOptionRender?: AlertRenderType<DataSource>;

  /** @name 选择项配置 */
  rowSelection?:
    | (TableProps<DataSource>['rowSelection'] & {
        alwaysShowAlert?: boolean;
      })
    | false;

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
  /**
   * @name 编辑行相关的配置
   *
   * @example 支持多行编辑
   * editable={{type:"multiple"}}
   *
   * @example 保存的时候请求后端
   * editable={{ onSave:async (rows)=>{ await save(rows) } }}
   */
  editable?: RowEditableConfig<DataSource>;

  /**
   * @name 可编辑表格修改数据的改变
   */
  onDataSourceChange?: (dataSource: DataSource[]) => void;
  /** @name 查询表单和 Table 的卡片 border 配置 */
  cardBordered?: Bordered;
  /** @name 去抖时间 */
  debounceTime?: number;
  /**
   * 只在request 存在的时候生效，可编辑表格也不会生效
   *
   * @default true
   * @name 窗口聚焦时自动重新请求
   */
  revalidateOnFocus?: boolean;
  /** 默认的表格大小 */
  defaultSize?: SizeType;
  /**
   * @name, 可编辑表格的name,通过这个name 可以直接与 form通信，无需嵌套
   */
  name?: NamePath;
  /**
   * 错误边界自定义
   */
  ErrorBoundary?: React.ComponentClass<any, any> | false;
} & Omit<TableProps<DataSource>, 'columns' | 'rowSelection'>;

export type ActionType = ProCoreActionType & {
  fullScreen?: () => void;
  setPageInfo?: (page: Partial<PageInfo>) => void;
};

/**
 * 用于定义 useFetch 的参数类型
 * @typedef {Object} UseFetchProps
 * @property {any} [dataSource] - 数据源，可选参数
 * @property {UseFetchDataAction['loading']} loading - 数据加载状态，必须参数
 * @property {(loading: UseFetchDataAction['loading']) => void} [onLoadingChange] - 加载状态改变时的回调函数，可选参数
 * @property {(dataSource: any[], extra: any) => void} [onLoad] - 数据加载完成时的回调函数，可选参数
 * @property {(dataSource?: any) => void} [onDataSourceChange] - 数据源改变时的回调函数，可选参数
 * @property {any} postData - 发送到后端的数据，必须参数
 * @property {{current?: number; pageSize?: number; defaultCurrent?: number; defaultPageSize?: number;} | false} pageInfo - 分页信息，可选参数，false 表示不启用分页
 * @property {(pageInfo: PageInfo) => void} [onPageInfoChange] - 分页信息改变时的回调函数，可选参数
 * @property {any[]} [effects] - 依赖的其它 Hook 或其它变量，可选参数
 * @property {(e: Error) => void} [onRequestError] - 请求出错时的回调函数，可选参数
 * @property {boolean} manual - 是否手动触发请求，必须参数
 * @property {number} [debounceTime] - 延迟时间，可选参数，单位为毫秒
 * @property {number | ((dataSource: any[]) => number)} [polling] - 轮询时间，可选参数，单位为毫秒或一个返回时间的函数
 * @property {boolean} [revalidateOnFocus] - 是否在焦点回到页面时重新验证数据，可选参数
 */
export type UseFetchProps = {
  /**
   * 数据源
   * @type {any}
   */
  dataSource?: any;

  /**
   * 是否处于加载状态
   * @type {UseFetchDataAction['loading']}
   */
  loading: UseFetchDataAction['loading'];

  /**
   * 加载状态改变时的回调函数
   * @type {(loading: UseFetchDataAction['loading']) => void}
   */
  onLoadingChange?: (loading: UseFetchDataAction['loading']) => void;

  /**
   * 数据加载完成后的回调函数
   * @type {(dataSource: any[], extra: any) => void}
   */
  onLoad?: (dataSource: any[], extra: any) => void;

  /**
   * 数据源变化时的回调函数
   * @type {(dataSource?: any) => void}
   */
  onDataSourceChange?: (dataSource?: any) => void;

  /**
   * 请求时附带的数据
   * @type {any}
   */
  postData: (dataSource: any[]) => any[];

  /**
   * 分页信息
   * @type {{
   *   current?: number;
   *   pageSize?: number;
   *   defaultCurrent?: number;
   *   defaultPageSize?: number;
   * } | false}
   */
  pageInfo:
    | {
        current?: number;
        pageSize?: number;
        defaultCurrent?: number;
        defaultPageSize?: number;
      }
    | false;

  /**
   * 分页信息变化时的回调函数
   * @type {(pageInfo: PageInfo) => void}
   */
  onPageInfoChange?: (pageInfo: PageInfo) => void;

  /**
   * 请求相关的副作用
   * @type {any[]}
   */
  effects?: any[];

  /**
   * 请求出错时的回调函数
   * @type {(e: Error) => void}
   */
  onRequestError?: (e: Error) => void;

  /**
   * 是否手动触发请求
   * @type {boolean}
   */
  manual: boolean;

  /**
   * 请求防抖时间
   * @type {number}
   */
  debounceTime?: number;

  /**
   * 数据源轮询间隔时间或轮询触发条件
   * @type {number | ((dataSource: any[]) => number)}
   */
  polling?: number | ((dataSource: any[]) => number);

  /**
   * 是否在页面获得焦点时重新验证数据
   * @type {Boolean}
   */
  revalidateOnFocus?: boolean;
};

export type OptionSearchProps = Omit<SearchProps, 'onSearch'> & {
  /** 如果 onSearch 返回一个false，直接拦截请求 */
  onSearch?: (
    keyword: string,
  ) => Promise<boolean | undefined> | boolean | undefined;
};
