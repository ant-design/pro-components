import type { FormItemProps } from 'antd';
import type { NamePath } from 'antd/lib/form/interface';
import React from 'react';
import type {
  ProFieldProps,
  SearchConvertKeyFn,
  SearchTransformKeyFn,
} from '../utils';
import type { ProFieldValueType } from '../utils/typing';
import type { CommonFormProps } from './BaseForm';
import type { FieldProps, ProFormGroupProps } from './typing';

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
  formComponentType?: 'DrawerForm' | 'ModalForm' | 'QueryFilter' | 'LightFilter' | (string & {});
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
} & Pick<CommonFormProps, 'formRef' | 'grid'>;

const FieldContext = React.createContext<FiledContextProps>({});

export { FieldContext };

export default FieldContext;
