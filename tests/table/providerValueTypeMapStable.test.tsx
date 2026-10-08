import { ProTable } from '@ant-design/pro-components';
import { fireEvent, render, waitFor } from '@testing-library/react';
import { memo, useContext, useState } from 'react';
import { describe, expect, it } from 'vitest';
import ProConfigContext from '../../src/provider';

const rows = Array.from({ length: 5 }, (_, index) => ({
  id: index,
  name: `row-${index}`,
}));

describe('#8054/#9150 stable table provider values', () => {
  it('does not invalidate memoized field consumers on an unrelated parent render', async () => {
    let renderCount = 0;
    const FieldConsumer = memo(({ value }: { value: string }) => {
      useContext(ProConfigContext);
      renderCount += 1;
      return <span>{value}</span>;
    });
    FieldConsumer.displayName = 'FieldConsumer';

    const columns = [
      {
        dataIndex: 'name',
        title: 'Name',
        render: (_: unknown, record: (typeof rows)[number]) => (
          <FieldConsumer value={record.name} />
        ),
      },
    ];
    const Demo = () => {
      const [, setTick] = useState(0);
      return (
        <>
          <button
            data-testid="rerender"
            onClick={() => setTick((v) => v + 1)}
          />
          <ProTable
            columns={columns}
            dataSource={rows}
            pagination={false}
            search={false}
            toolBarRender={false}
            rowKey="id"
          />
        </>
      );
    };

    const wrapper = render(<Demo />);
    await waitFor(() => expect(renderCount).toBe(5));
    fireEvent.click(wrapper.getByTestId('rerender'));
    await new Promise((resolve) => setTimeout(resolve, 50));
    expect(renderCount).toBe(5);
  });
});
