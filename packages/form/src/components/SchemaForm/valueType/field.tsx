import ProFormField from '../../Field';
import { omitUndefined } from '@ant-design/pro-utils';
import type { ProFormFieldProps } from '../../Field';
import type { ProSchemaRenderValueTypeFunction } from '../typing';
import omit from 'omit.js';

export const field: ProSchemaRenderValueTypeFunction = (
  item,
  { action, refMap, type, originItem },
) => {
  /** 公用的 类型 props */
  const formFieldProps: Omit<ProFormFieldProps, 'fieldProps' | 'formItemProps'> = {
    ...omit(item, ['dataIndex', 'width', 'render', 'renderFormItem', 'renderText', 'title']),
    name: item.dataIndex,
    width: item.width as 'md',
    render: item?.render
      ? (dom, entity, renderIndex) =>
          item?.render?.(dom, entity, renderIndex, action?.current, {
            type,
            ...item,
            formItemProps: item.formItemProps,
            fieldProps: item.fieldProps,
          })
      : undefined,
  };

  const defaultRender = () => {
    return <ProFormField {...formFieldProps} ignoreFormItem={true} />;
  };

  const renderFormItem: any = item?.renderFormItem
    ? (_: any, config: any) => {
        const renderConfig = omitUndefined({ ...config, onChange: undefined });
        return item?.renderFormItem?.(
          {
            type,
            ...item,
            formItemProps: item.formItemProps,
            fieldProps: item.fieldProps,
            originProps: originItem,
          },
          {
            ...renderConfig,
            defaultRender,
            type,
          },
          refMap.form!,
        );
      }
    : undefined;

  if (item?.renderFormItem) {
    const dom = renderFormItem?.(null, {});
    if (dom) {
      return (
        <ProFormField
          {...formFieldProps}
          key={`${item.key}-${item.index}`}
          renderFormItem={renderFormItem}
        />
      );
    }
    return dom;
  }

  return (
    <ProFormField
      {...formFieldProps}
      key={`${item.key}-${item.index}`}
      renderFormItem={renderFormItem}
    />
  );
};
