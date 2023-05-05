import { Spin } from 'antd';
import { useContext, useState, useEffect } from 'react';
import type {
  ProHelpDataSource,
  ProHelpDataSourceChildren,
} from './HelpProvide';
import { ProHelpProvide } from './HelpProvide';
import { RenderContentPanel } from './RenderContentPanel';

/**
 * 异步加载内容的面板组件
 * @param item 指向当前面板的 ProHelpDataSource
 */
export const AsyncContentPanel: React.FC<{
  item: ProHelpDataSource<any>['children'][number];
  onInit?: (ref: HTMLDivElement) => void;
}> = ({ item, onInit }) => {
  const { onLoadContext } = useContext(ProHelpProvide); // 获取上下文中的 onLoadContext
  const [loading, setLoading] = useState(false); // 加载状态
  const [content, setContent] = useState<ProHelpDataSourceChildren<any>[]>(); // 内容数据

  useEffect(() => {
    if (!item.key) return; // 如果没有key则返回
    setLoading(true); // 开始加载
    onLoadContext?.(item.key, item).then((res) => {
      // 调用加载方法
      setLoading(false); // 加载完成
      setContent(res); // 设置内容数据
    });
  }, [item.key]);

  // 如果没有key，则返回null
  if (!item.key) return null;

  // 如果正在加载并且有key，则显示加载中的状态
  if (loading && item.key) {
    return (
      <div
        key={item.key}
        style={{
          display: 'flex',
          justifyContent: 'center',
          width: '100%',
          boxSizing: 'border-box',
          padding: 24,
        }}
      >
        <Spin />
      </div>
    );
  }

  // 加载完成后，渲染内容面板
  return (
    <RenderContentPanel
      onInit={(ref) => {
        onInit?.(ref);
      }}
      dataSourceChildren={content!}
    />
  );
};
