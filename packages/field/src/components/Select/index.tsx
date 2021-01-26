import type { ReactNode } from 'react';
import React, {
  useState,
  useImperativeHandle,
  useRef,
  useContext,
  useCallback,
  useEffect,
} from 'react';
import type { SelectProps } from 'antd';
import { Select, Space, Spin, ConfigProvider } from 'antd';
import type {
  ProFieldRequestData,
  ProFieldValueEnumType,
  ProSchemaValueEnumMap,
  ProSchemaValueEnumObj,
} from '@ant-design/pro-utils';
import { useDeepCompareEffect } from '@ant-design/pro-utils';
import useSWR from 'swr';
import useMergedState from 'rc-util/lib/hooks/useMergedState';
import { useIntl } from '@ant-design/pro-provider';

import LightSelect from './LightSelect';
import type { ProFieldStatusType } from '../Status';
import TableStatus, { ProFieldBadgeColor } from '../Status';
import type { ProFieldFC } from '../../index';

let testId = 0;

export type FieldSelectProps = {
  text: string;
  /** 值的枚举，如果存在枚举，Search 中会生成 select */
  valueEnum?: ProFieldValueEnumType;

  /** 从服务器读取选项 */
  request?: ProFieldRequestData;
  /** 重新触发的时机 */
  params?: any;

  /** 组件的全局设置 */
  fieldProps?: any;
};

export const ObjToMap = (value: ProFieldValueEnumType | undefined): ProSchemaValueEnumMap => {
  if (getType(value) === 'map') {
    return value as ProSchemaValueEnumMap;
  }
  return new Map(Object.entries(value || {}));
};

/**
 * 转化 text 和 valueEnum 通过 type 来添加 Status
 *
 * @param text
 * @param valueEnum
 * @param pure 纯净模式，不增加 status
 */
export const proFieldParsingText = (
  text: string | number | (string | number)[],
  valueEnumParams: ProFieldValueEnumType,
): React.ReactNode => {
  if (Array.isArray(text)) {
    return (
      <Space>
        {text.map((value) => (
          // @ts-ignore
          <React.Fragment key={value?.value || value}>
            {proFieldParsingText(value, valueEnumParams)}
          </React.Fragment>
        ))}
      </Space>
    );
  }

  const valueEnum = ObjToMap(valueEnumParams);

  if (!valueEnum.has(text) && !valueEnum.has(`${text}`)) {
    // @ts-ignore
    return text?.label || text;
  }

  const domText = (valueEnum.get(text) || valueEnum.get(`${text}`)) as {
    text: ReactNode;
    status: ProFieldStatusType;
    color?: string;
  };

  if (!domText) {
    // @ts-ignore
    return text?.label || text;
  }

  const { status, color } = domText;

  const Status = TableStatus[status || 'Init'];
  // 如果类型存在优先使用类型
  if (Status) {
    return <Status>{domText.text}</Status>;
  }

  // 如果不存在使用颜色
  if (color) {
    return <ProFieldBadgeColor color={color}>{domText.text}</ProFieldBadgeColor>;
  }
  // 什么都没有使用 text
  return domText.text || domText;
};

/**
 * 获取类型的 type
 *
 * @param obj
 */
function getType(obj: any) {
  // @ts-ignore
  const type = Object.prototype.toString
    .call(obj)
    .match(/^\[object (.*)\]$/)[1]
    .toLowerCase();
  if (type === 'string' && typeof obj === 'object') return 'object'; // Let "new String('')" return 'object'
  if (obj === null) return 'null'; // PhantomJS has type "DOMWindow" for null
  if (obj === undefined) return 'undefined'; // PhantomJS has type "DOMWindow" for undefined
  return type;
}

/**
 * 把 value 的枚举转化为数组
 *
 * @param valueEnum
 */
export const proFieldParsingValueEnumToArray = (
  valueEnumParams: ProFieldValueEnumType | undefined = new Map(),
): {
  value: string | number;
  text: string;
}[] => {
  const enumArray: {
    value: string | number;
    text: string;
    /** 是否禁用 */
    disabled?: boolean;
  }[] = [];
  const valueEnum = ObjToMap(valueEnumParams);

  valueEnum.forEach((_, key) => {
    const value = (valueEnum.get(key) || valueEnum.get(`${key}`)) as {
      text: string;
      disabled?: boolean;
    };

    if (!value) {
      return;
    }

    if (typeof value === 'object' && value?.text) {
      enumArray.push({
        text: (value?.text as unknown) as string,
        value: key,
        disabled: value.disabled,
      });
      return;
    }
    enumArray.push({
      text: (value as unknown) as string,
      value: key,
    });
  });
  return enumArray;
};

