import type { AppItemProps, ProSettings } from '@ant-design/pro-components';
import { ProConfigProvider, ProLayout } from '@ant-design/pro-components';
import { Modal } from 'antd';
import defaultProps from './_defaultProps';

const AppGroupList: any = [
  {
    title: 'UI 设计语言',
    desc: '杭州市较知名的 UI 设计语言',
    children: [
      {
        icon: 'https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg',
        title: 'Ant Design',
        desc: '杭州市较知名的 UI 设计语言',
        url: 'https://ant.design',
      },
      {
        icon: 'https://gw.alipayobjects.com/zos/antfincdn/upvrAjAPQX/Logo_Tech%252520UI.svg',
        title: 'Pro Components',
        desc: '专业级 UI 组件库',
        url: 'https://procomponents.ant.design/',
      },
    ],
  },
  {
    title: 'UI 设计语言 2组111',
    icon: 'https://gw.alipayobjects.com/zos/antfincdn/upvrAjAPQX/Logo_Tech%252520UI.svg',
    desc: '专业级 UI 组件库',
    url: 'https://procomponents.ant.design/',
    children: [
      {
        icon: 'https://gw.alipayobjects.com/zos/antfincdn/FLrTNDvlna/antv.png',
        title: 'AntV',
        desc: '蚂蚁集团全新一代数据可视化解决方案',
        url: 'https://antv.vision/',
        target: '_blank',
      },
      {
        icon: 'https://gw.alipayobjects.com/zos/antfincdn/FLrTNDvlna/antv.png',
        title: 'AntV',
        desc: '蚂蚁集团全新一代数据可视化解决方案',
        url: 'https://antv.vision/',
        target: '_blank',
      },
    ],
  },
  {
    title: '待分组',
    desc: '专业级 UI 组件库',
    children: [
      {
        title: '工具',
        desc: '知识创作与分享工具',
        icon: 'https://gw.alipayobjects.com/zos/rmsportal/XuVpGqBFxXplzvLjJBZB.svg',
        url: 'https://www.yuque.com/',
      },
      {
        title: '前端应用框架',
        desc: '插件化的企业级前端应用框架。',
        icon: 'https://img.alicdn.com/tfs/TB1zomHwxv1gK0jSZFFXXb0sXXa-200-200.png',
        url: 'https://umijs.org/zh-CN/docs',
      },
      {
        icon: 'https://gw.alipayobjects.com/zos/bmw-prod/8a74c1d3-16f3-4719-be63-15e467a68a24/km0cv8vn_w500_h500.png',
        title: 'qiankun',
        desc: '可能是你见过最完善的微前端解决方案🧐',
        url: 'https://qiankun.umijs.org/',
      },
      {
        icon: 'https://gw.alipayobjects.com/zos/rmsportal/LFooOLwmxGLsltmUjTAP.svg',
        title: 'Kitchen ',
        desc: 'Sketch 工具集',
        url: 'https://kitchen.alipay.com/',
      },
      {
        icon: 'https://gw.alipayobjects.com/zos/bmw-prod/d3e3eb39-1cd7-4aa5-827c-877deced6b7e/lalxt4g3_w256_h256.png',
        title: 'dumi',
        desc: '为组件开发场景而生的文档工具',
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
  const itemClick = (
    item: AppItemProps,
    popoverRef?: React.RefObject<HTMLSpanElement>,
  ) => {
    // 点击后关闭 Popover
    popoverRef?.current?.click?.();

    Modal?.confirm({
      width: 600,
      title: '点击项 详细数据',
      content: (
        <pre style={{ overflow: 'auto' }}>
          {JSON.stringify(typeof item === 'object' ? item : {}, null, 2)}
        </pre>
      ),
      okText: '前往',
      onOk: () => window.open(item?.url),
    });
  };

  return (
    <div id="test-pro-layout" style={{ height: '100vh' }}>
      <ProConfigProvider hashed={false}>
        <ProLayout
          {...defaultProps}
          appList={AppGroupList}
          itemClick={itemClick}
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
