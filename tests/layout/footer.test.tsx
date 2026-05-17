import { DefaultFooter } from '@ant-design/pro-components';
import { cleanup, render } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';

afterEach(() => {
  cleanup();
});

describe('DefaultFooter test', () => {
  it('🦶 set title', () => {
    const wrapper = render(<DefaultFooter links={false} />);
    expect(
      !!wrapper.baseElement.querySelector('.ant-pro-global-footer-links'),
    ).toBeFalsy();
  });

  it('🦶 copyright support false', () => {
    const wrapper = render(<DefaultFooter copyright={false} />);
    // copyright=false 时不应渲染版权区块
    expect(
      wrapper.baseElement.querySelector('.ant-pro-global-footer-copyright'),
    ).toBeFalsy();
    // 不应渲染 CopyrightOutlined 图标
    expect(wrapper.baseElement.querySelector('.anticon-copyright')).toBeFalsy();
    // 外层 layout footer 容器仍存在
    expect(
      wrapper.baseElement.querySelector('[data-testid="pro-layout-footer"]'),
    ).toBeTruthy();
  });

  it('🦶 links support false', () => {
    const wrapper = render(<DefaultFooter links={false} />);
    // links=false 时不应渲染 links 区块
    expect(
      wrapper.baseElement.querySelector('.ant-pro-global-footer-links'),
    ).toBeFalsy();
    // 外层 layout footer 容器仍存在
    expect(
      wrapper.baseElement.querySelector('[data-testid="pro-layout-footer"]'),
    ).toBeTruthy();
  });

  it('🦶 if copyright and links falsy both, should not to render nothing', () => {
    const wrapper = render(<DefaultFooter copyright={false} links={false} />);
    expect(
      !!wrapper.baseElement.querySelector('.ant-pro-global-footer'),
    ).toBeFalsy();
  });
});
