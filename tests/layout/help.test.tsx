import {
  ProHelp,
  ProHelpDataSourceChildren,
  ProHelpDrawer,
  ProHelpModal,
  ProHelpPanel,
  ProHelpSelect,
} from '@ant-design/pro-components';
import { act, fireEvent, render, waitFor } from '@testing-library/react';
import { Typography } from 'antd';

export const DefaultProHelp: React.FC<{ children: React.ReactNode }> = (props) => {
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

  map.set('video', (item, index) => {
    return (
      <video
        key={index}
        style={{
          width: '100%',
        }}
        controls
        {...(item.children as React.VideoHTMLAttributes<HTMLVideoElement>)}
      />
    );
  });

  map.set('list', (item, index) => {
    const listConfig = item.children as {
      title: string;
      children: {
        title: string;
        href: string;
      }[];
    };
    return (
      <div key={index}>
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
          {listConfig.children.map((child, subIndex) => {
            return (
              <div key={subIndex}>
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
      {props.children}
    </ProHelp>
  );
};

describe('👍🏻 ProHelpPanel', () => {
  it('🎏 base use', async () => {
    const html = render(
      <DefaultProHelp>
        <div
          style={{
            width: 600,
          }}
        >
          <ProHelpPanel height={648} />
        </div>
      </DefaultProHelp>,
    );

    await html.findAllByText('常见问题');

    await act(async () => {
      (await html.findByText('常见问题'))?.click();
    });

    await act(async () => {
      (await html.findByTitle('collapse panel'))?.click();
    });

    expect(!!html.baseElement.querySelector('ant-pro-help-left-panel')).toBeFalsy();
  });

  it('🎏 click menuItem show demo', async () => {
    const html = render(
      <DefaultProHelp>
        <div
          style={{
            width: 600,
          }}
        >
          <ProHelpPanel height={648} />
        </div>
      </DefaultProHelp>,
    );

    await html.findAllByText('常见问题');

    await act(async () => {
      (await html.findByText('常见问题'))?.click();
    });

    await act(async () => {
      (await html.findByText('证据包内包含哪些内容，如何下载证据包？'))?.click();
    });

    await html.findAllByText(
      '需要进行数据合作的数据提供方（数据源）和数据需求方双方都需要先安装部署',
    );
  });

  it('🎏 ProHelp is empty', async () => {
    const html = render(
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
        dataSource={[]}
      >
        <ProHelpPanel />
      </ProHelp>,
    );
    expect(html.baseElement).toMatchSnapshot();
  });

  it('🎏 ProHelpModal', async () => {
    const fn = jest.fn();
    const html = render(
      <DefaultProHelp>
        <div
          style={{
            width: 600,
          }}
        >
          <ProHelpModal
            modalProps={{
              open: true,
              afterClose: () => {
                fn();
              },
            }}
          />
        </div>
      </DefaultProHelp>,
    );

    await html.findAllByText('常见问题');

    await act(async () => {
      (await html.findByTitle('close panel'))?.click();
    });

    await waitFor(() => {
      expect(fn).toBeCalledTimes(1);
    });

    await act(async () => {
      html.baseElement.querySelector<HTMLDivElement>('.ant-modal-wrap')?.click();
    });

    await waitFor(() => {
      expect(fn).toBeCalledTimes(2);
    });
  });

  it('🎏 ProHelpDrawer', async () => {
    const fn = jest.fn();
    const html = render(
      <DefaultProHelp>
        <div
          style={{
            width: 600,
          }}
        >
          <ProHelpDrawer
            drawerProps={{
              open: true,
              afterOpenChange: () => {
                fn();
              },
            }}
          />
        </div>
      </DefaultProHelp>,
    );

    await html.findAllByText('常见问题');

    await act(async () => {
      (await html.findByTitle('close panel'))?.click();
    });

    await waitFor(() => {
      expect(fn).toBeCalled();
    });

    await act(async () => {
      html.baseElement.querySelector<HTMLDivElement>('.ant-drawer-mask')?.click();
    });

    await waitFor(() => {
      expect(fn).toBeCalledTimes(2);
    });
  });

  it('🎏 ProHelpSelect', async () => {
    jest.useFakeTimers();
    const html = render(
      <DefaultProHelp>
        <div
          style={{
            width: 600,
          }}
        >
          <ProHelpSelect />
        </div>
      </DefaultProHelp>,
    );

    await act(async () => {
      (await html.findByTitle('search panel'))?.click();
    });

    const input = await html.findByText('please input search text');

    await act(async () => {
      fireEvent.mouseDown(html.container.querySelector('.ant-select-selector')!);
      jest.runOnlyPendingTimers();
    });

    await html.findByText('常见问题');

    act(() => {
      fireEvent.change(input.parentElement!.querySelector('input')!, {
        target: {
          value: '如何',
        },
      });

      jest.runOnlyPendingTimers();
    });

    expect(
      html.baseElement.querySelector('.ant-pro-help-search-list-item-content-light')?.textContent,
    ).toBe('如何');

    await act(async () => {
      fireEvent.blur(html.container.querySelector('.ant-select-selector')!);
      jest.runOnlyPendingTimers();
    });
    expect(!!html.container.querySelector('.ant-select-selector')!).toBeFalsy();
  });
});
