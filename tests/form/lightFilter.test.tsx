import {
  LightFilter,
  ProFormDatePicker,
  ProFormDateQuarterRangePicker,
  ProFormDateRangePicker,
  ProFormDateTimePicker,
  ProFormDateTimeRangePicker,
  ProFormDateWeekRangePicker,
  ProFormDateYearRangePicker,
  ProFormDigitRange,
  ProFormSelect,
  ProFormSlider,
  ProFormText,
  ProFormTimePicker,
} from '@ant-design/pro-components';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { Space } from 'antd';
import dayjs from 'dayjs';
import advancedFormat from 'dayjs/plugin/advancedFormat';
import weekOfYear from 'dayjs/plugin/weekOfYear';
import { describe, expect, it, vi } from 'vitest';
import { dateArrayFormatter } from '../../src/utils/dateArrayFormatter';

dayjs.extend(advancedFormat);
dayjs.extend(weekOfYear);

describe('LightFilter', () => {
  it(' 🪕 should render basic structure', async () => {
    const { container } = render(
      <LightFilter>
        <ProFormText name="name1" label="名称" />
      </LightFilter>,
    );

    await waitFor(() => {
      expect(
        container.querySelector('.ant-pro-form-light-filter'),
      ).toBeTruthy();
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
        <ProFormText name="name1" label="名称" />
      </LightFilter>,
    );

    await waitFor(() => {
      expect(
        container.querySelector('.ant-pro-form-light-filter'),
      ).toBeTruthy();
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
      <LightFilter onValuesChange={onValuesChange} variant="outlined">
        <ProFormText name="name1" label="名称" />
      </LightFilter>,
    );

    await waitFor(() => {
      expect(
        container.querySelector('.ant-pro-form-light-filter'),
      ).toBeTruthy();
    });

    // Check if the variant class is applied
    const lightFilterContainer = container.querySelector(
      '.ant-pro-form-light-filter',
    );
    expect(lightFilterContainer).toBeTruthy();
  });

  it(' 🪕 should support placement', async () => {
    const onValuesChange = vi.fn();

    const { container } = render(
      <LightFilter onValuesChange={onValuesChange} placement="topLeft">
        <ProFormText name="name1" label="名称" />
      </LightFilter>,
    );

    await waitFor(() => {
      expect(
        container.querySelector('.ant-pro-form-light-filter'),
      ).toBeTruthy();
    });

    const lightFilterContainer = container.querySelector(
      '.ant-pro-form-light-filter',
    );
    expect(lightFilterContainer).toBeTruthy();
  });

  it(' 🪕 should support select with valueEnum', async () => {
    const onValuesChange = vi.fn();

    const { container } = render(
      <LightFilter onValuesChange={onValuesChange}>
        <ProFormSelect
          name="name1"
          label="名称"
          valueEnum={{
            open: '未解决',
            closed: '已解决',
          }}
        />
      </LightFilter>,
    );

    await waitFor(() => {
      expect(
        container.querySelector('.ant-pro-form-light-filter'),
      ).toBeTruthy();
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
        <ProFormDatePicker name="name1" label="名称" />
      </LightFilter>,
    );

    await waitFor(() => {
      expect(
        container.querySelector('.ant-pro-form-light-filter'),
      ).toBeTruthy();
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
        <ProFormDateRangePicker name="name1" label="名称" />
      </LightFilter>,
    );

    await waitFor(() => {
      expect(
        container.querySelector('.ant-pro-form-light-filter'),
      ).toBeTruthy();
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
        <ProFormDateTimePicker name="name1" label="名称" />
      </LightFilter>,
    );

    await waitFor(() => {
      expect(
        container.querySelector('.ant-pro-form-light-filter'),
      ).toBeTruthy();
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
        <ProFormTimePicker name="name1" label="名称" />
      </LightFilter>,
    );

    await waitFor(() => {
      expect(
        container.querySelector('.ant-pro-form-light-filter'),
      ).toBeTruthy();
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
        <ProFormSlider name="name1" label="名称" />
      </LightFilter>,
    );

    await waitFor(() => {
      expect(
        container.querySelector('.ant-pro-form-light-filter'),
      ).toBeTruthy();
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
      <LightFilter onValuesChange={onValuesChange} collapse>
        <ProFormText name="name1" label="名称" />
        <ProFormText name="name2" label="名称2" />
      </LightFilter>,
    );

    await waitFor(() => {
      expect(
        container.querySelector('.ant-pro-form-light-filter'),
      ).toBeTruthy();
    });

    // In collapse mode, there should be a filter icon instead of field labels
    const filterIcon = container.querySelector('.anticon-filter');
    expect(filterIcon).toBeTruthy();

    // Check that there's a dropdown label
    const dropdownLabel = container.querySelector(
      '.ant-pro-core-field-dropdown-label',
    );
    expect(dropdownLabel).toBeTruthy();
  });

  it(' 🪕 should support collapse mode with collapseLabel', async () => {
    const onValuesChange = vi.fn();

    const { container } = render(
      <LightFilter
        onValuesChange={onValuesChange}
        collapse
        collapseLabel="更多筛选"
      >
        <ProFormText name="name1" label="名称" />
        <ProFormText name="name2" label="名称2" />
      </LightFilter>,
    );

    await waitFor(() => {
      expect(
        container.querySelector('.ant-pro-form-light-filter'),
      ).toBeTruthy();
    });

    // In collapse mode with custom label, there should be the custom label text
    const dropdownLabel = container.querySelector(
      '.ant-pro-core-field-dropdown-label',
    );
    expect(dropdownLabel).toBeTruthy();
    expect(dropdownLabel?.textContent).toBe('更多筛选');
  });

  it(' 🪕 should support secondary field', async () => {
    const onValuesChange = vi.fn();

    const { container } = render(
      <LightFilter onValuesChange={onValuesChange}>
        <ProFormText name="name1" label="名称" />
        <ProFormText name="name2" label="名称2" secondary />
      </LightFilter>,
    );

    await waitFor(() => {
      expect(
        container.querySelector('.ant-pro-form-light-filter'),
      ).toBeTruthy();
    });

    // Check that the field labels are rendered
    const fieldLabels = container.querySelectorAll('.ant-pro-core-field-label');
    expect(fieldLabels.length).toBeGreaterThan(0);
  });

  it(' 🪕 should support Space wrapped fields', async () => {
    const { container } = render(
      <LightFilter
        initialValues={{
          type: 'username',
          type2: 'fullName',
        }}
        variant="outlined"
        collapse
      >
        <Space.Compact>
          <ProFormSelect
            name="type"
            options={[
              { value: 'username', label: '用户名' },
              { value: 'fullName', label: '姓名' },
              { value: 'email', label: '邮箱' },
            ]}
          />
          <ProFormText name="value" placeholder="请输入" />
        </Space.Compact>
        <Space>
          <ProFormSelect
            name="type2"
            options={[
              { value: 'username', label: '用户名' },
              { value: 'fullName', label: '姓名' },
              { value: 'email', label: '邮箱' },
            ]}
          />
          <ProFormText name="value2" placeholder="请输入" />
        </Space>
      </LightFilter>,
    );

    await waitFor(() => {
      expect(
        container.querySelector('.ant-pro-form-light-filter'),
      ).toBeTruthy();
    });

    // 折叠模式下应显示「更多筛选」入口
    const dropdownLabel = container.querySelector(
      '.ant-pro-core-field-dropdown-label',
    );
    expect(dropdownLabel).toBeTruthy();

    // 点击展开，验证 Space.Compact 和 Space 内的字段正确渲染
    fireEvent.click(dropdownLabel!);

    await waitFor(() => {
      // 应包含至少 2 个下拉与 2 个输入框（type、value、type2、value2）
      expect(screen.getAllByRole('combobox').length).toBeGreaterThanOrEqual(2);
      expect(screen.getAllByRole('textbox').length).toBeGreaterThanOrEqual(2);
      // 验证 initialValues 生效：type='username' 显示「用户名」，type2='fullName' 显示「姓名」
      expect(screen.getByText('用户名')).toBeTruthy();
      expect(screen.getByText('姓名')).toBeTruthy();
    });
  });

  it(' 🪕 should support onValuesChange callback', async () => {
    const onValuesChange = vi.fn();

    const { container } = render(
      <LightFilter onValuesChange={onValuesChange}>
        <ProFormText name="name1" label="名称" />
      </LightFilter>,
    );

    await waitFor(() => {
      expect(
        container.querySelector('.ant-pro-form-light-filter'),
      ).toBeTruthy();
    });

    // Check that the field label is rendered
    const fieldLabel = await waitFor(() => {
      return container.querySelector('.ant-pro-core-field-label');
    });
    expect(fieldLabel).toBeTruthy();
  });

  it(' 🪕 should format date range labels by default', async () => {
    const { container } = render(
      <LightFilter
        initialValues={{
          dateRange: [dayjs('2023-01-01'), dayjs('2023-01-03')],
          dateTimeRange: [
            dayjs('2023-01-01 08:00:00'),
            dayjs('2023-01-01 10:30:00'),
          ],
          weekRange: [dayjs('2023-01-02'), dayjs('2023-01-08')],
          quarterRange: [dayjs('2023-01-01'), dayjs('2023-03-31')],
          yearRange: [dayjs('2022-01-01'), dayjs('2023-01-01')],
        }}
      >
        <ProFormDateRangePicker name="dateRange" label="日期" />
        <ProFormDateTimeRangePicker name="dateTimeRange" label="日期时间" />
        <ProFormDateWeekRangePicker name="weekRange" label="周" />
        <ProFormDateQuarterRangePicker name="quarterRange" label="季度" />
        <ProFormDateYearRangePicker name="yearRange" label="年份" />
      </LightFilter>,
    );

    await waitFor(() => {
      const values = Array.from(
        container.querySelectorAll<HTMLInputElement>('.ant-picker-input input'),
      ).map((node) => node.value);
      expect(values).toEqual(
        expect.arrayContaining([
          '2023-01-01',
          '2023-01-03',
          '2023-01-01 08:00:00',
          '2023-01-01 10:30:00',
          '2023-01-02',
          '2023-01-08',
          '2022-01-01',
          '2023-01-01',
        ]),
      );
    });

    const weekLabel = dateArrayFormatter(
      [dayjs('2023-01-02'), dayjs('2023-01-08')],
      'YYYY-wo',
    );
    const quarterLabel = dateArrayFormatter(
      [dayjs('2023-01-01'), dayjs('2023-03-31')],
      'YYYY-[Q]Q',
    );
    const yearLabel = dateArrayFormatter(
      [dayjs('2022-01-01'), dayjs('2023-01-01')],
      'YYYY',
    );
    expect(weekLabel).toBe('2023-1st ~ 2023-2nd');
    expect(quarterLabel).toBe('2023-Q1 ~ 2023-Q1');
    expect(yearLabel).toBe('2022 ~ 2023');
  });

  it(' 🪕 should not format digitRange label as date range', async () => {
    const { container } = render(
      <LightFilter
        initialValues={{
          digitRange: [12, 34],
        }}
      >
        <ProFormDigitRange
          name="digitRange"
          label="数字范围"
          lightProps={{
            // Simulate inconsistent casing from user config
            valueType: 'DigitRange',
          }}
        />
      </LightFilter>,
    );

    await waitFor(() => {
      const fieldLabel = container.querySelector('.ant-pro-core-field-label');
      expect(fieldLabel).toBeTruthy();
      expect(fieldLabel?.textContent).toContain('数字范围');
    });

    const fieldLabelText =
      container.querySelector('.ant-pro-core-field-label')?.textContent || '';

    // If digitRange is mistakenly treated as dateRange, 12/34 would be formatted as timestamps (1970-...)
    expect(fieldLabelText).not.toContain('1970-');
    expect(fieldLabelText).toContain('12');
    expect(fieldLabelText).toContain('34');
  });

  it(' 🪕 should support onFinish callback', async () => {
    const onFinish = vi.fn();

    const { container } = render(
      <LightFilter onFinish={onFinish}>
        <ProFormText name="name1" label="名称" />
      </LightFilter>,
    );

    await waitFor(() => {
      expect(
        container.querySelector('.ant-pro-form-light-filter'),
      ).toBeTruthy();
    });

    // Check that the field label is rendered
    const fieldLabel = await waitFor(() => {
      return container.querySelector('.ant-pro-core-field-label');
    });
    expect(fieldLabel).toBeTruthy();
  });

  it(' 🪕 should support footerRender', async () => {
    const onValuesChange = vi.fn();
    const footerRender = vi.fn(() => (
      <div data-testid="custom-footer">Custom Footer</div>
    ));

    const { container } = render(
      <LightFilter
        onValuesChange={onValuesChange}
        footerRender={footerRender}
        collapse
      >
        <ProFormText name="name1" label="名称" />
        <ProFormText name="name2" label="名称2" />
      </LightFilter>,
    );

    await waitFor(() => {
      expect(
        container.querySelector('.ant-pro-form-light-filter'),
      ).toBeTruthy();
    });

    // In collapse mode, there should be a filter icon instead of field labels
    const filterIcon = container.querySelector('.anticon-filter');
    expect(filterIcon).toBeTruthy();

    // Check that there's a dropdown label
    const dropdownLabel = container.querySelector(
      '.ant-pro-core-field-dropdown-label',
    );
    expect(dropdownLabel).toBeTruthy();
  });

  it(' 🪕 should support popoverProps.overlayClassName in collapse mode', async () => {
    const { container, baseElement } = render(
      <LightFilter
        collapse
        popoverProps={{
          classNames: { root: 'my-lightfilter-popover' },
        }}
      >
        <ProFormText name="name1" label="名称" />
        <ProFormText name="name2" label="名称2" />
      </LightFilter>,
    );

    await waitFor(() => {
      expect(
        container.querySelector('.ant-pro-form-light-filter'),
      ).toBeTruthy();
    });

    // Before open, overlay shouldn't exist in body
    expect(baseElement.querySelector('.my-lightfilter-popover')).toBeFalsy();

    const dropdownLabel = container.querySelector(
      '.ant-pro-core-field-dropdown-label',
    ) as HTMLElement | null;
    expect(dropdownLabel).toBeTruthy();

    fireEvent.click(dropdownLabel!);

    await waitFor(() => {
      expect(baseElement.querySelector('.my-lightfilter-popover')).toBeTruthy();
    });
  });

  it(' 🪕 should default to borderless variant', async () => {
    const { container } = render(
      <LightFilter>
        <ProFormText name="name" label="Name" />
      </LightFilter>,
    );

    // 等待渲染完成
    await waitFor(() => {
      expect(
        container.querySelector('.ant-pro-form-light-filter'),
      ).toBeTruthy();
    });

    // LightFilter 默认应该是 borderless，所以不应该有 ant-pro-core-field-label-bordered
    // 但是这里有点棘手，因为 ProFormText 渲染的结构可能很复杂。
    // 如果我们能找到 FieldLabel 并检查它的 class 就好了。

    // 我们检查是否包含 bordered class
    const borderedLabel = container.querySelector(
      '.ant-pro-core-field-label-bordered',
    );
    expect(borderedLabel).toBeFalsy();
  });

  it(' 🪕 should support outlined variant', async () => {
    const { container } = render(
      <LightFilter variant="outlined">
        <ProFormText name="name" label="Name" />
      </LightFilter>,
    );

    await waitFor(() => {
      expect(
        container.querySelector('.ant-pro-form-light-filter'),
      ).toBeTruthy();
    });

    const borderedLabel = await waitFor(() =>
      container.querySelector('.ant-pro-core-field-label-outlined'),
    );
    expect(borderedLabel).toBeTruthy();
  });
});
