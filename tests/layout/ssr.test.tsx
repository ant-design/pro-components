// @vitest-environment node

import { ProLayout } from '@ant-design/pro-components';
import { renderToString } from 'react-dom/server';
import { describe, expect, it } from 'vitest';

describe('ProLayout SSR (#8916)', () => {
  it('renders menu content without browser globals', () => {
    const html = renderToString(
      <ProLayout
        location={{ pathname: '/dashboard' }}
        route={{
          path: '/',
          routes: [
            {
              path: '/dashboard',
              name: 'Dashboard',
            },
          ],
        }}
      >
        content
      </ProLayout>,
    );

    expect(html).toContain('Dashboard');
    expect(html).toContain('content');
  });
});
