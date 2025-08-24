import type { ProCardTabsProps } from '@ant-design/pro-components';
import { ProCard } from '@ant-design/pro-components';
import { Select, Space } from 'antd';
import { useState } from 'react';

const { Option } = Select;

export default () => {
  const [tab, setTab] = useState('tab2');
  const [tabPosition, setTabPosition] =
    useState<ProCardTabsProps['tabPosition']>('top');

  return (
    <>
      <div>
        <Space style={{ marginBlockEnd: 16 }}>
          Tab position：
          <Select
            value={tabPosition}
            onChange={(value) => setTabPosition(value)}
            popupMatchSelectWidth={false}
          >
            <Option value="top">top</Option>
            <Option value="bottom">bottom</Option>
            <Option value="left">left</Option>
            <Option value="right">right</Option>
          </Select>
        </Space>
        <ProCard
          tabs={{
            tabPosition,
            activeKey: tab,
            items: [
              {
                label: `Product One`,
                key: 'tab1',
                children: `Content One`,
              },
              {
                label: `Product Two`,
                key: 'tab2',
                children: `Content Two`,
              },
              {
                label: `Product Three`,
                key: 'tab3',
                children: `Content Three`,
              },
            ],
            onChange: (key) => {
              setTab(key);
            },
          }}
        />
      </div>

      <div
        style={{
          marginTop: '20px',
          padding: '20px',
          backgroundColor: '#f5f5f5',
          borderRadius: '6px',
        }}
      >
        <h4>ProCard Tabs 动态位置 Props 说明：</h4>
        <ul>
          <li>
            <strong>tabs.tabPosition</strong>: 标签页位置，可选值：'top' |
            'bottom' | 'left' | 'right'
          </li>
          <li>
            <strong>tabs.activeKey</strong>: 当前激活的标签页 key
          </li>
          <li>
            <strong>tabs.items</strong>: 标签页配置数组
          </li>
          <li>
            <strong>tabs.onChange</strong>: 标签页切换时的回调函数
          </li>
        </ul>
        <h4>Tab Position 位置说明：</h4>
        <ul>
          <li>
            <strong>top</strong>: 标签页显示在内容上方（默认）
          </li>
          <li>
            <strong>bottom</strong>: 标签页显示在内容下方
          </li>
          <li>
            <strong>left</strong>: 标签页显示在内容左侧
          </li>
          <li>
            <strong>right</strong>: 标签页显示在内容右侧
          </li>
        </ul>
        <h4>Select 组件配置：</h4>
        <ul>
          <li>
            <strong>value</strong>: 当前选中的值
          </li>
          <li>
            <strong>onChange</strong>: 值改变时的回调函数
          </li>
          <li>
            <strong>popupMatchSelectWidth</strong>:
            下拉菜单宽度是否与选择框宽度一致
          </li>
        </ul>
        <h4>状态管理：</h4>
        <ul>
          <li>
            <strong>tab</strong>: 使用 useState 管理当前激活的标签页
          </li>
          <li>
            <strong>tabPosition</strong>: 使用 useState 管理标签页位置
          </li>
          <li>
            <strong>动态切换</strong>: 通过 Select 组件动态切换标签页位置
          </li>
        </ul>
        <h4>交互特点：</h4>
        <ul>
          <li>
            <strong>位置切换</strong>: 可以实时切换标签页的显示位置
          </li>
          <li>
            <strong>状态保持</strong>: 切换位置时保持当前激活的标签页
          </li>
          <li>
            <strong>响应式适配</strong>: 不同位置适合不同的屏幕尺寸
          </li>
        </ul>
        <h4>使用场景：</h4>
        <ul>
          <li>
            <strong>布局测试</strong>: 测试不同标签页位置的显示效果
          </li>
          <li>
            <strong>响应式设计</strong>: 根据屏幕尺寸选择合适的标签页位置
          </li>
          <li>
            <strong>用户偏好</strong>: 允许用户自定义标签页位置
          </li>
          <li>
            <strong>内容展示</strong>: 根据内容特点选择合适的标签页位置
          </li>
        </ul>
        <h4>最佳实践：</h4>
        <ul>
          <li>
            <strong>位置选择</strong>: 根据内容长度和屏幕空间选择合适的位置
          </li>
          <li>
            <strong>用户体验</strong>: 考虑用户的阅读习惯和操作便利性
          </li>
          <li>
            <strong>响应式考虑</strong>: 在不同设备上测试标签页位置的显示效果
          </li>
        </ul>
      </div>
    </>
  );
};
