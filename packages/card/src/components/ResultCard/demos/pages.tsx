import { PageContainer, ResultCard } from '@ant-design/pro-components';
import { Button } from 'antd';

export default () => {
  return (
    <PageContainer
      header={{
        title: '页面标题',
        ghost: true,
        breadcrumb: {
          items: [
            {
              path: '',
              title: '一级页面',
            },
            {
              path: '',
              title: '二级页面',
            },
            {
              path: '',
              title: '当前页面',
            },
          ],
        },
      }}
      tabBarExtraContent="测试tabBarExtraContent"
      tabList={[
        {
          tab: '基本信息',
          key: 'base',
          closable: false,
        },
        {
          tab: '详细信息',
          key: 'info',
        },
      ]}
      tabProps={{
        type: 'editable-card',
        hideAdd: true,
        onEdit: (e, action) => console.log(e, action),
      }}
      footer={[
        <Button key="3">重置</Button>,
        <Button key="2" type="primary">
          提交
        </Button>,
      ]}
    >
      <ResultCard
        mode='pages'
        result={{
          status: 'success',
          title: '应用引擎创建成功',
          subTitle: '安全负责人审批中，通过后即可使用',
          extra: [<Button type="primary">立即部署</Button>, <Button>返回列表</Button>],
        }}
      />
    </PageContainer>
  );
};
