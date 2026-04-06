/**
 * 表单领域类型：按文件拆分，本入口统一 re-export，保持 `import { … } from '@ant-design/pro-form'` 路径稳定。
 */
export type { ProFormGridConfig } from './layout';
export type {
  ExtendsProps,
  FieldProps,
  LightFilterFooterRender,
  ProFormFieldItemProps,
  ProFormFieldRemoteProps,
  ProFormGroupProps,
  ProFormItemCreateConfig,
} from './fieldItem';
