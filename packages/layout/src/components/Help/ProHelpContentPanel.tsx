import { ProProvider } from '@ant-design/pro-provider';
import { useDebounceFn } from '@ant-design/pro-utils';
import classNames from 'classnames';
import React, { useContext, useEffect, useMemo, useRef } from 'react';
import { AsyncContentPanel } from './AsyncContentPanel';
import type { ProHelpDataSource } from './HelpProvide';
import { ProHelpProvide } from './HelpProvide';
import { RenderContentPanel } from './RenderContentPanel';

export type ProHelpContentPanelProps = {
  /**
   * 控制当前选中的帮助文档
   */
  selectedKey: React.Key;
  className?: string;
  parentItem?: ProHelpDataSource<any>;

  onScroll?: (key?: string) => void;
};

/**
 * 控制具体的帮助文档显示组件
 * selectedKey 来展示对应的内容。它会根据不同的item.valueType值来展示不同的内容，包括标题、图片、超链接等。
 * @param ProHelpContentPanelProps
 * @returns
 */
export const ProHelpContentPanel: React.FC<ProHelpContentPanelProps> = ({
  className,
  parentItem,
  selectedKey,
  onScroll,
}) => {
  const { dataSource } = useContext(ProHelpProvide);
  const { hashId } = useContext(ProProvider);
  // 记录每个面板的滚动高度
  const scrollHeightMap = useRef<Map<React.Key, HTMLDivElement>>(new Map());

  const divRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!selectedKey || !parentItem?.infiniteScrollFull) return;
    const div = scrollHeightMap.current.get(selectedKey);

    if (div?.offsetTop && divRef.current) {
      if (
        Math.abs(divRef.current!.scrollTop - div?.offsetTop + 40) >
        div?.clientHeight
      ) {
        divRef.current!.scrollTop = div?.offsetTop - 40;
      }
    }
  }, [selectedKey]);

  /**
   * debounce（防抖）处理滚动事件，并根据滚动位置来实现找到当前列表的 key
   */
  const onScrollEvent = useDebounceFn(async (e: Event) => {
    const dom = e?.target as HTMLDivElement;

    // 根据滚动位置来找到当前列表的 key
    const list = Array.from(scrollHeightMap.current.entries()).find(
      ([, value]) => {
        if (dom?.scrollTop < value.offsetTop) {
          return true;
        }
        return false;
      },
    );

    if (!list) {
      return;
    }

    // 如果获取的 key 和当前 key 不同丢弃掉
    if (list.at(0) !== selectedKey) {
      // 如果不同，则触发 onScroll 事件
      onScroll?.(list.at(0) as string | undefined);
    }
  }, 200);

  /**
   * 当 parentItem 组件中的 infiniteScrollFull 属性变化时
   * 如果该属性为真值，则开始监听滚动事件；
   * 如果为假值，则停止监听滚动事件并取消防抖处理。
   * 在监听滚动事件时，可以实现分页（瀑布流）效果。同时，该代码还会根据 selectedKey 的变化来触发跳转
   */
  useEffect(() => {
    if (!parentItem?.infiniteScrollFull) return;
    onScrollEvent.cancel();
    divRef.current?.addEventListener('scroll', onScrollEvent.run, false);
    return () => {
      onScrollEvent.cancel();
      divRef.current?.removeEventListener('scroll', onScrollEvent.run, false);
    };
  }, [parentItem?.infiniteScrollFull, selectedKey]);

  /**
   * 生成一个  Map  能根据 key 找到所有的 index
   */
  const dataSourceMap = useMemo(() => {
    const map = new Map<
      React.Key,
      ProHelpDataSource<any>['children'][number] & {
        parentKey?: React.Key;
      }
    >();
    dataSource.forEach((page) => {
      page.children.forEach((item) => {
        map.set(item.key || item.title, { ...item, parentKey: page.key });
      });
    });
    return map;
  }, [dataSource]);

  const renderItem = (item: ProHelpDataSource<any>['children'][number]) => {
    if (item?.asyncLoad) {
      return (
        <div className={classNames(className, hashId)} id={item.title}>
          <AsyncContentPanel
            key={item?.key}
            item={item!}
            onInit={(ref) => {
              if (!scrollHeightMap.current) return;
              scrollHeightMap.current.set(item.key, ref);
            }}
          />
        </div>
      );
    }

    return (
      <div className={classNames(className, hashId)} id={item.title}>
        <RenderContentPanel
          onInit={(ref) => {
            if (!scrollHeightMap.current) return;
            scrollHeightMap.current.set(item.key, ref);
          }}
          dataSourceChildren={item?.children || []}
        />
      </div>
    );
  };

  if (parentItem && parentItem.infiniteScrollFull) {
    return (
      <div
        ref={divRef}
        className={classNames(`${className}-infinite-scroll`, hashId)}
        style={{
          overflow: 'auto',
        }}
      >
        {parentItem.children?.map((item) => {
          return (
            <React.Fragment key={item.key}>{renderItem(item)}</React.Fragment>
          );
        })}
      </div>
    );
  }
  return renderItem(dataSourceMap.get(selectedKey!)!);
};
