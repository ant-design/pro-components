import type { FormInstance } from 'antd';
import type { NamePath } from 'antd/lib/form/interface';
import React from 'react';

export type ProFormInstanceType<T> = {
  /**
   * 获取被 ProForm 格式化后的所有数据
   *
   * @example
   *   getFieldsFormatValue() ->返回所有数据
   *
   * @example
   *   getFieldsFormatValue(true) ->返回所有数据，即使没有被 form 托管的
   *
   * @param nameList Boolean
   * @returns T
   */
  getFieldsFormatValue?: (nameList?: true) => T;
  /**
   * 获取被 ProForm 格式化后的单个数据
   *
   * @example
   *   {a:{b:value}} -> getFieldFormatValue(['a', 'b']) -> value
   *
   * @param nameList (string|number)[]
   * @returns T
   */
  /** 获取格式化之后的单个数据 */
  getFieldFormatValue?: (nameList?: NamePath) => T;
  /**
   * 获取被 ProForm 格式化后的单个数据, 包含他的 name
   *
   * @example
   *   {a:{b:value}} -> getFieldFormatValueObject(['a', 'b']) -> {a:{b:value}}
   *
   * @param nameList (string|number)[]
   * @returns T
   */
  /** 获取格式化之后的单个数据 */
  getFieldFormatValueObject?: (nameList?: NamePath) => T;
  /**
   * 验字段后返回格式化之后的所有数据
   *
   * @example
   *   validateFieldsReturnFormatValue -> {a:{b:value}}
   *
   * @param nameList (string|number)[]
   * @returns T
   */
  validateFieldsReturnFormatValue?: (nameList?: NamePath[]) => Promise<T>;
};

const ProFormContext = React.createContext<
  ProFormInstanceType<any> & {
    formRef?: React.MutableRefObject<FormInstance<any>>;
  }
>({});

export default ProFormContext;
