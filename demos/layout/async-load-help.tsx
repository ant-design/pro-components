import { ProHelp, ProHelpPanel } from '@ant-design/pro-components';
import { App } from 'antd';
import ReactMarkdown from 'react-markdown';

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

const markdownSample = `

## 标题与段落

ProHelp 支持常用 **粗体**、*斜体* 与 \`行内代码\`，用于展示帮助说明。

### 列表示例

1. 完成环境准备
2. 提交申请并填写信息
3. 等待审核结果

### 代码块

\`\`\`ts
const ready = true;
\`\`\`

### 引用与链接

> 提示：左侧菜单项可使用 \`asyncLoad\` 异步拉取正文。

[ProComponents 文档](https://procomponents.ant.design/)
`;

const Demo = () => {
  const map = new Map();
  map.set(
    'markdown',
    (item: {
      valueType: string;
      children: {
        className: string;
        children: string;
      };
    }) => {
      return (
        <div className={item.children.className}>
          <ReactMarkdown>{item.children.children?.trim()}</ReactMarkdown>
        </div>
      );
    },
  );
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
          markdown: {
            className: string;
            children: string;
          };
        }>
          valueTypeMap={map}
          onLoadContext={async (key) => {
            await waitTime(1000);
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
                  valueType: 'html',
                  children: {
                    children: `<b>加粗文本</b><br><br>
  <i>斜体文本</i><br><br>
  <code>电脑自动输出</code><br><br>
  这是 <sub>下标</sub> 和 <sup>上标</sup>
  `,
                  },
                },
              ];
            }
            return [
              {
                valueType: 'h1',
                children: 'Markdown 示例',
              },
              {
                valueType: 'markdown',
                children: {
                  className: 'markdown',
                  children: markdownSample,
                },
              },
              {
                valueType: 'inlineLink',
                children: {
                  href: 'https://www.antgroup.com',
                  children: '相关产品线',
                },
              },
              {
                valueType: 'text',
                children:
                  '请将各计算节点、子账号的版本信息、业务需求、数据量级等信息同步给产运负责人，便于评估与排期。',
              },
            ];
          }}
          dataSource={[
            {
              title: '常见问题',
              key: 'default',
              children: [
                {
                  title: 'HTML 片段',
                  key: '1',
                  asyncLoad: true,
                },
                {
                  title: 'Markdown 正文',
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

export default () => (
  <div style={{ padding: 24 }}>
    <Demo />
  </div>
);
