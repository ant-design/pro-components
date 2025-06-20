import { useIntl } from '@ant-design/pro-provider';
import {
  FieldLabel,
  objectToMap,
  proFieldParsingText,
} from '@ant-design/pro-utils';
import type { RadioGroupProps, TreeSelectProps } from 'antd';
import { ConfigProvider, Spin, TreeSelect } from 'antd';
import classNames from 'classnames';
import useMergedState from 'rc-util/lib/hooks/useMergedState';
import React, {
  useContext,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from 'react';
import type { ProFieldFC } from '../../index';
import type { FieldSelectProps } from '../Select';
import { useFieldFetchData } from '../Select';

// 兼容代码-----------
import 'antd/lib/spin/style';
import 'antd/lib/tree-select/style';
//----------------------

export type GroupProps = {
  options?: RadioGroupProps['options'];
  radioType?: 'button' | 'radio';
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
  { radioType, renderFormItem, mode, light, label, render, ...rest },
  ref,
) => {
  const { getPrefixCls } = useContext(ConfigProvider.ConfigContext);
  const layoutClassName = getPrefixCls('pro-field-tree-select');
  const treeSelectRef = useRef(null);
  const [open, setOpen] = useState(false);

  const {
    onSearch,
    onClear,
    onChange: propsOnChange,
    onBlur,
    showSearch,
    autoClearSearchValue,
    treeData,
    fetchDataOnSearch,
    searchValue: propsSearchValue,
    ...fieldProps
  } = rest.fieldProps as TreeSelectFieldProps;

  const intl = useIntl();

  const [loading, options, fetchData] = useFieldFetchData({
    ...rest,
    defaultKeyWords: propsSearchValue,
  });

  const [searchValue, setSearchValue] = useMergedState<string | undefined>(
    undefined,
    {
      onChange: onSearch as any,
      value: propsSearchValue,
    },
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
          onDropdownVisibleChange={(isOpen) => {
            fieldProps?.onDropdownVisibleChange?.(isOpen);
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
          bordered={!light}
          {...fieldProps}
          treeData={options as TreeSelectProps['treeData']}
          showSearch={showSearch}
          style={{
            minWidth: 60,
            ...fieldProps.style,
          }}
          allowClear={fieldProps.allowClear !== false}
          searchValue={searchValue as string}
          autoClearSearchValue={autoClearSearchValue}
          onClear={() => {
            onClear?.();
            fetchData(undefined);
            if (showSearch) {
              setSearchValue(undefined);
            }
          }}
          onChange={onChange}
          onSearch={(value) => {
            // fix 不支持请求的情况下不刷新options
            if (fetchDataOnSearch && rest?.request) {
              fetchData(value);
            }
            setSearchValue(value);
          }}
          onBlur={(event) => {
            setSearchValue(undefined);
            fetchData(undefined);
            onBlur?.(event);
          }}
          className={classNames(fieldProps?.className, layoutClassName)}
        />
      </Spin>
    );

    if (renderFormItem) {
      dom =
        renderFormItem(
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
            fieldProps?.onDropdownVisibleChange?.(true);
          }}
          bordered={rest.bordered}
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
