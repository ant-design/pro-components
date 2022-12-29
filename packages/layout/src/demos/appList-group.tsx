import type { ProSettings } from '@ant-design/pro-components';
import { ProConfigProvider, ProLayout } from '@ant-design/pro-components';
import type { RadioChangeEvent } from 'antd';
import { Radio } from 'antd';
import { useEffect, useState } from 'react';
import _ from 'lodash';
import defaultProps from './_defaultProps';

const InitAppList = [
  {
    icon: 'https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg',
    title: 'Ant Design',
    desc: '杭州市较知名的 UI 设计语言',
    url: 'https://ant.design',
    children: [
      {
        icon: 'https://gw.alipayobjects.com/zos/rmsportal/XuVpGqBFxXplzvLjJBZB.svg',
        title: '语雀',
        desc: '知识创作与分享工具',
        url: 'https://www.yuque.com/',
      },
    ],
  },
  {
    icon: 'https://gw.alipayobjects.com/zos/antfincdn/FLrTNDvlna/antv.png',
    title: 'AntV',
    desc: '蚂蚁集团全新一代数据可视化解决方案',
    url: 'https://antv.vision/',
    target: '_blank',
  },
  {
    icon: 'https://gw.alipayobjects.com/zos/antfincdn/upvrAjAPQX/Logo_Tech%252520UI.svg',
    title: 'Pro Components',
    desc: '专业级 UI 组件库',
    url: 'https://procomponents.ant.design/',
  },
  {
    icon: 'https://img.alicdn.com/tfs/TB1zomHwxv1gK0jSZFFXXb0sXXa-200-200.png',
    title: 'umi',
    desc: '插件化的企业级前端应用框架。',
    url: 'https://umijs.org/zh-CN/docs',
  },

  {
    icon: 'https://gw.alipayobjects.com/zos/bmw-prod/8a74c1d3-16f3-4719-be63-15e467a68a24/km0cv8vn_w500_h500.png',
    title: 'qiankun',
    desc: '可能是你见过最完善的微前端解决方案🧐',
    url: 'https://qiankun.umijs.org/',
  },
  {
    icon: 'https://gw.alipayobjects.com/zos/rmsportal/XuVpGqBFxXplzvLjJBZB.svg',
    title: '语雀',
    desc: '知识创作与分享工具',
    url: 'https://www.yuque.com/',
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
];

const InitAppGroupList = [
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
    title: '前端应用框架',
    desc: '插件化的企业级前端应用框架。',
    icon: 'https://img.alicdn.com/tfs/TB1zomHwxv1gK0jSZFFXXb0sXXa-200-200.png',
    url: 'https://umijs.org/zh-CN/docs',
    children: [],
  },
  {
    title: '工具',
    desc: '知识创作与分享工具',
    icon: 'https://gw.alipayobjects.com/zos/rmsportal/XuVpGqBFxXplzvLjJBZB.svg',
    url: 'https://www.yuque.com/',
    children: [],
  },
];

export default () => {
  const options = [
    { label: '默认', value: 'default' },
    { label: '简单', value: 'simple' },
    { label: '默认 分组', value: 'defaultGroup' },
    { label: '简单 分组', value: 'simpleGroup' },
  ];
  const settings: ProSettings = {
    fixSiderbar: true,
    layout: 'mix',
    splitMenus: true,
  };
  const [appList, setAppList] = useState<any>([]);
  const [value1, setValue1] = useState('default');

  useEffect(() => {
    switch (value1) {
      case 'default':
        const defaultList = _.cloneDeep(InitAppList);
        setAppList(defaultList);
        break;
      case 'simple':
        const simpleList = _.cloneDeep(InitAppList);
        const newList3 = simpleList?.map((aItem: any) => {
          delete aItem.desc;
          return aItem;
        });
        setAppList(newList3);
        break;
      case 'defaultGroup':
        const defaultGroupList = _.cloneDeep(InitAppGroupList);
        setAppList(defaultGroupList);
        break;
      case 'simpleGroup':
        const simpleGroupList = _.cloneDeep(InitAppGroupList);
        const newList2 = simpleGroupList?.map((aItem: any) => {
          const newChildren = aItem?.children?.map((cItem: any) => {
            delete cItem.desc;
            return cItem;
          });
          return { ...aItem, desc: undefined, children: newChildren };
        });
        setAppList(newList2);
        break;
      default:
        break;
    }
  }, [value1]);

  return (
    <div
      id="test-pro-layout"
      style={{
        height: '100vh',
      }}
    >
      <ProConfigProvider hashed={false}>
        <ProLayout
          {...defaultProps}
          appList={appList}
          location={{ pathname: '/list/sub-page/sub-sub-page1' }}
          siderMenuType="group"
          menu={{ collapsedShowGroupTitle: true }}
          avatarProps={{
            src: 'https://gw.alipayobjects.com/zos/antfincdn/efFD%24IOql2/weixintupian_20170331104822.jpg',
            size: 'small',
            title: '七妮妮',
          }}
          {...settings}
        >
          <Radio.Group
            optionType="button"
            options={options}
            onChange={(event: RadioChangeEvent) => setValue1(event?.target?.value)}
            value={value1}
          />
        </ProLayout>
      </ProConfigProvider>
    </div>
  );
};
