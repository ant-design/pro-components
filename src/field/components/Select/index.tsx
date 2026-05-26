import type { GetRef, SelectProps } from 'antd';
import { ConfigProvider, Select } from 'antd';
import React, { useImperativeHandle, useMemo, useRef, useState } from 'react';
import useSWR from 'swr';
import { useIntl } from '../../../provider';
import {
  nanoid,
  objectToMap,
  ProFieldValueEnumType,
  RequestOptionsType,
  useDebounceValue,
  useRefFunction,
} from '../../../utils';
import {
  isProFieldEditOrUpdateMode,
  isProFieldReadMode,
} from '../../internal/fieldMode';
import type { ProFieldFC } from '../../types';
import { FieldSelectLightEdit } from './FieldSelectLightEdit';
import { FieldSelectRead } from './FieldSelectRead';
import { FieldSelectSearchEdit } from './FieldSelectSearchEdit';
import type { FieldSelectProps } from './types';

export type { FieldSelectProps };

type SelectOptionType = Partial<RequestOptionsType>[];

/**
 * 把 value 的枚举转化为数组
 * @param valueEnumParams
 */
export const proFieldParsingValueEnumToArray = (
  valueEnumParams: ProFieldValueEnumType,
): SelectOptionType => {
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
 * @description options 优先级 request > valueEnum > fieldProps.options
 */
export const useFieldFetchData = (
  props: FieldSelectProps & {
    proFieldKey?: React.Key;
    defaultKeyWords?: string;
    cacheForSwr?: boolean;
  },
): [boolean, SelectOptionType, (keyWord?: string) => void, () => void] => {
  const { cacheForSwr, fieldProps, valueEnum } = props;

  const [keyWords, setKeyWords] = useState<string | undefined>(
    props.defaultKeyWords,
  );
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

  const getOptionsFormValueEnum = useRefFunction(
    (coverValueEnum: ProFieldValueEnumType) => {
      return proFieldParsingValueEnumToArray(objectToMap(coverValueEnum)).map(
        ({ value, text, ...rest }) => ({
          label: text,
          value,
          key: value,
          ...rest,
        }),
      );
    },
  );

  const options = useMemo(
    () =>
      valueEnum ? getOptionsFormValueEnum(valueEnum) : fieldProps?.options,
    [valueEnum, fieldProps?.options],
  );

  const swrKey = useDebounceValue(
    [proFieldKeyRef.current, props.params, keyWords],
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
      revalidateOnReconnect: cacheForSwr,
      shouldRetryOnError: false,
      revalidateOnFocus: false,
    },
  );

  return [
    isValidating,
    props.request ? (data ?? []) : options,
    (fetchKeyWords?: string) => {
      setKeyWords(fetchKeyWords);
    },
    () => {
      setKeyWords(undefined);
      setLocaleData([], false);
    },
  ];
};

/**
 * 可以根据 valueEnum 来进行类型的设置
 */
const FieldSelect: ProFieldFC<
  FieldSelectProps & Pick<SelectProps, 'fieldNames' | 'style' | 'className'>
> = (props, ref) => {
  const {
    mode,
    valueEnum,
    render,
    formItemRender,
    request: _request,
    fieldProps,
    light,
    proFieldKey: _proFieldKey,
    params: _params,
    label,
    variant,
    id,
    lightLabel,
    labelTrigger,
  } = props;

  const inputRef = useRef<GetRef<typeof Select>>(null);
  const intl = useIntl();
  const { fieldNames } = fieldProps;

  const [loading, options, fetchData, resetData] = useFieldFetchData(props);
  const { componentSize: componentSizeFromConfig } =
    ConfigProvider?.useConfig?.() || {
      componentSize: undefined,
    };
  const componentSize = componentSizeFromConfig ?? 'middle';
  useImperativeHandle(
    ref,
    () => ({
      ...(inputRef.current || {}),
      fetchData: (keyWord: string) => fetchData(keyWord),
    }),
    [fetchData],
  );

  const optionsValueEnum = useMemo(() => {
    if (!isProFieldReadMode(mode)) return;

    const {
      label: labelPropsName = 'label',
      value: valuePropsName = 'value',
      options: optionsPropsName = 'options',
    } = fieldNames || {};

    const valuesMap = new Map();

    const traverseOptions = (_options: typeof options) => {
      if (!_options?.length) {
        return valuesMap;
      }
      const length = _options.length;
      let i = 0;
      while (i < length) {
        const cur = _options[i++];
        valuesMap.set(cur[valuePropsName], cur[labelPropsName]);
        traverseOptions(cur[optionsPropsName]);
      }
      return valuesMap;
    };

    return traverseOptions(options);
  }, [fieldNames, mode, options]);

  if (isProFieldReadMode(mode)) {
    return (
      <FieldSelectRead
        mode={mode}
        valueEnum={valueEnum}
        render={render}
        fieldProps={fieldProps}
        optionsValueEnum={optionsValueEnum}
        {...props}
      />
    );
  }

  if (isProFieldEditOrUpdateMode(mode)) {
    const sharedEditProps = {
      mode,
      formItemRender,
      fieldProps,
      id,
      label,
      variant,
      intl,
      loading,
      options,
      fetchData,
      resetData,
      inputRef,
      ...props,
    };
    if (light) {
      return (
        <FieldSelectLightEdit
          lightLabel={lightLabel}
          labelTrigger={labelTrigger}
          {...sharedEditProps}
          componentSize={componentSize}
        />
      );
    }
    return <FieldSelectSearchEdit {...sharedEditProps} />;
  }
  return null;
};

export default React.forwardRef(FieldSelect);
