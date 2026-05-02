import { FilterOutlined } from '@ant-design/icons';
import { omit } from '@rc-component/util';
import type { FormProps, PopoverProps } from 'antd';
import { ConfigProvider } from 'antd';
import type { SizeType } from 'antd/lib/config-provider/SizeContext';
import type { TooltipPlacement } from 'antd/lib/tooltip';
import { clsx } from 'clsx';
import React, { useContext, useImperativeHandle, useMemo, useRef, useState } from 'react';
import { useIntl } from '../../../provider';
import { FieldLabel, FilterDropdown } from '../../../utils';
import type { CommonFormProps, ProFormInstance } from '../../BaseForm';
import { BaseForm } from '../../BaseForm';
import type { LightFilterFooterRender } from '../../typing';
import { lightFilterFieldComponents } from './lightFilterFieldComponents';
import { useStyle } from './style';

export type LightFilterLayoutProps<T, U = Record<string, any>> = {
  collapse?: boolean;
  collapseLabel?: React.ReactNode;
  variant?: 'outlined' | 'filled' | 'borderless';
  ignoreRules?: boolean;
  footerRender?: LightFilterFooterRender;
  placement?: TooltipPlacement;
  popoverProps?: Omit<
    PopoverProps,
    'children' | 'content' | 'trigger' | 'open' | 'onOpenChange' | 'placement'
  >;
} & Omit<FormProps<T>, 'onFinish'> &
  CommonFormProps<T, U>;

const LightFilterContainer: React.FC<{
  items: React.ReactNode[];
  prefixCls: string;
  size?: SizeType;
  values: Record<string, any>;
  onValuesChange: (values: Record<string, any>) => void;
  collapse?: boolean;
  collapseLabel?: React.ReactNode;
  variant?: 'outlined' | 'filled' | 'borderless';
  footerRender?: LightFilterFooterRender;
  placement?: TooltipPlacement;
  popoverProps?: Omit<
    PopoverProps,
    'children' | 'content' | 'trigger' | 'open' | 'onOpenChange' | 'placement'
  >;
}> = (props) => {
  const {
    items,
    prefixCls,
    size = 'middle',
    collapse,
    collapseLabel,
    onValuesChange,
    variant = 'borderless',
    values,
    footerRender,
    placement,
    popoverProps,
  } = props;
  const intl = useIntl();
  const lightFilterClassName = `${prefixCls}-light-filter`;
  const { wrapSSR, hashId } = useStyle(lightFilterClassName);

  const [open, setOpen] = useState<boolean>(false);
  const [moreValues, setMoreValues] = useState<Record<string, any>>(() => ({
    ...values,
  }));

  const collapseLabelNode = useMemo(() => {
    if (collapseLabel) return collapseLabel;
    if (collapse) {
      return (
        <FilterOutlined
          className={clsx(`${lightFilterClassName}-collapse-icon`, hashId)}
        />
      );
    }
    return (
      <FieldLabel
        variant={variant}
        size={size}
        label={intl.getMessage('form.lightFilter.more', '更多筛选')}
      />
    );
  }, [collapseLabel, collapse, lightFilterClassName, hashId, variant, size, intl]);

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
  }, [props.items, collapse]);

  return wrapSSR(
    <div
      className={clsx(
        lightFilterClassName,
        hashId,
        `${lightFilterClassName}-${size}`,
        {
          [`${lightFilterClassName}-effective`]: Object.keys(values).some(
            (key) =>
              Array.isArray(values[key]) ? values[key].length > 0 : values[key],
          ),
        },
      )}
    >
      <div className={clsx(`${lightFilterClassName}-container`, hashId)}>
        {outsideItems.map((child: any, index) => {
          if (!child?.props) {
            return child;
          }
          const { key } = child;
          const { fieldProps } = child?.props || {};
          const newPlacement = fieldProps?.placement
            ? fieldProps?.placement
            : placement;

          return (
            <div
              className={clsx(`${lightFilterClassName}-item`, hashId)}
              key={key || index}
            >
              {React.cloneElement(child, {
                fieldProps: {
                  ...child.props.fieldProps,
                  placement: newPlacement,
                  variant: 'borderless',
                },
                proFieldProps: {
                  ...child.props.proFieldProps,
                  label: child.props.label,
                  variant,
                },
                variant,
              })}
            </div>
          );
        })}
        {collapseItems.length ? (
          <div
            className={clsx(`${lightFilterClassName}-item`, hashId)}
            key="more"
          >
            <FilterDropdown
              padding={24}
              open={open}
              onOpenChange={(changeOpen) => {
                setOpen(changeOpen);
              }}
              placement={placement}
              popoverProps={popoverProps}
              label={collapseLabelNode}
              footerRender={footerRender}
              footer={{
                onConfirm: () => {
                  onValuesChange({
                    ...moreValues,
                  });
                  setOpen(false);
                },
                onClear: () => {
                  const clearValues = {} as Record<string, any>;
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
                if (Object.prototype.hasOwnProperty.call(moreValues, name)) {
                  newFieldProps[child.props.valuePropName || 'value'] =
                    moreValues[name];
                }
                const newPlacement = fieldProps?.placement
                  ? fieldProps?.placement
                  : placement;
                return (
                  <div
                    className={clsx(`${lightFilterClassName}-line`, hashId)}
                    key={key}
                  >
                    {React.cloneElement(child, {
                      fieldProps: {
                        ...newFieldProps,
                        placement: newPlacement,
                        variant,
                      },
                    })}
                  </div>
                );
              })}
            </FilterDropdown>
          </div>
        ) : null}
      </div>
    </div>,
  );
};

