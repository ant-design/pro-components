/**
 * Demo 共享 Mock 数据模块
 * 提供确定性的演示数据，避免 Math.random() 和 Date.now() 导致的快照不稳定
 *
 * 场景：微服务应用管理平台（DevOps 运维场景）
 */
import dayjs from 'dayjs';

/** 固定基准时间戳，用于确定性日期展示 */
export const FIXED_BASE_TIMESTAMP = dayjs('2024-01-15 10:00:00').valueOf();

/** 固定基准日期 */
export const FIXED_BASE_DATE = dayjs('2024-01-15');

// ============================
// 人员数据
// ============================

/** 创建者列表（阿里花名风格） */
export const DEMO_CREATORS = [
  '书琰',
  '逄一',
  '期贤',
  '玄霜',
  '怀渊',
] as const;

/** 创建者列 valueEnum */
export const DEMO_CREATOR_VALUE_ENUM = {
  all: { text: '全部' },
  书琰: { text: '书琰' },
  逄一: { text: '逄一' },
  期贤: { text: '期贤' },
  玄霜: { text: '玄霜' },
  怀渊: { text: '怀渊' },
} as const;

// ============================
// 应用名称数据
// ============================

/** 真实微服务应用名称 */
export const DEMO_APP_NAMES = [
  '用户认证服务',
  '订单处理中心',
  '支付网关',
  '商品管理服务',
  '物流追踪系统',
  '消息推送平台',
  '数据分析引擎',
  '文件存储服务',
  '搜索检索服务',
  '风控决策引擎',
  '库存管理服务',
  '会员积分系统',
  '优惠券服务',
  '评价审核系统',
  '客服工单平台',
  '短信通知网关',
  '日志采集服务',
  '配置中心',
  '注册发现服务',
  'API 网关',
] as const;

// ============================
// 状态枚举
// ============================

/** 状态枚举 (close/running/online/error) */
export const DEMO_VALUE_ENUM = {
  0: 'close',
  1: 'running',
  2: 'online',
  3: 'error',
} as const;

/** 状态列 valueEnum */
export const DEMO_STATUS_VALUE_ENUM = {
  all: { text: '全部', status: 'Default' },
  close: { text: '已关闭', status: 'Default' },
  running: { text: '运行中', status: 'Processing' },
  online: { text: '已上线', status: 'Success' },
  error: { text: '异常', status: 'Error' },
} as const;

// ============================
// 备注数据
// ============================

/** 真实业务备注 */
const DEMO_MEMOS = [
  '核心服务，承载全站用户登录与鉴权',
  '日均处理订单量 50 万+，高峰期需要关注性能',
  '对接微信、支付宝等第三方支付渠道',
  '负责全品类商品的增删改查及上下架管理',
  '接入顺丰、中通等多家物流运力',
  '支持 App 推送、短信和站内信三种通道',
  '基于 Flink 实时计算，日处理数据 10TB+',
  '使用 MinIO 对象存储，总容量 200TB',
  '基于 Elasticsearch，支持全文检索和聚合分析',
  '毫秒级风险识别，拦截欺诈交易',
  '多仓库库存同步，支持预售和预扣',
  'V1~V6 六级会员体系，积分自动结算',
  '支持满减、折扣、兑换券等多种类型',
  '自然语言处理 + 人工审核双重保障',
  '工单自动分配，平均响应时间 < 5min',
  '日发送量百万级，多供应商自动切换',
  '统一采集应用日志，支持 ELK 全链路追踪',
  '动态配置管理，支持灰度发布和热更新',
  'Nacos 集群部署，服务实例自动注册与发现',
  '流量网关，统一鉴权、限流与路由',
] as const;

// ============================
// 表格数据生成
// ============================

export interface BasicTableItem {
  key: number;
  name: string;
  containers: number;
  creator: string;
  status: string;
  createdAt: number;
  memo: string;
}

export interface BatchOptionTableItem extends BasicTableItem {
  progress?: number;
  callNumber?: number;
  money?: number;
}

