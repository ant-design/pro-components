import type { ProSettings } from '@ant-design/pro-components';
import { ProConfigProvider, ProLayout } from '@ant-design/pro-components';
import type { RadioChangeEvent } from 'antd';
import { SimpleContent } from '../components/AppsLogoComponents/SimpleContent';
import { DefaultContent } from '../components/AppsLogoComponents/DefaultContent';
import { Radio, Modal, Switch } from 'antd';
import { useEffect, useState, useMemo } from 'react';
import _ from 'lodash';
import defaultProps from './_defaultProps';
import type { AppsLogoComponentsAppItem } from '../components/AppsLogoComponents/types';

const InitAppList = [
  {
    icon: 'https://gw.alipayobjects.com/zos/antfincdn/upvrAjAPQX/Logo_Tech%252520UI.svg',
    title: '应用内跳转-页容器组件',
    desc: '应用内跳转-页容器组件',
    url: '/components/page-container',
  },
  {
    icon: 'https://gw.alipayobjects.com/zos/rmsportal/XuVpGqBFxXplzvLjJBZB.svg',
    title: '语雀',
    desc: '知识创作与分享工具',
    url: 'https://www.yuque.com/',
  },
  {
    icon: 'https://gw.alipayobjects.com/zos/antfincdn/FLrTNDvlna/antv.png',
    title: 'AntV',
    desc: '蚂蚁集团全新一代数据可视化解决方案',
    url: 'https://antv.vision/',
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

const InitAppGroupList: any = [
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
  const options = [
    { label: '默认', value: 'default' },
    { label: '简单', value: 'simple' },
    { label: '默认 分组', value: 'default_group' },
    { label: '简单 分组', value: 'simple_group' },
    { label: '默认 混合展示', value: 'mixture_default_group' },
    { label: '简单 混合展示', value: 'mixture_simple_group' },
  ];
  const settings: ProSettings = {
    fixSiderbar: true,
    layout: 'mix',
    splitMenus: true,
  };
  const [appList, setAppList] = useState<any>([]);
  const [value1, setValue1] = useState('default');
  const [custom, setCustom] = useState(true);

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
      case 'default_group':
        const defaultGroupList = _.cloneDeep(InitAppGroupList);
        setAppList(defaultGroupList);
        break;
      case 'simple_group':
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
      case 'mixture_default_group':
        const mixture_default_groupList = _.cloneDeep(InitAppGroupList);
        mixture_default_groupList?.splice(2, 1);
        const newList7 = mixture_default_groupList?.concat(InitAppGroupList[2]?.children);
        setAppList(newList7);
        break;
      case 'mixture_simple_group':
        const mixture_simple_groupList = _.cloneDeep(InitAppGroupList);
        mixture_simple_groupList?.splice(2, 1);
        const newList8 = mixture_simple_groupList?.concat(InitAppGroupList[2]?.children);
        const newList9 = newList8?.map((aItem: any) => {
          const newChildren = aItem?.children?.map((cItem: any) => {
            delete cItem.desc;
            return cItem;
          });
          return { ...aItem, desc: undefined, children: newChildren };
        });
        setAppList(newList9);
        break;
      default:
        break;
    }
  }, [value1]);

  const hashId = 'hashId_demo';
  const baseClassName = 'ant-pro-layout-apps';

  const itemClick = (
    item: AppsLogoComponentsAppItem,
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

  const popoverContent = useMemo(() => {
    const isSimple = appList?.some((app: any) => {
      return !app?.desc;
    });
    if (isSimple) {
      return (
        <SimpleContent
          hashId={hashId}
          appList={appList}
          itemClick={custom ? itemClick : undefined}
          baseClassName={`${baseClassName}-simple`}
        />
      );
    }
    return (
      <DefaultContent
        hashId={hashId}
        appList={appList}
        itemClick={custom ? itemClick : undefined}
        baseClassName={`${baseClassName}-default`}
      />
    );
  }, [appList, baseClassName, hashId, custom]);

  return (
    <div id="test-pro-layout" style={{ height: '100vh' }}>
      <ProConfigProvider hashed={false}>
        <ProLayout
          {...defaultProps}
          appList={appList}
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
        >
          <div style={{ marginBottom: '20px' }}>
            是否开启自定义事件：{' '}
            <Switch checked={custom} onChange={(checked) => setCustom(checked)} />
          </div>
          <Radio.Group
            optionType="button"
            options={options}
            onChange={(event: RadioChangeEvent) => setValue1(event?.target?.value)}
            value={value1}
          />
          <div style={{ background: '#fff', marginTop: '24px' }}>{popoverContent}</div>
        </ProLayout>
      </ProConfigProvider>
    </div>
  );
};
