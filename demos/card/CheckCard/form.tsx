import { CheckCard } from '@ant-design/pro-components';
import { Avatar, Button, Form } from 'antd';

export default () => {
  const [form] = Form.useForm();
  const handleSubmit = async (values: any) => {
    console.log('values', values);
  };

  return (
    <>
      <div>
        <Form form={form} onFinish={handleSubmit} layout="vertical">
          <Form.Item name="checkbox-group" label="技术栈">
            <CheckCard.Group style={{ width: '100%' }}>
              <CheckCard
                title="Spring Boot"
                avatar={
                  <Avatar
                    src="https://gw.alipayobjects.com/zos/bmw-prod/2dd637c7-5f50-4d89-a819-33b3d6da73b6.svg"
                    size="large"
                  />
                }
                description="通过业界流行的技术栈来快速构建 Java 后端应用"
                value="SpringBoot"
              />
              <CheckCard
                title="SOFA Boot"
                avatar={
                  <Avatar
                    src="https://gw.alipayobjects.com/zos/bmw-prod/6935b98e-96f6-464f-9d4f-215b917c6548.svg"
                    size="large"
                  />
                }
                description="使用 SOFAStack 中间件来快速构建分布式后端应用"
                value="SOFABoot"
              />
              <CheckCard
                title="Node JS"
                avatar={
                  <Avatar
                    src="https://gw.alipayobjects.com/zos/bmw-prod/d12c3392-61fa-489e-a82c-71de0f888a8e.svg"
                    size="large"
                  />
                }
                description="使用前后端统一的语言方案快速构建后端应用"
                value="NodeJS"
              />
            </CheckCard.Group>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>

      <div
        style={{
          marginTop: '20px',
          padding: '20px',
          backgroundColor: '#f5f5f5',
          borderRadius: '6px',
        }}
      >
        <h4>CheckCard 与 Form 集成说明：</h4>
        <ul>
          <li>
            <strong>Form.Item</strong>: 将 CheckCard.Group 包装在 Form.Item
            中作为表单控件
          </li>
          <li>
            <strong>name</strong>: Form.Item 的 name 属性用于标识表单字段
          </li>
          <li>
            <strong>value</strong>: CheckCard 的 value 属性作为选项值
          </li>
        </ul>
        <h4>Form 相关 Props：</h4>
        <ul>
          <li>
            <strong>form</strong>: Form 实例，通过 Form.useForm() 创建
          </li>
          <li>
            <strong>onFinish</strong>: 表单提交完成时的回调函数
          </li>
          <li>
            <strong>layout</strong>: 表单布局方式，'vertical' 表示垂直布局
          </li>
        </ul>
        <h4>CheckCard.Group 在表单中的特点：</h4>
        <ul>
          <li>
            <strong>自动绑定</strong>: 自动与 Form 的 name 字段绑定
          </li>
          <li>
            <strong>值收集</strong>: 选中的 CheckCard 的 value
            会自动收集到表单数据中
          </li>
          <li>
            <strong>验证支持</strong>: 支持 Form 的验证规则
          </li>
          <li>
            <strong>样式适配</strong>: 可以通过 style 属性适配表单布局
          </li>
        </ul>
        <h4>Avatar 组件 Props：</h4>
        <ul>
          <li>
            <strong>src</strong>: 头像图片地址
          </li>
          <li>
            <strong>size</strong>: 头像尺寸，'large' 表示大尺寸
          </li>
        </ul>
      </div>
    </>
  );
};
