import { FilterOutlined } from '@ant-design/icons';
import { useIntl } from '@ant-design/pro-provider';
import { FieldLabel, FilterDropdown } from '@ant-design/pro-utils';
import type { FormProps } from 'antd';
import { ConfigProvider } from 'antd';

import type { SizeType } from 'antd/lib/config-provider/SizeContext';
import type { TooltipPlacement } from 'antd/lib/tooltip';
import classNames from 'classnames';
import omit from 'omit.js';
import React, {
  useContext,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from 'react';
import type { CommonFormProps, ProFormInstance } from '../../BaseForm';
import { BaseForm } from '../../BaseForm';
import type { LightFilterFooterRender } from '../../typing';
import { useStyle } from './style';

export type LightFilterProps<T, U = Record<string, any>> = {
  collapse?: boolean;
  /**
   * @name 收起的label dom
   *
   * @example collapseLabel={"收起"}
   */
  collapseLabel?: React.ReactNode;
  /**
   * @name 是否有边框
   */
  bordered?: boolean;
  /**
   * @name 忽略rules，一般而言 LightFilter 应该不支持rules，默认是 false。
   */
  ignoreRules?: boolean;

  /**
   * @name 自定义 footerRender
   *
   * @example 自定义清除
   * footerRender={(onConfirm,onClear)=>{  return <a onClick={onClear}>清除</a> })}
   */
  footerRender?: LightFilterFooterRender;

  /**
   * @name 支持配置弹出的位置
   * @default bottomLeft
   */
  placement?: TooltipPlacement;
} & Omit<FormProps<T>, 'onFinish'> &
  CommonFormProps<T, U>;

/**
 * 单行的查询表单，一般用于配合 table 或者 list使用 有时也会用于 card 的额外区域
 *
 * @param props
 */
const LightFilterContainer: React.FC<{
  items: React.ReactNode[];
  prefixCls: string;
  size?: SizeType;
  values: Record<string, any>;
  onValuesChange: (values: Record<string, any>) => void;
  collapse?: boolean;
  collapseLabel?: React.ReactNode;
  bordered?: boolean;
  footerRender?: LightFilterFooterRender;
  placement?: TooltipPlacement;
}> = (props) => {
  const {
    items,
    prefixCls,
    size = 'middle',
    collapse,
    collapseLabel,
    onValuesChange,
    bordered,
    values,
    footerRender,
    placement,
  } = props;
  const intl = useIntl();
  const lightFilterClassName = `${prefixCls}-light-filter`;
  const { wrapSSR, hashId } = useStyle(lightFilterClassName);

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
  }, [props.items]);

  const renderCollapseLabelRender = () => {
    if (collapseLabel) {
      return collapseLabel;
    }
    if (collapse) {
      return (
        <FilterOutlined
          className={`${lightFilterClassName}-collapse-icon ${hashId}`.trim()}
        />
      );
    }
    return (
      <FieldLabel
        size={size}
        label={intl.getMessage('form.lightFilter.more', '更多筛选')}
      />
    );
  };

  return wrapSSR(
    <div
      className={classNames(
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
      <div className={`${lightFilterClassName}-container ${hashId}`.trim()}>
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
              className={`${lightFilterClassName}-item ${hashId}`.trim()}
              key={key || index}
            >
              {React.cloneElement(child, {
                fieldProps: {
                  ...child.props.fieldProps,
                  placement: newPlacement,
                },
                // proFieldProps 会直接作为 ProField 的 props 传递过去
                proFieldProps: {
                  ...child.props.proFieldProps,
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
          <div
            className={`${lightFilterClassName}-item ${hashId}`.trim()}
            key="more"
          >
            <FilterDropdown
              padding={24}
              open={open}
              onOpenChange={(changeOpen) => {
                setOpen(changeOpen);
              }}
              placement={placement}
              label={renderCollapseLabelRender()}
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
                if (moreValues.hasOwnProperty(name)) {
                  newFieldProps[child.props.valuePropName || 'value'] =
                    moreValues[name];
                }
                const newPlacement = fieldProps?.placement
                  ? fieldProps?.placement
                  : placement;
                return (
                  <div
                    className={`${lightFilterClassName}-line ${hashId}`.trim()}
                    key={key}
                  >
                    {React.cloneElement(child, {
                      fieldProps: {
                        ...newFieldProps,
                        placement: newPlacement,
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

function LightFilter<T = Record<string, any>>(props: LightFilterProps<T>) {
  const {
    size,
    collapse,
    collapseLabel,
    initialValues,
    onValuesChange,
    form: userForm,
    placement,
    formRef: userFormRef,
    bordered,
    ignoreRules,
    footerRender,
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
      initialValues={initialValues}
      form={userForm}
      contentRender={(items) => {
        return (
          <LightFilterContainer
            prefixCls={prefixCls}
            items={items?.flatMap((item: any) => {
              if (!item || !item?.type) return item;
              /** 如果是 ProFormGroup，直接拼接dom */
              if (item?.type?.displayName === 'ProForm-Group')
                return item.props.children;
              return item;
            })}
            size={size}
            bordered={bordered}
            collapse={collapse}
            collapseLabel={collapseLabel}
            placement={placement}
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

export { LightFilter };
