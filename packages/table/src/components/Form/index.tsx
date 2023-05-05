import { isDeepEqualReact, omitUndefined } from '@ant-design/pro-utils';
import type { TablePaginationConfig } from 'antd';
import omit from 'omit.js';
import React from 'react';
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
class FormSearch<T, U> extends React.Component<
  BaseFormProps<T, U> & { ghost?: boolean }
> {
  /** 查询表单相关的配置 */

  onSubmit = (value: U, firstLoad: boolean) => {
    const {
      pagination,
      beforeSearchSubmit = (searchParams: Partial<U>) => searchParams,
      action,
      onSubmit,
      onFormSearchSubmit,
    } = this.props;
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
  };

  onReset = (value: Partial<U>) => {
    const {
      pagination,
      beforeSearchSubmit = (searchParams: Partial<U>) => searchParams,
      action,
      onFormSearchSubmit,
      onReset,
    } = this.props;
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
  };

  /**
   * 只 Diff 需要用的 props，能减少 5 次左右的render
   *
   * @param next
   * @see 因为 hooks 每次的 setFormSearch 都是新的，所以每次都触发 render
   * @see action 也是同样的原因
   * @returns
   */
  isEqual = (next: BaseFormProps<T, U>) => {
    const {
      columns,
      loading,
      formRef,
      type,
      cardBordered,
      dateFormatter,
      form,
      search,
      manualRequest,
    } = this.props;
    const diffProps = {
      columns,
      loading,
      formRef,
      type,
      cardBordered,
      dateFormatter,
      form,
      search,
      manualRequest,
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

  shouldComponentUpdate = (next: BaseFormProps<T, U>) => {
    return this.isEqual(next);
  };

  render = () => {
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
    } = this.props;

    const pageInfo = pagination
      ? omitUndefined({
          current: pagination.current,
          pageSize: pagination.pageSize,
        })
      : {};
    return (
      <FormRender<U, T>
        submitButtonLoading={loading}
        columns={columns!}
        type={type}
        ghost={ghost}
        formRef={formRef!}
        onSubmit={this.onSubmit}
        manualRequest={manualRequest}
        onReset={this.onReset}
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
}

export default FormSearch;
