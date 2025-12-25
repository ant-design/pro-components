import { ProDescriptions } from '@ant-design/pro-components';

export default () => {
  return (
    <>
      <ProDescriptions
        
        dataSource={{
          id: '这是一段文本columns',
          date: '20200809',
          money: '1212100',
          state: 'all',
          state2: 'open',
        }}
        columns={[
          {
            title: '文本',
            key: 'text',
            dataIndex: 'id',
            ellipsis: true,
            copyable: true,
          },
          {
            title: '状态',
            key: 'state',
            dataIndex: 'state',
            valueType: 'select',
            valueEnum: {
              all: { text: '全部', status: 'Default' },
              open: {
                text: '未解决',
                status: 'Error',
              },
              closed: {
                text: '已解决',
                status: 'Success',
              },
            },
          },
          {
            title: '状态2',
            key: 'state2',
            dataIndex: 'state2',
          },
          {
            title: '时间',
            key: 'date',
            dataIndex: 'date',
            valueType: 'date',
          },
          {
            title: 'money',
            key: 'money',
            dataIndex: 'money',
            valueType: 'money',
          },
          {
            title: '操作',
            valueType: 'option',
            render: () => [
              <a target="_blank" rel="noopener noreferrer" key="link">
                链路
              </a>,
              <a target="_blank" rel="noopener noreferrer" key="warning">
                报警
              </a>,
              <a target="_blank" rel="noopener noreferrer" key="view">
                查看
              </a>,
            ],
          },
        ]}
      >
        <ProDescriptions.Item label="百分比" valueType="percent">
          100
        </ProDescriptions.Item>
      </ProDescriptions>

      <div
        style={{
          marginTop: '20px',
          padding: '20px',
          backgroundColor: '#f5f5f5',
          borderRadius: '6px',
        }}
      >
        <h4>ProDescriptions DataSource 数据源 Props 说明：</h4>
        <ul>
          <li>
            <strong>title</strong>: 描述列表标题
          </li>
          <li>
            <strong>dataSource</strong>: 数据源对象，直接提供数据
          </li>
          <li>
            <strong>columns</strong>: 列配置数组，定义每列的属性
          </li>
        </ul>
        <h4>DataSource 数据源配置：</h4>
        <ul>
          <li>
            <strong>对象格式</strong>: 直接提供数据对象
          </li>
          <li>
            <strong>字段映射</strong>: 通过 dataIndex 映射到数据字段
          </li>
          <li>
            <strong>静态数据</strong>: 适合展示静态或已知数据
          </li>
          <li>
            <strong>性能优势</strong>: 无需异步请求，性能更好
          </li>
        </ul>
        <h4>Column 配置项：</h4>
        <ul>
          <li>
            <strong>title</strong>: 列标题
          </li>
          <li>
            <strong>key</strong>: 列的唯一标识
          </li>
          <li>
            <strong>dataIndex</strong>: 数据字段名，对应 dataSource 中的字段
          </li>
          <li>
            <strong>ellipsis</strong>: 是否显示省略号
          </li>
          <li>
            <strong>copyable</strong>: 是否可复制
          </li>
          <li>
            <strong>valueType</strong>: 值类型，决定如何渲染
          </li>
          <li>
            <strong>valueEnum</strong>: 枚举值配置
          </li>
          <li>
            <strong>render</strong>: 自定义渲染函数
          </li>
        </ul>
        <h4>ValueType 类型：</h4>
        <ul>
          <li>
            <strong>select</strong>: 选择框，配合 valueEnum 使用
          </li>
          <li>
            <strong>date</strong>: 日期格式
          </li>
          <li>
            <strong>money</strong>: 金额格式
          </li>
          <li>
            <strong>percent</strong>: 百分比格式
          </li>
          <li>
            <strong>option</strong>: 操作按钮
          </li>
        </ul>
        <h4>ValueEnum 枚举配置：</h4>
        <ul>
          <li>
            <strong>text</strong>: 显示的文本
          </li>
          <li>
            <strong>status</strong>: 状态类型，影响显示样式
          </li>
          <li>
            <strong>支持状态</strong>: Default, Error, Success, Processing
          </li>
        </ul>
        <h4>Render 自定义渲染：</h4>
        <ul>
          <li>
            <strong>函数返回</strong>: 返回 React 节点数组
          </li>
          <li>
            <strong>操作按钮</strong>: 常用于渲染操作链接或按钮
          </li>
          <li>
            <strong>样式控制</strong>: 完全控制渲染内容的样式
          </li>
        </ul>
        <h4>混合使用特点：</h4>
        <ul>
          <li>
            <strong>Columns 配置</strong>: 通过 columns 数组定义列
          </li>
          <li>
            <strong>Item 组件</strong>: 同时支持 ProDescriptions.Item
          </li>
          <li>
            <strong>优先级</strong>: Item 组件会覆盖 columns 中的配置
          </li>
        </ul>
        <h4>与 Request 的区别：</h4>
        <ul>
          <li>
            <strong>数据来源</strong>: dataSource 直接提供数据，request 异步获取
          </li>
          <li>
            <strong>使用场景</strong>: dataSource 适合静态数据，request
            适合动态数据
          </li>
          <li>
            <strong>性能差异</strong>: dataSource 性能更好，无需网络请求
          </li>
          <li>
            <strong>错误处理</strong>: dataSource 无需处理请求错误
          </li>
        </ul>
        <h4>使用场景：</h4>
        <ul>
          <li>
            <strong>静态数据</strong>: 展示已知的静态数据
          </li>
          <li>
            <strong>配置展示</strong>: 展示系统配置信息
          </li>
          <li>
            <strong>表单预览</strong>: 展示表单提交的数据
          </li>
          <li>
            <strong>详情页面</strong>: 展示对象详细信息
          </li>
        </ul>
        <h4>最佳实践：</h4>
        <ul>
          <li>
            <strong>数据准备</strong>: 确保 dataSource 包含所有需要的字段
          </li>
          <li>
            <strong>列配置</strong>: 使用 columns 配置批量定义列
          </li>
          <li>
            <strong>类型匹配</strong>: 选择合适的 valueType 展示数据
          </li>
          <li>
            <strong>性能优化</strong>: 对于静态数据优先使用 dataSource
          </li>
        </ul>
      </div>
    </>
  );
};
