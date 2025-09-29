import { EllipsisOutlined } from '@ant-design/icons';
import type { ProColumns } from '@xxlabs/pro-components';
import { ProTable } from '@xxlabs/pro-components';
import { Button, Result, Switch } from 'antd';
import type { ErrorInfo } from 'react';
import React, { useState } from 'react';

class CustomBoundary extends React.Component<Record<string, any>, { hasError: boolean; errorInfo: string }> {
  state = { hasError: false, errorInfo: '' };

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, errorInfo: error.message };
  }

  componentDidCatch(error: any, errorInfo: ErrorInfo) {
    // You can also log the error to an error reporting service

    console.log(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        <Result
          extra={
            <>
              <div
                style={{
                  maxWidth: 620,
                  textAlign: 'start',
                  backgroundColor: 'rgba(255,229,100,0.3)',
                  borderInlineStartColor: '#ffe564',
                  borderInlineStartWidth: '9px',
                  borderInlineStartStyle: 'solid',
                  padding: '20px 45px 20px 26px',
                  margin: 'auto',
                  marginBlockEnd: '30px',
                  marginBlockStart: '20px',
                }}
              >
                <p>注意</p>
                <p>
                  错误边界<strong>无法</strong>捕获以下场景中产生的错误：
                </p>
                <ul
                  style={{
                    listStyle: 'none',
                  }}
                >
                  <li>
                    事件处理（
                    <a href="https://zh-hans.reactjs.org/docs/error-boundaries.html#how-about-event-handlers#how-about-event-handlers">
                      了解更多
                    </a>
                    ）
                  </li>
                  <li>
                    异步代码（例如 <code>setTimeout</code> 或 <code>requestAnimationFrame</code> 回调函数）
                  </li>
                  <li>服务端渲染</li>
                  <li>它自身抛出来的错误（并非它的子组件）</li>
                </ul>
              </div>
              <Button
                danger
                type="primary"
                onClick={() => {
                  window.location.reload();
                }}
              >
                刷新页面
              </Button>
            </>
          }
          icon={
            <img src="https://gw.alipayobjects.com/zos/antfincdn/zIgkN%26mpMZ/shibaizhuangtaizuo.png" width={256} />
          }
          style={{
            height: '100%',
            background: '#fff',
          }}
          title="错误处理"
        />
      );
    }
    return this.props.children;
  }
}

export type TableListItem = {
  key: number;
  name: string;
  containers: number;
  creator: string;
};
const tableListDataSource: TableListItem[] = [];

const creators = ['付小小', '曲丽丽', '林东东', '陈帅帅', '兼某某'];

for (let i = 0; i < 5; i += 1) {
  tableListDataSource.push({
    key: i,
    name: 'AppName',
    containers: Math.floor(Math.random() * 20),
    creator: creators[Math.floor(Math.random() * creators.length)],
  });
}

const columns: ProColumns<TableListItem>[] = [
  {
    title: '应用名称',
    dataIndex: 'name',
    render: (_) => <a>{_}</a>,
  },
  {
    title: '容器数量',
    dataIndex: 'containers',
    align: 'right',
    sorter: (a, b) => a.containers - b.containers,
  },
  {
    title: '创建者',
    dataIndex: 'creator',
    valueType: 'select',
    valueEnum: {
      all: { text: '全部' },
      付小小: { text: '付小小' },
      曲丽丽: { text: '曲丽丽' },
      林东东: { text: '林东东' },
      陈帅帅: { text: '陈帅帅' },
      兼某某: { text: '兼某某' },
    },
  },
  {
    title: '操作',
    key: 'option',
    width: 120,
    valueType: 'option',
    render: () => [
      <a key="link">链路</a>,
      <a key="warn">报警</a>,
      <a key="more">
        <EllipsisOutlined />
      </a>,
    ],
  },
];

const ErrorTrigger = () => {
  // default to throw error for snapshot test
  const [error, setError] = useState<boolean>(true);
  if (error) throw new Error('渲染发生了错误');
  return (
    <Button
      danger
      type="primary"
      onClick={() => {
        setError(true);
      }}
    >
      触发错误
    </Button>
  );
};

export default () => {
  const [custom, setCustom] = useState(true);
  return (
    <>
      <Switch
        checked={custom}
        checkedChildren="使用自定义错误边界"
        unCheckedChildren="使用默认错误边界"
        onChange={(checked) => setCustom(checked)}
      />
      <ProTable<TableListItem>
        ErrorBoundary={custom ? CustomBoundary : undefined}
        columns={columns}
        headerTitle={<ErrorTrigger />}
        request={(params, sorter, filter) => {
          // 表单搜索项会从 params 传入，传递给后端接口。
          console.log(params, sorter, filter);
          return Promise.resolve({
            data: tableListDataSource,
            success: true,
          });
        }}
        rowKey="key"
        search={false}
      />
    </>
  );

  <div
    style={{
      marginTop: '20px',
      padding: '20px',
      backgroundColor: '#f5f5f5',
      borderRadius: '6px',
    }}
  >
    <h4>ProTable 错误边界 Props 说明：</h4>
    <ul>
      <li>
        <strong>ProTable</strong>: 专业表格组件
      </li>
      <li>
        <strong>Switch</strong>: 开关组件
      </li>
      <li>
        <strong>Result</strong>: 结果组件
      </li>
      <li>
        <strong>Button</strong>: 按钮组件
      </li>
      <li>
        <strong>错误边界</strong>: 展示错误边界功能
      </li>
    </ul>
    <h4>ProTable 配置：</h4>
    <ul>
      <li>
        <strong>columns</strong>: 列配置
      </li>
      <li>
        <strong>request</strong>: 请求函数
      </li>
      <li>
        <strong>ErrorBoundary</strong>: 错误边界配置
      </li>
      <li>
        <strong>headerTitle</strong>: 表格标题
      </li>
      <li>
        <strong>rowKey</strong>: 行键
      </li>
      <li>
        <strong>search</strong>: 搜索配置
      </li>
    </ul>
    <h4>错误边界特点：</h4>
    <ul>
      <li>
        <strong>自定义边界</strong>: 支持自定义错误边界
      </li>
      <li>
        <strong>错误捕获</strong>: 支持错误捕获
      </li>
      <li>
        <strong>错误处理</strong>: 支持错误处理
      </li>
      <li>
        <strong>容错机制</strong>: 支持容错机制
      </li>
      <li>
        <strong>错误展示</strong>: 支持错误展示
      </li>
      <li>
        <strong>错误恢复</strong>: 支持错误恢复
      </li>
    </ul>
    <h4>使用场景：</h4>
    <ul>
      <li>
        <strong>错误处理</strong>: 错误处理需求
      </li>
      <li>
        <strong>稳定性保证</strong>: 稳定性保证
      </li>
      <li>
        <strong>用户体验</strong>: 用户体验优化
      </li>
    </ul>
  </div>;
};
