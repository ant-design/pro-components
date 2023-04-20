import { ResultCard } from '@ant-design/pro-components';
import { Button } from 'antd';

export default () => {
  return (
    <ResultCard
      style={{
        margin: '20px',
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
