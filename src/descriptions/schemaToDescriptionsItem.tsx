import { EditOutlined } from '@ant-design/icons';
import { Space } from 'antd';
import type { DescriptionsItemType } from 'antd/es/descriptions';
import React from 'react';
import type { ProCoreActionType, UseEditableMapUtilType } from '../utils';
import { LabelIconTip, genCopyable } from '../utils';
import { FieldRender } from './FieldRender';
import { getDataFromConfig } from './getDataFromConfig';
import { resolveDescriptionsValueType } from './resolveValueType';
import type { ProDescriptionsColumn } from './typing';

export function schemaToDescriptionsItem(
  items: ProDescriptionsColumn<any, any>[],
  entity: Record<string, unknown> | undefined,
  action: ProCoreActionType<any>,
  editableUtils?: UseEditableMapUtilType,
  emptyText?: React.ReactNode,
) {
  const options: React.JSX.Element[] = [];
  const children = items
    ?.map?.((item, index) => {
      const row = entity ?? {};
      const {
        valueEnum: _valueEnum,
        render: _render,
        renderText,
        mode,
        plain: _plain,
        dataIndex,
        request: _request,
        params: _params,
        editable,
        ...restItem
      } = item as ProDescriptionsColumn;

      const defaultData = getDataFromConfig(item, entity) ?? restItem.children;

      const text = renderText
        ? renderText(defaultData, row, index, action)
        : defaultData;

      const title =
        typeof restItem.title === 'function'
          ? restItem.title(item, 'descriptions', null)
          : restItem.title;

      const valueType = resolveDescriptionsValueType(item, row);

      const isEditable = editableUtils?.isEditable(
        (dataIndex as React.Key) || index,
      );

      const fieldMode = mode || isEditable ? 'edit' : 'read';

      const showEditIcon =
        editableUtils &&
        fieldMode === 'read' &&
        editable !== false &&
        editable?.(text, row, index) !== false;

      const Component = showEditIcon ? Space : React.Fragment;

      const contentDom: React.ReactNode =
        fieldMode === 'edit'
          ? text
          : genCopyable(text, item, text, defaultData);

      const key = restItem.key || restItem.label?.toString() || index;
      const label = (title || restItem.label || restItem.tooltip) && (
        <LabelIconTip
          label={title || restItem.label}
          tooltip={restItem.tooltip}
          ellipsis={item.ellipsis}
        />
      );
      const field: DescriptionsItemType | React.JSX.Element =
        valueType !== 'option'
          ? ({
              ...restItem,
              key,
              label,
              children: (
                <Component>
                  <FieldRender
                    {...item}
                    key={item?.key}
                    dataIndex={item.dataIndex || index}
                    mode={fieldMode}
                    text={contentDom}
                    valueType={valueType}
                    entity={row}
                    index={index}
                    emptyText={emptyText}
                    action={action}
                    editableUtils={editableUtils}
                  />
                  {showEditIcon && (
                    <EditOutlined
                      onClick={() => {
                        editableUtils?.startEditable(
                          (dataIndex as React.Key) || index,
                        );
                      }}
                    />
                  )}
                </Component>
              ),
            } as DescriptionsItemType)
          : ((
              <React.Fragment key={key}>
                <Component>
                  <FieldRender
                    {...item}
                    dataIndex={item.dataIndex || index}
                    mode={fieldMode}
                    text={contentDom}
                    valueType={valueType}
                    entity={row}
                    index={index}
                    action={action}
                    editableUtils={editableUtils}
                  />
                  {showEditIcon && valueType !== 'option' && (
                    <EditOutlined
                      onClick={() => {
                        editableUtils?.startEditable(
                          (dataIndex as React.Key) || index,
                        );
                      }}
                    />
                  )}
                </Component>
              </React.Fragment>
            ) as React.JSX.Element);
      if (valueType === 'option') {
        options.push(field as React.JSX.Element);
        return null;
      }
      return field;
    })
    .filter((item) => item);
  return {
    options: options?.length ? options : null,
    children,
  };
}
