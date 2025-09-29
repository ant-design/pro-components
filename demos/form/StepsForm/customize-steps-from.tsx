import {
  ProCard,
  ProForm,
  ProFormCheckbox,
  ProFormDatePicker,
  ProFormDateRangePicker,
  ProFormSelect,
  ProFormText,
  ProFormTextArea,
  StepsForm,
} from '@xxlabs/pro-components';
import { Button, message } from 'antd';

const waitTime = (time: number = 100) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};

export default () => {
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
        submitter={{
          render: (props) => {
            if (props.step === 0) {
              return (
                <Button type="primary" onClick={() => props.onSubmit?.()}>
                  去第二步 {'>'}
                </Button>
              );
            }

            if (props.step === 1) {
              return [
                <Button key="pre" onClick={() => props.onPre?.()}>
                  返回第一步
                </Button>,
                <Button key="goToTree" type="primary" onClick={() => props.onSubmit?.()}>
                  去第三步 {'>'}
                </Button>,
              ];
            }

            return [
              <Button key="gotoTwo" onClick={() => props.onPre?.()}>
                {'<'} 返回第二步
              </Button>,
              <Button key="goToTree" type="primary" onClick={() => props.onSubmit?.()}>
                提交 √
              </Button>,
            ];
          },
        }}
        onFinish={async (values) => {
          console.log(values);
          await waitTime(1000);
          message.success('提交成功');
        }}
      >
        <StepsForm.StepForm<{
          name: string;
        }>
          name="base"
          title="创建实验"
          onFinish={async ({ name }) => {
            console.log(name);
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
          title="设置参数"
        >
          <ProFormCheckbox.Group
            label="迁移类型"
            name="checkbox"
            options={['结构迁移', '全量迁移', '增量迁移', '全量校验']}
            width="lg"
          />
          <ProForm.Group>
            <ProFormText label="业务 DB 用户名" name="dbname" />
            <ProFormDatePicker label="记录保存时间" name="datetime" width="sm" />
            <ProFormCheckbox.Group
              label="迁移类型"
              name="checkbox"
              options={['完整 LOB', '不同步 LOB', '受限制 LOB']}
            />
          </ProForm.Group>
        </StepsForm.StepForm>
        <StepsForm.StepForm name="time" title="发布实验">
          <ProFormCheckbox.Group
            label="部署单元"
            name="checkbox"
            options={['部署单元1', '部署单元2', '部署单元3']}
            rules={[
              {
                required: true,
              },
            ]}
          />
          <ProFormSelect
            initialValue="1"
            label="部署分组策略"
            name="remark"
            options={[
              {
                value: '1',
                label: '策略一',
              },
              { value: '2', label: '策略二' },
            ]}
            rules={[
              {
                required: true,
              },
            ]}
          />
          <ProFormSelect
            initialValue="2"
            label="Pod 调度策略"
            name="remark2"
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
    </ProCard>
  );
};
