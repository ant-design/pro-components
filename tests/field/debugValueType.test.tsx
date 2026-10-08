import type { ProRenderFieldPropsType } from '../../src';
import React from 'react';
import { describe, expect, it } from 'vitest';

describe('debug pure', () => {
  it('plain object behavior', () => {
    const map: Record<string, ProRenderFieldPropsType> = {
      lookup: {
        renderFormItem: (text: any, props: any) => {
          return <input data-testid="x" />;
        },
        render: (text: any) => <span>y</span>,
      },
    };
    console.log('type of rfi:', typeof map.lookup.renderFormItem);
    console.log('type of render:', typeof map.lookup.render);
    console.log('keys:', Object.keys(map.lookup));
    expect(map.lookup.renderFormItem).toBeTypeOf('function');
  });
});
