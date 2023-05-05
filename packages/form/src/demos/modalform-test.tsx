import React from 'react';
import { Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import {
  ProCard,
  ProForm,
  ProFormList,
  ProFormText,
  ModalForm,
} from '@ant-design/pro-components';

// 弹窗表单
const FormModal = () => {
  return (
    <ModalForm<{
      name: string;
      company: string;
    }>
      title="新建表单"
      trigger={
        <Button type="primary">
          <PlusOutlined />
          新建表单
        </Button>
      }
      onFinish={async (values) => {
        console.log(values);
        alert(JSON.stringify(values));
        return true;
      }}
    >
      <ProFormText width="sm" name="id" label="主合同编号" />
    </ModalForm>
  );
};

const Demo = () => {
  return (
    <div>
      <div>
        在form外边可以
        <FormModal />
      </div>
      <div>
        在form里面可以
        <ProForm layout="horizontal">
          <FormModal />
          <ProFormList
            name="attributes"
            label="规格"
            creatorButtonProps={{
              creatorButtonText: '添加规格项',
            }}
            min={1}
            copyIconProps={false}
            itemRender={({ listDom, action }, { index }) => (
              <ProCard
                bordered
                style={{ marginBlockEnd: 8 }}
                title={`规格${index + 1}`}
                extra={action}
                bodyStyle={{ paddingBlockEnd: 0 }}
              >
                {listDom}
              </ProCard>
            )}
            creatorRecord={{ name: '', items: [{ name: '' }] }}
            initialValue={[{ name: '颜色', items: [{ name: '红' }] }]}
          >
            <ProFormText
              style={{ padding: 0 }}
              width="md"
              name="name"
              label="规格名"
            />
            <ProForm.Item
              isListField
              style={{ marginBlockEnd: 0 }}
              label="规格值"
            >
              <ProFormList
                name="items"
                creatorButtonProps={{
                  creatorButtonText: '新建',
                  icon: false,
                  type: 'link',
                  style: { width: 'unset' },
                }}
                min={1}
                copyIconProps={false}
                deleteIconProps={{ tooltipText: '删除' }}
                itemRender={({ listDom, action }) => (
                  <div
                    style={{
                      display: 'inline-flex',
                      marginInlineEnd: 25,
                    }}
                  >
                    {listDom}
                    {action}
                  </div>
                )}
              >
                <ProFormText allowClear={false} width="xs" name={['name']} />
                <div>
                  在内层formlist拿不到
                  <FormModal />
                </div>
              </ProFormList>
            </ProForm.Item>
            <div>
              在外层formlist拿不到
              <FormModal />
            </div>
          </ProFormList>
        </ProForm>
      </div>
    </div>
  );
};

export default Demo;
