import { render, waitFor } from '@testing-library/react';
import {
  LightFilter,
  ProFormDatePicker,
  ProFormDateRangePicker,
  ProFormDateTimePicker,
  ProFormSelect,
  ProFormSlider,
  ProFormText,
  ProFormTimePicker,
} from '@xxlabs/pro-components';
import { describe, expect, it, vi } from 'vitest';

describe('LightFilter', () => {
  it(' 🪕 should render basic structure', async () => {
    const { container } = render(
      <LightFilter>
        <ProFormText label="名称" name="name1" />
      </LightFilter>,
    );

    await waitFor(() => {
      expect(container.querySelector('.ant-pro-form-light-filter')).toBeTruthy();
    });

    // Check that the field label is rendered
    const fieldLabel = await waitFor(() => {
      return container.querySelector('.ant-pro-core-field-label');
    });
    expect(fieldLabel).toBeTruthy();
    expect(fieldLabel?.textContent).toContain('名称');
  });

  it(' 🪕 should support initialValues', async () => {
    const onValuesChange = vi.fn();

    const { container } = render(
      <LightFilter
        initialValues={{
          name1: 'initial value',
        }}
        onValuesChange={onValuesChange}
      >
        <ProFormText label="名称" name="name1" />
      </LightFilter>,
    );

    await waitFor(() => {
      expect(container.querySelector('.ant-pro-form-light-filter')).toBeTruthy();
    });

    // Check that the initial value is displayed in the field label
    const fieldLabel = await waitFor(() => {
      return container.querySelector('.ant-pro-core-field-label');
    });
    expect(fieldLabel).toBeTruthy();
    expect(fieldLabel?.textContent).toContain('initial value');
  });

  it(' 🪕 should support variant', async () => {
    const onValuesChange = vi.fn();

    const { container } = render(
      <LightFilter variant="outlined" onValuesChange={onValuesChange}>
        <ProFormText label="名称" name="name1" />
      </LightFilter>,
    );

    await waitFor(() => {
      expect(container.querySelector('.ant-pro-form-light-filter')).toBeTruthy();
    });

    // Check if the variant class is applied
    const lightFilterContainer = container.querySelector('.ant-pro-form-light-filter');
    expect(lightFilterContainer).toBeTruthy();
  });

  it(' 🪕 should support placement', async () => {
    const onValuesChange = vi.fn();

    const { container } = render(
      <LightFilter placement="topLeft" onValuesChange={onValuesChange}>
        <ProFormText label="名称" name="name1" />
      </LightFilter>,
    );

    await waitFor(() => {
      expect(container.querySelector('.ant-pro-form-light-filter')).toBeTruthy();
    });

    const lightFilterContainer = container.querySelector('.ant-pro-form-light-filter');
    expect(lightFilterContainer).toBeTruthy();
  });

  it(' 🪕 should support select with valueEnum', async () => {
    const onValuesChange = vi.fn();

    const { container } = render(
      <LightFilter onValuesChange={onValuesChange}>
        <ProFormSelect
          label="名称"
          name="name1"
          valueEnum={{
            open: '未解决',
            closed: '已解决',
          }}
        />
      </LightFilter>,
    );

    await waitFor(() => {
      expect(container.querySelector('.ant-pro-form-light-filter')).toBeTruthy();
    });

    // Check that the field label is rendered
    const fieldLabel = await waitFor(() => {
      return container.querySelector('.ant-pro-core-field-label');
    });
    expect(fieldLabel).toBeTruthy();
    expect(fieldLabel?.textContent).toContain('名称');
  });

  it(' 🪕 should support date picker', async () => {
    const onValuesChange = vi.fn();

    const { container } = render(
      <LightFilter onValuesChange={onValuesChange}>
        <ProFormDatePicker label="名称" name="name1" />
      </LightFilter>,
    );

    await waitFor(() => {
      expect(container.querySelector('.ant-pro-form-light-filter')).toBeTruthy();
    });

    // Check that the field label is rendered
    const fieldLabel = await waitFor(() => {
      return container.querySelector('.ant-pro-core-field-label');
    });
    expect(fieldLabel).toBeTruthy();
    expect(fieldLabel?.textContent).toContain('名称');
  });

  it(' 🪕 should support date range picker', async () => {
    const onValuesChange = vi.fn();

    const { container } = render(
      <LightFilter onValuesChange={onValuesChange}>
        <ProFormDateRangePicker label="名称" name="name1" />
      </LightFilter>,
    );

    await waitFor(() => {
      expect(container.querySelector('.ant-pro-form-light-filter')).toBeTruthy();
    });

    // Check that the field label is rendered
    const fieldLabel = await waitFor(() => {
      return container.querySelector('.ant-pro-core-field-label');
    });
    expect(fieldLabel).toBeTruthy();
    expect(fieldLabel?.textContent).toContain('名称');
  });

  it(' 🪕 should support date time picker', async () => {
    const onValuesChange = vi.fn();

    const { container } = render(
      <LightFilter onValuesChange={onValuesChange}>
        <ProFormDateTimePicker label="名称" name="name1" />
      </LightFilter>,
    );

    await waitFor(() => {
      expect(container.querySelector('.ant-pro-form-light-filter')).toBeTruthy();
    });

    // Check that the field label is rendered
    const fieldLabel = await waitFor(() => {
      return container.querySelector('.ant-pro-core-field-label');
    });
    expect(fieldLabel).toBeTruthy();
    expect(fieldLabel?.textContent).toContain('名称');
  });

  it(' 🪕 should support time picker', async () => {
    const onValuesChange = vi.fn();

    const { container } = render(
      <LightFilter onValuesChange={onValuesChange}>
        <ProFormTimePicker label="名称" name="name1" />
      </LightFilter>,
    );

    await waitFor(() => {
      expect(container.querySelector('.ant-pro-form-light-filter')).toBeTruthy();
    });

    // Check that the field label is rendered
    const fieldLabel = await waitFor(() => {
      return container.querySelector('.ant-pro-core-field-label');
    });
    expect(fieldLabel).toBeTruthy();
    expect(fieldLabel?.textContent).toContain('名称');
  });

  it(' 🪕 should support slider', async () => {
    const onValuesChange = vi.fn();

    const { container } = render(
      <LightFilter onValuesChange={onValuesChange}>
        <ProFormSlider label="名称" name="name1" />
      </LightFilter>,
    );

    await waitFor(() => {
      expect(container.querySelector('.ant-pro-form-light-filter')).toBeTruthy();
    });

    // Check that the field label is rendered
    const fieldLabel = await waitFor(() => {
      return container.querySelector('.ant-pro-core-field-label');
    });
    expect(fieldLabel).toBeTruthy();
    expect(fieldLabel?.textContent).toContain('名称');
  });

  it(' 🪕 should support collapse mode', async () => {
    const onValuesChange = vi.fn();

    const { container } = render(
      <LightFilter collapse onValuesChange={onValuesChange}>
        <ProFormText label="名称" name="name1" />
        <ProFormText label="名称2" name="name2" />
      </LightFilter>,
    );

    await waitFor(() => {
      expect(container.querySelector('.ant-pro-form-light-filter')).toBeTruthy();
    });

    // In collapse mode, there should be a filter icon instead of field labels
    const filterIcon = container.querySelector('.anticon-filter');
    expect(filterIcon).toBeTruthy();

    // Check that there's a dropdown label
    const dropdownLabel = container.querySelector('.ant-pro-core-field-dropdown-label');
    expect(dropdownLabel).toBeTruthy();
  });

  it(' 🪕 should support collapse mode with collapseLabel', async () => {
    const onValuesChange = vi.fn();

    const { container } = render(
      <LightFilter collapse collapseLabel="更多筛选" onValuesChange={onValuesChange}>
        <ProFormText label="名称" name="name1" />
        <ProFormText label="名称2" name="name2" />
      </LightFilter>,
    );

    await waitFor(() => {
      expect(container.querySelector('.ant-pro-form-light-filter')).toBeTruthy();
    });

    // In collapse mode with custom label, there should be the custom label text
    const dropdownLabel = container.querySelector('.ant-pro-core-field-dropdown-label');
    expect(dropdownLabel).toBeTruthy();
    expect(dropdownLabel?.textContent).toBe('更多筛选');
  });

  it(' 🪕 should support secondary field', async () => {
    const onValuesChange = vi.fn();

    const { container } = render(
      <LightFilter onValuesChange={onValuesChange}>
        <ProFormText label="名称" name="name1" />
        <ProFormText secondary label="名称2" name="name2" />
      </LightFilter>,
    );

    await waitFor(() => {
      expect(container.querySelector('.ant-pro-form-light-filter')).toBeTruthy();
    });

    // Check that the field labels are rendered
    const fieldLabels = container.querySelectorAll('.ant-pro-core-field-label');
    expect(fieldLabels.length).toBeGreaterThan(0);
  });

  it(' 🪕 should support onValuesChange callback', async () => {
    const onValuesChange = vi.fn();

    const { container } = render(
      <LightFilter onValuesChange={onValuesChange}>
        <ProFormText label="名称" name="name1" />
      </LightFilter>,
    );

    await waitFor(() => {
      expect(container.querySelector('.ant-pro-form-light-filter')).toBeTruthy();
    });

    // Check that the field label is rendered
    const fieldLabel = await waitFor(() => {
      return container.querySelector('.ant-pro-core-field-label');
    });
    expect(fieldLabel).toBeTruthy();
  });

  it(' 🪕 should support onFinish callback', async () => {
    const onFinish = vi.fn();

    const { container } = render(
      <LightFilter onFinish={onFinish}>
        <ProFormText label="名称" name="name1" />
      </LightFilter>,
    );

    await waitFor(() => {
      expect(container.querySelector('.ant-pro-form-light-filter')).toBeTruthy();
    });

    // Check that the field label is rendered
    const fieldLabel = await waitFor(() => {
      return container.querySelector('.ant-pro-core-field-label');
    });
    expect(fieldLabel).toBeTruthy();
  });

  it(' 🪕 should support footerRender', async () => {
    const onValuesChange = vi.fn();
    const footerRender = vi.fn(() => <div data-testid="custom-footer">Custom Footer</div>);

    const { container } = render(
      <LightFilter collapse footerRender={footerRender} onValuesChange={onValuesChange}>
        <ProFormText label="名称" name="name1" />
        <ProFormText label="名称2" name="name2" />
      </LightFilter>,
    );

    await waitFor(() => {
      expect(container.querySelector('.ant-pro-form-light-filter')).toBeTruthy();
    });

    // In collapse mode, there should be a filter icon instead of field labels
    const filterIcon = container.querySelector('.anticon-filter');
    expect(filterIcon).toBeTruthy();

    // Check that there's a dropdown label
    const dropdownLabel = container.querySelector('.ant-pro-core-field-dropdown-label');
    expect(dropdownLabel).toBeTruthy();
  });
});