export const useFieldFetchData = (
  props: FieldSelectProps & {
    proFieldKey?: React.Key;
  },
): [boolean, SelectProps<any>['options'], () => void] => {
  /** Key 是用来缓存请求的，如果不在是有问题 */
  const [cacheKey] = useState(() => {
    if (props.proFieldKey) {
      return props.proFieldKey;
    }
    if (props.request) {
      testId += 1;
      return testId;
    }
    return 'no-fetch';
  });

  const proFieldKeyRef = useRef(cacheKey);

  const getOptionsFormValueEnum = useCallback((valueEnum) => {
    return proFieldParsingValueEnumToArray(ObjToMap(valueEnum)).map(({ value, text, ...rest }) => ({
      label: text,
      value,
      key: value,
      ...rest,
    }));
  }, []);

  const [options, setOptions] = useMergedState<SelectProps<any>['options']>(
    () => {
      if (props.valueEnum) {
        return getOptionsFormValueEnum(props.valueEnum);
      }
      return [];
    },
    {
      value: props.fieldProps?.options,
    },
  );

  useDeepCompareEffect(() => {
    // 优先使用 fieldProps?.options
    if (!props.valueEnum || props.fieldProps?.options) return;
    setOptions(getOptionsFormValueEnum(props.valueEnum));
  }, [props.valueEnum]);

  const [loading, setLoading] = useState(false);

  const { data, mutate } = useSWR(
    [proFieldKeyRef.current, JSON.stringify(props.params)],
    async () => {
      if (props.request) {
        setLoading(true);
        const fetchData = await props.request(props.params, props);
        setLoading(false);
        return fetchData as Required<ProFieldRequestData>[];
      }
      return [];
    },
    {
      revalidateOnFocus: false,
    },
  );

  return [
    loading,
    props.request ? (data as SelectProps<any>['options']) : options,
    async () => {
      if (!props.request) return;
      setLoading(true);
      const fetchData = await props.request(props.params, props);
      setLoading(false);
      mutate(fetchData, false);
    },
  ];
};

/**
 * 可以根据 valueEnum 来进行类型的设置
 *
 * @param
 */
const FieldSelect: ProFieldFC<FieldSelectProps> = (props, ref) => {
  const {
    mode,
    valueEnum,
    render,
    renderFormItem,
    request,
    fieldProps,
    plain,
    children,
    light,
    proFieldKey,
    ...rest
  } = props;
  const inputRef = useRef();
  const intl = useIntl();

  useEffect(() => {
    testId += 1;
  }, []);

  const [loading, options, fetchData] = useFieldFetchData(props);

  const size = useContext(ConfigProvider.SizeContext);
  useImperativeHandle(ref, () => ({
    ...(inputRef.current || {}),
    fetchData: () => fetchData(),
  }));

  if (loading) {
    return <Spin />;
  }
  if (mode === 'read') {
    const optionsValueEnum: ProSchemaValueEnumObj = options?.length
      ? options?.reduce((pre: any, cur) => {
          return { ...pre, [cur.value]: cur.label };
        }, {})
      : undefined;
    // 如果有 label 直接就用 label
    // @ts-ignore
    if (rest.text?.label) {
      // @ts-ignore
      return rest.text?.label;
    }

    const dom = (
      <>
        {proFieldParsingText(
          rest.text,
          (ObjToMap(valueEnum || optionsValueEnum) as unknown) as ProSchemaValueEnumObj,
        )}
      </>
    );

    if (render) {
      return render(rest.text, { mode, ...fieldProps }, dom) || null;
    }
    return dom;
  }

  if (mode === 'edit' || mode === 'update') {
    const renderDom = () => {
      if (light) {
        return (
          <LightSelect
            loading={loading}
            ref={inputRef}
            allowClear
            size={size}
            {...rest}
            options={options}
            {...fieldProps}
          />
        );
      }
      return (
        <Select
          style={{
            minWidth: 100,
          }}
          loading={loading}
          ref={inputRef}
          allowClear
          {...rest}
          placeholder={intl.getMessage('tableForm.selectPlaceholder', '请选择')}
          options={options}
          {...fieldProps}
        />
      );
    };
    const dom = renderDom();
    if (renderFormItem) {
      return renderFormItem(rest.text, { mode, ...fieldProps, options }, dom) || null;
    }
    return dom;
  }
  return null;
};

export default React.forwardRef(FieldSelect);
