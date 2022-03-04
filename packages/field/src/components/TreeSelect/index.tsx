import React, { useContext, useMemo, useImperativeHandle, useRef, useState } from 'react';
import type { RadioGroupProps, TreeSelectProps } from 'antd';
import { ConfigProvider, Spin, TreeSelect } from 'antd';
import classNames from 'classnames';
import type { ProFieldFC } from '../../index';
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

  const [searchValue, setSearchValue] = useState(propsSearchValue);

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
      onSearch?.('');
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
    const dom = (
      <Spin spinning={loading}>
        <TreeSelect
          ref={treeSelectRef}
          {...fieldProps}
          treeData={(options || treeData) as DataNode[]}
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
          onChange={onChange}
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
