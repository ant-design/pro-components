import { Button, Card, Space } from 'antd';
import type { ReactNode } from 'react';
import { useRef } from 'react';
import { ActionGuideContainer, ActionGuideItem } from '..';
import PageContainer from '../../PageContainer';
import type { ActionGuideAction } from '../interface';

export default () => {
  const actionRef = useRef<ActionGuideAction>();

  return (
    <>
      <Space>
        <Button onClick={() => actionRef.current?.show('first')}>显示第一页操作指引</Button>
        <Button onClick={() => actionRef.current?.show('last')}>最后一页</Button>
      </Space>
      <ActionGuideContainer
        title={<div style={{ width: 230 }}>操作指引标题</div>}
        actionRef={actionRef}
        paginationTheme="index"
        showPaginationSize={3}
        mask
        canSkip
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
        <PageContainer
          style={{ width: '90%', margin: '0 auto' }}
          content={
            <ActionGuideItem
              step={8}
              content={
                <h2 style={{ color: 'red', padding: '30px 0', fontSize: 36 }}>这是第八步的内容</h2>
              }
            >
              <div style={{ background: '#fff' }}>欢迎使用 ProLayout 组件</div>
            </ActionGuideItem>
          }
          tabList={[
            {
              tab: '基本信息',
              key: 'base',
            },
            {
              tab: '详细信息',
              key: 'info',
            },
          ]}
          extra={[
            <Button key="3">操作</Button>,
            <Button key="2">操作</Button>,
            <ActionGuideItem key={1} step={9} content="这是第九步的内容">
              <Button key="1" type="primary">
                主操作
              </Button>
            </ActionGuideItem>,
          ]}
          footer={[
            <ActionGuideItem key="reset" step={10} content="最后一步内容">
              <Button key="rest">重置</Button>
            </ActionGuideItem>,
            <Button key="submit" type="primary">
              提交
            </Button>,
          ]}
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

          <Card title="测试标题2">
            <Space>
              <ActionGuideItem step={4} content="这是第四步的内容">
                <Button>测试按钮1</Button>
              </ActionGuideItem>
              <Button>测试按钮2</Button>
              <Button>测试按钮3</Button>
              <Button>测试按钮4</Button>
              <Button>测试按钮5</Button>
              <ActionGuideItem step={5} content="这是最五步的内容">
                <Button>测试按钮6</Button>
              </ActionGuideItem>
            </Space>
          </Card>
          <Card title="测试标题3">
            <Space>
              <ActionGuideItem step={6} content="这是第六步的内容">
                <Button>测试按钮1</Button>
              </ActionGuideItem>
              <Button>测试按钮2</Button>
              <Button>测试按钮3</Button>
              <Button>测试按钮4</Button>
              <Button>测试按钮5</Button>
              <ActionGuideItem step={7} content="这是最七步的内容">
                <Button>测试按钮6</Button>
              </ActionGuideItem>
            </Space>
          </Card>
        </PageContainer>
      </ActionGuideContainer>
    </>
  );
};