function LightFilterComponent<T = Record<string, any>>(
  props: LightFilterLayoutProps<T>,
) {
  const {
    size,
    collapse,
    collapseLabel,
    initialValues,
    onValuesChange,
    form: userForm,
    placement,
    formRef: userFormRef,
    variant,
    footerRender,
    popoverProps,
    ...reset
  } = props;
  const { getPrefixCls } = useContext(ConfigProvider.ConfigContext);
  const prefixCls = getPrefixCls('pro-form');
  const [values, setValues] = useState<Record<string, any>>(() => {
    return { ...initialValues };
  });
  const formRef = useRef<ProFormInstance>();

  useImperativeHandle(userFormRef, () => formRef.current, [formRef.current]);

  return (
    <BaseForm
      size={size}
      formComponentType="LightFilter"
      initialValues={initialValues}
      form={userForm}
      contentRender={(items) => {
        return (
          <LightFilterContainer
            key={JSON.stringify(values || {})}
            prefixCls={prefixCls}
            items={items?.flatMap((item: any) => {
              if (!item || !item?.type) return item;
              if (item?.type?.displayName === 'ProForm-Group')
                return item.props.children;
              return item;
            })}
            size={size}
            variant={variant || 'borderless'}
            collapse={collapse}
            collapseLabel={collapseLabel}
            placement={placement}
            popoverProps={popoverProps}
            values={values || {}}
            footerRender={footerRender}
            onValuesChange={(newValues: any) => {
              const newAllValues = {
                ...values,
                ...newValues,
              };
              setValues(newAllValues);
              formRef.current?.setFieldsValue(newAllValues);
              formRef.current?.submit();
              if (onValuesChange) {
                onValuesChange(newValues, newAllValues);
              }
            }}
          />
        );
      }}
      formRef={formRef}
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
        onValuesChange?.(_, allValues);
        formRef.current?.submit();
      }}
    />
  );
}

type LightFilterType = typeof LightFilterComponent & typeof lightFilterFieldComponents;
const LightFilter = LightFilterComponent as LightFilterType;
Object.assign(LightFilter, lightFilterFieldComponents);
(LightFilter as { displayName?: string }).displayName = 'LightFilter';

export { LightFilter };
export default LightFilter;
export type { LightFilterLayoutProps as LightFilterProps };
