import { ProCard, ProForm, ProFormList, ProFormText } from '@xxlabs/pro-components';

const Demo = () => {
  return (
    <ProForm
      layout="horizontal"
      onFinish={async (values) => {
        console.log(values);
        return true;
      }}
    >
      <ProFormText label="规格名" name="name" style={{ padding: 0 }} width="md" />
      <ProFormList
        copyIconProps={false}
        creatorButtonProps={{
          creatorButtonText: '添加规格项',
        }}
        creatorRecord={{ name: '', items: [{ name: '' }] }}
        initialValue={[{ name: '颜色', items: [{ name: '红' }, { name: '黄' }] }]}
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
          </ProFormList>
        </ProForm.Item>
      </ProFormList>
    </ProForm>
  );
};

export default Demo;
