import { omit } from '@rc-component/util';
import type { TablePaginationConfig } from 'antd';
import React, { memo, useCallback, useMemo } from 'react';
import { isDeepEqualReact, omitUndefined } from '../../../utils';
import type { ActionType, ProTableProps } from '../../typing';
import { isBordered } from '../../utils/index';
import FormRender from './FormRender';

type BaseFormProps<T, U> = {
  pagination?: TablePaginationConfig | false;
  beforeSearchSubmit?: (params: Partial<U>) => any;
  action: React.MutableRefObject<ActionType | undefined>;
  onSubmit?: (params: U) => void;
  onReset?: () => void;
  loading: boolean;
  onFormSearchSubmit: (params: U) => void;
  columns: ProTableProps<T, U, any>['columns'];
  dateFormatter: ProTableProps<T, U, any>['dateFormatter'];
  formRef: ProTableProps<T, U, any>['formRef'];
  type: ProTableProps<T, U, any>['type'];
  cardBordered: ProTableProps<T, U, any>['cardBordered'];
  form: ProTableProps<T, U, any>['form'];
  search: ProTableProps<T, U, any>['search'];
  manualRequest: ProTableProps<T, U, any>['manualRequest'];
};

/** 查询表单相关的配置 */
const FormSearch = <T, U>(props: BaseFormProps<T, U> & { ghost?: boolean }) => {
  const {
    columns,
    loading,
    formRef,
    type,
    action,
    cardBordered,
    dateFormatter,
    form,
    search,
    pagination,
    ghost,
    manualRequest,
    beforeSearchSubmit = (searchParams: Partial<U>) => searchParams,
    onSubmit,
    onFormSearchSubmit,
    onReset,
  } = props;

  const onSubmitHandler = useCallback(
    (value: U, firstLoad: boolean) => {
      // 只传入 pagination 中的 current 和 pageSize 参数
      const pageInfo = pagination
        ? omitUndefined({
            current: pagination.current,
            pageSize: pagination.pageSize,
          })
        : {};

      const submitParams = {
        ...value,
        _timestamp: Date.now(),
        ...pageInfo,
      };
      const omitParams = omit(
        beforeSearchSubmit(submitParams),
        Object.keys(pageInfo!),
      ) as U;
      onFormSearchSubmit(omitParams);
      if (!firstLoad) {
        // back first page
        action.current?.setPageInfo?.({
          current: 1,
        });
      }
      // 不是第一次提交就不触发，第一次提交是 js 触发的
      // 为了解决 https://github.com/ant-design/pro-components/issues/579
      if (onSubmit && !firstLoad) {
        onSubmit?.(value);
      }
    },
    [pagination, beforeSearchSubmit, action, onSubmit, onFormSearchSubmit],
  );

  const onResetHandler = useCallback(
    (value: Partial<U>) => {
      const pageInfo = pagination
        ? omitUndefined({
            current: pagination.current,
            pageSize: pagination.pageSize,
          })
        : {};

      const omitParams = omit(
        beforeSearchSubmit({ ...value, ...pageInfo }),
        Object.keys(pageInfo!),
      ) as U;
      onFormSearchSubmit(omitParams);
      // back first page
      action.current?.setPageInfo?.({
        current: 1,
      });
      onReset?.();
    },
    [pagination, beforeSearchSubmit, action, onFormSearchSubmit, onReset],
  );

  const pageInfo = useMemo(
    () =>
      pagination
        ? omitUndefined({
            current: pagination.current,
            pageSize: pagination.pageSize,
          })
        : {},
    [pagination],
  );

  return (
    <FormRender<U, T>
      submitButtonLoading={loading}
      columns={columns!}
      type={type}
      ghost={ghost}
      formRef={formRef!}
      onSubmit={onSubmitHandler}
      manualRequest={manualRequest}
      onReset={onResetHandler}
      dateFormatter={dateFormatter}
      search={search}
      form={{
        autoFocusFirstInput: false,
        ...form,
        extraUrlParams: {
          ...pageInfo,
          ...form?.extraUrlParams,
        },
      }}
      action={action}
      bordered={isBordered('search', cardBordered)}
    />
  );
};

/**
 * 只 Diff 需要用的 props，能减少 5 次左右的render
 * @param prev
 * @param next
 * @see 因为 hooks 每次的 setFormSearch 都是新的，所以每次都触发 render
 * @see action 也是同样的原因
 * @returns
 */
const isPropsEqual = <T, U>(
  prev: BaseFormProps<T, U> & { ghost?: boolean },
  next: BaseFormProps<T, U> & { ghost?: boolean },
): boolean => {
  const diffProps = {
    columns: prev.columns,
    loading: prev.loading,
    formRef: prev.formRef,
    type: prev.type,
    cardBordered: prev.cardBordered,
    dateFormatter: prev.dateFormatter,
    form: prev.form,
    search: prev.search,
    manualRequest: prev.manualRequest,
  };
  return !isDeepEqualReact(diffProps, {
    columns: next.columns,
    formRef: next.formRef,
    loading: next.loading,
    type: next.type,
    cardBordered: next.cardBordered,
    dateFormatter: next.dateFormatter,
    form: next.form,
    search: next.search,
    manualRequest: next.manualRequest,
  });
};

export default memo(FormSearch, isPropsEqual);
