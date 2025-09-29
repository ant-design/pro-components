import type { ProFormInstance } from '@xxlabs/pro-components';
import { ProForm, ProFormDatePicker, ProFormText } from '@xxlabs/pro-components';
import { Button, message } from 'antd';
import dayjs from 'dayjs';
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
  const onFill = () => {
    formRef?.current?.setFieldsValue({
      name: '张三',
      company: '蚂蚁金服',
    });
  };

  const getCompanyName = () => {
    message.info(`公司名称为 "${formRef?.current?.getFieldValue('company')}"`);
  };

  const getFormatValues = () => {
    console.log('格式化后的所有数据：', formRef.current?.getFieldsFormatValue?.());
  };

  const validateAndGetFormatValue = () => {
    formRef.current?.validateFieldsReturnFormatValue?.().then((values) => {
      console.log('校验表单并返回格式化后的所有数据：', values);
    });
  };

  return (
    <ProForm
      formRef={formRef}
      submitter={{
        render: (props, doms) => {
          return [
            ...doms,
            <Button key="edit" htmlType="button" onClick={onFill}>
              一键填写
            </Button>,
            <Button key="read" htmlType="button" onClick={getCompanyName}>
              读取公司
            </Button>,
            <Button.Group key="refs" style={{ display: 'block' }}>
              <Button key="format" htmlType="button" onClick={getFormatValues}>
                获取格式化后的所有数据
              </Button>
              <Button key="format2" htmlType="button" onClick={validateAndGetFormatValue}>
                校验表单并返回格式化后的所有数据
              </Button>
            </Button.Group>,
          ];
        },
      }}
      title="新建表单"
      onFinish={async (values) => {
        await waitTime(2000);
        console.log(values);
        message.success('提交成功');
        return true;
      }}
    >
      <ProFormText label="签约客户名称" name="name" placeholder="请输入名称" tooltip="最长为 24 位" width="md" />

      <ProFormText label="我方公司名称" name="company" placeholder="请输入名称" width="md" />
      <ProFormDatePicker initialValue={dayjs('2021-08-09')} name="date" />
    </ProForm>
  );
};
