import { proFieldParsingText } from '@ant-design/pro-components';
import React from 'react';
import { describe, expect, it } from 'vitest';

describe('proFieldParsingText', () => {
  it('should render text from valueEnum when text matches enum key', () => {
    const result = proFieldParsingText('success', {
      success: { text: '成功', status: 'Success' },
      fail: { text: '失败', status: 'Error' },
    });
    expect(React.isValidElement(result)).toBe(true);
  });

  it('should return text as-is when not found in valueEnum', () => {
    const result = proFieldParsingText('unknown', {
      success: { text: '成功' },
    });
    expect(result).toBe('unknown');
  });

  it('should pass through React elements without extracting label/title', () => {
    const jsxElement = <span className="custom-tag">成功</span>;
    const result = proFieldParsingText(jsxElement as any, {
      success: { text: '成功' },
      fail: { text: '失败' },
    });
    expect(React.isValidElement(result)).toBe(true);
    expect(result).toBe(jsxElement);
  });

  it('should pass through complex JSX (e.g. from renderText) without breaking', () => {
    const jsxElement = (
      <div>
        <span style={{ color: '#87d068' }}>成功</span>
      </div>
    );
    const result = proFieldParsingText(jsxElement as any, {
      success: { text: '成功', status: 'Success' },
      fail: { text: '失败', status: 'Error' },
    });
    expect(React.isValidElement(result)).toBe(true);
    expect(result).toBe(jsxElement);
  });

  it('should handle labelInValue objects (extract label)', () => {
    const labelInValue = { label: '已选中', value: 'selected' };
    const result = proFieldParsingText(labelInValue, {
      selected: { text: '已选中' },
    });
    expect(result).toBe('已选中');
  });

  it('should handle labelInValue objects with title fallback', () => {
    const labelInValue = { title: '标题值', value: 'titled' };
    const result = proFieldParsingText(labelInValue, {
      titled: { text: '标题' },
    });
    expect(result).toBe('标题值');
  });

  it('should handle array of values', () => {
    const result = proFieldParsingText(['success', 'fail'], {
      success: { text: '成功', status: 'Success' },
      fail: { text: '失败', status: 'Error' },
    });
    expect(React.isValidElement(result)).toBe(true);
  });

  it('should handle numeric text matching enum key', () => {
    const result = proFieldParsingText(1, {
      1: { text: '启用', status: 'Success' },
      0: { text: '禁用', status: 'Default' },
    });
    expect(React.isValidElement(result)).toBe(true);
  });
});
