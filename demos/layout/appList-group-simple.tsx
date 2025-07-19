import type { ProSettings } from '@ant-design/pro-components';
import { ProConfigProvider, ProLayout } from '@ant-design/pro-components';
import defaultProps from './_defaultProps';

const AppGroupList: any = [
  {
    title: 'UI 设计语言',
    children: [
      {
        icon: 'https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg',
        title: '应用内跳转',
        url: '/components/page-container',
      },
      {
        icon: 'https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg',
        title: 'Ant Design',
        url: 'https://ant.design',
      },
      {
        icon: () => (
          <img src="https://gw.alipayobjects.com/zos/antfincdn/upvrAjAPQX/Logo_Tech%252520UI.svg" />
        ),
        title: 'Pro Components',
        url: 'https://procomponents.ant.design/',
      },
    ],
  },
  {
    title: 'UI 设计语言 2组111',
    icon: 'https://gw.alipayobjects.com/zos/antfincdn/upvrAjAPQX/Logo_Tech%252520UI.svg',
    url: 'https://procomponents.ant.design/',
    children: [
      {
        icon: 'W',
        title: 'AntV',
        url: 'https://antv.vision/',
        target: '_blank',
      },
      {
        title: 'AntV',
        url: 'https://antv.vision/',
        target: '_blank',
      },
    ],
  },
  {
    title: '待分组',
    children: [
      {
        title: '工具',
        icon: 'https://gw.alipayobjects.com/zos/rmsportal/XuVpGqBFxXplzvLjJBZB.svg',
        url: 'https://www.yuque.com/',
      },
      {
        title: '前端应用框架',
        icon: 'https://img.alicdn.com/tfs/TB1zomHwxv1gK0jSZFFXXb0sXXa-200-200.png',
        url: 'https://umijs.org/zh-CN/docs',
      },
      {
        icon: 'https://gw.alipayobjects.com/zos/bmw-prod/8a74c1d3-16f3-4719-be63-15e467a68a24/km0cv8vn_w500_h500.png',
        title: 'qiankun',
        url: 'https://qiankun.umijs.org/',
      },
      {
        icon: 'https://gw.alipayobjects.com/zos/rmsportal/LFooOLwmxGLsltmUjTAP.svg',
        title: 'Kitchen ',
        url: 'https://kitchen.alipay.com/',
      },
      {
        icon: 'https://gw.alipayobjects.com/zos/bmw-prod/d3e3eb39-1cd7-4aa5-827c-877deced6b7e/lalxt4g3_w256_h256.png',
        title: 'dumi',
        url: 'https://d.umijs.org/zh-CN',
      },
    ],
  },
];

export default () => {
  const settings: ProSettings = {
    fixSiderbar: true,
    layout: 'mix',
    splitMenus: true,
  };

  return (
    <div id="test-pro-layout" style={{ height: '100vh' }}>
      <ProConfigProvider hashed={false}>
        <ProLayout
          {...defaultProps}
          appList={AppGroupList}
          location={{ pathname: '/list/sub-page/sub-sub-page1' }}
          siderMenuType="group"
          menu={{ collapsedShowGroupTitle: true }}
          avatarProps={{
            src: 'https://gw.alipayobjects.com/zos/antfincdn/efFD%24IOql2/weixintupian_20170331104822.jpg',
            size: 'small',
            title: '七妮妮',
          }}
          {...settings}
        />
      </ProConfigProvider>
    </div>
  );
};
