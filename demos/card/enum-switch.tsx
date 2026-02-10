import { ProCard } from '@ant-design/pro-components';
import { Segmented, Space, theme } from 'antd';
import { useState } from 'react';

const Demo = () => {
  const { token } = theme.useToken();

  const [size, setSize] = useState<'default' | 'small'>('default');
  const [variant, setVariant] = useState<'outlined' | 'borderless'>('outlined');
  const [layout, setLayout] = useState<'default' | 'center'>('default');
  const [type, setType] = useState<'default' | 'inner'>('default');
  const [direction, setDirection] = useState<'row' | 'column'>('row');
  const [split, setSplit] = useState<'vertical' | 'horizontal' | undefined>(
    undefined,
  );
  const [collapsible, setCollapsible] = useState<'icon' | 'header' | false>(
    false,
  );

  return (
    <div>
      <ProCard variant="outlined" style={{ marginBlockEnd: 16 }}>
        <Space orientation="vertical" size={12} style={{ width: '100%' }}>
          <Space>
            <span>size 尺寸：</span>
            <Segmented
              value={size}
              onChange={(v) => setSize(v as any)}
              options={[
                { label: '默认 default', value: 'default' },
                { label: '紧凑 small', value: 'small' },
              ]}
            />
          </Space>
          <Space>
            <span>variant 外观：</span>
            <Segmented
              value={variant}
              onChange={(v) => setVariant(v as any)}
              options={[
                { label: '线框 outlined', value: 'outlined' },
                { label: '无边框 borderless', value: 'borderless' },
              ]}
            />
          </Space>
          <Space>
            <span>layout 内容布局：</span>
            <Segmented
              value={layout}
              onChange={(v) => setLayout(v as any)}
              options={[
                { label: '默认 default', value: 'default' },
                { label: '居中 center', value: 'center' },
              ]}
            />
          </Space>
          <Space>
            <span>type 卡片类型：</span>
            <Segmented
              value={type}
              onChange={(v) => setType(v as any)}
              options={[
                { label: '默认 default', value: 'default' },
                { label: '内嵌 inner', value: 'inner' },
              ]}
            />
          </Space>
          <Space>
            <span>direction 子卡片方向：</span>
            <Segmented
              value={direction}
              onChange={(v) => setDirection(v as any)}
              options={[
                { label: '水平 row', value: 'row' },
                { label: '垂直 column', value: 'column' },
              ]}
            />
          </Space>
          <Space>
            <span>split 分割线：</span>
            <Segmented
              value={split ?? 'none'}
              onChange={(v) => setSplit(v === 'none' ? undefined : (v as any))}
              options={[
                { label: '无', value: 'none' },
                { label: '垂直 vertical', value: 'vertical' },
                { label: '水平 horizontal', value: 'horizontal' },
              ]}
            />
          </Space>
          <Space>
            <span>collapsible 折叠方式：</span>
            <Segmented
              value={collapsible === false ? 'false' : collapsible}
              onChange={(v) =>
                setCollapsible(v === 'false' ? false : (v as any))
              }
              options={[
                { label: '不可折叠', value: 'false' },
                { label: '图标触发 icon', value: 'icon' },
                { label: '标题触发 header', value: 'header' },
              ]}
            />
          </Space>
        </Space>
      </ProCard>

      <ProCard
        title="用户认证服务"
        extra="v2.3.1"
        tooltip="管理用户认证与授权的核心服务"
        size={size}
        variant={variant}
        layout={layout}
        type={type}
        direction={direction}
        split={split}
        collapsible={collapsible || undefined}
        defaultCollapsed={false}
      >
        <ProCard title="基本信息">
          <div>实例数量：3</div>
          <div>CPU 占用：45%</div>
          <div>内存占用：1.2 GB</div>
        </ProCard>
        <ProCard title="运行状态">
          <div>日均请求：120 万</div>
          <div>平均延迟：18ms</div>
          <div>成功率：99.98%</div>
        </ProCard>
      </ProCard>

      <div
        style={{
          marginBlockStart: 12,
          padding: 12,
          background: token.colorBgTextHover,
          borderRadius: token.borderRadius,
          fontSize: 13,
          color: token.colorTextSecondary,
        }}
      >
        当前配置：size=<b>{size}</b>、variant=<b>{variant}</b>、layout=
        <b>{layout}</b>、type=<b>{type}</b>、direction=<b>{direction}</b>、
        split=<b>{String(split ?? '无')}</b>、collapsible=
        <b>{String(collapsible)}</b>
      </div>
    </div>
  );
};

export default () => (
  <div style={{ padding: 24 }}>
    <Demo />
  </div>
);
