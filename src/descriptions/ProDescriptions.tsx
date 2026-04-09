import type { DescriptionsItemType } from 'antd/es/descriptions';
import { ConfigProvider, Descriptions, Space } from 'antd';
import React, { useContext, useEffect } from 'react';
import ValueTypeToComponent from '../field/ValueTypeToComponent';
import ProForm from '../form';
import ProConfigContext, { ProConfigProvider } from '../provider';
import ProSkeleton from '../skeleton';
import {
  ErrorBoundary,
  LabelIconTip,
  stringify,
  useEditableMap,
} from '../utils';
import { schemaToDescriptionsItem } from './schemaToDescriptionsItem';
import type { ProDescriptionsItemProps, ProDescriptionsProps } from './typing';
import type { RequestData } from './useFetchData';
import useFetchData from './useFetchData';

const DefaultProDescriptionsDom = (dom: { children: any }) => dom.children;

const ProDescriptions = <
  RecordType extends Record<string, any>,
  ValueType = 'text',
>(
  props: ProDescriptionsProps<RecordType, ValueType>,
) => {
  const {
    request,
    columns,
    params,
    dataSource,
    onDataSourceChange,
    formProps,
    editable,
    loading,
    onLoadingChange,
    actionRef,
    onRequestError,
    emptyText: _emptyText,
    ...rest
  } = props;

  const { children: _ignoredChildren, ...descriptionsProps } = rest as typeof rest &
    { children?: React.ReactNode };

  const proContext = useContext(ProConfigContext);
  const context = useContext(ConfigProvider.ConfigContext);

  const action = useFetchData<RequestData>(
    async () => {
      const data = request ? await request(params || {}) : { data: {} };
      return data;
    },
    {
      onRequestError,
      effects: [stringify(params)],
      manual: !request,
      dataSource,
      loading,
      onLoadingChange,
      onDataSourceChange,
    },
  );

  const editableUtils = useEditableMap<any>({
    ...props.editable,
    childrenColumnName: undefined,
    dataSource: action.dataSource,
    setDataSource: action.setDataSource,
  });

  useEffect(() => {
    if (actionRef) {
      actionRef.current = {
        reload: action.reload,
        ...editableUtils,
      };
    }
  }, [action, actionRef, editableUtils]);

  if (action.loading || (action.loading === undefined && request)) {
    return <ProSkeleton type="descriptions" list={false} pageHeader={false} />;
  }

  const getColumns = (): ProDescriptionsItemProps<RecordType, ValueType>[] => {
    return (columns || [])
      .filter((item) => {
        if (!item) return false;
        if (
          item?.valueType &&
          ['index', 'indexBorder'].includes(item?.valueType as string)
        ) {
          return false;
        }
        return !item?.hideInDescriptions;
      })
      .sort((a, b) => {
        if (b.order || a.order) {
          return (b.order || 0) - (a.order || 0);
        }
        return (b.index || 0) - (a.index || 0);
      });
  };

  const { options, children } = schemaToDescriptionsItem(
    getColumns(),
    action.dataSource || {},
    actionRef?.current || action,
    editable ? editableUtils : undefined,
    props.emptyText,
  );

  const FormComponent = editable ? ProForm : DefaultProDescriptionsDom;

  let title = null;
  if (descriptionsProps.title || descriptionsProps.tooltip) {
    title = (
      <LabelIconTip
        label={descriptionsProps.title}
        tooltip={descriptionsProps.tooltip}
      />
    );
  }

  const className = context.getPrefixCls('pro-descriptions');
  return (
    <ErrorBoundary>
      <ProConfigProvider
        valueTypeMap={{ ...proContext.valueTypeMap, ...ValueTypeToComponent }}
      >
        <FormComponent
          key="form"
          form={props.editable?.form}
          component={false}
          submitter={false}
          {...formProps}
          onFinish={undefined}
        >
          <Descriptions
            className={className}
            {...descriptionsProps}
            styles={{
              content: {
                minWidth: 0,
              },
            }}
            extra={
              descriptionsProps.extra ? (
                <Space>
                  {options}
                  {descriptionsProps.extra}
                </Space>
              ) : (
                options
              )
            }
            title={title}
            items={children as DescriptionsItemType[]}
          />
        </FormComponent>
      </ProConfigProvider>
    </ErrorBoundary>
  );
};

export { ProDescriptions };
export default ProDescriptions;
