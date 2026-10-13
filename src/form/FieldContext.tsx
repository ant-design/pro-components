import type { FormItemProps } from 'antd';
import React from 'react';
import type {
  ProFieldProps,
  SearchConvertKeyFn,
  SearchTransformKeyFn,
} from '../utils/typing';
import type { NamePath } from '../utils/antdTypes';
import type { ProFieldValueType } from '../utils/typing';
import type { ProFormRef } from './BaseForm/typing';
import type { FieldProps, ProFormGridConfig, ProFormGroupProps } from './typing';

export type FiledContextProps = {
  fieldProps?: FieldProps<unknown>;
  proFieldProps?: ProFieldProps;
  formItemProps?: FormItemProps;
  groupProps?: ProFormGroupProps;
  setFieldValueType?: (
    name: NamePath,
    obj: {
      valueType?: ProFieldValueType;
      dateFormat?: string;
      /** 将后端值转换为组件值 */
      convertValue?: SearchConvertKeyFn;
      /** 数据转化的地方 */
      transform?: SearchTransformKeyFn;
    },
  ) => void;
  /** Form 组件的类型 */
  formComponentType?:
    'DrawerForm' | 'ModalForm' | 'QueryFilter' | 'LightFilter' | (string & {});
  /** 获取表单实例计数器 */
  formKey?: string;

  /** 表单的 getPopupContainer 控制 */
  getPopupContainer?: (e: HTMLElement) => HTMLElement | ParentNode;

  /**
   * 分步表单中非当前步的字段跳过 rules 校验（#9101）：
   * 共享 form 实例时 submit 会校验整个 store，隐藏步骤的必填项
   * 会阻塞当前步提交。仅 StepsForm 内部使用。
   */
  skipFieldRules?: boolean;
  formRef?:
    | React.MutableRefObject<ProFormRef<Record<string, any>> | undefined>
    | React.RefObject<ProFormRef<Record<string, any>> | undefined>;
  grid?: ProFormGridConfig['grid'];
};

const FieldContext = React.createContext<FiledContextProps>({});

export { FieldContext };

export default FieldContext;
