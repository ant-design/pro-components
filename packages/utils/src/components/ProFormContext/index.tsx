import type { FormInstance } from 'antd';
import type { NamePath } from 'antd/lib/form/interface';
import React from 'react';

export type ProFormInstanceType<T> = {
  /**
   * 获取被 ProForm 格式化后的所有数据
   * @param nameList boolean
   * @returns T
   *
   * @example  getFieldsFormatValue() ->返回所有数据
   * @example  getFieldsFormatValue(true) ->返回所有数据，即使没有被 form 托管的
   */
  getFieldsFormatValue?: (nameList?: true, omitNil?: boolean) => T;
  /**
   * 获取被 ProForm 格式化后的单个数据
   * @param nameList (string|number)[]
   * @returns T
   *
   * @example {a:{b:value}} -> getFieldFormatValue(['a', 'b']) -> value
   */
  getFieldFormatValue?: (nameList?: NamePath) => T;
  /**
   * 获取被 ProForm 格式化后的单个数据, 包含他的 name
   * @param nameList (string|number)[]
   * @returns T
   *
   * @example {a:{b:value}}->getFieldFormatValueObject(['a','b'])->{a:{b:value}}
   */
  getFieldFormatValueObject?: (nameList?: NamePath) => T;
  /**
   *验字段后返回格式化之后的所有数据
   * @param nameList (string|number)[]
   * @returns T
   *
   * @example validateFieldsReturnFormatValue -> {a:{b:value}}
   */
  validateFieldsReturnFormatValue?: (nameList?: NamePath[]) => Promise<T>;
};

export const ProFormContext = React.createContext<
  ProFormInstanceType<any> & {
    formRef?: React.MutableRefObject<FormInstance<any>>;
  }
>({});
