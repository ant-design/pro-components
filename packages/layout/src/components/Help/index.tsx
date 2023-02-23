import { CloseOutlined, ProfileOutlined, SearchOutlined } from '@ant-design/icons';
import ProCard from '@ant-design/pro-card';
import { ProProvider } from '@ant-design/pro-provider';
import classNames from 'classnames';
import {
  ImageProps,
  Popover,
  Menu,
  Image,
  Typography,
  Space,
  ConfigProvider,
  Drawer,
  Modal,
  PopoverProps,
  ModalProps,
  DrawerProps,
} from 'antd';
import React, { AnchorHTMLAttributes, useContext, useMemo, useState } from 'react';
import useMergedState from 'rc-util/es/hooks/useMergedState';
import { ProHelpDataSource, ProHelpDataSourceChildren, ProHelpProvide } from './HelpProvide';

export type ProHelpPanelProps = {
  /**
   * 帮助面板首次打开时的默认选中文档的键名
   */
  defaultSelectedKey?: string;
  /**
   * 当前选中的帮助文档的键名。如果提供了这个 prop，那么该组件将是一个受控组件，其状态将由父组件管理。如果未提供，那么该组件将是一个非受控组件，其状态将在组件内部管理。
   */
  selectedKey?: string;
  /**
   * 当选中的文档键名发生变化时调用的回调函数。新的键名将作为参数传递给该函数。
   */
  onSelectedKeyChange?: (key: string) => void;
  /**
   *控制左侧面板是否能够打开
   */
  showLeftPanel?: boolean;
  /**
   * 当左侧面板打开状态发生变化时调用的回调函数。新的打开状态将作为参数传递给该函数。
   */
  onShowLeftPanelChange?: (show: boolean) => void;
  /**
   * 是否显示边框
   */
  bordered?: boolean;

  /**
   * 当帮助面板关闭时调用的回调函数。
   */
  onClose?: () => void;

  /**
   * 帮助面板的高度，可以是数字或字符串类型。
   */
  height?: number | string;
};

export type ProHelpProps<ValueType> = {
  /**
   * 帮助文档的数据源，包含一组帮助文档数据，每个数据包含标题和内容等信息。
   */
  dataSource: ProHelpDataSource<ValueType>[];
  /**
   * 帮助组件的子组件，用于渲染自定义的帮助内容。
   * 是一个键值对结构的集合，其中：
   * 键（key）为字符串类型；
   * 值（value）为一个函数类型，该函数接受两个参数：一个名为 item 的 ProHelpDataSourceChildren 类型的对象，表示一个 ProHelp 数据源子项的子项；
   * 一个名为 index 的数字类型参数，表示该子项在父级子项数组中的索引。
   * 该函数返回一个 ReactNode 类型的元素，用于表示该 ProHelp 数据源子项子项应该渲染的 UI 元素。
   * 这个 Map 的作用是将 ProHelp 数据源子项子项的 valueType 属性与对应的渲染函数进行映射，从而实现在渲染 ProHelp 数据源时动态地选择渲染方法。
   * 在实际使用时，我们可以通过判断子项的 valueType 属性，从 valueTypeMap 中取出对应的渲染函数，再将该子项和渲染函数作为参数传入 renderDataSourceItem 函数中即可。
   */
  valueTypeMap?: Map<
    string,
    (item: ProHelpDataSourceChildren<ValueType>, index: number) => React.ReactNode
  >;
  /**
   * 帮助组件的子组件，用于渲染自定义的帮助内容。
   */
  children?: React.ReactNode;
};

export type ProHelpContentPanelProps = {
  /**
   * 控制当前选中的帮助文档
   */
  selectedKey: React.Key;
};

/**
 * 控制具体的帮助文档显示组件
 * selectedKey 来展示对应的内容。它会根据不同的item.valueType值来展示不同的内容，包括标题、图片、超链接等。
 * @param ProHelpContentPanelProps
 * @returns
 */
