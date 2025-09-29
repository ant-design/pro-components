import {
  ProCard,
  ProDescriptions,
  ProForm,
  ProFormDependency,
  ProFormDigit,
  ProFormList,
  ProFormSelect,
  ProFormSwitch,
  ProFormText,
  ProFormTextArea,
} from '@xxlabs/pro-components';
import { useState } from 'react';

const valueTypeArray = [
  'password',
  'money',
  'textarea',
  'option',
  'date',
  'dateWeek',
  'dateMonth',
  'dateQuarter',
  'dateYear',
  'dateRange',
  'dateTimeRange',
  'dateTime',
  'time',
  'timeRange',
  'text',
  'select',
  'checkbox',
  'rate',
  'radio',
  'radioButton',
  'index',
  'indexBorder',
  'progress',
  'percent',
  'digit',
  'second',
  'avatar',
  'code',
  'switch',
  'fromNow',
  'image',
  'jsonCode',
];

const initialValues = {
  title: '高级定义列表',
  column: '3',
  columns: [
    {
      title: '文本',
      key: 'text',
      dataIndex: 'id',
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
      title: '百分比',
      key: 'percent',
      dataIndex: 'percent',
      valueType: 'percent',
    },
    {
      title: '操作',
      valueType: 'option',
      render: () => [
        <a key="link" rel="noopener noreferrer" target="_blank">
          链路
        </a>,
        <a key="warning" rel="noopener noreferrer" target="_blank">
          报警
        </a>,
        <a key="view" rel="noopener noreferrer" target="_blank">
          查看
        </a>,
      ],
    },
  ],
};

