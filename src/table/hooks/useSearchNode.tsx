import React, { useMemo } from 'react';
import type { ParamsType } from '../../provider';
import type { ActionType, ProTableProps } from '../typing';
import FormRender from '../components/Form';

export function useSearchNode<T extends Record<string, any>, U, ValueType>({
  search,
  type,
  pagination,
  beforeSearchSubmit,
  actionRef,
  columns,
  onFormSearchSubmit,
  ghost,
  onReset,
  onSubmit,
  loading,
  manualRequest,
  form,
  formRef,
  cardBordered,
  dateFormatter,
  searchFormRender,
  proTableProps,
}: {
  search: ProTableProps<T, U, ValueType>['search'];
  type: ProTableProps<T, U, ValueType>['type'];
  pagination: ProTableProps<T, U, ValueType>['pagination'];
  beforeSearchSubmit: ProTableProps<T, U, ValueType>['beforeSearchSubmit'];
  actionRef: React.MutableRefObject<ActionType | undefined>;
  columns: ProTableProps<T, U, ValueType>['columns'];
  onFormSearchSubmit: <Y extends ParamsType>(values: Y) => any;
  ghost: ProTableProps<T, U, ValueType>['ghost'];
  onReset: ProTableProps<T, U, ValueType>['onReset'];
  onSubmit: ProTableProps<T, U, ValueType>['onSubmit'];
  loading: boolean;
  manualRequest: ProTableProps<T, U, ValueType>['manualRequest'];
  form: ProTableProps<T, U, ValueType>['form'];
  formRef: React.MutableRefObject<any>;
  cardBordered: ProTableProps<T, U, ValueType>['cardBordered'];
  dateFormatter: ProTableProps<T, U, ValueType>['dateFormatter'];
  searchFormRender: ProTableProps<T, U, ValueType>['searchFormRender'];
  proTableProps: ProTableProps<T, U, ValueType>;
}): React.ReactNode {
  return useMemo(() => {
    const node =
      search === false && type !== 'form' ? null : (
        <FormRender<T, U>
          pagination={pagination}
          beforeSearchSubmit={beforeSearchSubmit}
          action={actionRef}
          columns={columns}
          onFormSearchSubmit={(values) => {
            onFormSearchSubmit(values as any);
          }}
          ghost={ghost}
          onReset={onReset}
          onSubmit={onSubmit}
          loading={loading}
          manualRequest={manualRequest}
          search={search}
          form={form}
          formRef={formRef}
          type={type || 'table'}
          cardBordered={cardBordered}
          dateFormatter={dateFormatter}
        />
      );

    if (searchFormRender && node) {
      return <>{searchFormRender(proTableProps, node)}</>;
    }
    return node;
  }, [
    actionRef,
    beforeSearchSubmit,
    cardBordered,
    columns,
    dateFormatter,
    form,
    formRef,
    ghost,
    loading,
    manualRequest,
    onFormSearchSubmit,
    onReset,
    onSubmit,
    pagination,
    proTableProps,
    search,
    searchFormRender,
    type,
  ]);
}

