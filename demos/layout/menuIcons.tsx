import {
  FacebookOutlined,
  StarOutlined,
  TwitterOutlined,
} from '@ant-design/icons';
import { PageContainer, ProLayout } from '@ant-design/pro-components';

/** 菜单 `icon` 支持 React 节点（含 @ant-design/icons）、或图片/SVG URL 字符串 */
const Demo = () => (
  <div style={{ height: '100vh' }}>
    <ProLayout
      location={{
        pathname: '/articles/new',
      }}
      route={{
        routes: [
          {
            path: '/home',
            name: '收藏',
            icon: <StarOutlined />,
          },
          {
            path: '/home/overview',
            name: 'Facebook',
            icon: <FacebookOutlined />,
          },
          {
            path: '/home/search',
            name: 'Twitter',
            icon: <TwitterOutlined />,
          },
          {
            path: '/svg-asset',
            name: 'SVG 资源',
            icon:
              'https://gw.alipayobjects.com/zos/antfincdn/UCSef1BATc/nice.svg',
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
  <div style={{ padding: 24 }}>
    <Demo />
  </div>
);
