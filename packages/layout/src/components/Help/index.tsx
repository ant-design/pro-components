import { CloseOutlined, ProfileOutlined, SearchOutlined } from '@ant-design/icons';
import ProCard from '@ant-design/pro-card';
import { ProProvider } from '@ant-design/pro-provider';
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
} from 'antd';
import React, { AnchorHTMLAttributes, useContext, useMemo, useState } from 'react';
import useMergedState from 'rc-util/es/hooks/useMergedState';
import { ProHelpDataSource, ProHelpDataSourceChildren, ProHelpProvide } from './HelpProvide';

type ProHelpPanelProps = {
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
};

type ProHelpProps<ValueType = 'text'> = {
  /**
   * 文档的 json 结构
   */
  dataSource: ProHelpDataSource<ValueType>[];

  children?: React.ReactNode;
};

export const ProHelpContentPanel: React.FC<{
  /**
   * 控制当前选中的帮助文档
   */
  selectedKey: React.Key;
}> = ({ selectedKey }) => {
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
      {dataSourceMap.get(selectedKey)?.map((item) => {
        if (item.valueType === 'h1') {
          return (
            <Typography.Title
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
            <Typography.Text>
              <a {...(item.children as AnchorHTMLAttributes<HTMLAnchorElement>)} />
            </Typography.Text>
          );
        }
        if (item.valueType == 'link') {
          return (
            <div>
              <Typography.Text>
                <a {...(item.children as AnchorHTMLAttributes<HTMLAnchorElement>)} />
              </Typography.Text>
            </div>
          );
        }
        return <Typography.Text>{item.children as string}</Typography.Text>;
      })}
    </div>
  );
};

export const ProHelpPanel: React.FC<ProHelpPanelProps> = ({
  bordered = true,
  onClose,
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
      headerBordered={bordered}
      title="帮助中心"
      bodyStyle={{
        display: 'flex',
        padding: 0,
        margin: 0,
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
            height: '648px',
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
          height: '648px',
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

export default () => {
  const [drawerOpen, setDrawerOpen] = useState<boolean>(false);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
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
          <ProHelpPanel />
        </div>
        <button onClick={() => setDrawerOpen(!drawerOpen)}>打开</button>
        <button onClick={() => setModalOpen(!modalOpen)}>打开</button>
        <Modal
          afterClose={() => {
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
        >
          <ProHelpPanel onClose={() => setModalOpen(false)} bordered={false} />
        </Modal>
        <Drawer
          width={520}
          closeIcon={null}
          onClose={() => {
            setDrawerOpen(false);
          }}
          headerStyle={{
            display: 'none',
          }}
          open={drawerOpen}
          maskClosable
        >
          <ProHelpContentPanel selectedKey="1" />
        </Drawer>

        <Popover
          content={
            <div
              style={{
                maxWidth: 300,
                height: '600px',
                overflow: 'auto',
                paddingInline: 8,
              }}
            >
              <ProHelpContentPanel selectedKey="1" />
            </div>
          }
        >
          Morse
        </Popover>
      </ProHelp>
    </div>
  );
};
