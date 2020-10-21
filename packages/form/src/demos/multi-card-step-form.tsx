import React from 'react';
import ProForm, {
  StepsForm,
  ProFormText,
  ProFormDatePicker,
  ProFormDateRangePicker,
  ProFormSelect,
  ProFormCheckbox,
  ProFormDigit,
} from '@ant-design/pro-form';

import ProCard from '@ant-design/pro-card';

const waitTime = (time: number = 100) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};

export default () => {
  return (
    <>
      <StepsForm
        onFinish={async (values) => console.log(values)}
        formProps={{
          validateMessages: {
            required: '此项为必填项',
          },
        }}
      >
        <StepsForm.StepForm
          name="base"
          title="第一步骤"
          onFinish={async () => {
            await waitTime(2000);
            return true;
          }}
        >
          <ProCard
            title="源和目标"
            bordered
            headerBordered
            collapsible
            style={{
              marginBottom: 16,
              minWidth: 920,
              maxWidth: '100%',
            }}
            bodyStyle={{
              padding: 24,
            }}
          >
            <ProFormText
              name="name"
              label="迁移任务名称"
              tooltip="最长为 24 位，用于标定的唯一 id"
              placeholder="请输入名称"
              rules={[{ required: true }]}
            />
            <ProForm.Group title="节点" size={8}>
              <ProFormSelect width="s" name="source" placeholder="选择来源节点" />
              <ProFormSelect width="s" name="target" placeholder="选择目标节点" />
            </ProForm.Group>
          </ProCard>

          <ProCard
            title="顶部对齐"
            bordered
            headerBordered
            collapsible
            style={{
              marginBottom: 16,
            }}
            bodyStyle={{
              padding: 24,
            }}
          >
            <ProFormDigit
              name="xs"
              label="XS号表单"
              initialValue={9999}
              tooltip="悬浮出现的气泡。"
              placeholder="请输入名称"
              width="xs"
            />
            <ProFormText name="s" label="S号表单" placeholder="请输入名称" width="s" />
            <ProFormDateRangePicker name="m" label="M 号表单" />
            <ProFormSelect
              name="l"
              label="L 号表单"
              fieldProps={{
                mode: 'tags',
              }}
              width="l"
              initialValue={['吴家豪', '周星星']}
              options={['吴家豪', '周星星', '陈拉风'].map((item) => ({
                label: item,
                value: item,
              }))}
            />
          </ProCard>
        </StepsForm.StepForm>
        <StepsForm.StepForm name="checkbox" title="第二步骤">
          <ProFormCheckbox.Group
            name="checkbox"
            label="迁移类型"
            width="l"
            options={['结构迁移', '全量迁移', '增量迁移', '全量校验']}
          />
          <ProForm.Group>
            <ProFormText name="dbname" label="业务 DB 用户名" />
            <ProFormDatePicker name="datetime" label="记录保存时间" width="s" />
            <ProFormCheckbox.Group
              name="checkbox"
              label="迁移类型"
              options={['完整 LOB', '不同步 LOB', '受限制 LOB']}
            />
          </ProForm.Group>
        </StepsForm.StepForm>
        <StepsForm.StepForm name="time" title="第三步骤">
          <ProFormCheckbox.Group
            name="checkbox"
            label="部署单元"
            rules={[
              {
                required: true,
              },
            ]}
            options={['部署单元1', '部署单元2', '部署单元3']}
          />
          <ProFormSelect
            label="部署分组策略"
            name="remark"
            rules={[
              {
                required: true,
              },
            ]}
            initialValue="1"
            options={[
              {
                value: '1',
                label: '策略一',
              },
              { value: '2', label: '策略二' },
            ]}
          />
          <ProFormSelect
            label="Pod 调度策略"
            name="remark2"
            initialValue="2"
            options={[
              {
                value: '1',
                label: '策略一',
              },
              { value: '2', label: '策略二' },
            ]}
          />
        </StepsForm.StepForm>
      </StepsForm>
    </>
  );
};
