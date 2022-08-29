import { Button, Card, Space } from 'antd';
import { ActionGuideContainer, ActionGuideItem } from '..';

export default () => {
  return (
    <ActionGuideContainer
      title={<div style={{ width: 230 }}>操作指引标题</div>}
      defaultIndex={1}
      paginationTheme="index"
      showPaginationSize={3}
    >
      <ActionGuideItem step={1} content="这是第一步的内容">
        <Card title="测试标题">
          <Space>
            <ActionGuideItem step={2} content="这是第二步的内容">
              <Button>测试按钮1</Button>
            </ActionGuideItem>
            <ActionGuideItem step={3} content="这是第三步的内容">
              <Button>测试按钮2</Button>
            </ActionGuideItem>
            <Button>测试按钮3</Button>

            <ActionGuideItem step={4} content="这是第四步的内容">
              <Button>测试按钮4</Button>
            </ActionGuideItem>
            <ActionGuideItem step={5} content="这是第五步的内容">
              <Button>测试按钮5</Button>
            </ActionGuideItem>

            <ActionGuideItem step={6} content="这是第六步的内容">
              <Button>测试按钮6</Button>
            </ActionGuideItem>
          </Space>
        </Card>
      </ActionGuideItem>
    </ActionGuideContainer>
  );
};
