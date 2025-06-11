import type { ProHelpDataSourceChildren } from '@ant-design/pro-components';
import { ProHelp, ProHelpPanel } from '@ant-design/pro-components';
import { App, Rate, Typography } from 'antd';

export default () => {
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
                        src: 'https://mdn.alipayobjects.com/huamei_gcee1x/afts/img/A*NcPORK7kRWMAAAAAAAAAAAAADml6AQ/original',
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
            {
              title: '名词解释',
              key: 'value',
              infiniteScrollFull: true,
              children: [
                {
                  title: '数据管理（模块）',
                  key: 'name0',
                  children: [
                    {
                      valueType: 'h1',
                      children: '数据管理（模块）',
                    },
                    {
                      valueType: 'text',
                      children:
                        '这是一个用于管理和处理数据的模块，它提供了一套工具来帮助用户进一步管理域内的数据。用户可以使用数据管理模块来管理数据、处理数据以及保护数据。',
                    },
                  ],
                },
                {
                  title: '网页上传方式',
                  key: 'name1',
                  children: [
                    {
                      valueType: 'h1',
                      children: '网页上传方式',
                    },
                    {
                      valueType: 'text',
                      children:
                        '一种网页提供给用户的上传文件方法，用户可以通过网页上传自己的文件进行处理。',
                    },
                  ],
                },
                {
                  title: '其他获取方式',
                  key: 'name2',
                  children: [
                    {
                      valueType: 'h1',
                      children: '其他获取方式',
                    },
                    {
                      valueType: 'text',
                      children:
                        '即不通过网页上传的方式获取数据，例如从数据库、文件夹或其他数据源中获取数据。',
                    },
                  ],
                },
                {
                  title: '数据字典',
                  key: 'name3',
                  children: [
                    {
                      valueType: 'h1',
                      children: '数据字典',
                    },
                    {
                      valueType: 'text',
                      children:
                        '一个固定格式的数据说明书，它包含了所有数据元素的定义和说明，以及它们的定义和格式。',
                    },
                  ],
                },
                {
                  title: '项目空间（模块）',
                  key: 'name4',
                  children: [
                    {
                      valueType: 'h1',
                      children: '项目空间(模块)',
                    },
                    {
                      valueType: 'text',
                      children:
                        '这是一个用于存储和管理一组相关数据和文档的模块。在项目空间中，用户可以创建文件夹、上传文件、管理文件等操作。',
                    },
                  ],
                },
                {
                  title: '项目合作方',
                  key: 'name5',
                  children: [
                    {
                      valueType: 'h1',
                      children: '项目合作方',
                    },
                    {
                      valueType: 'text',
                      children: '与用户进行数据合作的外部组织或个人。',
                    },
                  ],
                },
                {
                  title: '项目数据资源',
                  key: 'name6',
                  children: [
                    {
                      valueType: 'h1',
                      children: '项目数据资源',
                    },
                    {
                      valueType: 'text',
                      children:
                        '在一个项目中产生或收集的所有数据资源，包括原始数据、处理数据、文档和元数据等。',
                    },
                  ],
                },
                {
                  title: '离线批量数据',
                  key: 'name7',
                  children: [
                    {
                      valueType: 'h1',
                      children: '离线批量数据',
                    },
                    {
                      valueType: 'text',
                      children:
                        '一种离线处理数据的方式，用户将需要处理的数据批量上传到系统中，再通过系统进行处理。',
                    },
                    {
                      valueType: 'text',
                      children: '相关数据请查看：',
                    },
                    {
                      valueType: 'navigationSwitch',
                      children: {
                        selectKey: 'name9',
                        children: '节点场景',
                      },
                    },
                  ],
                },
                {
                  title: '线上服务数据',
                  key: 'name8',
                  children: [
                    {
                      valueType: 'h1',
                      children: '线上服务数据',
                    },
                    {
                      valueType: 'text',
                      children:
                        '一种在线处理数据的方式，用户通过在线提交数据并调用相应的处理程序进行数据处理。',
                    },
                  ],
                },
                {
                  title: '节点场景',
                  key: 'name9',
                  children: [
                    {
                      valueType: 'h1',
                      children: '节点场景',
                    },
                    {
                      valueType: 'text',
                      children:
                        '一个由多个节点组成的场景，每个节点都有不同的特征和功能，相互之间可以通信和互动。',
                    },
                  ],
                },
                {
                  title: '模型配置',
                  key: 'name10',
                  children: [
                    {
                      valueType: 'h1',
                      children: '模型配置',
                    },
                    {
                      valueType: 'text',
                      children:
                        '根据用户的要求对模型参数进行设置和调整，以达到最佳的处理效果。',
                    },
                  ],
                },
                {
                  title: '模型文件',
                  key: 'name11',
                  children: [
                    {
                      valueType: 'h1',
                      children: '模型文件',
                    },
                    {
                      valueType: 'text',
                      children:
                        '系统生成的模型文件，包含了所有的模型参数和处理算法。',
                    },
                  ],
                },
                {
                  title: '预处理文件',
                  key: 'name12',
                  children: [
                    {
                      valueType: 'h1',
                      children: '预处理文件',
                    },
                    {
                      valueType: 'text',
                      children:
                        '用于预处理数据的文件，系统可根据用户的设置进行数据预处理。',
                    },
                  ],
                },
                {
                  title: '后处理文件',
                  key: 'name13',
                  children: [
                    {
                      valueType: 'text',
                      children:
                        '用于后处理数据的文件，系统将处理完成的数据输出到后处理文件中。',
                    },
                  ],
                },
                {
                  title: '安全模型',
                  key: 'name14',
                  children: [
                    {
                      valueType: 'h1',
                      children: '安全模型',
                    },
                    {
                      valueType: 'text',
                      children:
                        '一种用于保护用户数据的安全控制模型，可以对数据进行加密、访问控制和防止数据泄漏等处理。',
                    },
                  ],
                },
                {
                  title: '安全匹配',
                  key: 'name15',
                  children: [
                    {
                      valueType: 'h1',
                      children: '安全匹配',
                    },
                    {
                      valueType: 'text',
                      children:
                        '一种用于数据匹配的安全控制方法，可以对数据进行匿名化处理，以保护用户的隐私。',
                    },
                  ],
                },
                {
                  title: '安全统计',
                  key: 'name16',
                  children: [
                    {
                      valueType: 'h1',
                      children: '安全统计',
                    },
                    {
                      valueType: 'text',
                      children:
                        '一种用于保护数据隐私的统计方法，可以在保证数据隐私的情况下进行数据分析和统计。',
                    },
                  ],
                },
                {
                  title: '安全联盟',
                  key: 'name17',
                  children: [
                    {
                      valueType: 'h1',
                      children: '安全联盟',
                    },
                    {
                      valueType: 'text',
                      children:
                        '一种由多方共同协作的数据处理和安全保护机制，可以保障数据的机密性和完整性。',
                    },
                  ],
                },
                {
                  title: '安全脚本',
                  key: 'name18',
                  children: [
                    {
                      valueType: 'h1',
                      children: '安全脚本',
                    },
                    {
                      valueType: 'text',
                      children:
                        '一种用于数据处理和安全保护的脚本程序，可以自动化完成数据安全控制任务。',
                    },
                  ],
                },
                {
                  title: '匿名查询',
                  key: 'name19',
                  children: [
                    {
                      valueType: 'h1',
                      children: '匿名查询',
                    },
                    {
                      valueType: 'text',
                      children:
                        '一种保护用户隐私的查询方法，可以匿名化处理查询请求和返回结果，以保护用户的隐私。',
                    },
                  ],
                },
                {
                  title: '导出表',
                  key: 'name20',
                  children: [
                    {
                      valueType: 'h1',
                      children: '导出表',
                    },
                    {
                      valueType: 'text',
                      children:
                        '一种用于导出数据的文件表格，用户可以将处理完的数据导出到该表格中进行进一步的处理和使用。',
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
              width: 800,
            }}
          >
            <ProHelpPanel
              defaultSelectedKey="1"
              height={648}
              footer={
                <div
                  style={{
                    textAlign: 'center',
                    borderTop: '1px solid #EEE',
                    padding: 12,
                    marginTop: 24,
                  }}
                >
                  这篇文章的质量如何？ <Rate />
                </div>
              }
            />
          </div>
        </ProHelp>
      </div>
    </App>
  );
};
