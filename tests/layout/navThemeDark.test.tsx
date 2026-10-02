import { ProLayout } from '@ant-design/pro-components';
import { cleanup, render } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';
import defaultProps from './defaultProps';

afterEach(cleanup);

describe('navTheme realDark (#9168)', () => {
  it('applies the dark menu theme', async () => {
    const html = render(
      <ProLayout {...defaultProps} navTheme="realDark">
        welcome
      </ProLayout>,
    );

    await html.findAllByText('welcome');
    expect(html.baseElement.querySelector('.ant-menu-dark')).toBeTruthy();
  });

  it('keeps the menu light by default', async () => {
    const html = render(
      <ProLayout {...defaultProps} navTheme="light">
        welcome
      </ProLayout>,
    );

    await html.findAllByText('welcome');
    expect(html.baseElement.querySelector('.ant-menu-dark')).toBeNull();
  });
});
