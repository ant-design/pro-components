import { useIntl } from '@ant-design/pro-provider';
import {
  compatibleBorder,
  nanoid,
  objectToMap,
  proFieldParsingText,
  ProFieldRequestData,
  ProFieldValueEnumType,
  ProSchemaValueEnumObj,
  RequestOptionsType,
  useDebounceValue,
  useDeepCompareEffect,
  useDeepCompareMemo,
  useMountMergeState,
  useRefFunction,
  useStyle,
} from '@ant-design/pro-utils';
import type { SelectProps } from 'antd';
import { ConfigProvider, Spin } from 'antd';
import type { ReactNode } from 'react';
import React, {
  useContext,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from 'react';
import useSWR from 'swr';
import type { ProFieldFC, ProFieldLightProps } from '../../index';
import LightSelect from './LightSelect';
import SearchSelect from './SearchSelect';

// 兼容代码-----------
import 'antd/lib/select/style';
//------------

type SelectOptionType = Partial<RequestOptionsType>[];

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

  bordered?: boolean;
  id?: string;

  children?: ReactNode;
  /** 默认搜素条件 */
  defaultKeyWords?: string;
} & ProFieldLightProps;

const Highlight: React.FC<{
  label: string;
  words: string[];
}> = ({ label, words }) => {
  const { getPrefixCls } = useContext(ConfigProvider.ConfigContext);
  const lightCls = getPrefixCls('pro-select-item-option-content-light');
  const optionCls = getPrefixCls('pro-select-item-option-content');

  // css
  const { wrapSSR } = useStyle('Highlight', (token) => {
    return {
      [`.${lightCls}`]: {
        color: token.colorPrimary,
      },
      [`.${optionCls}`]: {
        flex: 'auto',
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis',
      },
    };
  });

  const matchKeywordsRE = new RegExp(
    words
      .map((word) => word.replace(/[-[\]/{}()*+?.\\^$|]/g, '\\$&'))
      .join('|'),
    'gi',
  );

  let matchText = label;

  const elements: React.ReactNode[] = [];

  while (matchText.length) {
    const match = matchKeywordsRE.exec(matchText);
    if (!match) {
      elements.push(matchText);
      break;
    }

    const start = match.index;
    const matchLength = match[0].length + start;

    elements.push(
      matchText.slice(0, start),
      React.createElement(
        'span',
        {
          className: lightCls,
        },
        matchText.slice(start, matchLength),
      ),
    );
    matchText = matchText.slice(matchLength);
  }

  return wrapSSR(
    React.createElement(
      'div',
      {
        title: label,
        className: optionCls,
      },
      ...elements,
    ),
  );
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
    const findItem = [...(item.children || []), item.options || []].find(
      (mapItem) => {
        return filerByItem(mapItem, keyWords);
      },
    );
    if (findItem) return true;
  }
  return false;
}

/**
 * 把 value 的枚举转化为数组
 *
 * @param valueEnum
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

export const useFieldFetchData = (
  props: FieldSelectProps & {
    proFieldKey?: React.Key;
    defaultKeyWords?: string;
    cacheForSwr?: boolean;
  },
): [boolean, SelectOptionType, (keyWord?: string) => void, () => void] => {
  const { cacheForSwr, fieldProps } = props;

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

  const defaultOptions = useDeepCompareMemo(() => {
    if (!fieldProps) return undefined;
    const data = fieldProps?.options || fieldProps?.treeData;
    if (!data) return undefined;
    const { children, label, value } = fieldProps.fieldNames || {};
    const traverseFieldKey = (
      _options: typeof options,
      type: 'children' | 'label' | 'value',
    ) => {
      if (!_options?.length) return;
      const length = _options.length;
      let i = 0;
      while (i < length) {
        const cur = _options[i++];
        if (cur[children] || cur[label] || cur[value]) {
          cur[type] =
            cur[
              type === 'children' ? children : type === 'label' ? label : value
            ];
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
    if (
      !props.valueEnum ||
      props.fieldProps?.options ||
      props.fieldProps?.treeData
    )
      return;
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
        const childrenOptions = [
          ...(item.children || []),
          ...(item.options || []),
        ].filter((mapItem) => {
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
    if (
      props.fieldProps?.filterOption === true ||
      props.fieldProps?.filterOption === undefined
    ) {
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

/**
 * 可以根据 valueEnum 来进行类型的设置
 *
 * @param
 */
const FieldSelect: ProFieldFC<
  FieldSelectProps & Pick<SelectProps, 'fieldNames' | 'style' | 'className'>
> = (props, ref) => {
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
    params,
    label,
    bordered,
    id,
    lightLabel,
    labelTrigger,
    ...rest
  } = props;

  const inputRef = useRef();
  const intl = useIntl();
  const keyWordsRef = useRef<string>('');
  const { fieldNames } = fieldProps;

  useEffect(() => {
    keyWordsRef.current = fieldProps?.searchValue;
  }, [fieldProps?.searchValue]);

  const [loading, options, fetchData, resetData] = useFieldFetchData(props);
  const { componentSize } = ConfigProvider?.useConfig?.() || {
    componentSize: 'middle',
  };
  useImperativeHandle(
    ref,
    () => ({
      ...(inputRef.current || {}),
      fetchData: (keyWord: string) => fetchData(keyWord),
    }),
    [fetchData],
  );

  const optionsValueEnum = useMemo(() => {
    if (mode !== 'read') return;

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

  if (mode === 'read') {
    const dom = (
      <>
        {proFieldParsingText(
          rest.text,
          objectToMap(
            valueEnum || optionsValueEnum,
          ) as unknown as ProSchemaValueEnumObj,
        )}
      </>
    );

    if (render) {
      return render(dom, { mode, ...fieldProps }, dom) ?? null;
    }
    return dom;
  }

  if (mode === 'edit' || mode === 'update') {
    const renderDom = () => {
      if (light) {
        return (
          <LightSelect
            {...compatibleBorder(bordered)}
            id={id}
            loading={loading}
            ref={inputRef}
            allowClear
            size={componentSize}
            options={options}
            label={label}
            placeholder={intl.getMessage(
              'tableForm.selectPlaceholder',
              '请选择',
            )}
            lightLabel={lightLabel}
            labelTrigger={labelTrigger}
            fetchData={fetchData}
            {...fieldProps}
          />
        );
      }
      return (
        <SearchSelect
          key="SearchSelect"
          className={rest.className}
          style={{
            minWidth: 100,
            ...rest.style,
          }}
          {...compatibleBorder(bordered)}
          id={id}
          loading={loading}
          ref={inputRef}
          allowClear
          defaultSearchValue={props.defaultKeyWords}
          notFoundContent={
            loading ? <Spin size="small" /> : fieldProps?.notFoundContent
          }
          fetchData={(keyWord) => {
            keyWordsRef.current = keyWord ?? '';
            fetchData(keyWord);
          }}
          resetData={resetData}
          preserveOriginalLabel
          optionItemRender={(item) => {
            if (typeof item.label === 'string' && keyWordsRef.current) {
              return (
                <Highlight label={item.label} words={[keyWordsRef.current]} />
              );
            }
            return item.label;
          }}
          placeholder={intl.getMessage('tableForm.selectPlaceholder', '请选择')}
          label={label}
          {...fieldProps}
          options={options}
        />
      );
    };
    const dom = renderDom();
    if (renderFormItem) {
      return (
        renderFormItem(
          rest.text,
          { mode, ...fieldProps, options, loading },
          dom,
        ) ?? null
      );
    }
    return dom;
  }
  return null;
};

export default React.forwardRef(FieldSelect);
