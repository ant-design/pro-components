import { ProLayout } from '@ant-design/pro-components';

const orbSvg =
  '<svg xmlns="http://www.w3.org/2000/svg" width="300" height="300" viewBox="0 0 300 300"><circle cx="150" cy="150" r="140" fill="#d6e4ff"/><circle cx="210" cy="100" r="70" fill="#97baff"/></svg>';
const backgroundImage = `data:image/svg+xml,${encodeURIComponent(orbSvg)}`;

export default () => (
  <div style={{ height: 560, overflow: 'auto' }}>
    <ProLayout
      title="页面背景图"
      route={{ routes: [{ path: '/demo', name: '示例页' }] }}
      location={{ pathname: '/demo' }}
      bgLayoutImgList={[
        { src: backgroundImage, right: 0, bottom: 0, width: '300px' },
      ]}
    >
      <div style={{ minHeight: 400, padding: 24 }}>
        <h2>bgLayoutImgList</h2>
        <p>背景图固定在内容区域的右下角。</p>
      </div>
    </ProLayout>
  </div>
);
