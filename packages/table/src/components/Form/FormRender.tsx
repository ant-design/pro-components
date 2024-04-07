import type {
  BaseQueryFilterProps,
  ProFormInstance,
  ProFormProps,
} from '@ant-design/pro-form';
import { BetaSchemaForm } from '@ant-design/pro-form';
import { ProProvider } from '@ant-design/pro-provider';
import type { ProSchemaComponentTypes } from '@ant-design/pro-utils';
import type { FormItemProps } from 'antd';
import { ConfigProvider, Table } from 'antd';
import classNames from 'classnames';
import omit from 'omit.js';
import React, { useContext, useMemo } from 'react';
import type { ActionType, ProColumns, ProTableProps } from '../../typing';

function toLowerLine(str: string) {
  let temp = str.replace(/[A-Z]/g, (match) => {
    return `-${match.toLowerCase()}`;
  });

  if (temp.startsWith('-')) {
    // 如果首字母是大写，执行replace时会多一个_，这里需要去掉
    temp = temp.slice(1);
  }
  return temp;
}

export type SearchConfig = BaseQueryFilterProps & {
  filterType?: 'query' | 'light';
};

/**
 * 获取当前选择的 Form Layout 配置
 *
 * @param isForm
 * @param searchConfig
 * @returns LightFilter | QueryFilter | ProForm
 */
const getFormCompetent = (
  isForm: boolean,
  searchConfig?: SearchConfig | false,
): 'Form' | 'LightFilter' | 'QueryFilter' => {
  if (!isForm && searchConfig !== false) {
    if (searchConfig?.filterType === 'light') {
      return 'LightFilter';
    }
    return 'QueryFilter';
  }
  return 'Form';
};

/**
 * 获取需要传给相应表单的props
 *
 * @param searchConfig
 * @param name
 */
const getFromProps = (isForm: boolean, searchConfig: any, name: string) => {
  if (!isForm && name === 'LightFilter') {
    // 传给 lightFilter 的问题
    return omit(
      {
        ...searchConfig,
      },
      ['labelWidth', 'defaultCollapsed', 'filterType'],
    );
  }

  if (!isForm) {
    // 传给 QueryFilter 的配置
    return omit(
      {
        labelWidth: searchConfig ? searchConfig?.labelWidth : undefined,
        defaultCollapsed: true,
        ...searchConfig,
      },
      ['filterType'],
    );
  }
  return {};
};

/**
 * 从formConfig中获取传给相应表单的配置
 *
 * @param isForm
 * @param formConfig
 */
const getFormConfigs = (isForm: boolean, formConfig: any) => {
  if (isForm) {
    // 传给Form的配置
    return omit(formConfig, ['ignoreRules']);
  }
  // 传给Filter的配置
  return { ignoreRules: true, ...formConfig };
};

export type TableFormItem<T, U = any> = {
  onSubmit?: (value: T, firstLoad: boolean) => void;
  onReset?: (value: T) => void;
  form?: Omit<ProFormProps, 'form'>;
  type?: ProSchemaComponentTypes;
  dateFormatter?: ProTableProps<T, U, any>['dateFormatter'];
  search?: false | SearchConfig;
  columns: ProColumns<U, any>[];
  formRef: React.MutableRefObject<ProFormInstance | undefined>;
  submitButtonLoading?: boolean;
  manualRequest?: boolean;
  bordered?: boolean;
  action: React.MutableRefObject<ActionType | undefined>;
  ghost?: boolean;
} & Omit<FormItemProps, 'children' | 'onReset'>;

/**
 * 这里会把 列配置转化为 form 表单
 *
 * @param param0
 * @returns
 */
