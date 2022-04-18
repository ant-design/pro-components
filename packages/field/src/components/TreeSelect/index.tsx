import React, { useContext, useMemo, useImperativeHandle, useRef, useState } from 'react';
import type { RadioGroupProps, TreeSelectProps } from 'antd';
import { ConfigProvider, Spin, TreeSelect } from 'antd';
import classNames from 'classnames';
import type { ProFieldFC } from '../../index';
import type { FieldSelectProps } from '../Select';
import { ObjToMap, proFieldParsingText, useFieldFetchData } from '../Select';
import type { DataNode } from 'antd/lib/tree';
import useMergedState from 'rc-util/lib/hooks/useMergedState';

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
  { radioType, renderFormItem, mode, light, render, ...rest },
  ref,
) => {
  const { getPrefixCls } = useContext(ConfigProvider.ConfigContext);
  const layoutClassName = getPrefixCls('pro-field-tree-select');
  const coreStyleClassName = getPrefixCls('pro-core-field-label');
  const treeSelectRef = useRef(null);

  const {
    onSearch,
    onClear,
    onChange: propsOnChange,
    onBlur,
    showSearch,
    autoClearSearchValue,
    treeData,
    searchValue: propsSearchValue = '',
    ...fieldProps
  } = (rest.fieldProps as TreeSelectProps<any>) || {};

  const [loading, options, fetchData] = useFieldFetchData({
    ...rest,
    defaultKeyWords: propsSearchValue,
  });

  const [searchValue, setSearchValue] = useMergedState(propsSearchValue, {
    onChange: onSearch,
    value: propsSearchValue,
  });

  useImperativeHandle(ref, () => ({
    ...(treeSelectRef.current || {}),
    fetchData: () => fetchData(),
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

  const onChange: TreeSelectProps<any>['onChange'] = (value, optionList, extra) => {
    // 将搜索框置空 和 antd 行为保持一致
    if (showSearch && autoClearSearchValue) {
      fetchData('');
      setSearchValue('');
    }
    propsOnChange?.(value, optionList, extra);
  };

  if (mode === 'read') {
    const dom = <>{proFieldParsingText(rest.text, ObjToMap(rest.valueEnum || optionsValueEnum))}</>;

    if (render) {
      return render(rest.text, { mode, ...(fieldProps as any) }, dom) || null;
    }
    return dom;
  }

  if (mode === 'edit') {
    const valuesLength = Array.isArray(fieldProps?.value) ? fieldProps?.value?.length : 0;
    const dom = (
      //@ts-expect-error
      <Spin spinning={loading}>
        <TreeSelect
          ref={treeSelectRef}
          dropdownMatchSelectWidth={!light}
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
          bordered={!light}
          treeData={(options || treeData) as DataNode[]}
          showSearch={showSearch}
          style={{
            minWidth: 60,
          }}
          searchValue={searchValue}
          autoClearSearchValue={autoClearSearchValue}
          onClear={() => {
            onClear?.();
            fetchData('');
            if (showSearch) {
              setSearchValue('');
            }
          }}
          onChange={onChange}
          onSearch={(value) => {
            fetchData(value);
            setSearchValue(value);
          }}
          onBlur={(event) => {
            setSearchValue('');
            fetchData('');
            onBlur?.(event);
          }}
          className={classNames(fieldProps?.className, layoutClassName, {
            [`${coreStyleClassName}-active`]: fieldProps?.value && light,
          })}
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
