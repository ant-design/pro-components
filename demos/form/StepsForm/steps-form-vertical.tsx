import type { ProFormInstance } from '@xxlabs/pro-components';
import {
  ProCard,
  ProForm,
  ProFormCheckbox,
  ProFormDatePicker,
  ProFormDateRangePicker,
  ProFormText,
  ProFormTextArea,
  StepsForm,
} from '@xxlabs/pro-components';
import { message } from 'antd';
import { useRef } from 'react';

const waitTime = (time: number = 100) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};

export default () => {
  const formRef = useRef<ProFormInstance>(undefined);

  return (
    <ProCard>
      <StepsForm<{
        name: string;
      }>
        formProps={{
          validateMessages: {
            required: '此项为必填项',
          },
        }}
        formRef={formRef}
        stepsProps={{
          direction: 'vertical',
        }}
        onFinish={async () => {
          await waitTime(1000);
          message.success('提交成功');
        }}
      >
        <StepsForm.StepForm<{
          name: string;
        }>
          name="base"
          stepProps={{
            description: '这里填入的都是基本信息',
          }}
          title="创建实验"
          onFinish={async () => {
            console.log(formRef.current?.getFieldsValue());
            await waitTime(2000);
            return true;
          }}
        >
          <ProFormText
            label="实验名称"
            name="name"
            placeholder="请输入名称"
            rules={[{ required: true }]}
            tooltip="最长为 24 位，用于标定的唯一 id"
            width="md"
          />
          <ProFormDatePicker label="日期" name="date" />
          <ProFormDateRangePicker label="时间区间" name="dateTime" />
          <ProFormTextArea label="备注" name="remark" placeholder="请输入备注" width="lg" />
        </StepsForm.StepForm>
        <StepsForm.StepForm<{
          checkbox: string;
        }>
          name="checkbox"
          stepProps={{
            description: '这里填入运维参数',
          }}
          title="设置参数"
          onFinish={async () => {
            console.log(formRef.current?.getFieldsValue());
            return true;
          }}
        >
          <ProFormCheckbox.Group
            label="迁移类型"
            name="checkbox"
            options={['结构迁移', '全量迁移', '增量迁移', '全量校验', '增量校验', '全量替换', '增量替换']}
            width="lg"
          />
          <ProForm.Group>
            <ProFormText label="业务 DB 用户名" name="dbname" />
            <ProFormDatePicker label="记录保存时间" name="datetime" width="sm" />
          </ProForm.Group>
          <ProFormCheckbox.Group label="迁移类型" name="checkbox" options={['完整 LOB', '不同步 LOB', '受限制 LOB']} />
        </StepsForm.StepForm>
        <StepsForm.StepForm<{
          checkbox: string;
        }>
          name="step3"
          stepProps={{
            description: '这里填入运维参数',
          }}
          title="第三步"
          onFinish={async () => {
            console.log(formRef.current?.getFieldsValue());
            return true;
          }}
        >
          <ProFormCheckbox.Group
            label="迁移类型"
            name="checkbox"
            options={['结构迁移', '全量迁移', '全量校验', '增量替换']}
            width="lg"
          />
          <ProForm.Group>
            <ProFormText label="业务 DB 用户名" name="dbname" />
            <ProFormDatePicker label="记录保存时间" name="datetime" width="sm" />
          </ProForm.Group>
          <ProFormCheckbox.Group label="迁移类型" name="checkbox" options={['完整 LOB', '不同步 LOB', '受限制 LOB']} />
        </StepsForm.StepForm>
      </StepsForm>
    </ProCard>
  );
};