const FormRender = <T, U = any>({
  onSubmit,
  formRef,
  dateFormatter = 'string',
  type,
  columns,
  action,
  ghost,
  manualRequest,
  onReset,
  submitButtonLoading,
  search: searchConfig,
  form: formConfig,
  bordered,
}: TableFormItem<T, U>) => {
  const { hashId } = useContext(ProProvider);
  const isForm = type === 'form';
  /** 提交表单，根据两种模式不同，方法不相同 */
  const submit = async (values: T, firstLoad: boolean) => {
    if (onSubmit) {
      onSubmit(values, firstLoad);
    }
  };

  const { getPrefixCls } = useContext(ConfigProvider.ConfigContext);

  const columnsList = useMemo(() => {
    return columns
      .filter((item) => {
        if (item === Table.EXPAND_COLUMN || item === Table.SELECTION_COLUMN) {
          return false;
        }
        if ((item.hideInSearch || item.search === false) && type !== 'form') {
          return false;
        }
        if (type === 'form' && item.hideInForm) {
          return false;
        }
        return true;
      })
      .map((item) => {
        const finalValueType =
          !item.valueType ||
          (['textarea', 'jsonCode', 'code'].includes(item?.valueType) &&
            type === 'table')
            ? 'text'
            : (item?.valueType as 'text');
        const columnKey = item?.key || item?.dataIndex?.toString();

        return {
          ...item,
          width: undefined,
          ...(item.search && typeof item.search === 'object'
            ? item.search
            : {}),
          valueType: finalValueType,
          proFieldProps: {
            ...item.proFieldProps,
            proFieldKey: columnKey ? `table-field-${columnKey}` : undefined,
          },
        };
      });
  }, [columns, type]);

  const className = getPrefixCls('pro-table-search');
  const formClassName = getPrefixCls('pro-table-form');

  const competentName = useMemo(
    () => getFormCompetent(isForm, searchConfig),
    [searchConfig, isForm],
  );

  // 传给每个表单的配置，理论上大家都需要
  const loadingProps: any = useMemo(
    () => ({
      submitter: {
        submitButtonProps: {
          loading: submitButtonLoading,
        },
      },
    }),
    [submitButtonLoading],
  );

  return (
    <div
      className={classNames(hashId, {
        [getPrefixCls('pro-card')]: true,
        [`${getPrefixCls('pro-card')}-border`]: !!bordered,
        [`${getPrefixCls('pro-card')}-bordered`]: !!bordered,
        [`${getPrefixCls('pro-card')}-ghost`]: !!ghost,
        [className]: true,
        [formClassName]: isForm,
        [getPrefixCls(`pro-table-search-${toLowerLine(competentName)}`)]: true,
        [`${className}-ghost`]: ghost,
        [(searchConfig as { className: string })?.className]:
          searchConfig !== false && searchConfig?.className,
      })}
    >
      <BetaSchemaForm<U>
        layoutType={competentName}
        columns={columnsList}
        type={type}
        {...loadingProps}
        {...getFromProps(isForm, searchConfig, competentName)}
        {...getFormConfigs(isForm, formConfig || {})}
        formRef={formRef}
        action={action}
        dateFormatter={dateFormatter}
        onInit={(values: T, form) => {
          formRef.current = form;
          // 触发一个 submit，之所以这里触发是为了保证 value 都被 format了
          if (type !== 'form') {
            // 修改 pageSize，变成从 url 中获取的
            const pageInfo = action.current?.pageInfo;
            // 从 values 里获取是因为有时候要从 url中获取的 pageSize。
            const {
              current = pageInfo?.current,
              pageSize = pageInfo?.pageSize,
            } = values as any;
            action.current?.setPageInfo?.({
              ...pageInfo,
              current: parseInt(current, 10),
              pageSize: parseInt(pageSize, 10),
            });
            /** 如果是手动模式不需要提交 */
            if (manualRequest) return;
            submit(values, true);
          }
        }}
        onReset={(values: T) => {
          onReset?.(values);
        }}
        onFinish={(values: T) => {
          submit(values, false);
        }}
        initialValues={formConfig?.initialValues}
      />
    </div>
  );
};

export default FormRender;
