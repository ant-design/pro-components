import { PlusOutlined } from '@ant-design/icons';
import { ModalForm, ProCard, ProForm, ProFormList, ProFormText } from '@xxlabs/pro-components';
import { Button } from 'antd';

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
      <ProFormText label="主合同编号" name="id" width="sm" />
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
            copyIconProps={false}
            creatorButtonProps={{
              creatorButtonText: '添加规格项',
            }}
            creatorRecord={{ name: '', items: [{ name: '' }] }}
            initialValue={[{ name: '颜色', items: [{ name: '红' }] }]}
            itemRender={({ listDom, action }, { index }) => (
              <ProCard
                bodyStyle={{ paddingBlockEnd: 0 }}
                extra={action}
                style={{ marginBlockEnd: 8 }}
                title={`规格${index + 1}`}
                variant="outlined"
              >
                {listDom}
              </ProCard>
            )}
            label="规格"
            min={1}
            name="attributes"
          >
            <ProFormText label="规格名" name="name" style={{ padding: 0 }} width="md" />
            <ProForm.Item isListField label="规格值" style={{ marginBlockEnd: 0 }}>
              <ProFormList
                copyIconProps={false}
                creatorButtonProps={{
                  creatorButtonText: '新建',
                  icon: false,
                  type: 'link',
                  style: { width: 'unset' },
                }}
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
                min={1}
                name="items"
              >
                <ProFormText allowClear={false} name={['name']} width="xs" />
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
