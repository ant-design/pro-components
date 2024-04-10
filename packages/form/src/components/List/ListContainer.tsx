import { PlusOutlined } from '@ant-design/icons';
import { ProProvider, useIntl } from '@ant-design/pro-provider';
import { nanoid, runFunction } from '@ant-design/pro-utils';
import { Button } from 'antd';
import omit from 'omit.js';
import type { CSSProperties } from 'react';
import { useContext, useMemo, useRef, useState } from 'react';
import { EditOrReadOnlyContext } from '../../BaseForm/EditOrReadOnlyContext';
import type { ProFormListItemProps } from './ListItem';
import { ProFormListItem } from './ListItem';

const ProFormListContainer: React.FC<ProFormListItemProps> = (props) => {
  const intl = useIntl();
  const {
    creatorButtonProps,
    prefixCls,
    children,
    creatorRecord,
    action,
    fields,
    actionGuard,
    max,
    fieldExtraRender,
    meta,
    containerClassName,
    containerStyle,
    onAfterAdd,
    onAfterRemove,
  } = props;
  const { hashId } = useContext(ProProvider);
  const fieldKeyMap = useRef(new Map<string, string>());
  const [loading, setLoading] = useState(false);

  const uuidFields = useMemo(() => {
    return fields.map((field) => {
      if (!fieldKeyMap.current?.has(field.key.toString())) {
        fieldKeyMap.current?.set(field.key.toString(), nanoid());
      }
      const uuid = fieldKeyMap.current?.get(field.key.toString());
      return {
        ...field,
        uuid,
      };
    });
  }, [fields]);

  /**
   * 根据行为守卫包装action函数
   */
  const wrapperAction = useMemo(() => {
    const wrapAction = { ...action };
    const count = uuidFields.length;

    if (actionGuard?.beforeAddRow) {
      wrapAction.add = async (...rest) => {
        const success = await actionGuard.beforeAddRow!(...rest, count);
        if (success) {
          const res = action.add(...rest);
          onAfterAdd?.(...rest, count + 1);
          return res;
        }
        return false;
      };
    } else {
      wrapAction.add = async (...rest) => {
        const res = action.add(...rest);
        onAfterAdd?.(...rest, count + 1);
        return res;
      };
    }

    if (actionGuard?.beforeRemoveRow) {
      wrapAction.remove = async (...rest) => {
        const success = await actionGuard.beforeRemoveRow!(...rest, count);
        if (success) {
          const res = action.remove(...rest);
          onAfterRemove?.(...rest, count - 1);
          return res;
        }
        return false;
      };
    } else {
      wrapAction.remove = async (...rest) => {
        const res = action.remove(...rest);
        onAfterRemove?.(...rest, count - 1);
        return res;
      };
    }

    return wrapAction;
  }, [
    action,
    actionGuard?.beforeAddRow,
    actionGuard?.beforeRemoveRow,
    onAfterAdd,
    onAfterRemove,
    uuidFields.length,
  ]);

  const creatorButton = useMemo(() => {
    if (creatorButtonProps === false || uuidFields.length === max) return null;
    const {
      position = 'bottom',
      creatorButtonText = intl.getMessage(
        'editableTable.action.add',
        '添加一行数据',
      ),
    } = creatorButtonProps || {};
    return (
      <Button
        className={`${prefixCls}-creator-button-${position} ${
          hashId || ''
        }`.trim()}
        type="dashed"
        loading={loading}
        block
        icon={<PlusOutlined />}
        {...omit(creatorButtonProps || {}, ['position', 'creatorButtonText'])}
        onClick={async () => {
          setLoading(true);
          // 如果不是从顶部开始添加，则插入的索引为当前行数
          let index = uuidFields.length;
          // 如果是顶部，加到第一个，如果不是，为空就是最后一个
          if (position === 'top') index = 0;
          await wrapperAction.add(runFunction(creatorRecord) ?? {}, index);
          setLoading(false);
        }}
      >
        {creatorButtonText}
      </Button>
    );
  }, [
    creatorButtonProps,
    uuidFields.length,
    max,
    intl,
    prefixCls,
    hashId,
    loading,
    wrapperAction,
    creatorRecord,
  ]);
  const readOnlyContext = useContext(EditOrReadOnlyContext);

  const defaultStyle: CSSProperties = {
    width: 'max-content',
    maxWidth: '100%',
    minWidth: '100%',
    ...containerStyle,
  };

  const itemList = useMemo(() => {
    return uuidFields.map((field, index) => {
      return (
        <ProFormListItem
          {...props}
          key={field.uuid}
          field={field}
          index={index}
          action={wrapperAction}
          count={uuidFields.length}
        >
          {children}
        </ProFormListItem>
      );
    });
  }, [children, props, uuidFields, wrapperAction]);

  if (readOnlyContext.mode === 'read' || props.readonly === true) {
    return <>{itemList}</>;
  }

  return (
    <div style={defaultStyle} className={containerClassName}>
      {creatorButtonProps !== false &&
        creatorButtonProps?.position === 'top' &&
        creatorButton}
      {itemList}
      {fieldExtraRender && fieldExtraRender(wrapperAction, meta)}
      {creatorButtonProps !== false &&
        creatorButtonProps?.position !== 'top' &&
        creatorButton}
    </div>
  );
};

export { ProFormListContainer };
