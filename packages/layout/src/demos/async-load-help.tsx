import { ProHelp, ProHelpPanel } from '@ant-design/pro-components';
import { App } from 'antd';

export const waitTimePromise = async (time: number = 100) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};

export const waitTime = async (time: number = 100) => {
  await waitTimePromise(time);
};

export default () => {
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
          onLoadContext={async (key) => {
            await waitTime(10000);
            if (key === '1') {
              return [
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
              ];
            }
            return [
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
            ];
          }}
          dataSource={[
            {
              title: '常见问题',
              key: 'default',
              children: [
                {
                  title: '如何开始操作数据授权？',
                  key: '1',
                  asyncLoad: true,
                },
                {
                  title: '证据包内包含哪些内容，如何下载证据包？',
                  key: '2',
                  asyncLoad: true,
                },
              ],
            },
          ]}
        >
          <div
            style={{
              width: 400,
            }}
          >
            <ProHelpPanel defaultSelectedKey="1" height={448} />
          </div>
        </ProHelp>
      </div>
    </App>
  );
};