export default () => {
  const [values, setValues] = useState<Record<string, any>>(initialValues);
  return (
    <>
      <ProCard
        headerBordered
        split="vertical"
        style={{
          minHeight: 500,
        }}
        variant="outlined"
      >
        <ProCard colSpan="calc(100% - 580px)">
          <ProDescriptions
            title="高级定义列表"
            {...values}
            columns={values?.columns?.filter(Boolean) || []}
            request={async () => {
              return Promise.resolve({
                success: true,
                data: {
                  id: '这是一段文本columns',
                  date: '20200809',
                  money: '1212100',
                  state: 'all',
                  state2: 'open',
                  percent: '20%',
                },
              });
            }}
          />
        </ProCard>
        <ProForm
          initialValues={values}
          submitter={false}
          onValuesChange={(_, allValue) => {
            setValues({ ...initialValues, ...allValue });
          }}
        >
          <ProCard
            colSpan="580px"
            style={{
              width: 500,
            }}
            tabs={{
              items: [
                {
                  label: '基本配置',
                  key: 'base',
                  children: (
                    <>
                      <ProFormText label="标题" name="title" />
                      <ProForm.Group>
                        <ProFormSelect
                          initialValue="horizontal"
                          label="布局"
                          name="layout"
                          options={[
                            {
                              label: '水平',
                              value: 'horizontal',
                            },
                            {
                              label: '垂直',
                              value: 'vertical',
                            },
                          ]}
                        />
                        <ProFormSwitch label="加载中" name="loading" tooltip="loading" />
                        <ProFormSelect
                          initialValue="default"
                          label="尺寸"
                          name="size"
                          options={[
                            {
                              label: '大',
                              value: 'default',
                            },
                            {
                              label: '中',
                              value: 'middle',
                            },
                            {
                              label: '小',
                              value: 'small',
                            },
                          ]}
                        />

                        <ProFormSwitch label="边框" name="bordered" tooltip="bordered" />
                        <ProFormDigit label="列数" name="column" width="xs" />
                      </ProForm.Group>
                    </>
                  ),
                },
                {
                  label: '列配置',
                  key: 'columns',
                  children: (
                    <ProFormList
                      creatorButtonProps={{
                        position: 'top',
                      }}
                      itemRender={({ listDom, action }) => {
                        return (
                          <ProCard
                            style={{
                              marginBlockEnd: 8,
                              position: 'relative',
                            }}
                            variant="outlined"
                          >
                            <div
                              style={{
                                position: 'absolute',
                                top: -2,
                                right: 4,
                              }}
                            >
                              {action}
                            </div>
                            {listDom}
                          </ProCard>
                        );
                      }}
                      label="列配置"
                      name="columns"
                    >
                      <ProForm.Group key="Group" size={16}>
                        <ProFormText label="标题" name="title" />
                        <ProFormDigit initialValue={1} label="占据列数" name="span" width="xs" />
                        <ProFormSelect
                          label="值类型"
                          name="valueType"
                          options={valueTypeArray.map((value) => ({
                            label: value,
                            value,
                          }))}
                          width="xs"
                        />
                        <ProFormSelect
                          label="dataIndex"
                          name="dataIndex"
                          valueEnum={{
                            age: 'age',
                            address: 'address',
                            name: 'name',
                            time: 'time',
                            description: 'string',
                          }}
                          width="xs"
                        />
                      </ProForm.Group>
                      <ProFormDependency key="valueType" name={['valueType', 'valueEnum']}>
                        {({ valueType, valueEnum }) => {
                          if (valueType !== 'select') {
                            return null;
                          }
                          return (
                            <ProFormTextArea
                              fieldProps={{
                                value: JSON.stringify(valueEnum),
                              }}
                              formItemProps={{
                                style: {
                                  marginBlockStart: 8,
                                },
                              }}
                              label="数据枚举"
                              name="valueEnum"
                              normalize={(value) => {
                                return JSON.parse(value);
                              }}
                            />
                          );
                        }}
                      </ProFormDependency>
                    </ProFormList>
                  ),
                },
              ],
            }}
            title="配置菜单"
          />
        </ProForm>
      </ProCard>

      <div
        style={{
          marginTop: '20px',
          padding: '20px',
          backgroundColor: '#f5f5f5',
          borderRadius: '6px',
        }}
      >
        <h4>ProDescriptions 动态配置 Props 说明：</h4>
        <ul>
          <li>
            <strong>title</strong>: 描述列表标题，支持动态修改
          </li>
          <li>
            <strong>column</strong>: 列数，支持动态调整
          </li>
          <li>
            <strong>columns</strong>: 列配置数组，支持动态增删改
          </li>
          <li>
            <strong>request</strong>: 异步请求函数，返回数据
          </li>
        </ul>
        <h4>ProCard 布局配置：</h4>
        <ul>
          <li>
            <strong>variant</strong>: 卡片变体样式，'outlined' 表示带边框
          </li>
          <li>
            <strong>split</strong>: 分割方式，'vertical' 表示垂直分割
          </li>
          <li>
            <strong>headerBordered</strong>: 是否显示头部边框
          </li>
          <li>
            <strong>colSpan</strong>: 列跨度，支持 calc() 计算
          </li>
        </ul>
        <h4>ProForm 表单配置：</h4>
        <ul>
          <li>
            <strong>initialValues</strong>: 表单初始值
          </li>
          <li>
            <strong>onValuesChange</strong>: 值变化时的回调函数
          </li>
          <li>
            <strong>submitter</strong>: 提交按钮配置，false 表示不显示
          </li>
        </ul>
        <h4>基本配置选项：</h4>
        <ul>
          <li>
            <strong>layout</strong>: 布局方式，horizontal/vertical
          </li>
          <li>
            <strong>loading</strong>: 是否显示加载状态
          </li>
          <li>
            <strong>size</strong>: 尺寸，default/middle/small
          </li>
          <li>
            <strong>bordered</strong>: 是否显示边框
          </li>
        </ul>
        <h4>列配置选项：</h4>
        <ul>
          <li>
            <strong>title</strong>: 列标题
          </li>
          <li>
            <strong>span</strong>: 占据列数
          </li>
          <li>
            <strong>valueType</strong>: 值类型，支持多种类型
          </li>
          <li>
            <strong>dataIndex</strong>: 数据字段名
          </li>
          <li>
            <strong>valueEnum</strong>: 枚举值配置（仅 select 类型）
          </li>
        </ul>
        <h4>ProFormList 特点：</h4>
        <ul>
          <li>
            <strong>动态列表</strong>: 支持动态添加和删除列配置
          </li>
          <li>
            <strong>itemRender</strong>: 自定义列表项渲染
          </li>
          <li>
            <strong>creatorButtonProps</strong>: 创建按钮配置
          </li>
        </ul>
        <h4>ProFormDependency 依赖配置：</h4>
        <ul>
          <li>
            <strong>条件渲染</strong>: 根据 valueType 条件显示表单项
          </li>
          <li>
            <strong>JSON 解析</strong>: 自动解析和格式化 valueEnum
          </li>
          <li>
            <strong>实时更新</strong>: 依赖字段变化时实时更新
          </li>
        </ul>
        <h4>ValueType 支持类型：</h4>
        <ul>
          <li>
            <strong>基础类型</strong>: text, password, textarea, code
          </li>
          <li>
            <strong>数字类型</strong>: money, percent, digit, second
          </li>
          <li>
            <strong>日期类型</strong>: date, dateTime, time 等
          </li>
          <li>
            <strong>选择类型</strong>: select, checkbox, radio 等
          </li>
          <li>
            <strong>特殊类型</strong>: avatar, image, switch, progress 等
          </li>
        </ul>
        <h4>使用场景：</h4>
        <ul>
          <li>
            <strong>配置工具</strong>: 构建动态配置界面
          </li>
          <li>
            <strong>可视化编辑</strong>: 可视化编辑组件配置
          </li>
          <li>
            <strong>原型设计</strong>: 快速原型设计和验证
          </li>
          <li>
            <strong>调试工具</strong>: 调试和测试组件配置
          </li>
        </ul>
        <h4>最佳实践：</h4>
        <ul>
          <li>
            <strong>状态管理</strong>: 合理管理配置状态
          </li>
          <li>
            <strong>实时预览</strong>: 提供实时预览功能
          </li>
          <li>
            <strong>配置验证</strong>: 对配置进行验证
          </li>
          <li>
            <strong>用户体验</strong>: 提供直观的配置界面
          </li>
        </ul>
      </div>
    </>
  );
};
