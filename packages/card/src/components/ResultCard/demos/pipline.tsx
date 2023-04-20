import { ResultCard } from '@ant-design/pro-components';
import { Button } from 'antd';

export default () => {
  return (
    <ResultCard
      style={{
        margin: '20px',
      }}
      pipline={{
        current: 2,
        items: [
          {
            id: 0,
            title: '提交申请',
            description: '这里是描述文案222这里是描述文案222',
          },
          {
            id: 1,
            title: '团队审批',
            description: '这里是描述文案222这里是描述文案222',
          },
          {
            id: 2,
            title: 'HR 审批',
            description: '这里是描述文案222这里是描述文案222',
          },
          {
            id: 3,
            title: '财务审批',
            description: '这里是描述文案222这里是描述文案222',
          },
          {
            id: 4,
            title: '完成审批',
            description: '这里是描述文案222这里是描述文案222',
          },
        ],
      }}
      result={{
        status: 'success',
        title: '应用引擎创建成功',
        subTitle: '安全负责人审批中，通过后即可使用',
        extra: [<Button type="primary">立即部署</Button>, <Button>返回列表</Button>],
      }}
    />
  );
};
