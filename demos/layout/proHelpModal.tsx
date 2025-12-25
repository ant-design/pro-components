import type { ProHelpDataSourceChildren } from '@ant-design/pro-components';
import {
  ProHelp,
  ProHelpDrawer,
  ProHelpModal,
  ProHelpPopover,
} from '@ant-design/pro-components';
import { App, Typography } from 'antd';
import { useState } from 'react';

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
                  {child.href ? (
                    <a href={child.href}>{child.title}</a>
                  ) : (
                    child.title
                  )}
                </Typography.Text>
              </div>
            );
          })}
        </div>
      </div>
    );
  });

  return (
    <App>
      <div
        style={{
          margin: 24,
          paddingBlockEnd: 128,
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
                    // @ts-expect-error
                    {
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
    </App>
  );
};
