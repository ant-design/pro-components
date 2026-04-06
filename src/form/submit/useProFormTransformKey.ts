import { set as namePathSet } from '@rc-component/util';
import type { NamePath } from 'antd/lib/form/interface';
import type dayjs from 'dayjs';
import { useRef } from 'react';
import type { ProFieldValueType, SearchTransformKeyFn } from '../../utils';
import {
  conversionMomentValue,
  transformKeySubmitValue,
  useRefFunction,
} from '../../utils';

export type ProFormDateFormatter =
  | (string & {})
  | 'string'
  | 'number'
  | ((value: dayjs.Dayjs, valueType: string) => string | number)
  | false;

/**
 * ProForm 提交/变更时的 transform 管线：日期转换 + transformKeySubmitValue。
 * 与 FieldContext.setFieldValueType 写入的 ref 配套使用。
 */
export function useProFormTransformKey(dateFormatter: ProFormDateFormatter) {
  const transformKeyRef = useRef<
    Record<string, SearchTransformKeyFn | undefined>
  >({});

  const fieldsValueType = useRef<
    Record<
      string,
      {
        valueType: ProFieldValueType;
        dateFormat: string;
      }
    >
  >({});

  const transformKey = useRefFunction(
    (values: any, paramsOmitNil: boolean, parentKey?: NamePath) => {
      if (!values || typeof values !== 'object') {
        return values;
      }

      return transformKeySubmitValue(
        conversionMomentValue(
          values,
          dateFormatter,
          fieldsValueType.current,
          paramsOmitNil,
          parentKey,
        ),
        transformKeyRef.current,
      );
    },
  );

  const setFieldValueType = useRefFunction(
    (
      name: NamePath,
      {
        valueType = 'text',
        dateFormat,
        transform,
      }: {
        valueType?: ProFieldValueType;
        dateFormat?: string;
        transform?: SearchTransformKeyFn;
      },
    ) => {
      if (!Array.isArray(name)) return;

      if (transform) {
        transformKeyRef.current = namePathSet(
          transformKeyRef.current,
          name,
          transform,
        );
      }

      fieldsValueType.current = namePathSet(fieldsValueType.current, name, {
        valueType,
        dateFormat,
      });
    },
  );

  return {
    transformKey,
    transformKeyRef,
    fieldsValueType,
    setFieldValueType,
  };
}