export interface CreateTableDataSourceOptions {
  count?: number;
  withProgress?: boolean;
  withCallNumber?: boolean;
  withMoney?: boolean;
  namePrefix?: string;
}

/**
 * 生成确定性的表格数据源
 * 使用索引替代 Math.random() 确保快照稳定
 */
export function createTableDataSource(
  options: CreateTableDataSourceOptions = {},
): BasicTableItem[] | BatchOptionTableItem[] {
  const {
    count = 5,
    withProgress = false,
    withCallNumber = false,
    withMoney = false,
    namePrefix,
  } = options;

  const result: BasicTableItem[] = [];
  const statusKeys = ['0', '1', '2', '3'] as const;

  for (let i = 0; i < count; i += 1) {
    const appName = namePrefix
      ? count > 1
        ? `${namePrefix}-${i}`
        : namePrefix
      : DEMO_APP_NAMES[i % DEMO_APP_NAMES.length];

    const baseItem: BasicTableItem = {
      key: i,
      name: appName,
      containers: (i * 3 + 2) % 12 + 1,
      creator: DEMO_CREATORS[i % DEMO_CREATORS.length],
      status: DEMO_VALUE_ENUM[statusKeys[i % 4]],
      createdAt: FIXED_BASE_TIMESTAMP - i * 86400000,
      memo: DEMO_MEMOS[i % DEMO_MEMOS.length],
    };

    if (withProgress || withCallNumber || withMoney) {
      const extendedItem = { ...baseItem } as BatchOptionTableItem & {
        money?: number;
      };
      if (withProgress) {
        extendedItem.progress = ((i * 17 + 23) % 100) + 1;
      }
      if (withCallNumber) {
        extendedItem.callNumber = (i * 1234 + 5678) % 100000;
      }
      if (withMoney) {
        extendedItem.money = ((i * 3456 + 7890) % 50000) * 100;
      }
      result.push(extendedItem);
    } else {
      result.push(baseItem);
    }
  }

  return result;
}

// ============================
// 可编辑表格数据
// ============================

/** 生成 EditableTable 新建行的唯一 ID */
let editableRowIdCounter = 1000000;
export function createEditableRowId(): string {
  editableRowIdCounter += 1;
  return String(editableRowIdCounter);
}

/** 可编辑表格 - 需求管理场景 */
export interface EditableTaskItem {
  id: React.Key;
  title?: string;
  assignee?: string;
  priority?: string;
  status?: string;
  description?: string;
  created_at?: number;
  update_at?: number;
  children?: EditableTaskItem[];
}

export const DEMO_EDITABLE_TASKS: EditableTaskItem[] = [
  {
    id: 624748504,
    title: '优化首页加载速度',
    assignee: '书琰',
    priority: 'high',
    status: 'open',
    description: '首页白屏时间超过 3s，需优化资源加载和首屏渲染',
    created_at: 1705286400000,
    update_at: 1705372800000,
  },
  {
    id: 624691229,
    title: '修复登录超时问题',
    assignee: '逄一',
    priority: 'urgent',
    status: 'closed',
    description: '用户反馈高峰期登录请求超时，需排查连接池配置',
    created_at: 1705200000000,
    update_at: 1705286400000,
  },
  {
    id: 624674560,
    title: '新增数据导出功能',
    assignee: '期贤',
    priority: 'medium',
    status: 'processing',
    description: '支持将查询结果导出为 Excel 和 CSV 格式',
    created_at: 1705113600000,
    update_at: 1705200000000,
  },
];

export const DEMO_PRIORITY_ENUM = {
  urgent: { text: '紧急', status: 'Error' },
  high: { text: '高', status: 'Warning' },
  medium: { text: '中', status: 'Processing' },
  low: { text: '低', status: 'Default' },
} as const;

export const DEMO_TASK_STATUS_ENUM = {
  all: { text: '全部', status: 'Default' },
  open: { text: '待处理', status: 'Error' },
  processing: { text: '进行中', status: 'Processing' },
  closed: { text: '已完成', status: 'Success' },
} as const;

