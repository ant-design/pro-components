import { ProList } from '@ant-design/pro-components';
import { fireEvent, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';

afterEach(() => {
  document.body.innerHTML = '';
});

type Row = { id: number; name: string };

const dataSource: Row[] = [
  { id: 1, name: 'locked record' },
  { id: 2, name: 'normal record' },
];

/**
 * #9779 ProList v3 没有把 rowSelection.getCheckboxProps(record) 返回的属性
 * 透传给真实的选择控件，导致 disabled / aria-label 等行级属性失效。
 */
describe('ProList rowSelection.getCheckboxProps (#9779)', () => {
  it('checkbox 透传 disabled 与 aria-label', () => {
    const { container } = render(
      <ProList<Row>
        rowKey="id"
        dataSource={dataSource}
        columns={[{ dataIndex: 'name', listSlot: 'title' }]}
        rowSelection={{
          getCheckboxProps: (record) =>
            record.id === 1
              ? { disabled: true, 'aria-label': 'locked record' }
              : {},
        }}
      />,
    );

    const inputs = container.querySelectorAll<HTMLInputElement>(
      '.ant-checkbox-input',
    );
    expect(inputs.length).toBe(2);

    expect(inputs[0].disabled).toBe(true);
    expect(inputs[0].getAttribute('aria-label')).toBe('locked record');
    expect(inputs[1].disabled).toBe(false);

    // 可访问名称可以按 aria-label 查到
    expect(
      screen.getByRole('checkbox', { name: 'locked record' }),
    ).toBeTruthy();
  });

  it('radio 模式同样透传 disabled 与 aria-label', () => {
    const { container } = render(
      <ProList<Row>
        rowKey="id"
        dataSource={dataSource}
        columns={[{ dataIndex: 'name', listSlot: 'title' }]}
        rowSelection={{
          type: 'radio',
          getCheckboxProps: (record) =>
            record.id === 1
              ? { disabled: true, 'aria-label': 'locked record' }
              : {},
        }}
      />,
    );

    const inputs =
      container.querySelectorAll<HTMLInputElement>('.ant-radio-input');
    expect(inputs.length).toBe(2);

    expect(inputs[0].disabled).toBe(true);
    expect(inputs[0].getAttribute('aria-label')).toBe('locked record');
    expect(inputs[1].disabled).toBe(false);
  });

  it('禁用的行不会被选中，也不会触发选择回调', () => {
    const onChange = vi.fn();
    const onSelect = vi.fn();
    const { container } = render(
      <ProList<Row>
        rowKey="id"
        dataSource={dataSource}
        columns={[{ dataIndex: 'name', listSlot: 'title' }]}
        rowSelection={{
          getCheckboxProps: (record) =>
            record.id === 1 ? { disabled: true } : {},
          onChange,
          onSelect,
        }}
      />,
    );

    const inputs = container.querySelectorAll<HTMLInputElement>(
      '.ant-checkbox-input',
    );

    fireEvent.click(inputs[0]);
    expect(onChange).not.toHaveBeenCalled();
    expect(onSelect).not.toHaveBeenCalled();
    expect(inputs[0]).not.toBeChecked();

    // 正常的行依然可以选中
    fireEvent.click(inputs[1]);
    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange.mock.calls[0][0]).toEqual([2]);
    expect(inputs[1]).toBeChecked();
  });

  it('自定义属性不会破坏 checked 状态与选择回调', () => {
    const onChange = vi.fn();
    const { container } = render(
      <ProList<Row>
        rowKey="id"
        dataSource={dataSource}
        columns={[{ dataIndex: 'name', listSlot: 'title' }]}
        rowSelection={{
          getCheckboxProps: (record) => ({ name: `row-${record.id}` }),
          onChange,
        }}
      />,
    );

    const inputs = container.querySelectorAll<HTMLInputElement>(
      '.ant-checkbox-input',
    );
    expect(inputs[0].getAttribute('name')).toBe('row-1');

    fireEvent.click(inputs[0]);
    expect(inputs[0]).toBeChecked();
    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange.mock.calls[0][0]).toEqual([1]);
  });

  it('卡片(grid)模式下禁用的行不可点击选中', () => {
    const onChange = vi.fn();
    const { container } = render(
      <ProList<Row>
        rowKey="id"
        dataSource={dataSource}
        grid={{ gutter: 16, column: 2 }}
        columns={[{ dataIndex: 'name', listSlot: 'title' }]}
        rowSelection={{
          getCheckboxProps: (record) =>
            record.id === 1 ? { disabled: true } : {},
          onChange,
        }}
      />,
    );

    const cards = container.querySelectorAll('.ant-pro-checkcard');
    expect(cards.length).toBe(2);
    expect(cards[0].className).toContain('ant-pro-checkcard-disabled');

    fireEvent.click(cards[0]);
    expect(onChange).not.toHaveBeenCalled();
  });
});
