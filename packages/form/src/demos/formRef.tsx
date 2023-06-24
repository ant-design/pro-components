import type { ProFormInstance } from '@ant-design/pro-components';
import {
  ProForm,
  ProFormDatePicker,
  ProFormText,
} from '@ant-design/pro-components';
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
  const formRef = useRef<ProFormInstance>();
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
    console.log(
      '格式化后的所有数据：',
      formRef.current?.getFieldsFormatValue?.(),
    );
  };

  const validateAndGetFormatValue = () => {
    formRef.current?.validateFieldsReturnFormatValue?.().then((values) => {
      console.log('校验表单并返回格式化后的所有数据：', values);
    });
  };

  return (
    <ProForm
      title="新建表单"
      formRef={formRef}
      submitter={{
        render: (props, doms) => {
          return [
            ...doms,
            <Button htmlType="button" onClick={onFill} key="edit">
              一键填写
            </Button>,
            <Button htmlType="button" onClick={getCompanyName} key="read">
              读取公司
            </Button>,
            <Button.Group key="refs" style={{ display: 'block' }}>
              <Button htmlType="button" onClick={getFormatValues} key="format">
                获取格式化后的所有数据
              </Button>
              <Button
                htmlType="button"
                onClick={validateAndGetFormatValue}
                key="format2"
              >
                校验表单并返回格式化后的所有数据
              </Button>
            </Button.Group>,
          ];
        },
      }}
      onFinish={async (values) => {
        await waitTime(2000);
        console.log(values);
        message.success('提交成功');
        return true;
      }}
    >
      <ProFormText
        width="md"
        name="name"
        label="签约客户名称"
        tooltip="最长为 24 位"
        placeholder="请输入名称"
      />

      <ProFormText
        width="md"
        name="company"
        label="我方公司名称"
        placeholder="请输入名称"
      />
      <ProFormDatePicker name="date" initialValue={dayjs('2021-08-09')} />
    </ProForm>
  );
};
