import type { ActionGuideAction } from '@ant-design/pro-layout';
import { ActionGuideContainer, ActionGuideItem } from '@ant-design/pro-layout';
import { fireEvent, render } from '@testing-library/react';
import { Button, Card, Space } from 'antd';
import type { ReactNode } from 'react';
import { useEffect, useRef } from 'react';
import { act } from 'react-dom/test-utils';
import { waitForComponentToPaint } from '../util';

describe('ActionGuide test', () => {
  it('🐯 should show guide when call show', async () => {
    const change = jest.fn();
    function App() {
      const actionRef = useRef<ActionGuideAction>();

      useEffect(() => {
        actionRef.current?.show(1);
      }, []);

      return (
        <>
          <Button onClick={() => actionRef.current?.show('first')}>第一页</Button>
          <Button onClick={() => actionRef.current?.show('last')}>最后一页</Button>
          <ActionGuideContainer
            title={<div>操作指引标题</div>}
            actionRef={actionRef}
            paginationTheme="dot"
            onChange={async ({ curIdx }) => {
              change(curIdx);
              return true;
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
    }

    const html = render(<App />);
    await waitForComponentToPaint(html, 300);
    expect((await html.findAllByText('这是第一步的内容')).length).toBe(1);
    expect(change).toBeCalledWith(1);
    await act(async () => {
      await fireEvent.click(await html.findByText('最后一页'));
    });
    await waitForComponentToPaint(html, 300);
    expect((await html.findAllByText('这是第三步的内容')).length).toBe(1);
    expect(change).toBeCalledWith(3);

    await act(async () => {
      await fireEvent.click(await html.findByText('我知道了'));
    });
    await waitForComponentToPaint(html, 300);
    expect((await html.baseElement.querySelectorAll('.ant-popover')).length).toBe(0);
    await act(async () => {
      await fireEvent.click(await html.findByText('第一页'));
    });
    await waitForComponentToPaint(html, 300);
    expect((await html.findAllByText('这是第一步的内容')).length).toBe(1);
    expect(change).toBeCalledWith(1);
  });
  it("🐯 should not change guide's step when call show with return false", async () => {
    const change = jest.fn();
    function App() {
      const actionRef = useRef<ActionGuideAction>();

      useEffect(() => {
        actionRef.current?.show(2);
      }, []);

      return (
        <ActionGuideContainer
          title={(idx) => <div>操作指引标题{idx}</div>}
          curShadow="0 0 15px red"
          actionRef={actionRef}
          defaultIndex={1}
          paginationTheme="dot"
          onChange={async ({ curIdx }) => {
            change(curIdx);
            return false;
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
                <ActionGuideItem step={3} content={(idx) => <div>这是第三步的内容{idx}</div>}>
                  <Button>测试按钮6</Button>
                </ActionGuideItem>
              </Space>
            </Card>
          </ActionGuideItem>
        </ActionGuideContainer>
      );
    }

    const html = render(<App />);
    await waitForComponentToPaint(html, 300);
    expect((await html.findAllByText('这是第一步的内容')).length).toBe(1);
    expect(change).toBeCalledWith(2);
  });
  it('🐯 should open default step when defaultIndex is not undefined', async () => {
    const change = jest.fn();
    function App() {
      return (
        <ActionGuideContainer
          title={<div>操作指引标题</div>}
          defaultIndex={2}
          paginationTheme="dot"
          onChange={async ({ curIdx }) => {
            change(curIdx);
            return false;
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
      );
    }

    const html = render(<App />);
    await waitForComponentToPaint(html, 300);
    expect((await html.findAllByText('这是第二步的内容')).length).toBe(1);
    expect(change).toBeCalledTimes(0);
  });
  it('🐯 change step when trigger next button', async () => {
    const change = jest.fn();
    function App() {
      return (
        <ActionGuideContainer
          paginationTheme="dot"
          defaultIndex={1}
          onChange={async ({ curIdx }) => {
            change(curIdx);
            return true;
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
      );
    }

    const html = render(<App />);
    await waitForComponentToPaint(html, 300);
    expect((await html.findAllByText('这是第一步的内容')).length).toBe(1);
    expect(change).toBeCalledTimes(0);
    await act(async () => {
      await fireEvent.click(await html.findByText('下一步'));
    });
    await waitForComponentToPaint(html, 300);
    expect((await html.findAllByText('这是第二步的内容')).length).toBe(1);
    expect(change).toBeCalledWith(2);
  });
  it('🐯 close action guide when trigger skip button', async () => {
    const change = jest.fn();
    function App() {
      return (
        <ActionGuideContainer
          title={<div>操作指引标题</div>}
          paginationTheme="dot"
          canSkip
          defaultIndex={1}
          onChange={async ({ curIdx }) => {
            change(curIdx);
            return true;
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
      );
    }

    const html = render(<App />);
    await waitForComponentToPaint(html, 300);
    expect((await html.findAllByText('这是第一步的内容')).length).toBe(1);
    expect(change).toBeCalledTimes(0);
    expect(html.baseElement.querySelectorAll('.ant-popover').length).toBe(1);
    await act(async () => {
      await fireEvent.click(html.baseElement.querySelector('.skipBtn')!);
    });
    await waitForComponentToPaint(html, 300);
    expect(html.baseElement.querySelectorAll('.ant-popover').length).toBe(0);
    expect(change).toBeCalledTimes(0);
  });
  it('🐯 paginationTheme', async () => {
    function App(props: { theme: 'dot' | 'index' }) {
      return (
        <ActionGuideContainer
          title={<div>操作指引标题</div>}
          paginationTheme={props.theme}
          defaultIndex={1}
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
      );
    }

    const html = render(<App theme="dot" />);
    await waitForComponentToPaint(html, 300);
    expect((await html.baseElement.querySelectorAll('.theme-dot')).length).toBe(1);
    expect((await html.baseElement.querySelectorAll('.theme-index')).length).toBe(0);
    html.unmount();

    const html2 = render(<App theme="index" />);
    await waitForComponentToPaint(html2, 300);
    expect((await html2.baseElement.querySelectorAll('.theme-dot')).length).toBe(0);
    expect((await html2.baseElement.querySelectorAll('.theme-index')).length).toBe(1);
    html2.unmount();
  });
  it('🐯 paginationTheme', async () => {
    const change = jest.fn();
    const change2 = jest.fn();
    function App(props: { clickabled: boolean }) {
      return (
        <ActionGuideContainer
          title={<div>操作指引标题</div>}
          paginationTheme={'index'}
          paginationClickabled={props.clickabled}
          defaultIndex={1}
          onChange={async ({ curIdx }) => {
            if (props.clickabled) {
              change(curIdx);
            } else {
              change2(curIdx);
            }

            return true;
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
      );
    }

    const html = render(<App clickabled />);
    await waitForComponentToPaint(html, 300);
    await act(async () => {
      fireEvent.click(html.baseElement.querySelectorAll('.pagination-item')[1]);
    });
    expect((await html.findAllByText('这是第二步的内容')).length).toBe(1);
    expect(html.baseElement.querySelector('.pagination-item.cur')?.innerHTML).toBe('2');
    expect(change).toBeCalledWith(2);
    html.unmount();

    const html2 = render(<App clickabled={false} />);
    await waitForComponentToPaint(html2, 300);
    await act(async () => {
      fireEvent.click(html2.baseElement.querySelectorAll('.pagination-item')[1]);
    });
    expect((await html2.findAllByText('这是第一步的内容')).length).toBe(1);
    expect(html2.baseElement.querySelector('.pagination-item.cur')?.innerHTML).toBe('1');
    expect(change2).toBeCalledTimes(0);
    html2.unmount();
  });
  it('🐯 showPaginationSize', async () => {
    function App() {
      return (
        <ActionGuideContainer
          title={<div>操作指引标题</div>}
          paginationTheme={'index'}
          defaultIndex={1}
          showPaginationSize={4}
        >
          <ActionGuideItem step={1} content="这是第一步的内容">
            <Card title="测试标题">
              <Space>
                <ActionGuideItem step={2} content="这是第二步的内容">
                  <Button>测试按钮1</Button>
                </ActionGuideItem>
                <Button>测试按钮2</Button>
                <ActionGuideItem step={3} content="这是第三步的内容">
                  <Button>测试按钮3</Button>
                </ActionGuideItem>
                <ActionGuideItem step={4} content="这是第四步的内容">
                  <Button>测试按钮4</Button>
                </ActionGuideItem>
                <Button>测试按钮5</Button>
                <ActionGuideItem step={5} content="这是第五步的内容">
                  <Button>测试按钮6</Button>
                </ActionGuideItem>
              </Space>
            </Card>
          </ActionGuideItem>
        </ActionGuideContainer>
      );
    }

    const html = render(<App />);
    await waitForComponentToPaint(html, 300);
    expect(html.baseElement.querySelectorAll('.pagination-item').length).toBe(4);

    await act(async () => {
      fireEvent.click(html.baseElement.querySelectorAll('.pagination-item')[3]);
    });
    await waitForComponentToPaint(html, 300);
    expect(html.baseElement.querySelector('.pagination-item.cur')?.textContent).toBe('4');
    html.unmount();
  });
  it('🐯 do not show pagination', async () => {
    function App() {
      return (
        <ActionGuideContainer title={<div>操作指引标题</div>} pagination={false} defaultIndex={1}>
          <ActionGuideItem step={1} content="这是第一步的内容">
            <Card title="测试标题">
              <Space>
                <ActionGuideItem step={2} content="这是第二步的内容">
                  <Button>测试按钮1</Button>
                </ActionGuideItem>
                <Button>测试按钮2</Button>
                <ActionGuideItem step={3} content="这是第三步的内容">
                  <Button>测试按钮3</Button>
                </ActionGuideItem>
                <ActionGuideItem step={4} content="这是第四步的内容">
                  <Button>测试按钮4</Button>
                </ActionGuideItem>
                <Button>测试按钮5</Button>
                <ActionGuideItem step={5} content="这是第五步的内容">
                  <Button>测试按钮6</Button>
                </ActionGuideItem>
              </Space>
            </Card>
          </ActionGuideItem>
        </ActionGuideContainer>
      );
    }

    const html = render(<App />);
    await waitForComponentToPaint(html, 300);
    expect(html.baseElement.querySelectorAll('.pagination-item').length).toBe(0);
    html.unmount();
  });
  it('🐯 custom pagination', async () => {
    function App() {
      return (
        <ActionGuideContainer
          title={<div>操作指引标题</div>}
          pagination={(idx, total) => (
            <div>
              <Button type="link" className="custom-pagination-cur">
                {idx}
              </Button>
              /
              <Button className="custom-pagination-total" type="link">
                {total}
              </Button>
            </div>
          )}
          defaultIndex={1}
        >
          <ActionGuideItem step={1} content="这是第一步的内容">
            <Card title="测试标题">
              <Space>
                <ActionGuideItem step={2} content="这是第二步的内容">
                  <Button>测试按钮1</Button>
                </ActionGuideItem>
                <Button>测试按钮2</Button>
                <ActionGuideItem step={3} content="这是第三步的内容">
                  <Button>测试按钮3</Button>
                </ActionGuideItem>
                <ActionGuideItem step={4} content="这是第四步的内容">
                  <Button>测试按钮4</Button>
                </ActionGuideItem>
                <Button>测试按钮5</Button>
                <ActionGuideItem step={5} content="这是第五步的内容">
                  <Button>测试按钮6</Button>
                </ActionGuideItem>
              </Space>
            </Card>
          </ActionGuideItem>
        </ActionGuideContainer>
      );
    }

    const html = render(<App />);
    await waitForComponentToPaint(html, 300);

    expect(html.baseElement.querySelectorAll('.custom-pagination-cur').length).toBe(1);
    expect(html.baseElement.querySelectorAll('.custom-pagination-total').length).toBe(1);
    html.unmount();
  });
  it('🐯 show mask', async () => {
    function App(props: { mask: boolean }) {
      return (
        <ActionGuideContainer
          title={<div>操作指引标题</div>}
          paginationTheme={'index'}
          mask={props.mask}
          defaultIndex={1}
          curShadow={false}
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
      );
    }

    const html = render(<App mask />);
    await waitForComponentToPaint(html, 300);

    expect(html.baseElement.querySelectorAll('.ant-pro-action-guide-mask').length).toBe(1);
    html.unmount();

    const html2 = render(<App mask={false} />);
    await waitForComponentToPaint(html2, 300);
    expect(html.baseElement.querySelectorAll('.ant-pro-action-guide-mask').length).toBe(0);
    html.unmount();
  });
  it('🐯 render custom button', async () => {
    function App() {
      return (
        <ActionGuideContainer
          title={<div>操作指引标题</div>}
          paginationTheme={'index'}
          renderButton={({ curIdx, total, next, skip }) => {
            const res: ReactNode[] = [];
            if (curIdx < total) {
              res.push(
                <Button
                  key="nextBtn"
                  className="nextBtn"
                  type="primary"
                  size="small"
                  onClick={() => next()}
                >
                  下一步({curIdx}/{total})
                </Button>,
                <Button
                  key="skipBtn"
                  type="text"
                  className="skipBtn"
                  size="small"
                  danger
                  onClick={() => skip()}
                >
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
          defaultIndex={1}
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
      );
    }

    const html = render(<App />);
    await waitForComponentToPaint(html, 300);

    expect(html.baseElement.querySelector('.nextBtn')?.textContent).toBe('下一步(1/3)');
    await act(async () => {
      await fireEvent.click(html.baseElement.querySelector('.nextBtn')!);
    });
    await waitForComponentToPaint(html, 300);
    expect(html.baseElement.querySelector('.nextBtn')?.textContent).toBe('下一步(2/3)');
    expect((await html.findAllByText('这是第二步的内容')).length).toBe(1);
    await act(async () => {
      await fireEvent.click(html.baseElement.querySelector('.skipBtn')!);
    });
    await waitForComponentToPaint(html, 300);
    expect(html.baseElement.querySelectorAll('.ant-popover').length).toBe(0);
    html.unmount();
  });
  it('🐯 support popover props', async () => {
    function App() {
      return (
        <ActionGuideContainer
          title={<div>操作指引标题</div>}
          paginationTheme={'index'}
          popoverProps={{
            color: 'orange',
          }}
          defaultIndex={1}
        >
          <ActionGuideItem step={1} content="这是第一步的内容">
            <Card title="测试标题">
              <Space>
                <ActionGuideItem
                  step={2}
                  content="这是第二步的内容"
                  popoverProps={{ color: 'blue' }}
                >
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
      );
    }

    const html = render(<App />);
    await waitForComponentToPaint(html, 300);

    expect(html.baseElement.querySelectorAll('.ant-popover-orange').length).toBe(1);
    await act(async () => {
      await fireEvent.click(html.baseElement.querySelector('.nextBtn')!);
    });
    await waitForComponentToPaint(html, 300);
    expect(html.baseElement.querySelectorAll('.ant-popover-orange').length).toBe(0);
    expect(html.baseElement.querySelectorAll('.ant-popover-blue').length).toBe(1);
    await act(async () => {
      await fireEvent.click(html.baseElement.querySelector('.nextBtn')!);
    });
    await waitForComponentToPaint(html, 300);
    expect(html.baseElement.querySelectorAll('.ant-popover-orange').length).toBe(1);
    expect(html.baseElement.querySelectorAll('.ant-popover-blue').length).toBe(0);
    html.unmount();
  });
});
