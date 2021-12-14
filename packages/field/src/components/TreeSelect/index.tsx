import React, { useContext, useMemo, useImperativeHandle, useRef, useState } from 'react';
import type { RadioGroupProps, TreeSelectProps } from 'antd';
import { ConfigProvider, Spin, TreeSelect } from 'antd';
import classNames from 'classnames';
import type { ProFieldFC } from '../../index';
import './index.less';
import type { FieldSelectProps } from '../Select';
import { ObjToMap, proFieldParsingText, useFieldFetchData } from '../Select';
import type { DataNode } from 'antd/lib/tree';

export type GroupProps = {
  options?: RadioGroupProps['options'];
  radioType?: 'button' | 'radio';
} & FieldSelectProps;

/**
 * Tree select
 *
 * @param param0
 * @param ref
 */
const FieldTreeSelect: ProFieldFC<GroupProps> = (
  { radioType, renderFormItem, mode, render, ...rest },
  ref,
) => {
  const { getPrefixCls } = useContext(ConfigProvider.ConfigContext);
  const layoutClassName = getPrefixCls('pro-field-tree-select');
  const [loading, options, fetchData] = useFieldFetchData(rest);
  const treeSelectRef = useRef(null);

  const {
    onSearch,
    onClear,
    onChange,
    onBlur,
    loadData,
    showSearch,
    autoClearSearchValue,
    searchValue: propsSearchValue,
    ...fieldProps
  } = (rest.fieldProps as TreeSelectProps<any>) || {};
  const [searchValue, setSearchValue] = useState(propsSearchValue);

  useImperativeHandle(ref, () => ({
    ...(treeSelectRef.current || {}),
    fetchData: () => fetchData(),
  }));

  const optionsValueEnum = useMemo<Record<string, any>>(() => {
    /**
     * Support TreeSelect fieldNames
     *
     * @see https://ant.design/components/tree-select-cn
     */
    const {
      value: valuePropsName = 'value',
      label: labelPropsName = 'label',
      children: childrenPropsName = 'children',
    } = fieldProps?.fieldNames || {};

    const traverseOptions = (_options: typeof options): Record<string, any> => {
      return _options?.length > 0
        ? _options?.reduce((pre, cur) => {
            const label = cur[labelPropsName],
              value = cur[valuePropsName],
              children = cur[childrenPropsName];
            return {
              ...pre,
              [value]: label,
              ...traverseOptions(children),
            };
          }, {})
        : {};
    };
    return traverseOptions(options);
  }, [options, fieldProps?.fieldNames]);

  if (mode === 'read') {
    const dom = <>{proFieldParsingText(rest.text, ObjToMap(rest.valueEnum || optionsValueEnum))}</>;

    if (render) {
      return render(rest.text, { mode, ...(fieldProps as any) }, dom) || null;
    }
    return dom;
  }

  if (mode === 'edit') {
    const dom = (
      <Spin spinning={loading}>
        <TreeSelect
          ref={treeSelectRef}
          {...fieldProps}
          treeData={options as DataNode[]}
          showSearch={showSearch}
          searchValue={searchValue}
          autoClearSearchValue={autoClearSearchValue}
          onClear={() => {
            onClear?.();
            fetchData('');
            if (showSearch) {
              setSearchValue('');
            }
          }}
          loadData={
            loadData
              ? (node) => {
                  fetchData(node.value?.toString());
                  return loadData?.(node) || Promise.resolve();
                }
              : undefined
          }
          onChange={(value, optionList, extra) => {
            // 将搜索框置空 和 antd 行为保持一致
            if (showSearch && autoClearSearchValue) {
              fetchData('');
              onSearch?.('');
              setSearchValue('');
            }

            const valueIsArray = Array.isArray(value);

            /** 抹平value 不使用labelInValue做判断原因： labelInValue会被其他字段强制设为true */
            const flatValue = valueIsArray
              ? value.map((item) => item.value ?? item)
              : value?.value ?? value;

            onChange?.(flatValue, optionList, extra);
          }}
          onSearch={(value) => {
            fetchData(value);
            onSearch?.(value);
            setSearchValue(value);
          }}
          onBlur={(event) => {
            setSearchValue('');
            fetchData('');
            onBlur?.(event);
          }}
          className={classNames(fieldProps?.className, layoutClassName)}
        />
      </Spin>
    );
    if (renderFormItem) {
      return renderFormItem(rest.text, { mode, ...(fieldProps as any) }, dom) || null;
    }
    return dom;
  }

  return null;
};

export default React.forwardRef(FieldTreeSelect);
