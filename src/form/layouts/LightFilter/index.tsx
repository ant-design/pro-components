import { FilterOutlined } from '@ant-design/icons';
import { omit } from '@rc-component/util';
import type { FormProps, PopoverProps } from 'antd';
import { ConfigProvider, Space } from 'antd';
import type { SizeType } from 'antd/lib/config-provider/SizeContext';
import type { TooltipPlacement } from 'antd/lib/tooltip';
import { clsx } from 'clsx';
import React, {
  useContext,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from 'react';
import { useIntl } from '../../../provider';
import { FieldLabel, FilterDropdown } from '../../../utils';
import type { CommonFormProps, ProFormInstance } from '../../BaseForm';
import { BaseForm } from '../../BaseForm';
import type { LightFilterFooterRender } from '../../typing';
import { ProForm } from '../ProForm';
import { useStyle } from './style';

const isSpaceOrCompact = (child: any) =>
  child?.type === Space || child?.type === Space.Compact;

const cloneSpaceWithChildrenProps = (
  child: React.ReactElement,
  injectProps: (grandChild: React.ReactElement) => Record<string, any>,
) =>
  React.cloneElement(child, {
    children: React.Children.map(
      (child.props as { children?: React.ReactNode }).children,
      (grandChild) => {
        if (!React.isValidElement(grandChild) || !grandChild.props)
          return grandChild;
        return React.cloneElement(grandChild, injectProps(grandChild));
      },
    ),
  });

export type LightFilterProps<T, U = Record<string, any>> = {
  collapse?: boolean;
  /**
   * @name 收起的label dom
   *
   * @example collapseLabel={"收起"}
   */
  collapseLabel?: React.ReactNode;
  /**
   * @name 组件样式变体
   */
  variant?: 'outlined' | 'filled' | 'borderless';
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
  /**
   * @name 透传给内部 Popover 的属性（折叠态弹层）
   *
   * @description
   * LightFilter 在折叠态会使用 Popover 将筛选项渲染到 body 下；
   * 可通过该属性为弹层根节点添加自定义类名（如 classNames.root）以便做样式覆盖。
   *
   * @example
   * popoverProps={{ classNames: { root: 'my-lightfilter-popover' } } }
   */
  popoverProps?: Omit<
    PopoverProps,
    'children' | 'content' | 'trigger' | 'open' | 'onOpenChange' | 'placement'
  >;
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
  }, [props.items]);

  const renderCollapseLabelRender = () => {
    if (collapseLabel) {
      return collapseLabel;
    }
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
  };

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

          if (isSpaceOrCompact(child)) {
            const clonedSpace = cloneSpaceWithChildrenProps(
              child,
              (grandChild) => {
                const grandFieldProps = grandChild.props?.fieldProps || {};
                const grandPlacement =
                  grandFieldProps.placement ?? newPlacement;
                return {
                  fieldProps: {
                    ...grandFieldProps,
                    placement: grandPlacement,
                    variant: 'borderless',
                  },
                  proFieldProps: {
                    ...grandChild.props?.proFieldProps,
                    light: true,
                    label: grandChild.props?.label,
                    variant,
                  },
                  variant,
                };
              },
            );
            return (
              <div
                className={clsx(`${lightFilterClassName}-item`, hashId)}
                key={key || index}
              >
                {React.cloneElement(clonedSpace, {
                  size: child.type === Space.Compact ? 0 : 'small',
                  style: {
                    ...(child.props as { style?: React.CSSProperties }).style,
                    ...(child.type === Space.Compact ? { gap: 0 } : {}),
                  },
                })}
              </div>
            );
          }

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
                  light: true,
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
                  const collectNames = (item: any) => {
                    if (React.isValidElement(item) && isSpaceOrCompact(item)) {
                      React.Children.forEach(
                        (item.props as { children?: React.ReactNode }).children,
                        (c) => collectNames(c),
                      );
                    } else if (item?.props?.name) {
                      clearValues[item.props.name] = undefined;
                    }
                  };
                  collapseItems.forEach(collectNames);
                  onValuesChange(clearValues);
                },
              }}
            >
              {collapseItems.map((child: any, collapseIndex: number) => {
                const { key } = child;
                if (isSpaceOrCompact(child)) {
                  const clonedSpace = cloneSpaceWithChildrenProps(
                    child,
                    (grandChild) => {
                      const { name, fieldProps: grandFieldProps } =
                        grandChild.props;
                      const newFieldProps = {
                        ...grandFieldProps,
                        onChange: (e: any) => {
                          setMoreValues({
                            ...moreValues,
                            [name]: e?.target ? e.target.value : e,
                          });
                          return false;
                        },
                      };
                      if (moreValues.hasOwnProperty(name)) {
                        newFieldProps[
                          grandChild.props.valuePropName || 'value'
                        ] = moreValues[name];
                      }
                      return {
                        fieldProps: {
                          ...newFieldProps,
                          placement: grandFieldProps?.placement ?? placement,
                          variant,
                        },
                      };
                    },
                  );
                  return (
                    <div
                      className={clsx(`${lightFilterClassName}-line`, hashId)}
                      key={key || `space-${collapseIndex}`}
                    >
                      {clonedSpace}
                    </div>
                  );
                }
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
    variant,
    footerRender,
    popoverProps,
    ...reset
  } = omit(props, ['ignoreRules']);
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
              if (item.type === ProForm.Group) return item.props.children;
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

export { LightFilter };
