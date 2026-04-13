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
      });

  it('🦶 links support false', () => {
    const wrapper = render(<DefaultFooter links={false} />);
      });

  it('🦶 if copyright and links falsy both, should not to render nothing', () => {
    const wrapper = render(<DefaultFooter copyright={false} links={false} />);
    expect(
      !!wrapper.baseElement.querySelector('.ant-pro-global-footer'),
    ).toBeFalsy();
  });
});
