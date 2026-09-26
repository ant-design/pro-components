import type {
  ProFieldRequestData,
  ProFieldValueEnumType,
} from '../../../utils';
import type { ProFieldLightProps } from '../../types';

export type FieldSelectProps<FieldProps = any> = {
  text: string;
  /** 值的枚举，如果存在枚举，Search 中会生成 select */
  valueEnum?: ProFieldValueEnumType;
  /** 防抖动时间 默认10 单位ms */
  debounceTime?: number;
  /** 从服务器读取选项 */
  request?: ProFieldRequestData;
  /** 重新触发的时机 */
  params?: any;

  /** 组件的全局设置 */
  fieldProps?: FieldProps;

  variant?: 'outlined' | 'filled' | 'borderless';
  id?: string;

  /** 默认搜素条件 */
  defaultKeyWords?: string;

  /**
   * 搜索时是否重新触发 request
   * @default true
   * 设为 false 时仅在初始化拉取一次全量数据，后续搜索走本地过滤
   */
  fetchDataOnSearch?: boolean;
} & ProFieldLightProps;