// ============================
// ProList / 卡片列表数据
// ============================

export const DEMO_PROJECT_LIST = [
  {
    title: '智慧零售平台',
    description: '面向线下门店的数字化经营解决方案',
  },
  {
    title: 'Ant Design Pro',
    description: '开箱即用的中台前端解决方案',
  },
  {
    title: '数据可视化引擎',
    description: '企业级数据看板与可视化分析工具',
  },
  {
    title: '云原生微服务框架',
    description: '基于 K8s 的微服务开发与治理框架',
  },
  {
    title: '智能客服系统',
    description: '融合 NLP 的多渠道智能客服平台',
  },
  {
    title: '统一权限管理中心',
    description: '集中式用户、角色和权限管理系统',
  },
  {
    title: '实时数据仓库',
    description: '基于 Flink + Hudi 的实时数仓架构',
  },
  {
    title: 'DevOps 工具链',
    description: 'CI/CD 流水线与自动化运维平台',
  },
] as const;

// ============================
// 描述列表数据
// ============================

export const DEMO_ORDER_DETAIL = {
  orderNo: 'ORD-2024-0115-0001',
  customerName: '杭州星辰科技有限公司',
  contactPerson: '书琰',
  contactPhone: '138****6789',
  productName: '企业版云服务套餐',
  amount: 128000,
  discount: 15,
  status: 'processing',
  payMethod: '对公转账',
  contractDate: '2024-01-15',
  remark: '客户要求 Q1 内完成部署上线，优先安排技术支持',
} as const;

// ============================
// 表单数据
// ============================

/** 地区级联数据 */
export const DEMO_AREA_CASCADER = [
  {
    value: 'zhejiang',
    label: '浙江省',
    children: [
      {
        value: 'hangzhou',
        label: '杭州市',
        children: [
          { value: 'xihu', label: '西湖区' },
          { value: 'binjiang', label: '滨江区' },
          { value: 'yuhang', label: '余杭区' },
        ],
      },
      {
        value: 'ningbo',
        label: '宁波市',
        children: [
          { value: 'haishu', label: '海曙区' },
          { value: 'jiangbei', label: '江北区' },
        ],
      },
    ],
  },
  {
    value: 'jiangsu',
    label: '江苏省',
    children: [
      {
        value: 'nanjing',
        label: '南京市',
        children: [
          { value: 'gulou', label: '鼓楼区' },
          { value: 'jianye', label: '建邺区' },
        ],
      },
      {
        value: 'suzhou',
        label: '苏州市',
        children: [
          { value: 'gongyeyuan', label: '工业园区' },
          { value: 'gusu', label: '姑苏区' },
        ],
      },
    ],
  },
  {
    value: 'guangdong',
    label: '广东省',
    children: [
      {
        value: 'shenzhen',
        label: '深圳市',
        children: [
          { value: 'nanshan', label: '南山区' },
          { value: 'futian', label: '福田区' },
        ],
      },
    ],
  },
] as const;

/** 部门树形数据 */
export const DEMO_DEPARTMENT_TREE = [
  {
    title: '技术研发部',
    value: 'tech',
    key: 'tech',
    children: [
      { title: '前端开发组', value: 'tech-fe', key: 'tech-fe' },
      { title: '后端开发组', value: 'tech-be', key: 'tech-be' },
      { title: '测试保障组', value: 'tech-qa', key: 'tech-qa' },
    ],
  },
  {
    title: '产品设计部',
    value: 'product',
    key: 'product',
    children: [
      { title: '产品策划组', value: 'product-pm', key: 'product-pm' },
      { title: 'UX 设计组', value: 'product-ux', key: 'product-ux' },
    ],
  },
  {
    title: '市场运营部',
    value: 'marketing',
    key: 'marketing',
    children: [
      { title: '品牌推广组', value: 'marketing-brand', key: 'marketing-brand' },
      { title: '用户增长组', value: 'marketing-growth', key: 'marketing-growth' },
      { title: '内容运营组', value: 'marketing-content', key: 'marketing-content' },
    ],
  },
] as const;
