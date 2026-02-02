/**
 * Demo 共享 Mock 数据模块
 * 提供确定性的演示数据，避免 Math.random() 和 Date.now() 导致的快照不稳定
 */
import dayjs from 'dayjs';

/** 创建者列表 */
export const DEMO_CREATORS = [
  '付小小',
  '曲丽丽',
  '林东东',
  '陈帅帅',
  '兼某某',
] as const;

/** 状态枚举 (close/running/online/error) */
export const DEMO_VALUE_ENUM = {
  0: 'close',
  1: 'running',
  2: 'online',
  3: 'error',
} as const;

/** 创建者列 valueEnum */
export const DEMO_CREATOR_VALUE_ENUM = {
  all: { text: '全部' },
  付小小: { text: '付小小' },
  曲丽丽: { text: '曲丽丽' },
  林东东: { text: '林东东' },
  陈帅帅: { text: '陈帅帅' },
  兼某某: { text: '兼某某' },
} as const;

/** 状态列 valueEnum */
export const DEMO_STATUS_VALUE_ENUM = {
  all: { text: '全部', status: 'Default' },
  close: { text: '关闭', status: 'Default' },
  running: { text: '运行中', status: 'Processing' },
  online: { text: '已上线', status: 'Success' },
  error: { text: '异常', status: 'Error' },
} as const;

/** 固定基准时间戳，用于确定性日期展示 */
export const FIXED_BASE_TIMESTAMP = dayjs('2024-01-15 10:00:00').valueOf();

/** 固定基准日期 */
export const FIXED_BASE_DATE = dayjs('2024-01-15');

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
    namePrefix = 'AppName',
  } = options;

  const result: BasicTableItem[] = [];
  const statusKeys = ['0', '1', '2', '3'] as const;

  for (let i = 0; i < count; i += 1) {
    const baseItem: BasicTableItem = {
      key: i,
      name: count > 1 ? `${namePrefix}-${i}` : namePrefix,
      containers: (i * 3 + 5) % 20,
      creator: DEMO_CREATORS[i % DEMO_CREATORS.length],
      status: DEMO_VALUE_ENUM[statusKeys[i % 4]],
      createdAt: FIXED_BASE_TIMESTAMP - (i * 10000 + 5000),
      memo:
        i % 2 === 1
          ? '很长很长很长很长很长很长很长的文字要展示但是要留下尾巴'
          : '简短备注文案',
    };

    if (withProgress || withCallNumber || withMoney) {
      const extendedItem = { ...baseItem } as BatchOptionTableItem & {
        money?: number;
      };
      if (withProgress) {
        extendedItem.progress = ((i * 17 + 23) % 100) + 1;
      }
      if (withCallNumber) {
        extendedItem.callNumber = (i * 123 + 456) % 2000;
      }
      if (withMoney) {
        extendedItem.money = ((i * 111 + 222) % 2000) * (i + 1);
      }
      result.push(extendedItem);
    } else {
      result.push(baseItem);
    }
  }

  return result;
}

/** 生成 EditableTable 新建行的唯一 ID */
let editableRowIdCounter = 1000000;
export function createEditableRowId(): string {
  editableRowIdCounter += 1;
  return String(editableRowIdCounter);
}
