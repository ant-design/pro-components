import type { ProDescriptionsActionType } from '@ant-design/pro-components';
import { ProDescriptions } from '@ant-design/pro-components';
import { Input, Tooltip } from 'antd';
import { useRef } from 'react';

const Demo = () => {
  const actionRef = useRef<ProDescriptionsActionType>(undefined);
  return (
    <>
      <ProDescriptions
        actionRef={actionRef}
        //   variant="outlined"
        formProps={{
          onValuesChange: (e, f) => console.log(f),
        }}
        title="可编辑的定义列表"
        request={async () => {
          return Promise.resolve({
            success: true,
            data: {
              rate: 5,
              id: '这是一段文本columns',
              date: '20200809',
              money: '1212100',
              state: 'all',
              state2: 'open',
              textarea:
                '这是一个文本域-这是一个文本域-这是一个文本域-这是一个文本域-这是一个文本域-这是一个文本域-这是一个文本域-这是一个文本域-这是一个文本域',
            },
          });
        }}
        editable={{}}
        columns={[
          {
            title: '文本',
            key: 'text',
            dataIndex: 'id',
            copyable: true,
            ellipsis: true,
          },
          {
            title: '状态',
            key: 'state',
            dataIndex: 'state',
            valueType: 'select',
            editable: false,
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
            title: '文本域',
            key: 'textarea',
            dataIndex: 'textarea',
            valueType: 'textarea',
            formItemProps: {
              style: {
                flex: 1,
              },
            },
          },
          {
            title: '状态2',
            key: 'state2',
            dataIndex: 'state2',
            formItemRender: () => {
              return <Input placeholder="输入 Success 切换分值" />;
            },
          },
          {
            title: '分值',
            dataIndex: 'fraction',
            valueType: (record) => {
              const scoringMethod = record?.state2;
              if (scoringMethod === 'Success') return 'select';
              return 'digit';
            },
            fieldProps: {
              mode: 'multiple',
            },
            request: async () =>
              ['A', 'B', 'D', 'E', 'F'].map((item, index) => ({
                label: item,
                value: index,
              })),
          },

          {
            title: '时间',
            key: 'date',
            dataIndex: 'date',
            valueType: 'date',
          },
          {
            title: 'Rate',
            key: 'rate',
            dataIndex: 'rate',
            valueType: 'rate',
          },
          {
            title: 'money',
            key: 'money',
            dataIndex: 'money',
            valueType: 'money',
            render: (dom, entity, index, action) => {
              return (
                <Tooltip title="点击进入编辑状态">
                  <div
                    onClick={() => {
                      action?.startEditable('money');
                    }}
                  >
                    {dom}
                  </div>
                </Tooltip>
              );
            },
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
        <ProDescriptions.Item
          dataIndex="percent"
          label="百分比"
          valueType="percent"
        >
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
        <h4>ProDescriptions 可编辑功能 Props 说明：</h4>
        <ul>
          <li>
            <strong>actionRef</strong>: 操作引用，用于调用组件方法
          </li>
          <li>
            <strong>formProps</strong>: 表单属性配置
          </li>
          <li>
            <strong>title</strong>: 描述列表标题
          </li>
          <li>
            <strong>request</strong>: 异步请求函数
          </li>
          <li>
            <strong>editable</strong>: 可编辑配置
          </li>
          <li>
            <strong>columns</strong>: 列配置数组
          </li>
        </ul>
        <h4>FormProps 表单配置：</h4>
        <ul>
          <li>
            <strong>onValuesChange</strong>: 表单值变化时的回调函数
          </li>
          <li>
            <strong>其他表单属性</strong>: 支持所有 Form 组件的属性
          </li>
        </ul>
        <h4>Column 可编辑配置：</h4>
        <ul>
          <li>
            <strong>copyable</strong>: 是否可复制
          </li>
          <li>
            <strong>ellipsis</strong>: 是否显示省略号
          </li>
          <li>
            <strong>editable</strong>: 是否可编辑，false 表示禁用编辑
          </li>
          <li>
            <strong>formItemProps</strong>: 表单项属性配置
          </li>
          <li>
            <strong>formItemRender</strong>: 自定义表单项渲染函数
          </li>
        </ul>
        <h4>ValueType 动态配置：</h4>
        <ul>
          <li>
            <strong>函数形式</strong>: valueType: (record) =&gt; string
          </li>
          <li>
            <strong>条件判断</strong>: 根据数据动态返回 valueType
          </li>
          <li>
            <strong>数据依赖</strong>: 基于当前行数据决定显示类型
          </li>
        </ul>
        <h4>FieldProps 字段属性：</h4>
        <ul>
          <li>
            <strong>mode</strong>: 选择模式，'multiple' 表示多选
          </li>
          <li>
            <strong>其他属性</strong>: 根据 valueType 传递相应属性
          </li>
        </ul>
        <h4>Request 远程数据：</h4>
        <ul>
          <li>
            <strong>异步函数</strong>: 返回 Promise 对象
          </li>
          <li>
            <strong>数据格式</strong>: [{'{'} label: string, value: any {'}'}]
          </li>
          <li>
            <strong>动态选项</strong>: 根据条件动态生成选项
          </li>
        </ul>
        <h4>Render 自定义渲染：</h4>
        <ul>
          <li>
            <strong>参数</strong>: (dom, entity, index, action)
          </li>
          <li>
            <strong>dom</strong>: 默认渲染的 DOM
          </li>
          <li>
            <strong>entity</strong>: 当前行数据
          </li>
          <li>
            <strong>index</strong>: 行索引
          </li>
          <li>
            <strong>action</strong>: 操作对象，包含 startEditable 等方法
          </li>
        </ul>
        <h4>Action 操作方法：</h4>
        <ul>
          <li>
            <strong>startEditable</strong>: 开始编辑指定字段
          </li>
          <li>
            <strong>cancelEditable</strong>: 取消编辑
          </li>
          <li>
            <strong>saveEditable</strong>: 保存编辑
          </li>
        </ul>
        <h4>ValueType 类型：</h4>
        <ul>
          <li>
            <strong>select</strong>: 选择框，配合 valueEnum 使用
          </li>
          <li>
            <strong>textarea</strong>: 文本域
          </li>
          <li>
            <strong>date</strong>: 日期选择器
          </li>
          <li>
            <strong>rate</strong>: 评分组件
          </li>
          <li>
            <strong>money</strong>: 金额格式
          </li>
          <li>
            <strong>percent</strong>: 百分比格式
          </li>
        </ul>
        <h4>使用场景：</h4>
        <ul>
          <li>
            <strong>内联编辑</strong>: 直接在列表中编辑数据
          </li>
          <li>
            <strong>条件编辑</strong>: 根据条件控制编辑状态
          </li>
          <li>
            <strong>动态表单</strong>: 根据数据动态生成表单
          </li>
          <li>
            <strong>交互操作</strong>: 提供丰富的交互操作
          </li>
        </ul>
        <h4>最佳实践：</h4>
        <ul>
          <li>
            <strong>编辑控制</strong>: 合理控制哪些字段可编辑
          </li>
          <li>
            <strong>用户体验</strong>: 提供清晰的编辑反馈
          </li>
          <li>
            <strong>数据验证</strong>: 在编辑时进行数据验证
          </li>
          <li>
            <strong>状态管理</strong>: 合理管理编辑状态
          </li>
        </ul>
      </div>
    </>
  );
};

export default () => (
  <div style={{ padding: 24 }}>
    <Demo />
  </div>
);
