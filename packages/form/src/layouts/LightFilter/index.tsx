import React, { useState, useContext, useEffect, useMemo } from 'react';
import type { FormProps } from 'antd';
import type { SizeType } from 'antd/lib/config-provider/SizeContext';
import classNames from 'classnames';
import { Form, ConfigProvider } from 'antd';
import { FilterDropdown, FieldLabel } from '@ant-design/pro-utils';
import { useIntl } from '@ant-design/pro-provider';
import { FilterOutlined } from '@ant-design/icons';
import omit from 'omit.js';

import type { CommonFormProps } from '../../BaseForm';
import BaseForm from '../../BaseForm';
import './index.less';
import type { LightFilterFooterRender } from '../../interface';

export type LightFilterProps<T> = {
  collapse?: boolean;
  collapseLabel?: React.ReactNode;
  bordered?: boolean;
  ignoreRules?: boolean;
  footerRender?: LightFilterFooterRender;
} & Omit<FormProps<T>, 'onFinish'> &
  CommonFormProps<T>;

/**
 * 单行的查询表单，一般用于配合 table 或者 list使用 有时也会用于 card 的额外区域
 *
 * @param props
 */
const LightFilterContainer: React.FC<{
  items: React.ReactNode[];
  prefixCls: string;
  size?: SizeType;
  values?: Record<string, any>;
  onValuesChange: (values: Record<string, any>) => void;
  collapse?: boolean;
  collapseLabel?: React.ReactNode;
  bordered?: boolean;
  footerRender?: LightFilterFooterRender;
}> = (props) => {
  const {
    items,
    prefixCls,
    size = 'middle',
    collapse,
    collapseLabel,
    onValuesChange,
    bordered,
    values = {},
    footerRender,
  } = props;
  const intl = useIntl();
  const lightFilterClassName = `${prefixCls}-light-filter`;

  const [open, setOpen] = useState<boolean>(false);
  const [moreValues, setMoreValues] = useState<Record<string, any>>(() => {
    return { ...values };
  });
  useEffect(() => {
    setMoreValues({ ...values });
  }, [values]);

  const { collapseItems, outsideItems } = useMemo(() => {
    const collapseItemsArr: React.ReactNode[] = [];
    const outsideItemsArr: React.ReactNode[] = [];
    items.forEach((item: any) => {
      const { secondary } = item.props || {};
      if (secondary || collapse) {
        collapseItemsArr.push(item);
      } else {
        outsideItemsArr.push(item);
      }
    });
    return {
      collapseItems: collapseItemsArr,
      outsideItems: outsideItemsArr,
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.items.length]);

  const collapseLabelRender = () => {
    if (collapseLabel) {
      return collapseLabel;
    }
    if (collapse) {
      return <FilterOutlined className={`${lightFilterClassName}-collapse-icon`} />;
    }
    return (
      <FieldLabel
        size={size}
        label={intl.getMessage('form.lightFilter.more', '更多筛选')}
        expanded={open}
      />
    );
  };

  return (
    <div
      className={classNames(lightFilterClassName, `${lightFilterClassName}-${size}`, {
        [`${lightFilterClassName}-effective`]: Object.keys(values).some((key) => values[key]),
      })}
    >
      <div className={`${lightFilterClassName}-container`}>
        {outsideItems.map((child: any, index) => {
          const { key } = child;
          return (
            <div className={`${lightFilterClassName}-item`} key={key || index}>
              {React.cloneElement(child, {
                // proFieldProps 会直接作为 ProField 的 props 传递过去
                proFieldProps: {
                  light: true,
                  label: child.props.label,
                  bordered,
                },
                bordered,
              })}
            </div>
          );
        })}
        {collapseItems.length ? (
          <div className={`${lightFilterClassName}-item`} key="more">
            <FilterDropdown
              padding={24}
              onVisibleChange={setOpen}
              visible={open}
              label={collapseLabelRender()}
              footerRender={footerRender}
              footer={{
                onConfirm: () => {
                  onValuesChange({
                    ...moreValues,
                  });
                  setOpen(false);
                },
                onClear: () => {
                  const clearValues = {};
                  collapseItems.forEach((child: any) => {
                    const { name } = child.props;
                    clearValues[name] = undefined;
                  });

                  onValuesChange(clearValues);
                },
              }}
            >
              {collapseItems.map((child: any) => {
                const { key } = child;
                const { name, fieldProps } = child.props;
                const newFieldProps = {
                  ...fieldProps,
                  onChange: (e: any) => {
                    setMoreValues({
                      ...moreValues,
                      [name]: e?.target ? e.target.value : e,
                    });
                    return false;
                  },
                };
                if (moreValues.hasOwnProperty(name)) {
                  newFieldProps[child.props.valuePropName || 'value'] = moreValues[name];
                }
                return (
                  <div className={`${lightFilterClassName}-line`} key={key}>
                    {React.cloneElement(child, {
                      fieldProps: newFieldProps,
                    })}
                  </div>
                );
              })}
            </FilterDropdown>
          </div>
        ) : null}
      </div>
    </div>
  );
};

function LightFilter<T = Record<string, any>>(props: LightFilterProps<T>) {
  const {
    size,
    collapse,
    collapseLabel,
    initialValues,
    onValuesChange,
    form: userForm,
    bordered,
    ignoreRules,
    footerRender,
    ...reset
  } = props;
  const { getPrefixCls } = useContext(ConfigProvider.ConfigContext);
  const prefixCls = getPrefixCls('pro-form');
  const [form] = Form.useForm();
  const realForm = userForm || form;
  const [values, setValues] = useState<Record<string, any>>(() => {
    return { ...initialValues };
  });
  return (
    <BaseForm
      size={size}
      initialValues={initialValues}
      form={realForm}
      contentRender={(items) => {
        return (
          <LightFilterContainer
            prefixCls={prefixCls}
            items={items.flatMap((item: any) => {
              if (item?.type.displayName === 'ProForm-Group') {
                return item.props.children;
              }
              return item;
            })}
            size={size}
            bordered={bordered}
            collapse={collapse}
            collapseLabel={collapseLabel}
            values={values}
            footerRender={footerRender}
            onValuesChange={(newValues: any) => {
              const newAllValues = {
                ...values,
                ...newValues,
              };
              setValues(newAllValues);
              realForm.setFieldsValue(newAllValues);
              realForm.submit();
              if (onValuesChange) {
                onValuesChange(newValues, newAllValues);
              }
            }}
          />
        );
      }}
      formItemProps={{
        colon: false,
        labelAlign: 'left',
      }}
      fieldProps={{
        style: {
          width: undefined,
        },
      }}
      {...omit(reset, ['labelWidth'] as any[])}
      onValuesChange={(_, allValues) => {
        setValues(allValues);
        if (onValuesChange) {
          onValuesChange(_, allValues);
        }
        realForm.submit();
      }}
    />
  );
}

export default LightFilter;
