import { useControlledState } from '@rc-component/util';
import type { RadioGroupProps, TreeSelectProps } from 'antd';
import { ConfigProvider, Spin, TreeSelect } from 'antd';
import { clsx } from 'clsx';
import isObject from 'lodash-es/isObject';
import React, {
  useCallback,
  useContext,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from 'react';
import { useIntl } from '../../../provider';
import { FieldLabel, objectToMap, proFieldParsingText } from '../../../utils';
import type { ProFieldFC } from '../../PureProField';
import type { FieldSelectProps } from '../Select';
import { useFieldFetchData } from '../Select';

export type GroupProps = {
  options?: RadioGroupProps['options'];
  radioType?: 'button' | 'radio';
  variant?: 'outlined' | 'borderless' | 'filled';
} & FieldSelectProps;

export type TreeSelectFieldProps = TreeSelectProps<any> & {
  /**
   * 当搜索关键词发生变化时是否请求远程数据
   *
   * @default true
   */
  fetchDataOnSearch?: boolean;
};
/**
 * Tree select
 * A function that returns a React component.
 * @param ref
 */
const FieldTreeSelect: ProFieldFC<GroupProps> = (
  {
    radioType,
    formItemRender,
    mode,
    light,
    label,
    render,
    variant: propsVariant,
    ...rest
  },
  ref,
) => {
  const { getPrefixCls } = useContext(ConfigProvider.ConfigContext);
  const layoutClassName = getPrefixCls('pro-field-tree-select');
  const treeSelectRef = useRef(null);
  const [open, setOpen] = useState(false);

  const rawFieldProps = rest.fieldProps as TreeSelectFieldProps;
  const showSearchConfig = isObject(rawFieldProps?.showSearch)
    ? rawFieldProps.showSearch
    : {};
  const {
    searchValue: propsSearchValue,
    autoClearSearchValue = true,
    onSearch,
  } = showSearchConfig;

  const {
    onClear,
    onChange: propsOnChange,
    onBlur,
    showSearch,
    treeData,
    fetchDataOnSearch,
    ...fieldProps
  } = rawFieldProps;

  const variant = propsVariant ?? (fieldProps as any)?.variant;
  const intl = useIntl();

  const [loading, options, fetchData] = useFieldFetchData({
    ...rest,
    defaultKeyWords: propsSearchValue,
  });

  const [searchValue, setSearchValueInner] = useControlledState<
    string | undefined
  >(undefined, propsSearchValue);
  const setSearchValue = useCallback(
    (
      updater:
        | string
        | undefined
        | ((prev: string | undefined) => string | undefined),
    ) => {
      setSearchValueInner((prev) => {
        const next =
          typeof updater === 'function'
            ? (updater as (p: string | undefined) => string | undefined)(prev)
            : updater;
        (onSearch as (v?: string) => void)?.(next);
        return next;
      });
    },
    [onSearch],
  );

  useImperativeHandle(ref, () => ({
    ...(treeSelectRef.current || {}),
    fetchData: (keyWord: string) => fetchData(keyWord),
  }));

  const optionsValueEnum = useMemo(() => {
    if (mode !== 'read') return;
    /**
     * Support TreeSelect fieldNames
     * @see https://ant.design/components/tree-select-cn
     */
    const {
      value: valuePropsName = 'value',
      label: labelPropsName = 'label',
      children: childrenPropsName = 'children',
    } = fieldProps?.fieldNames || {};

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
        traverseOptions(cur[childrenPropsName]);
      }
      return valuesMap;
    };

    return traverseOptions(options);
  }, [fieldProps?.fieldNames, mode, options]);

  const onChange: TreeSelectProps<any>['onChange'] = (
    value,
    optionList,
    extra,
  ) => {
    // 将搜索框置空 和 antd 行为保持一致
    if (showSearch && autoClearSearchValue) {
      fetchData(undefined);
      setSearchValue(undefined);
    }
    propsOnChange?.(value, optionList, extra);
  };

  if (mode === 'read') {
    const dom = (
      <>
        {proFieldParsingText(
          rest.text,
          objectToMap(rest.valueEnum || optionsValueEnum),
        )}
      </>
    );

    if (render) {
      return (
        render(
          rest.text,
          { mode, ...(fieldProps as any), treeData: options },
          dom,
        ) ?? null
      );
    }
    return dom;
  }
  if (mode === 'edit') {
    const valuesLength = Array.isArray(fieldProps?.value)
      ? fieldProps?.value?.length
      : 0;
    let dom = (
      <Spin spinning={loading}>
        <TreeSelect<string | undefined>
          open={open}
          onOpenChange={(isOpen) => {
            fieldProps?.onOpenChange?.(isOpen);
            setOpen(isOpen);
          }}
          ref={treeSelectRef}
          popupMatchSelectWidth={!light}
          placeholder={intl.getMessage('tableForm.selectPlaceholder', '请选择')}
          tagRender={
            light
              ? (item) => {
                  if (valuesLength < 2) return <>{item.label}</>;
                  /**
                   * 性能不好，等我给 antd 提个issue
                   */
                  const itemIndex = fieldProps?.value?.findIndex(
                    (v: any) => v === item.value || v.value === item.value,
                  );
                  return (
                    <>
                      {item.label} {itemIndex < valuesLength - 1 ? ',' : ''}
                    </>
                  );
                }
              : undefined
          }
          {...fieldProps}
          treeData={options as TreeSelectProps['treeData']}
          style={{
            minWidth: 60,
            ...fieldProps.style,
          }}
          allowClear={fieldProps.allowClear !== false}
          showSearch={
            showSearch
              ? {
                  ...showSearchConfig,
                  searchValue,
                  onSearch: (value) => {
                    if (fetchDataOnSearch && rest?.request) {
                      fetchData(value);
                    }
                    setSearchValue(value);
                  },
                }
              : false
          }
          onClear={() => {
            onClear?.();
            fetchData(undefined);
            if (showSearch) {
              setSearchValue(undefined);
            }
          }}
          onChange={onChange}
          onBlur={(event) => {
            if (showSearch) {
              setSearchValue(undefined);
              fetchData(undefined);
            }
            onBlur?.(event);
          }}
          className={clsx(fieldProps?.className, layoutClassName)}
        />
      </Spin>
    );

    if (formItemRender) {
      dom =
        formItemRender(
          rest.text,
          { mode, ...(fieldProps as any), options, loading },
          dom,
        ) ?? null;
    }

    if (light) {
      const { disabled, placeholder } = fieldProps;
      const notEmpty = !!fieldProps.value && fieldProps.value?.length !== 0;

      return (
        <FieldLabel
          label={label}
          disabled={disabled}
          placeholder={placeholder}
          onClick={() => {
            setOpen(true);
            fieldProps?.onOpenChange?.(true);
          }}
          variant={variant}
          value={notEmpty || open ? dom : null}
          style={
            notEmpty
              ? {
                  paddingInlineEnd: 0,
                }
              : undefined
          }
          allowClear={false}
          downIcon={false}
        />
      );
    }
    return dom;
  }

  return null;
};

export default React.forwardRef(FieldTreeSelect);
