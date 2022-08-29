import { Button, Card, Space } from 'antd';
import type { ReactNode } from 'react';
import { ActionGuideContainer, ActionGuideItem } from '..';

export default () => {
  return (
    <>
      <ActionGuideContainer
        title={<div style={{ width: 300 }}>操作指引标题</div>}
        defaultIndex={1}
        renderButton={({ curIdx, total, next, skip }) => {
          const res: ReactNode[] = [];
          if (curIdx < total) {
            res.push(
              <Button key="nextBtn" type="primary" size="small" onClick={() => next()}>
                下一步({curIdx}/{total})
              </Button>,
              <Button key="skipBtn" type="text" size="small" danger onClick={() => skip()}>
                跳过
              </Button>,
            );
          } else {
            res.push(
              <Button key="close" type="primary" size="small" danger onClick={() => skip()}>
                知道了
              </Button>,
            );
          }
          return res;
        }}
      >
        <ActionGuideItem step={1} content="这是第一步的内容">
          <Card title="测试标题">
            <Space>
              <ActionGuideItem step={2} content="这是第二步的内容">
                <Button>测试按钮1</Button>
              </ActionGuideItem>
              <Button>测试按钮2</Button>
              <Button>测试按钮3</Button>
              <Button>测试按钮4</Button>
              <Button>测试按钮5</Button>
              <ActionGuideItem step={3} content="这是第三步的内容">
                <Button>测试按钮6</Button>
              </ActionGuideItem>
            </Space>
          </Card>
        </ActionGuideItem>
      </ActionGuideContainer>
    </>
  );
};
