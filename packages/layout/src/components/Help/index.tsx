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
   * 控制当前选中的帮助文档
   */
  selectedKey?: string;
  onSelectedKeyChange?: (key: string) => void;
  /**
   *控制左侧面板是否能够打开
   */
  showLeftPanel?: boolean;
  onShowLeftPanelChange?: (show: boolean) => void;

  bordered?: boolean;

  onClose?: () => void;

  height?: number | string;
};

export type ProHelpProps<ValueType = 'text'> = {
  /**
   * 文档的 json 结构
   */
  dataSource: ProHelpDataSource<ValueType>[];

  children?: React.ReactNode;
};

export type ProHelpContentPanelProps = {
  /**
   * 控制当前选中的帮助文档
   */
  selectedKey: React.Key;
};

/**
 * 控制具体的帮助文档显示
 * @param ProHelpContentPanelProps
 * @returns
 */
export const ProHelpContentPanel: React.FC<ProHelpContentPanelProps> = ({ selectedKey }) => {
  const { dataSource } = useContext(ProHelpProvide);

  const dataSourceMap = useMemo(() => {
    const map = new Map<React.Key, ProHelpDataSourceChildren[]>();
    dataSource.forEach((page) => {
      page.children.forEach((item) => {
        map.set(item.key || item.title, item.children);
      });
    });
    return map;
  }, [dataSource]);
  return (
    <div>
      {dataSourceMap.get(selectedKey)?.map((item, index) => {
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
            <div>
              <Typography.Text key={index}>
                <a {...(item.children as AnchorHTMLAttributes<HTMLAnchorElement>)} />
              </Typography.Text>
            </div>
          );
        }
        return <Typography.Text key={index}>{item.children as string}</Typography.Text>;
      })}
    </div>
  );
};

export const ProHelpPanel: React.FC<ProHelpPanelProps> = ({
  bordered = true,
  onClose,
  height,
  ...props
}) => {
  const { dataSource } = useContext(ProHelpProvide);
  const [selectedKey, setSelectedKey] = useMergedState<string>('', {
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

export const ProHelp: React.FC<ProHelpProps<'video' | 'list'>> = ({ dataSource, ...props }) => {
  return <ProHelpProvide.Provider value={{ dataSource }}>{props.children}</ProHelpProvide.Provider>;
};

export type ProHelpPopoverProps = Omit<PopoverProps, 'content'> & {
  textClassName?: string;
  textStyle?: React.CSSProperties;
  selectedKey: string;
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

export type ProHelpDrawerProps = { drawerProps: DrawerProps } & Omit<ProHelpPanelProps, 'onClose'>;
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
export type ProHelpModalProps = { modalProps: ModalProps } & Omit<ProHelpPanelProps, 'onClose'>;
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
  return (
    <div
      style={{
        margin: 24,
        display: 'flex',
        gap: 24,
        flexDirection: 'column',
      }}
    >
      <ProHelp
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
                ],
              },
            ],
          },
        ]}
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
