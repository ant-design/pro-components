import { FilterOutlined } from '@ant-design/icons';
import {
  LightFilter,
  ProFormCascader,
  ProFormCheckbox,
  ProFormDatePicker,
  ProFormRadio,
  ProFormSelect,
  ProFormTreeSelect,
} from '@xxlabs/pro-components';
import { TreeSelect } from 'antd';

const treeData = [
  {
    title: 'Node1',
    value: '0-0',
    key: '0-0',
    children: [
      {
        title: 'Child Node1',
        value: '0-0-0',
        key: '0-0-0',
      },
    ],
  },
  {
    title: 'Node2',
    value: '0-1',
    key: '0-1',
    children: [
      {
        title: 'Child Node3',
        value: '0-1-0',
        key: '0-1-0',
      },
      {
        title: 'Child Node4',
        value: '0-1-1',
        key: '0-1-1',
      },
      {
        title: 'Child Node5',
        value: '0-1-2',
        key: '0-1-2',
      },
    ],
  },
];

export default () => {
  return (
    <LightFilter
      collapseLabel={<FilterOutlined />}
      initialValues={{
        sex: 'man',
      }}
      variant="outlined"
      onFinish={async (values) => console.log(values)}
    >
      <ProFormSelect
        showSearch
        name="sex"
        placeholder="性别"
        valueEnum={{
          man: '男',
          woman: '女',
        }}
      />
      <ProFormRadio.Group
        name="radio"
        options={[
          {
            value: 'weekly',
            label: '每周',
          },
          {
            value: 'quarterly',
            label: '每季度',
          },
          {
            value: 'monthly',
            label: '每月',
          },
          {
            value: 'yearly',
            label: '每年',
          },
        ]}
        radioType="button"
      />
      <ProFormDatePicker name="time" placeholder="日期" />
      <ProFormTreeSelect
        fieldProps={{
          fieldNames: {
            label: 'title',
          },
          treeCheckable: true,
          showCheckedStrategy: TreeSelect.SHOW_PARENT,
          placeholder: 'Please select',
        }}
        name="treeSelect"
        request={async () => treeData}
      />
      <ProFormCheckbox.Group
        label="迁移类型"
        name="checkbox"
        options={['结构迁移', '全量迁移', '增量迁移', '全量校验']}
        width="lg"
      />
      <ProFormCascader
        name="area"
        request={async () => [
          {
            value: 'zhejiang',
            label: '浙江',
            children: [
              {
                value: 'hangzhou',
                label: '杭州',
                children: [
                  {
                    value: 'xihu',
                    label: '西湖',
                  },
                ],
              },
            ],
          },
          {
            value: 'jiangsu',
            label: 'Jiangsu',
            children: [
              {
                value: 'nanjing',
                label: 'Nanjing',
                children: [
                  {
                    value: 'zhonghuamen',
                    label: 'Zhong Hua Men',
                  },
                ],
              },
            ],
          },
        ]}
      />
    </LightFilter>
  );
};
