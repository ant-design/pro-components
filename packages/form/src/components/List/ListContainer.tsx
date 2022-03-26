import { PlusOutlined } from '@ant-design/icons';
import { nanoid, runFunction } from '@ant-design/pro-utils';
import { Button } from 'antd';
import { omit } from 'lodash';
import { useMemo, useRef, useState } from 'react';
import type { ProFormListItemProps } from './ListItem';
import { ProFormListItem } from './ListItem';

const ProFormListContainer: React.FC<ProFormListItemProps> = (props) => {
  const {
    creatorButtonProps,
    prefixCls,
    children,
    creatorRecord,
    action,
    fields,
    actionGuard,
    max,
  } = props;
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
      wrapAction.add = async (...rest) =>
        (await actionGuard.beforeAddRow!(...rest, count)) && action.add(...rest);
    }

    if (actionGuard?.beforeRemoveRow) {
      wrapAction.remove = async (...rest) =>
        (await actionGuard.beforeRemoveRow!(...rest, count)) && action.remove(...rest);
    }

    return wrapAction;
  }, [action, actionGuard, uuidFields]);

  const creatorButton = useMemo(() => {
    if (creatorButtonProps === false || uuidFields.length === max) return null;
    const { position = 'bottom', creatorButtonText = '添加一行数据' } = creatorButtonProps || {};
    return (
      <Button
        className={`${prefixCls}-creator-button-${position}`}
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
          await wrapperAction.add(runFunction(creatorRecord), index);
          setLoading(false);
        }}
      >
        {creatorButtonText}
      </Button>
    );
  }, [creatorButtonProps, prefixCls, loading, wrapperAction, creatorRecord, uuidFields, max]);

  return (
    <div
      style={{
        width: 'max-content',
        maxWidth: '100%',
        minWidth: '100%',
      }}
    >
      {creatorButtonProps !== false && creatorButtonProps?.position === 'top' && creatorButton}
      {uuidFields.map((field, index) => {
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
      })}
      {creatorButtonProps !== false && creatorButtonProps?.position !== 'top' && creatorButton}
    </div>
  );
};

export { ProFormListContainer };
