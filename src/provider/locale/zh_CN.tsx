/**
 * zh-CN 是所有 locale 的**基准**：
 * - 其他 32 个 locale 文件通过 `import type { ProLocale } from './zh_CN'` 复用本文件推断出的类型
 * - 任何一个 locale 缺字段时，TS 会在编译期直接报错（而不是运行时静默 fallback）
 *
 * 新增文案的流程：先在此处加 key，再在各语言文件里补翻译，TS 会全程提示哪些文件还没补。
 */
const zhCN = {
  moneySymbol: '¥',
  deleteThisLine: '删除此项',
  copyThisLine: '复制此项',
  form: {
    lightFilter: {
      more: '更多筛选',
      clear: '清除',
      confirm: '确认',
      itemUnit: '项',
    },
  },
  tableForm: {
    search: '查询',
    reset: '重置',
    submit: '提交',
    collapsed: '展开',
    expand: '收起',
    inputPlaceholder: '请输入',
    selectPlaceholder: '请选择',
  },
  alert: {
    clear: '取消选择',
    selected: '已选择',
    item: '项',
  },
  pagination: {
    total: {
      range: '第',
      total: '条/总共',
      item: '条',
    },
  },
  tableToolBar: {
    leftPin: '固定在列首',
    rightPin: '固定在列尾',
    noPin: '不固定',
    leftFixedTitle: '固定在左侧',
    rightFixedTitle: '固定在右侧',
    noFixedTitle: '不固定',
    reset: '重置',
    columnDisplay: '列展示',
    columnSetting: '列设置',
    fullScreen: '全屏',
    exitFullScreen: '退出全屏',
    reload: '刷新',
    density: '密度',
    densityDefault: '正常',
    densityLarger: '宽松',
    densityMiddle: '中等',
    densitySmall: '紧凑',
  },
  stepsForm: {
    next: '下一步',
    prev: '上一步',
    submit: '提交',
  },
  loginForm: {
    submitText: '登录',
  },
  editableTable: {
    onlyOneLineEditor: '只能同时编辑一行',
    onlyAddOneLine: '只能同时新增一行',
    action: {
      save: '保存',
      cancel: '取消',
      delete: '删除',
      add: '添加一行数据',
    },
  },
  switch: {
    open: '打开',
    close: '关闭',
  },
} as const;

/** 所有 locale 共享的基准类型，由 zh-CN 推断得出。 */
export type ProLocale = {
  -readonly [K in keyof typeof zhCN]: typeof zhCN[K] extends Record<string, any>
    ? { -readonly [P in keyof typeof zhCN[K]]: any }
    : string;
};

export default zhCN;