export const ProHelpContentPanel: React.FC<ProHelpContentPanelProps> = ({ selectedKey }) => {
  const { dataSource, valueTypeMap } = useContext(ProHelpProvide);

  const dataSourceMap = useMemo(() => {
    const map = new Map<React.Key, ProHelpDataSourceChildren[]>();
    dataSource.forEach((page) => {
      page.children.forEach((item) => {
        map.set(item.key || item.title, item.children);
      });
    });
    return map;
  }, [dataSource]);
  /**
   * itemRender 的定义
   * @param {ProHelpDataSourceChildren} item
   * @param {number} index
   * @return {*}
   */
  const itemRender = (item: ProHelpDataSourceChildren, index: number) => {
    // 自定义的渲染，优先级最高
    if (valueTypeMap.has(item.valueType)) {
      return valueTypeMap.get(item.valueType)?.(item, index);
    }
    if (item.valueType === 'h1') {
      return (
        <Typography.Title
          key={index}
          style={{
            marginTop: 0,
          }}
          level={3}
        >
          {item.children as string}
        </Typography.Title>
      );
    }
    if (item.valueType === 'h2') {
      return (
        <Typography.Title
          key={index}
          style={{
            marginTop: 20,
          }}
          level={5}
        >
          {item.children as string}
        </Typography.Title>
      );
    }
    if (item.valueType === 'image') {
      return (
        <div
          key={index}
          style={{
            marginBlock: 12,
          }}
        >
          <Image {...(item.children as ImageProps)} />
        </div>
      );
    }
    if (item.valueType == 'inlineLink') {
      return (
        <Typography.Text key={index}>
          <a {...(item.children as AnchorHTMLAttributes<HTMLAnchorElement>)} />
        </Typography.Text>
      );
    }
    if (item.valueType == 'link') {
      return (
        <div key={index}>
          <Typography.Text key={index}>
            <a {...(item.children as AnchorHTMLAttributes<HTMLAnchorElement>)} />
          </Typography.Text>
        </div>
      );
    }
    return <Typography.Text key={index}>{item.children as string}</Typography.Text>;
  };

  return <div>{dataSourceMap.get(selectedKey)?.map(itemRender)}</div>;
};

/**
 * ProHelpPanel 组件是一个帮助中心面板组件，具有可折叠的左侧菜单和右侧帮助内容区域。
 * 左侧菜单显示了帮助文档的目录结构，右侧帮助内容区域显示了用户选中的帮助文档内容。
 * 在左侧菜单中，用户可以通过点击目录来选择并显示相应的文档内容。
 * @param param0
 * @returns
 */
