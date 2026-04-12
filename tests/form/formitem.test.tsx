import {
  ProForm,
  ProFormDependency,
  ProFormText,
} from '@ant-design/pro-components';
import { cleanup, fireEvent, render } from '@testing-library/react';
import { Input, Space, Tag } from 'antd';
import { afterEach, describe, expect, it, vi } from 'vitest';

afterEach(() => {
  cleanup();
});

describe('ProForm.Item', () => {
  it('📦 ProForm support fieldProps.onBlur', async () => {
    const onBlur = vi.fn();
    const { container } = render(
      <ProForm
        initialValues={{
          layoutTheme: 'dark',
        }}
      >
        <ProFormText
          fieldProps={{
            id: 'layoutTheme',
            onBlur: (e) => onBlur(e.target.value),
          }}
          name="layoutTheme"
        />
      </ProForm>,
    );

    fireEvent.focus(container.querySelector('input#layoutTheme')!);
    fireEvent.blur(container.querySelector('input#layoutTheme')!);

    expect(onBlur).toHaveBeenCalledWith('dark');
    expect(onBlur).toHaveBeenCalledTimes(1);
  });

  it('📦 ProForm.Item supports onChange', async () => {
    const onChange = vi.fn();
    const onValuesChange = vi.fn();
    const { container } = render(
      <ProForm
        initialValues={{
          layoutTheme: 'dark',
        }}
        onValuesChange={({ name }) => onValuesChange(name)}
      >
        <ProForm.Item name="name">
          <Input onChange={(e) => onChange(e.target.value)} id="name" />
        </ProForm.Item>
      </ProForm>,
    );

    fireEvent.change(container.querySelector('input#name')!, {
      target: {
        value: '1212',
      },
    });

    expect(onChange).toHaveBeenCalledWith('1212');
    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onValuesChange).toHaveBeenCalledWith('1212');
    expect(onValuesChange).toHaveBeenCalledTimes(1);
  });

  it('📦 ProFormText readonly without name (ProFormDependency + Space) should render without onBlur warning', () => {
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    const { getByText } = render(
      <ProForm
        initialValues={{
          primaryOrganizationId: 'org-1',
          primaryOrganizationName: '示例主组织',
          affiliatedOrganizationIds: '',
        }}
      >
        <ProFormText name="primaryOrganizationId" hidden />
        <ProFormText name="primaryOrganizationName" hidden />
        <ProFormText name="affiliatedOrganizationIds" hidden />

        <ProFormDependency name={['primaryOrganizationName', 'primaryOrganizationId']}>
          {({ primaryOrganizationName, primaryOrganizationId }) => (
            <ProFormText
              label="组织名称"
              readonly
              required
              extra="主组织与从属组织"
            >
              <Space size={[0, 8]} wrap>
                <Tag>
                  {primaryOrganizationName}
                  <span
                    style={{
                      color: '#1677ff',
                      fontWeight: 'bolder',
                      paddingLeft: '5px',
                    }}
                  >
                    主组织
                  </span>
                </Tag>
              </Space>
            </ProFormText>
          )}
        </ProFormDependency>
      </ProForm>,
    );

    expect(getByText('示例主组织')).toBeInTheDocument();
    expect(getByText('主组织')).toBeInTheDocument();

    const onBlurWarning = consoleSpy.mock.calls.find(
      (args) =>
        String(args[0]).includes('onBlur') &&
        String(args[0]).includes('function'),
    );
    consoleSpy.mockRestore();
    expect(
      onBlurWarning,
      'ProFormText readonly + custom children (Space) must not receive onBlur={false}',
    ).toBeUndefined();
  });
});
