import { PlusOutlined } from '@ant-design/icons';
import { omit } from '@rc-component/util';
import { Button } from 'antd';
import type { FormListOperation } from 'antd/lib/form/FormList';
import { clsx } from 'clsx';
import type { CSSProperties } from 'react';
import { useContext, useMemo, useRef, useState } from 'react';
import { ProProvider, useIntl } from '../../../provider';
import { nanoid, runFunction } from '../../../utils';
import { EditOrReadOnlyContext } from '../../BaseForm/EditOrReadOnlyContext';
import { useGridHelpers } from '../../helpers';
import type { ProFormListItemProps } from './ListItem';
import { ProFormListItem } from './ListItem';

/**
 * 用 guard 函数包装 action 方法：
 * - 有 guard 时先执行 guard，返回 true 才执行 action 并触发回调
 * - 无 guard 时直接执行 action 并触发回调
 */
async function wrapWithGuard<TArgs extends any[]>(
  args: TArgs,
  guard:
    ((...params: [...TArgs, number]) => boolean | Promise<boolean>) | undefined,
  countRef: React.MutableRefObject<number>,
  doAction: (...args: TArgs) => any,
  getNextCount: (count: number, args: TArgs) => number,
  afterCallback?: (...params: [...TArgs, number]) => void,
): Promise<any> {
  if (guard) {
    const success = await guard(...args, countRef.current);
    if (!success) return false;
  }
  const count = getNextCount(countRef.current, args);
  const res = doAction(...args);
  countRef.current = count;
  afterCallback?.(...args, count);
  return res;
}

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
    guardedActionRef,
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
  const countRef = useRef(fields.length);
  countRef.current = fields.length;
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
   * 根据行为守卫包装 action 函数，复用 wrapWithGuard 消除 add/remove 分支重复
   */
  const wrapperAction = useMemo(() => {
    const wrapAction = { ...action };
    wrapAction.add = (...args) => {
      // 固定可选 insertIndex 的参数槽，确保末尾追加的 count 始终是第三参。
      const normalizedArgs: Parameters<FormListOperation['add']> = [
        args[0],
        args[1],
      ];
      return wrapWithGuard(
        normalizedArgs,
        actionGuard?.beforeAddRow,
        countRef,
        action.add,
        (count) => count + 1,
        onAfterAdd,
      );
    };

    wrapAction.remove = (...args) =>
      wrapWithGuard(
        args,
        actionGuard?.beforeRemoveRow,
        countRef,
        action.remove,
        (count, [index]) => {
          const removedCount = Array.isArray(index) ? new Set(index).size : 1;
          return Math.max(0, count - removedCount);
        },
        onAfterRemove,
      );

    // 同步给外层 ProFormList 的 actionRef，保证 actionRef.add/remove
    // 与内置按钮走同一套 guard 与回调（#8939）
    if (guardedActionRef) {
      guardedActionRef.current = wrapAction;
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
        className={clsx(`${prefixCls}-creator-button-${position}`, hashId)}
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

  const { grid } = useGridHelpers();

  // grid 模式下多个列表项需要纵向堆叠为多个 flex 行容器（#9083）：
  // width:max-content 保持「无字段时收缩」，minWidth:100% 保持占满行宽
  const defaultStyle: CSSProperties = {
    width: 'max-content',
    maxWidth: '100%',
    minWidth: '100%',
    ...(grid
      ? {
          display: 'flex',
          flexDirection: 'column' as const,
          alignItems: 'stretch' as const,
        }
      : {}),
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
    // readonly 下仍保留容器 div，containerClassName / containerStyle 不丢失（#8979）。
    // creator 按钮与 fieldExtraRender 属于编辑态交互，readonly 不渲染。
    return (
      <div style={defaultStyle} className={containerClassName}>
        {itemList}
      </div>
    );
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
