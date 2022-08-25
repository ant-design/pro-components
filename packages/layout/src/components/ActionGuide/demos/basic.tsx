import { Button, Card, Space } from 'antd';
import { useEffect, useRef } from 'react';
import { ActionGuideContainer, ActionGuideItem } from '..';
import type { ActionGuideAction } from '../interface';

export default () => {
  const actionRef = useRef<ActionGuideAction>();
  const btnRef1 = useRef<HTMLElement>(null);
  const btnRef2 = useRef<HTMLElement>(null);
  const btnRef3 = useRef<HTMLElement>(null);
  const btnRef4 = useRef<HTMLElement>(null);
  const btnRef5 = useRef<HTMLElement>(null);
  const btnRef6 = useRef<HTMLElement>(null);

  useEffect(() => {
    setTimeout(() => {
      actionRef.current?.show(1);
    }, 1000);
  }, []);

  return (
    <>
      <ActionGuideContainer title="操作指引标题" actionRef={actionRef} paginationTheme="index">
        <ActionGuideItem step={1} content="这是第一步的内容">
          <Card title="测试标题">
            <Space>
              <ActionGuideItem step={2} content="这是第二步的内容">
                <Button ref={btnRef1}>测试按钮1</Button>
              </ActionGuideItem>
              <Button ref={btnRef2}>测试按钮2</Button>
              <Button ref={btnRef3}>测试按钮3</Button>
              <Button ref={btnRef4}>测试按钮4</Button>
              <Button ref={btnRef5}>测试按钮5</Button>
              <ActionGuideItem step={3} content="这是第三步的内容">
                <Button ref={btnRef6}>测试按钮6</Button>
              </ActionGuideItem>
            </Space>
          </Card>
        </ActionGuideItem>

        <Card title="测试标题2">
          <Space>
            <ActionGuideItem step={4} content="这是第四步的内容">
              <Button ref={btnRef1}>测试按钮1</Button>
            </ActionGuideItem>
            <Button ref={btnRef2}>测试按钮2</Button>
            <Button ref={btnRef3}>测试按钮3</Button>
            <Button ref={btnRef4}>测试按钮4</Button>
            <Button ref={btnRef5}>测试按钮5</Button>
            <ActionGuideItem step={5} content="这是最后一步的内容">
              <Button ref={btnRef6}>测试按钮6</Button>
            </ActionGuideItem>
          </Space>
        </Card>
      </ActionGuideContainer>
    </>
  );
};