export const ProHelpPanel: React.FC<ProHelpPanelProps> = ({
  bordered = true,
  onClose,
  height,
  ...props
}) => {
  const { dataSource } = useContext(ProHelpProvide);
  const [selectedKey, setSelectedKey] = useMergedState<string>('', {
    defaultValue: props.defaultSelectedKey,
    value: props.selectedKey,
    onChange: props.onSelectedKeyChange,
  });
  const [openKey, setOpenKey] = useState('');
  const { token } = useContext(ProProvider);
  const [showLeftPanel, setShowLeftPanel] = useMergedState(true, {
    value: props.showLeftPanel,
    onChange: props.onShowLeftPanelChange,
  });
  return (
    <ProCard
      bordered={bordered}
      headerBordered
      title="帮助中心"
      bodyStyle={{
        display: 'flex',
        padding: 0,
        margin: 0,
        height: '100%',
        width: '100%',
      }}
      size="small"
      extra={
        <Space
          size={24}
          style={{
            cursor: 'pointer',
          }}
        >
          <ProfileOutlined
            onClick={() => {
              setShowLeftPanel(!showLeftPanel);
            }}
          />
          <SearchOutlined />
          {onClose ? (
            <CloseOutlined
              onClick={() => {
                onClose?.();
              }}
            />
          ) : null}
        </Space>
      }
    >
      {showLeftPanel ? (
        <div
          style={{
            overflow: 'auto',
            borderInlineEnd: `${token?.lineWidth}px solid ${token?.colorBorderSecondary}`,
            minHeight: '648px',
            height,
            minWidth: 190,
          }}
        >
          <ConfigProvider
            theme={{
              hashed: process.env.NODE_ENV?.toLowerCase() !== 'test',
              components: {
                Menu: {
                  lineHeight: 1.2,
                  controlHeightLG: 26,
                  fontSize: 12,
                  radiusItem: 4,
                  colorActiveBarWidth: 0,
                  colorActiveBarBorderSize: 0,
                  colorItemBgSelected:
                    token?.layout?.sider?.colorBgMenuItemSelected || 'rgba(0, 0, 0, 0.04)',
                  colorItemBgActive:
                    token?.layout?.sider?.colorBgMenuItemHover || 'rgba(0, 0, 0, 0.04)',
                  colorItemText: token?.layout?.sider?.colorTextMenu || 'rgba(0, 0, 0, 0.65)',
                  colorItemTextHover:
                    token?.layout?.sider?.colorTextMenuActive || 'rgba(0, 0, 0, 0.85)',
                  colorItemTextSelected:
                    token?.layout?.sider?.colorTextMenuSelected || 'rgba(0, 0, 0, 1)',
                  colorItemBg: 'transparent',
                  colorSubItemBg: 'transparent',
                  colorBgElevated: token?.layout?.sider?.colorBgMenuItemCollapsedElevated || '#fff',
                },
              },
            }}
          >
            <Menu
              style={{
                width: 190,
                minWidth: 190,
                height: 'calc(100% - 40px)',
                marginBlock: 20,
              }}
              openKeys={[openKey]}
              onOpenChange={(keys) => {
                setOpenKey(keys.at(-1) || '');
              }}
              selectedKeys={[selectedKey]}
              onSelect={({ selectedKeys }) => {
                setSelectedKey(selectedKeys.at(-1) || '');
              }}
              mode="inline"
              items={dataSource.map((item) => {
                return {
                  key: item.key,
                  label: item.title,
                  children: item.children.map((child) => {
                    return {
                      key: child.key,
                      label: child.title,
                    };
                  }),
                };
              })}
            />
          </ConfigProvider>
        </div>
      ) : null}
      <div
        style={{
          padding: '20px 24px',
          maxWidth: '800px',
          minWidth: '400px',
          overflow: 'auto',
          minHeight: '648px',
          height,
          flex: 1,
        }}
      >
        <ProHelpContentPanel selectedKey={selectedKey} />
      </div>
    </ProCard>
  );
};

export const ProHelp = <ValueTypeMap = { text: any },>({
  dataSource,
  valueTypeMap = new Map(),
  ...props
}: ProHelpProps<ValueTypeMap>) => {
  return (
    <ProHelpProvide.Provider value={{ dataSource, valueTypeMap }}>
      {props.children}
    </ProHelpProvide.Provider>
  );
};

type PropEventSource<Type> = {
  on<Key extends string & keyof Type>(
    eventName: `${Key}Changed`,
    callback: (newValue: Type[Key]) => void,
  ): void;
};

declare function makeWatchedObject<Type>(obj: Type): Type & PropEventSource<Type>;

const person = makeWatchedObject({
  firstName: 'Saoirse',
  lastName: 'Ronan',
  age: 26,
});

person.on('ageChanged', (newAge) => {
  if (newAge < 0) {
    console.warn('warning! negative age');
  }
});

export type ProHelpPopoverProps = Omit<PopoverProps, 'content'> & {
  /**
   * 悬浮提示文字的 CSS 类名
   */
  textClassName?: string;

  /**
   * 悬浮提示文字的 CSS 样式对象
   */
  textStyle?: React.CSSProperties;

  /**
   * 当前选中的帮助文档的 key 值
   */
  selectedKey: string;

  /**
   * 可选的悬浮提示 Popover 组件的 Props，用于自定义悬浮提示的样式和行为。
   * 该属性可以传递 Ant Design Popover 组件的 props，如位置、大小、触发方式等等
   * @see 注意，content 属性已经被从 PopoverProps 中删除，因为这个属性由 ProHelpPopover 内部控制。
   */
  popoverProps?: PopoverProps;
};
/**
 * 渲染一个弹出式提示框，其中显示了一个ProHelpContentPanel，展示帮助文案的详情
 * @param popoverProps 要传递给 Drawer 组件的属性。
 * @param props 要传递给 ProHelpPanel 组件的属性。
 */
