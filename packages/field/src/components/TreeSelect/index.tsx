import React, { useContext, useMemo, useImperativeHandle, useRef } from 'react';
import type { RadioGroupProps } from 'antd';
import { ConfigProvider, Spin, TreeSelect } from 'antd';
import classNames from 'classnames';
import type { ProFieldFC } from '../../index';
import './index.less';
import type { FieldSelectProps } from '../Select';
import { ObjToMap, proFieldParsingText, useFieldFetchData } from '../Select';

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
  const treeSelectRef = useRef();

  useImperativeHandle(ref, () => ({
    ...(treeSelectRef.current || {}),
    fetchData: () => fetchData(),
  }));

  const optionsValueEnum = useMemo<Record<string, any>>(() => {
    /**
     * Support tree-select fieldNames
     *
     * @see https://ant.design/components/tree-select-cn/
     */
    const fieldNames = rest.fieldProps?.fieldNames || {
      label: 'label',
      value: 'value',
      children: 'children',
    };

    const traverseOptions = (_options: typeof options): Record<string, any> => {
      return _options?.length
        ? _options?.reduce((pre, cur: any) => {
            return {
              ...pre,
              [cur[fieldNames.value]]: cur[fieldNames.label],
              ...traverseOptions(cur[fieldNames.children]),
            };
          }, {})
        : {};
    };
    return traverseOptions(options);
  }, [options, rest.fieldProps?.fieldNames]);

  if (mode === 'read') {
    const dom = <>{proFieldParsingText(rest.text, ObjToMap(rest.valueEnum || optionsValueEnum))}</>;

    if (render) {
      return render(rest.text, { mode, ...rest.fieldProps }, dom) || null;
    }
    return dom;
  }

  if (mode === 'edit') {
    const dom = (
      <Spin spinning={loading}>
        <TreeSelect
          ref={treeSelectRef}
          treeData={options}
          {...rest.fieldProps}
          className={classNames(rest.fieldProps?.className, layoutClassName)}
        />
      </Spin>
    );
    if (renderFormItem) {
      return renderFormItem(rest.text, { mode, ...rest.fieldProps }, dom) || null;
    }
    return dom;
  }

  return null;
};

export default React.forwardRef(FieldTreeSelect);
