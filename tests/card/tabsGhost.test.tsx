import { render } from '@testing-library/react';
import React from 'react';
import { describe, expect, it } from 'vitest';
import { ProCard } from '../../src';

// #9052: tabs.cardProps.ghost 应去掉 tab 内容区 padding
describe('#9052 ProCard tabs cardProps ghost', () => {
  it('applies ghost class to tabs when tabs.cardProps.ghost is true', () => {
    const { container } = render(
      <ProCard
        tabs={{
          cardProps: { ghost: true },
          items: [
            { key: 'a', label: 'A', children: <div>content-a</div> },
          ],
        }}
      />,
    );

    const tabs = container.querySelector('.ant-pro-card-tabs');
    expect(tabs?.classList.contains('ant-pro-card-tabs-ghost')).toBe(true);
  });

  it('does not apply ghost class by default', () => {
    const { container } = render(
      <ProCard
        tabs={{
          items: [
            { key: 'a', label: 'A', children: <div>content-a</div> },
          ],
        }}
      />,
    );

    const tabs = container.querySelector('.ant-pro-card-tabs');
    expect(tabs?.classList.contains('ant-pro-card-tabs-ghost')).toBe(false);
  });
});
