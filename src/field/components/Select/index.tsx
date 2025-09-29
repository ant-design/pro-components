import type { SelectProps } from 'antd';
import { ConfigProvider, Spin } from 'antd';
import type { ReactNode } from 'react';
import React, { useContext, useEffect, useImperativeHandle, useMemo, useRef } from 'react';
import { useIntl } from '../../../provider';
import type { ProFieldRequestData, ProFieldValueEnumType, ProSchemaValueEnumObj } from '../../../utils';
import { objectToMap, proFieldParsingText, useStyle } from '../../../utils';
import type { ProFieldFC, ProFieldLightProps } from '../../PureProField';
import LightSelect from './LightSelect';
import SearchSelect from './SearchSelect';
import { useFieldFetchData } from './useFieldFetchData';

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

  variant?: 'outlined' | 'filled' | 'borderless';
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
    words.map((word) => word.replace(/[-[\]/{}()*+?.\\^$|]/g, '\\$&')).join('|'),
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
 * 可以根据 valueEnum 来进行类型的设置
 *
 * @param
 */
const FieldSelect: ProFieldFC<FieldSelectProps & Pick<SelectProps, 'fieldNames' | 'style' | 'className'>> = ({
  ref,
  ...props
}) => {
  const {
    mode,
    valueEnum,
    render,
    formItemRender,
    request,
    fieldProps,
    plain,
    children,
    light,
    proFieldKey,
    params,
    label,
    variant,
    id,
    lightLabel,
    labelTrigger,
    ...rest
  } = props;

  const inputRef = useRef(undefined);
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
        {proFieldParsingText(rest.text, objectToMap(valueEnum || optionsValueEnum) as unknown as ProSchemaValueEnumObj)}
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
            ref={inputRef}
            allowClear
            fetchData={fetchData}
            id={id}
            label={label}
            labelTrigger={labelTrigger}
            lightLabel={lightLabel}
            loading={loading}
            options={options}
            placeholder={intl.getMessage('tableForm.selectPlaceholder', '请选择')}
            size={componentSize}
            variant={variant}
            {...fieldProps}
          />
        );
      }
      return (
        <SearchSelect
          key="SearchSelect"
          ref={inputRef}
          allowClear
          className={rest.className}
          defaultSearchValue={props.defaultKeyWords}
          fetchData={(keyWord) => {
            keyWordsRef.current = keyWord ?? '';
            fetchData(keyWord);
          }}
          id={id}
          label={label}
          loading={loading}
          notFoundContent={loading ? <Spin size="small" /> : fieldProps?.notFoundContent}
          optionItemRender={(item) => {
            if (typeof item.label === 'string' && keyWordsRef.current) {
              return <Highlight label={item.label} words={[keyWordsRef.current]} />;
            }
            return item.label;
          }}
          placeholder={intl.getMessage('tableForm.selectPlaceholder', '请选择')}
          resetData={resetData}
          style={{
            minWidth: 100,
            ...rest.style,
          }}
          variant={variant}
          {...fieldProps}
          options={options}
        />
      );
    };
    const dom = renderDom();
    if (formItemRender) {
      return formItemRender(rest.text, { mode, ...fieldProps, options, loading }, dom) ?? null;
    }
    return dom;
  }
  return null;
};

export default FieldSelect;
