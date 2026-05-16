import {
  FacebookOutlined,
  StarFilled,
  TwitterOutlined,
} from '@ant-design/icons';
import { PageContainer, ProLayout } from '@ant-design/pro-components';

/**
 * 菜单 `icon` 支持 React 节点（含 @ant-design/icons）或图片/SVG URL 字符串。
 *
 * icon 选型说明：
 * - `StarFilled`：通用动作类图标，有官方 Filled 版，统一用面性
 * - `FacebookOutlined` / `TwitterOutlined`：品牌 logo 官方只有单一 Outlined 形态，保留
 */
const Demo = () => (
  <div style={{ height: '100vh' }}>
    <ProLayout
      location={{
        pathname: '/favorites',
      }}
      route={{
        routes: [
          {
            path: '/favorites',
            name: '我的收藏',
            icon: <StarFilled />,
          },
          {
            path: '/social/facebook',
            name: 'Facebook',
            icon: <FacebookOutlined />,
          },
          {
            path: '/social/twitter',
            name: 'Twitter',
            icon: <TwitterOutlined />,
          },
          {
            path: '/svg-asset',
            name: 'SVG 资源',
            icon: 'https://gw.alipayobjects.com/zos/antfincdn/UCSef1BATc/nice.svg',
          },
        ],
      }}
    >
      <PageContainer content="欢迎使用">
        <div>Hello World</div>
      </PageContainer>
    </ProLayout>
  </div>
);

export default () => (
  <div>
    <Demo />
  </div>
);