export const ProHelpPopover: React.FC<ProHelpPopoverProps> = (props) => {
  return (
    <Popover
      overlayInnerStyle={{
        padding: 0,
      }}
      content={
        <div
          style={{
            maxWidth: 300,
            height: '600px',
            maxHeight: 'calc(100vh - 200px)',
            overflow: 'auto',
            paddingInline: 20,
            paddingBlockStart: 24,
            paddingBlockEnd: 32,
          }}
        >
          <ProHelpContentPanel selectedKey={props.selectedKey} />
        </div>
      }
      {...props.popoverProps}
    >
      <span
        className={classNames('pro-help-popover', props.textClassName)}
        style={{
          color: '#1890ff',
          cursor: 'pointer',
          ...props.textStyle,
        }}
      >
        {props.children}
      </span>
    </Popover>
  );
};

export type ProHelpDrawerProps = {
  /**
   * Ant Design Drawer 组件的 Props，可以传递一些选项，如位置、大小、关闭方式等等。
   */
  drawerProps: DrawerProps;
} & Omit<ProHelpPanelProps, 'onClose'>;

/**
 * 渲染一个抽屉，其中显示了一个 ProHelpPanel。
 * @param drawerProps 要传递给 Drawer 组件的属性。
 * @param props 要传递给 ProHelpPanel 组件的属性。
 */
export const ProHelpDrawer: React.FC<ProHelpDrawerProps> = ({ drawerProps, ...props }) => {
  const [drawerOpen, setDrawerOpen] = useMergedState<boolean>(false, {
    value: drawerProps.open,
    onChange: drawerProps.afterOpenChange,
  });
  return (
    <Drawer
      width={720}
      closeIcon={null}
      headerStyle={{ display: 'none' }}
      bodyStyle={{ padding: 0 }}
      maskClosable
      {...drawerProps}
      open={drawerOpen}
      onClose={() => setDrawerOpen(false)}
      afterOpenChange={(open) => {
        setDrawerOpen(open);
      }}
    >
      <ProHelpPanel {...props} onClose={() => setDrawerOpen(false)} bordered={false} />
    </Drawer>
  );
};
export type ProHelpModalProps = {
  /**
   * Ant Design Modal 组件的 props，可以传递一些选项，如位置、大小、关闭方式等等。
   */
  modalProps: ModalProps;
} & Omit<ProHelpPanelProps, 'onClose'>;
/**
 * 渲染一个模态对话框，其中显示了一个 ProHelpPanel。
 * @param modalProps 要传递给 Modal 组件的属性。
 * @param props 要传递给 ProHelpPanel 组件的属性。
 */
export const ProHelpModal: React.FC<ProHelpModalProps> = ({ modalProps, ...props }) => {
  const [modalOpen, setModalOpen] = useMergedState<boolean>(false, {
    value: modalProps.open,
    onChange: modalProps.afterClose,
  });
  return (
    <Modal
      onCancel={() => {
        setModalOpen(false);
      }}
      bodyStyle={{
        margin: -24,
      }}
      centered
      closable={false}
      footer={null}
      width={720}
      open={modalOpen}
      maskClosable
      {...modalProps}
    >
      <ProHelpPanel height={648} {...props} onClose={() => setModalOpen(false)} />
    </Modal>
  );
};

