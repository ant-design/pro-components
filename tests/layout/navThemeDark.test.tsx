import { ProLayout } from '@ant-design/pro-components';
import { cleanup, render } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';
import defaultProps from './defaultProps';

afterEach(() => {
  cleanup();
});

describe('navTheme realDark (#9168)', () => {
  it('applies dark menu theme when navTheme=realDark', async () => {
    const html = render(
      <ProLayout {...defaultProps} navTheme="realDark">
        welcome
      </ProLayout>,
    );
    await html.findAllByText('welcome');
    // Sider Menu 拿到 theme="dark"，antd menu 渲染 dark 皮肤
    const darkMenu = html.baseElement.querySelector('.ant-menu-dark');
    expect(darkMenu).toBeTruthy();
  });

  it('keeps light menu theme by default', async () => {
    const html = render(
      <ProLayout {...defaultProps} navTheme="light">
        welcome
      </ProLayout>,
    );
    await html.findAllByText('welcome');
    const darkMenu = html.baseElement.querySelector('.ant-menu-dark');
    expect(darkMenu).toBeNull();
  });
});
