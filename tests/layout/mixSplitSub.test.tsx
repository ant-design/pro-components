import { ProLayout } from '@ant-design/pro-components';
import { render } from '@testing-library/react';
import React from 'react';
import { describe, expect, it } from 'vitest';
import { waitForWaitTime } from '../util';

/**
 * #9310: layout=mix + splitMenus + siderMenuType=sub 时子菜单不显示。
 * 锁定行为：mix+splitMenus 下侧栏仅展示当前激活一级菜单的 children；
 * 菜单数据无 children 时侧栏为空（需确保菜单数据含二级）。
 */
describe('ProLayout mix + splitMenus + siderMenuType=sub (#9310)', () => {
  it('renders sider children for active top menu with siderMenuType=sub', async () => {
    const html = render(
      <ProLayout
        layout="mix"
        splitMenus
        siderMenuType="sub"
        location={{ pathname: '/a/one' }}
        route={{
          path: '/',
          routes: [
            {
              path: '/a',
              name: 'A',
              routes: [
                { path: '/a/one', name: 'One' },
                { path: '/a/two', name: 'Two' },
              ],
            },
            {
              path: '/b',
              name: 'B',
              routes: [{ path: '/b/one', name: 'B-One' }],
            },
          ],
        }}
      >
        <div>content</div>
      </ProLayout>,
    );
    await waitForWaitTime(500);

    const text = html.baseElement.textContent ?? '';
    // 顶部一级菜单 A、B 展示
    expect(text).toContain('A');
    expect(text).toContain('B');
    // 侧栏展示 A 的子菜单
    expect(text).toContain('One');
    expect(text).toContain('Two');
    // 不展示 B 的子菜单（splitMenus 语义）
    expect(text).not.toContain('B-One');
  });
});
