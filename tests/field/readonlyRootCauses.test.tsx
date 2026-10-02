import {
  ProDescriptions,
  ProForm,
  ProFormCascader,
  ProFormDigit,
  ProFormSelect,
} from '@ant-design/pro-components';
import { cleanup, render } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';

afterEach(cleanup);

describe('readonly value normalization (#8848, #8844, #8710, #8517)', () => {
  it('renders emptyText for an empty select array', () => {
    const { getByText } = render(
      <ProForm submitter={false} initialValues={{ roles: [] }}>
        <ProFormSelect name="roles" readonly mode="multiple" emptyText="暂无" />
      </ProForm>,
    );
    expect(getByText('暂无')).toBeTruthy();
  });

  it('keeps digit prefix and suffix in read mode', () => {
    const { container } = render(
      <ProForm submitter={false} initialValues={{ count: 8 }}>
        <ProFormDigit
          name="count"
          readonly
          fieldProps={{ prefix: '≥ ', suffix: ' 个' }}
        />
      </ProForm>,
    );
    expect(container.textContent).toContain('≥ 8 个');
  });

  it('keeps digit prefix and suffix in string mode', () => {
    const { container } = render(
      <ProForm submitter={false} initialValues={{ count: '8' }}>
        <ProFormDigit
          name="count"
          readonly
          fieldProps={{ prefix: '≥ ', suffix: ' 个', stringMode: true }}
        />
      </ProForm>,
    );
    expect(container.textContent).toContain('≥ 8 个');
  });

  it('resolves cascader labels by path when values repeat', () => {
    const { container } = render(
      <ProForm
        submitter={false}
        initialValues={{ area: ['same', 'same', 'same'] }}
      >
        <ProFormCascader
          name="area"
          readonly
          fieldProps={{
            options: [
              {
                value: 'same',
                label: '浙江',
                children: [
                  {
                    value: 'same',
                    label: '杭州',
                    children: [{ value: 'same', label: '西湖' }],
                  },
                ],
              },
            ],
          }}
        />
      </ProForm>,
    );
    expect(container.textContent).toContain('浙江,杭州,西湖');
  });

  it('shows a numeric ProDescriptions valueEnum label in edit mode', () => {
    const { container } = render(
      <ProDescriptions
        editable={{ editableKeys: ['status'] }}
        dataSource={{ status: 2 }}
        columns={[
          {
            dataIndex: 'status',
            valueType: 'select',
            valueEnum: {
              1: { text: '进行中' },
              2: { text: '已完成' },
            },
          },
        ]}
      />,
    );
    const select = container.querySelector('.ant-select');
    expect(select).toBeTruthy();
    expect(select?.textContent).toContain('已完成');
  });

  it('does not collapse distinct numeric-looking option values', () => {
    const { container } = render(
      <ProForm submitter={false} initialValues={{ status: 1 }}>
        <ProFormSelect
          name="status"
          options={[
            { label: 'Leading zero', value: '01' },
            { label: 'Canonical', value: '1' },
          ]}
        />
      </ProForm>,
    );
    expect(container.querySelector('.ant-select')?.textContent).toContain(
      'Canonical',
    );
  });
});
