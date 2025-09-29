import type React from 'react';
import { useMemo, useRef, useState } from 'react';
import useSWR from 'swr';
import type { ProSchemaValueEnumMap, ProSchemaValueEnumObj } from '../../../utils';
import {
  nanoid,
  objectToMap,
  type RequestOptionsType,
  useDebounceValue,
  useDeepCompareEffect,
  useDeepCompareMemo,
  useMountMergeState,
  useRefFunction,
} from '../../../utils';
import type { FieldSelectProps } from './index';

export type ProFieldValueEnumType = ProSchemaValueEnumMap | ProSchemaValueEnumObj;

type SelectOptionType = Partial<RequestOptionsType>[];

/**
 * 把 value 的枚举转化为数组
 *
 */
export const proFieldParsingValueEnumToArray = (valueEnumParams: ProFieldValueEnumType): SelectOptionType => {
  const enumArray: Partial<
    RequestOptionsType & {
      text: string;
      /** 是否禁用 */
      disabled?: boolean;
    }
  >[] = [];
  const valueEnum = objectToMap(valueEnumParams);

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
        text: value?.text as unknown as string,
        value: key,
        label: value?.text as unknown as string,
        disabled: value.disabled,
      });
      return;
    }
    enumArray.push({
      text: value as unknown as string,
      value: key,
    });
  });
  return enumArray;
};

/**
 * 递归筛选 item
 *
 * @param item
 * @param keyWords
 * @returns
 */
function filerByItem(
  item: {
    label: string;
    value: string;
    optionType: string;
    children: any[];
    options: any[];
  },
  keyWords?: string,
) {
  if (!keyWords) return true;
  if (
    item?.label?.toString().toLowerCase().includes(keyWords.toLowerCase()) ||
    item?.value?.toString().toLowerCase().includes(keyWords.toLowerCase())
  ) {
    return true;
  }
  if (item.children || item.options) {
    const findItem = [...(item.children || []), item.options || []].find((mapItem) => {
      return filerByItem(mapItem, keyWords);
    });
    if (findItem) return true;
  }
  return false;
}

export const useFieldFetchData = (
  props: FieldSelectProps & {
    proFieldKey?: React.Key;
    defaultKeyWords?: string;
    cacheForSwr?: boolean;
  },
): [boolean, SelectOptionType, (keyWord?: string) => void, () => void] => {
  const { cacheForSwr, fieldProps } = props;

  const [keyWords, setKeyWords] = useState<string | undefined>(props.defaultKeyWords);
  /** Key 是用来缓存请求的，如果不在是有问题 */
  const [cacheKey] = useState(() => {
    if (props.proFieldKey) {
      return props.proFieldKey.toString();
    }
    if (props.request) {
      return nanoid();
    }
    return 'no-fetch';
  });

  const proFieldKeyRef = useRef(cacheKey);

  const getOptionsFormValueEnum = useRefFunction((coverValueEnum: ProFieldValueEnumType) => {
    return proFieldParsingValueEnumToArray(objectToMap(coverValueEnum)).map(({ value, text, ...rest }) => ({
      label: text,
      value,
      key: value,
      ...rest,
    }));
  });

  const defaultOptions = useDeepCompareMemo(() => {
    if (!fieldProps) return undefined;
    const data = fieldProps?.options || fieldProps?.treeData;
    if (!data) return undefined;
    const { children, label, value } = fieldProps.fieldNames || {};
    const traverseFieldKey = (_options: typeof options, type: 'children' | 'label' | 'value') => {
      if (!_options?.length) return;
      const length = _options.length;
      let i = 0;
      while (i < length) {
        const cur = _options[i++];
        if (cur[children] || cur[label] || cur[value]) {
          cur[type] = cur[type === 'children' ? children : type === 'label' ? label : value];
          traverseFieldKey(cur[children], type);
        }
      }
    };

    if (children) traverseFieldKey(data, 'children');
    if (label) traverseFieldKey(data, 'label');
    if (value) traverseFieldKey(data, 'value');
    return data;
  }, [fieldProps]);

  const [options, setOptions] = useMountMergeState<SelectOptionType>(
    () => {
      if (props.valueEnum) {
        return getOptionsFormValueEnum(props.valueEnum);
      }
      return [];
    },
    {
      value: defaultOptions,
    },
  );

  useDeepCompareEffect(() => {
    // 优先使用 fieldProps?.options
    if (!props.valueEnum || props.fieldProps?.options || props.fieldProps?.treeData) return;
    setOptions(getOptionsFormValueEnum(props.valueEnum));
  }, [props.valueEnum]);

  const swrKey = useDebounceValue(
    [proFieldKeyRef.current, props.params, keyWords] as const,
    props.debounceTime ?? props?.fieldProps?.debounceTime ?? 0,
    [props.params, keyWords],
  );

  const {
    data,
    mutate: setLocaleData,
    isValidating,
  } = useSWR(
    () => {
      if (!props.request) {
        return null;
      }

      return swrKey;
    },
    ([, params, kw]) =>
      props.request!(
        {
          ...params,
          keyWords: kw,
        },
        props,
      ),
    {
      revalidateIfStale: !cacheForSwr,
      // 打开 cacheForSwr 的时候才应该支持两个功能
      revalidateOnReconnect: cacheForSwr,
      shouldRetryOnError: false,
      // @todo 这个功能感觉应该搞个API出来
      revalidateOnFocus: false,
    },
  );

  const resOptions = useMemo(() => {
    const opt = options?.map((item) => {
      if (typeof item === 'string') {
        return {
          label: item,
          value: item,
        };
      }
      if (item.children || item.options) {
        const childrenOptions = [...(item.children || []), ...(item.options || [])].filter((mapItem) => {
          return filerByItem(mapItem, keyWords);
        });
        return {
          ...item,
          children: childrenOptions,
          options: childrenOptions,
        };
      }
      return item;
    });

    // filterOption 为 true 时 filter数据, filterOption 默认为true
    if (props.fieldProps?.filterOption === true || props.fieldProps?.filterOption === undefined) {
      return opt?.filter((item) => {
        if (!item) return false;
        if (!keyWords) return true;
        return filerByItem(item as any, keyWords);
      });
    }

    return opt;
  }, [options, keyWords, props.fieldProps?.filterOption]);

  return [
    isValidating,
    props.request ? (data as SelectOptionType) : resOptions,
    (fetchKeyWords?: string) => {
      setKeyWords(fetchKeyWords);
    },
    () => {
      setKeyWords(undefined);
      setLocaleData([], false);
    },
  ];
};
