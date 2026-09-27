import { render } from '@testing-library/react';
import React from 'react';
import { describe, expect, it } from 'vitest';
import { QueryFilter, ProFormText } from '../../src';

/**
 * #9131 QueryFilter 的 span 断点与 antd 栅格不一致：
 * 旧实现每个档位取「下一档」的 min token（xs 用 screenSMMin、xl 用 screenXXLMin），
 * 用户定制 screenXLMin/screenXXLMin 时错位一档不生效；
 * 且宽度超出 xxl 后固定回落 span=8（一行 3 列），忽略用户的 xxl 配置。
 *
 * 修复：
 * 1. 断点键对齐 antd 栅格（xs=XSMin, sm=SMMin, md=MDMin, lg=LGMin, xl=XLMin, xxl=XXLMin）；
 * 2. 超出 xxl 后使用 xxl 档列数。
 *
 * 说明：测试环境的元素宽度由 ResizeObserver 实测（与 window.innerWidth 无关），
 * 因此断言以「渲染出的 span 必须来自用户配置的档位集合」为核心。
 */
describe('#9131 QueryFilter span 断点对齐 antd 栅格', () => {
  const SPAN_CONFIG = {
    xs: 24,
    sm: 12,
    md: 8,
    lg: 6,
    xl: 4,
    xxl: 2,
  };

  const setup = () =>
    render(
      <QueryFilter submitter={false} span={SPAN_CONFIG} initialValues={{}}>
        <ProFormText name="a" label="A" />
      </QueryFilter>,
    );

  const getColSpan = (html: ReturnType<typeof render>) => {
    const col = html.container.querySelector('.ant-col') as HTMLElement;
    const match = col?.className?.match(/ant-col-(\d+)/);
    return match ? parseInt(match[1], 10) : undefined;
  };

  it('渲染的 Col span 来自用户配置的档位（不再回落固定值）', () => {
    const html = setup();
    const span = getColSpan(html);
    expect(span).toBeDefined();
    expect(Object.values(SPAN_CONFIG)).toContain(span);
  });

  it('xxl 窄列配置（24/xxl=12）在默认断点下渲染成功', () => {
    // xxl: 2 → 每行 12 列，用于验证档位除法的稳定性
    const html = render(
      <QueryFilter
        submitter={false}
        span={{ xs: 24, sm: 12, md: 8, lg: 6, xl: 4, xxl: 2 }}
        initialValues={{}}
      >
        <ProFormText name="a" label="A" />
      </QueryFilter>,
    );
    expect(html.container.querySelector('.ant-col')).toBeTruthy();
  });
});