export default () => {
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [drawerOpen, setDrawerOpen] = useState<boolean>(false);
  const map = new Map<
    string,
    (
      item: ProHelpDataSourceChildren<{
        video: React.VideoHTMLAttributes<HTMLVideoElement>;
        list: {
          title: string;
          children: {
            title: string;
            href: string;
          }[];
        };
      }>,
      index: number,
    ) => React.ReactNode
  >();

  map.set('video', (item) => {
    return (
      <video
        key=""
        style={{
          width: '100%',
        }}
        controls
        {...(item.children as React.VideoHTMLAttributes<HTMLVideoElement>)}
      />
    );
  });

  map.set('list', (item) => {
    const listConfig = item.children as {
      title: string;
      children: {
        title: string;
        href: string;
      }[];
    };
    return (
      <div>
        <h3
          style={{
            margin: '8px 0',
          }}
        >
          {listConfig.title}
        </h3>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 8,
          }}
        >
          {listConfig.children.map((child, index) => {
            return (
              <div key={index}>
                <Typography.Text>
                  {child.href ? <a href={child.href}>{child.title}</a> : child.title}
                </Typography.Text>
              </div>
            );
          })}
        </div>
      </div>
    );
  });
  return (
    <div
      style={{
        margin: 24,
        display: 'flex',
        gap: 24,
        flexDirection: 'column',
      }}
    >
      <ProHelp<{
        video: React.VideoHTMLAttributes<HTMLVideoElement>;
        list: {
          title: string;
          children: {
            title: string;
            href: string;
          }[];
        };
      }>
        dataSource={[
          {
            title: '常见问题',
            key: 'default',
            children: [
              {
                title: '如何开始操作数据授权？',
                key: '1',
                children: [
                  {
                    valueType: 'h1',
                    children: '如何开始操作数据授权？',
                  },
                  {
                    valueType: 'text',
                    children: `需要进行数据合作的数据提供方（数据源）和数据需求方双方都需要先安装部署`,
                  },
                  {
                    valueType: 'inlineLink',
                    children: {
                      href: 'https://www.alipay.com',
                      children: '摩斯产品',
                    },
                  },
                  {
                    valueType: 'text',
                    children:
                      '节点。并将各自的摩斯计算节点、子账号等的版本信息、业务需求、数据量级（几行几列）等信息同步给到摩斯产运负责人。',
                  },
                  {
                    valueType: 'image',
                    children: {
                      src: 'https://mdn.alipayobjects.com/huamei_gcee1x/afts/img/A*Jj_qRqbIRqkAAAAAAAAAAAAADml6AQ/original',
                      style: {
                        maxWidth: 600,
                      },
                    },
                  },
                  {
                    valueType: 'text',
                    children: `需要进行数据合作的数据提供方（数据源）和数据需求方双方都需要先安装部署`,
                  },
                  {
                    valueType: 'inlineLink',
                    children: {
                      href: 'https://www.alipay.com',
                      children: '摩斯产品',
                    },
                  },
                  {
                    valueType: 'text',
                    children:
                      '节点。并将各自的摩斯计算节点、子账号等的版本信息、业务需求、数据量级（几行几列）等信息同步给到摩斯产运负责人。',
                  },
                  {
                    valueType: 'image',
                    children: {
                      src: 'https://mdn.alipayobjects.com/huamei_gcee1x/afts/img/A*Jj_qRqbIRqkAAAAAAAAAAAAADml6AQ/original',
                      style: {
                        maxWidth: 600,
                      },
                    },
                  },
                  {
                    valueType: 'text',
                    children: `需要进行数据合作的数据提供方（数据源）和数据需求方双方都需要先安装部署`,
                  },
                  {
                    valueType: 'inlineLink',
                    children: {
                      href: 'https://www.alipay.com',
                      children: '摩斯产品',
                    },
                  },
                  {
                    valueType: 'text',
                    children:
                      '节点。并将各自的摩斯计算节点、子账号等的版本信息、业务需求、数据量级（几行几列）等信息同步给到摩斯产运负责人。',
                  },
                  {
                    valueType: 'image',
                    children: {
                      src: 'https://mdn.alipayobjects.com/huamei_gcee1x/afts/img/A*Jj_qRqbIRqkAAAAAAAAAAAAADml6AQ/original',
                      style: {
                        maxWidth: 600,
                      },
                    },
                  },
                  {
                    valueType: 'h2',
                    children: '相关问题',
                  },
                  {
                    valueType: 'link',
                    children: {
                      href: 'www.alipay.com',
                      children: '鹊凿平台DCI申领操作手册?',
                    },
                  },
                  {
                    valueType: 'link',
                    children: {
                      href: 'www.alipay.com',
                      children: 'openAPI 注册工具?',
                    },
                  },

                  {
                    valueType: 'h2',
                    children: '帮助视频',
                  },
                  {
                    valueType: 'video',
                    children: {
                      src: 'https://mdn.alipayobjects.com/huamei_gcee1x/afts/file/A*oJOJRZwe00kAAAAAAAAAAAAADml6AQ',
                    },
                  },
                ],
              },
              {
                title: '证据包内包含哪些内容，如何下载证据包？',
                key: '2',
                children: [
                  {
                    valueType: 'h1',
                    children: '证据包内包含哪些内容，如何下载证据包？',
                  },
                  {
                    valueType: 'text',
                    children: `需要进行数据合作的数据提供方（数据源）和数据需求方双方都需要先安装部署`,
                  },
                  {
                    valueType: 'inlineLink',
                    children: {
                      href: 'https://www.alipay.com',
                      children: '摩斯产品',
                    },
                  },
                  {
                    valueType: 'text',
                    children:
                      '节点。并将各自的摩斯计算节点、子账号等的版本信息、业务需求、数据量级（几行几列）等信息同步给到摩斯产运负责人。',
                  },
                  {
                    valueType: 'image',
                    children: {
                      src: 'https://mdn.alipayobjects.com/huamei_gcee1x/afts/img/A*Jj_qRqbIRqkAAAAAAAAAAAAADml6AQ/original',
                      style: {
                        maxWidth: 600,
                      },
                    },
                  },
                  {
                    valueType: 'text',
                    children: `需要进行数据合作的数据提供方（数据源）和数据需求方双方都需要先安装部署`,
                  },
                  {
                    valueType: 'inlineLink',
                    children: {
                      href: 'https://www.alipay.com',
                      children: '摩斯产品',
                    },
                  },
                  {
                    valueType: 'text',
                    children:
                      '节点。并将各自的摩斯计算节点、子账号等的版本信息、业务需求、数据量级（几行几列）等信息同步给到摩斯产运负责人。',
                  },
                  {
                    valueType: 'image',
                    children: {
                      src: 'https://mdn.alipayobjects.com/huamei_gcee1x/afts/img/A*Jj_qRqbIRqkAAAAAAAAAAAAADml6AQ/original',
                      style: {
                        maxWidth: 600,
                      },
                    },
                  },
                  {
                    valueType: 'text',
                    children: `需要进行数据合作的数据提供方（数据源）和数据需求方双方都需要先安装部署`,
                  },
                  {
                    valueType: 'inlineLink',
                    children: {
                      href: 'https://www.alipay.com',
                      children: '摩斯产品',
                    },
                  },
                  {
                    valueType: 'text',
                    children:
                      '节点。并将各自的摩斯计算节点、子账号等的版本信息、业务需求、数据量级（几行几列）等信息同步给到摩斯产运负责人。',
                  },
                  {
                    valueType: 'image',
                    children: {
                      src: 'https://mdn.alipayobjects.com/huamei_gcee1x/afts/img/A*Jj_qRqbIRqkAAAAAAAAAAAAADml6AQ/original',
                      style: {
                        maxWidth: 600,
                      },
                    },
                  },
                  {
                    valueType: 'list',
                    children: {
                      title: '相关问题',
                      children: [
                        {
                          href: 'www.alipay.com',
                          title: '鹊凿平台DCI申领操作手册?',
                        },
                        {
                          href: 'www.alipay.com',
                          title: 'openAPI 注册工具?',
                        },
                      ],
                    },
                  },
                ],
              },
            ],
          },
        ]}
        valueTypeMap={map}
      >
        <div
          style={{
            width: 600,
          }}
        >
          <ProHelpPanel height={648} />
        </div>
        <div
          style={{
            display: 'flex',
            gap: 16,
            width: 600,
            justifyContent: 'space-between',
          }}
        >
          <button onClick={() => setDrawerOpen(!drawerOpen)}>打开</button>
          <button onClick={() => setModalOpen(!modalOpen)}>打开</button>
          <ProHelpModal
            modalProps={{
              open: modalOpen,
              afterClose: () => setModalOpen(false),
            }}
          />
          <ProHelpDrawer
            drawerProps={{
              open: drawerOpen,
              afterOpenChange(open) {
                setDrawerOpen(open);
              },
            }}
          />
          <ProHelpPopover selectedKey="1">Morse</ProHelpPopover>
        </div>
      </ProHelp>
    </div>
  );
};
