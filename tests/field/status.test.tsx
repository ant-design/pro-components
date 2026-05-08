import { ProField as Field } from '@ant-design/pro-components';
import { cleanup, render } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';

afterEach(() => {
  cleanup();
});

describe('Field Status', () => {
  afterEach(() => {
    cleanup();
  });
  const statusList = [
    'Success',
    'Error',
    'Processing',
    'Default',
    'Warning',
    'success',
    'error',
    'processing',
    'default',
    'warning',
  ];
  statusList.forEach((status) => {
    it(`🥩 ${status} render`, async () => {
      const { container } = render(
        <Field
          text="open"
          valueEnum={{
            open: {
              text: '未解决',
              status,
            },
          }}
          mode="read"
        />,
      );
      // status 模式下应渲染 badge 状态点 + 文本
      expect(container.querySelector('.ant-badge-status')).toBeTruthy();
      // 文本内容应正确渲染（去除 antd 在中文间插入的空格）
      expect(container.textContent?.replace(/\s/g, '')).toContain('未解决');
      // status 类（小写）应附加到 badge dot 上
      const dot = container.querySelector('.ant-badge-status-dot');
      expect(dot?.className.toLowerCase()).toContain(status.toLowerCase());
    });
  });

  it(`🥩 red color render`, async () => {
    const { container } = render(
      <Field
        text="open"
        valueEnum={{
          open: {
            text: '未解决',
            color: 'red',
          },
        }}
        mode="read"
      />,
    );
    // 自定义 color='red' 时应渲染 badge-status-dot，并附加 ant-badge-color-red 类
    const dot = container.querySelector<HTMLElement>('.ant-badge-status-dot');
    expect(dot).toBeTruthy();
    expect(dot?.classList.contains('ant-badge-color-red')).toBe(true);
    // 文本仍正常渲染
    expect(container.textContent?.replace(/\s/g, '')).toContain('未解决');
  });
});
