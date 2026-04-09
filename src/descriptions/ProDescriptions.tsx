import { toArray } from '@rc-component/util';
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
    const childrenColumns = toArray(props.children)
      .filter(Boolean)
      .map((item) => {
        if (!React.isValidElement(item)) {
          return item;
        }
        const {
          valueEnum,
          valueType,
          dataIndex,
          ellipsis,
          copyable,
          request: itemRequest,
        } = item?.props as ProDescriptionsItemProps;

        if (
          !valueType &&
          !valueEnum &&
          !dataIndex &&
          !itemRequest &&
          !ellipsis &&
          !copyable
        ) {
          return item;
        }

        return {
          ...(item?.props as ProDescriptionsItemProps),
          entity: dataSource,
        };
      }) as ProDescriptionsItemProps<RecordType, ValueType>[];
    return [...(columns || []), ...childrenColumns]
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
  if (rest.title || rest.tooltip) {
    title = <LabelIconTip label={rest.title} tooltip={rest.tooltip} />;
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
            {...rest}
            styles={{
              content: {
                minWidth: 0,
              },
            }}
            extra={
              rest.extra ? (
                <Space>
                  {options}
                  {rest.extra}
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

/** antd `Descriptions.Item`，并扩展 `ProDescriptionsItemProps`（`valueType`、`dataIndex` 等） */
export const ProDescriptionsItem = Descriptions.Item as React.FC<ProDescriptionsItemProps>;

export { ProDescriptions };
export default ProDescriptions;
