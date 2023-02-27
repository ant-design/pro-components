import {
  LightFilter,
  ProFormDatePicker,
  ProFormDateRangePicker,
  ProFormDateTimePicker,
  ProFormRadio,
  ProFormSelect,
  ProFormSlider,
  ProFormText,
  ProFormTimePicker,
} from '@ant-design/pro-form';
import { act, fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import dayjs from 'dayjs';
import KeyCode from 'rc-util/es/KeyCode';
import { waitForComponentToPaint } from '../util';

describe('LightFilter', () => {
  it(' 🪕 basic use', async () => {
    const onValuesChange = jest.fn();
    const onFinish = jest.fn();
    const { container } = render(
      <LightFilter
        initialValues={{
          name1: 'yutingzhao1991',
          name3: '2020-08-19',
        }}
        onFinish={onFinish}
        onValuesChange={(_, values) => onValuesChange(values)}
      >
        <ProFormText name="name1" label="名称" />
        <ProFormText name="name2" label="地址" secondary />
        <ProFormDatePicker name="name3" label="日期" />
      </LightFilter>,
    );

    expect(container.querySelectorAll('div.ant-col.ant-form-item-control')).toHaveLength(2);
    expect(container.querySelectorAll('.ant-pro-core-field-label')[0]).toHaveTextContent(
      '名称: yutingzhao1991',
    );
    expect(container.querySelectorAll('.ant-pro-core-field-label')[1]).toHaveTextContent(
      '日期: 2020-08-19',
    );

    await userEvent.click(container.querySelectorAll('.ant-pro-core-field-label')[0]);
    fireEvent.change(screen.getByDisplayValue('yutingzhao1991'), {
      target: {
        value: 'name1 update',
      },
    });
    await userEvent.click(await screen.findByText('确 认'));

    expect(onValuesChange).toHaveBeenCalledWith({
      name1: 'name1 update',
      name3: '2020-08-19',
    });

    await userEvent.click(screen.getByText('更多筛选'));

    expect(screen.getByLabelText('地址')).toBeInTheDocument();

    fireEvent.change(screen.getAllByPlaceholderText('请输入')[1], {
      target: {
        value: 'new value',
      },
    });

    await userEvent.click(await screen.findAllByText('确 认')[1]);

    expect(onValuesChange).toHaveBeenCalledWith({
      name1: 'name1 update',
      name2: 'new value',
      name3: '2020-08-19',
    });
    expect(onFinish).toHaveBeenCalledWith({
      name1: 'name1 update',
      name2: 'new value',
      name3: '2020-08-19',
    });

    await userEvent.click(screen.getByText('2020-08-19'));
    await userEvent.click(await screen.findByTitle('2020-08-01'));

    expect(onFinish).toHaveBeenCalledWith({
      name1: 'name1 update',
      name2: 'new value',
      name3: '2020-08-01',
    });

    await userEvent.click(
      container.querySelectorAll('.ant-pro-core-field-label .anticon-close')[0],
    );

    expect(onValuesChange).toHaveBeenCalledWith({
      name2: 'new value',
      name3: '2020-08-01',
    });
    expect(onFinish).toHaveBeenCalledWith({
      name2: 'new value',
      name3: '2020-08-01',
    });
    expect(container.querySelectorAll('div.ant-col.ant-form-item-control')).toHaveLength(2);
  });

  it(' 🪕 single select', async () => {
    const { container, unmount } = render(
      <LightFilter
        initialValues={{
          name: 'Jack2',
        }}
      >
        <ProFormSelect
          label="名称"
          name="name"
          valueEnum={{
            Jack: '杰克',
            Jack2: '杰克2',
            TechUI: 'TechUI',
          }}
        />
      </LightFilter>,
    );

    expect(container.querySelector('.ant-pro-core-field-label')).toHaveTextContent('名称: 杰克2');
    expect(container.querySelectorAll('.ant-pro-core-field-label-arrow.anticon-down')).toHaveLength(
      1,
    );

    await userEvent.click(container.querySelector('.ant-pro-core-field-label')!);

    expect(container.querySelectorAll('.ant-pro-core-field-label-arrow.anticon-down')).toHaveLength(
      1,
    );

    await userEvent.click(await screen.findByText('杰克'));

    expect(container.querySelector('.ant-pro-core-field-label')).toHaveTextContent('名称: 杰克');

    await userEvent.click(container.querySelector('.ant-pro-core-field-label .anticon-close')!);

    expect(container.querySelector('.ant-pro-core-field-label')).toHaveTextContent('名称');
    unmount();
  });

  it(' 🪕 QueryFilter FormItem support footerRender', async () => {
    const { container, unmount } = render(
      <LightFilter
        initialValues={{
          name: 'Jack2',
        }}
        collapse
        footerRender={false}
      >
        <ProFormText name="name" label="名称" />
      </LightFilter>,
    );

    expect(container.querySelectorAll('.ant-pro-form-light-filter-effective')).toHaveLength(1);

    await userEvent.click(container.querySelector('.ant-pro-form-light-filter-container')!);

    expect(container.querySelectorAll('.ant-pro-core-dropdown-footer')).toHaveLength(0);
    unmount();
  });

  it(' 🪕 QueryFilter FormItem support footer', async () => {
    const { container, unmount } = render(
      <LightFilter
        initialValues={{
          name: 'Jack2',
        }}
      >
        <ProFormText footerRender={false} name="name1" label="名称" />
      </LightFilter>,
    );

    await userEvent.click(container.querySelectorAll('.ant-pro-core-field-label')[0]);

    expect(container.querySelectorAll('.ant-pro-core-dropdown-footer')).toHaveLength(0);
    unmount();
  });

  it(' 🪕 select showSearch', async () => {
    const { container, unmount } = render(
      <LightFilter
        initialValues={{
          name: 'Jack2',
        }}
      >
        <ProFormSelect
          showSearch
          label="名称"
          name="name"
          valueEnum={{
            Jack: '杰克',
            Jack2: '杰克2',
            TechUI: 'TechUI',
          }}
        />
      </LightFilter>,
    );

    expect(container.querySelector('.ant-pro-core-field-label')).toHaveTextContent('名称: 杰克2');
    expect(container.querySelectorAll('.ant-pro-core-field-label-arrow.anticon-down')).toHaveLength(
      1,
    );

    await userEvent.click(container.querySelector('.ant-pro-core-field-label')!);

    expect(container.querySelectorAll('.ant-pro-core-field-label-arrow.anticon-down')).toHaveLength(
      1,
    );

    fireEvent.change(await screen.findByRole('textbox'), {
      target: {
        value: 'tech',
      },
    });
    await userEvent.click(await screen.findByTitle('TechUI'));

    expect(container.querySelector('.ant-pro-core-field-label')).toHaveTextContent('名称: TechUI');

    await userEvent.click(container.querySelector('.ant-pro-core-field-label .anticon-close')!);

    expect(container.querySelector('.ant-pro-core-field-label')).toHaveTextContent('名称');
    unmount();
  });

  it(' 🪕 multiple select showSearch', async () => {
    const { container, unmount } = render(
      <LightFilter
        initialValues={{
          name: ['Jack2'],
        }}
      >
        <ProFormSelect
          showSearch
          label="名称"
          name="name"
          mode="multiple"
          valueEnum={{
            Jack: '杰克',
            Jack2: '杰克2',
            TechUI: 'TechUI',
            long: 'YES这是一个很长很长的测试阿aa阿ABCDEFGHIJKLM',
          }}
        />
      </LightFilter>,
    );

    expect(container.querySelector('.ant-pro-core-field-label')).toHaveTextContent('名称: 杰克2');
    expect(container.querySelectorAll('.ant-pro-core-field-label-arrow.anticon-down')).toHaveLength(
      1,
    );

    await userEvent.click(container.querySelector('.ant-pro-core-field-label')!);

    expect(container.querySelectorAll('.ant-pro-core-field-label-arrow.anticon-down')).toHaveLength(
      1,
    );

    fireEvent.change(await screen.findByRole('textbox'), {
      target: {
        value: 'tech',
      },
    });
    await userEvent.click(await screen.findByTitle('TechUI'));
    fireEvent.change(await screen.findByRole('textbox'), {
      target: {
        value: 'YES',
      },
    });
    await userEvent.click(await screen.findByTitle('YES这是一个很长很长的测试阿aa阿ABCDEFGHIJKLM'));

    expect(container.querySelector('.ant-pro-core-field-label')?.textContent).toEqual(
      '名称: 杰克2,TechUI,YES这是一个很长很长的测试阿aa阿ABCDEFGHIJKL...3项',
    );

    fireEvent.keyDown(await screen.findByRole('textbox'), {
      target: {
        which: KeyCode.BACKSPACE,
      },
    });

    expect(container.querySelector('.ant-pro-core-field-label')?.textContent).toEqual(
      '名称: 杰克2,TechUI,YES这是一个很长很长的测试阿aa阿ABCDEFGHIJKL...3项',
    );
    unmount();
  });

  it(' 🪕 DateRangePicker', async () => {
    const onFinish = jest.fn();
    const { baseElement, container, unmount } = render(
      <LightFilter onFinish={onFinish}>
        <ProFormDateRangePicker name="date" label="日期范围" />
      </LightFilter>,
    );

    expect(container.querySelector('.ant-pro-core-field-label')).toHaveTextContent('日期范围');

    await userEvent.click(container.querySelector('.ant-pro-core-field-label')!);
    await userEvent.click(screen.getAllByPlaceholderText('请选择')[0]);
    await userEvent.click(baseElement.querySelectorAll('.ant-picker-cell-inner')[2]);
    await userEvent.click(baseElement.querySelectorAll('.ant-picker-cell-inner')[12]);
    await userEvent.click(await screen.findByText('确 认'));

    expect(container.querySelector('.ant-pro-core-field-label')?.textContent).toMatchSnapshot();
    expect(onFinish).toHaveBeenCalledWith({ date: ['2016-11-01', '2016-11-11'] });

    await userEvent.click(container.querySelector('.ant-pro-core-field-label .anticon-close')!);

    expect(container.querySelector('.ant-pro-core-field-label')?.textContent).toEqual('日期范围');

    // 测试第二次再打开的情况
    await userEvent.click(container.querySelector('.ant-pro-core-field-label')!);
    await userEvent.click(screen.getAllByPlaceholderText('请选择')[0]);
    await userEvent.click(baseElement.querySelectorAll('.ant-picker-cell-inner')[2]);
    await userEvent.click(baseElement.querySelectorAll('.ant-picker-cell-inner')[12]);
    await userEvent.click(await screen.findByText('确 认'));

    expect(container.querySelector('.ant-pro-core-field-label')?.textContent).toMatchSnapshot();
    unmount();
  });

  it(' 🪕 DateTimePicker', async () => {
    const onFinish = jest.fn();
    const { container, unmount } = render(
      <LightFilter onFinish={onFinish}>
        <ProFormDateTimePicker name="datetime" label="日期时间" />
      </LightFilter>,
    );

    expect(container.querySelector('.ant-pro-core-field-label')).toHaveTextContent('日期时间');

    await userEvent.click(container.querySelector('.ant-pro-core-field-label')!);
    await userEvent.click(await screen.findByText('此刻'));

    expect(onFinish).toHaveBeenCalledWith({ datetime: '2016-11-22 15:22:44' });
    expect(container.querySelector('.ant-pro-core-field-label')?.textContent).toMatchSnapshot();
    unmount();
  });

  it(' 🪕 TimePicker', async () => {
    const onFinish = jest.fn();
    const { container, unmount } = render(
      <LightFilter onFinish={onFinish}>
        <ProFormTimePicker name="time" label="时间" />
      </LightFilter>,
    );

    expect(container.querySelector('.ant-pro-core-field-label')).toHaveTextContent('时间');

    await userEvent.click(container.querySelector('.ant-pro-core-field-label')!);
    await userEvent.click(await screen.findByText('此刻'));

    expect(container.querySelector('.ant-pro-core-field-label')).toHaveTextContent(
      '时间: 15:22:44',
    );
    expect(onFinish).toHaveBeenCalledWith({ time: '15:22:44' });
    unmount();
  });

  it(' 🪕 ProFormRadio', async () => {
    const onFinish = jest.fn();
    const { container, unmount } = render(
      <LightFilter
        onFinish={onFinish}
        initialValues={{
          radio: 'quarterly',
        }}
      >
        <ProFormRadio.Group
          name="radio"
          radioType="button"
          options={[
            {
              value: 'weekly',
              label: '每周',
            },
            {
              value: 'quarterly',
              label: '每季度',
            },
            {
              value: 'monthly',
              label: '每月',
            },
            {
              value: 'yearly',
              label: '每年',
            },
          ]}
        />
      </LightFilter>,
    );

    expect(
      container.querySelector('.ant-radio-button-wrapper.ant-radio-button-wrapper-checked'),
    ).toHaveTextContent('每季度');

    await userEvent.click(screen.getByText('每年'));

    expect(
      container.querySelector('.ant-radio-button-wrapper.ant-radio-button-wrapper-checked'),
    ).toHaveTextContent('每年');
    expect(onFinish).toHaveBeenCalledWith({ radio: 'yearly' });
    unmount();
  });

  it(' 🪕 collapse mode', async () => {
    const onChange = jest.fn();
    const { container, unmount } = render(
      <LightFilter
        onValuesChange={(values) => {
          onChange(values.name);
        }}
        collapse
        collapseLabel={<div className="collapselabel">open</div>}
        initialValues={{
          name: ['ant'],
        }}
      >
        <ProFormSelect
          label="名称"
          name="name"
          mode="multiple"
          valueEnum={{
            Bigfish: '大鱼',
            ant: '蚂蚁',
            TechUI: 'TechUI',
            long: '这个是一个特别长特别长的选项，选择之后会截断',
          }}
        />
        <ProFormDateRangePicker label="时间范围" name="range2" />
      </LightFilter>,
    );

    expect(container.querySelector('.collapselabel')).toHaveTextContent('open');
    expect(container.querySelectorAll('.ant-pro-form-light-filter-effective')).toHaveLength(1);

    await userEvent.click(container.querySelector('.collapselabel')!);
    expect(screen.getByText('蚂蚁')).toBeInTheDocument();

    await userEvent.click(screen.getByText('清除'));
    await userEvent.click(screen.getByText('确 认'));

    expect(onChange).toHaveBeenCalledWith(undefined);
    expect(container.querySelectorAll('.ant-pro-form-light-filter-effective')).toHaveLength(0);
    unmount();
  });

  it(' 🪕 allowClear false', async () => {
    const { container, unmount } = render(
      <LightFilter
        initialValues={{
          name1: 'yutingzhao1991',
          name3: '2020-08-19',
          sex: 'woman',
        }}
        onFinish={async (values) => console.log(values)}
      >
        <ProFormSelect
          name="sex"
          label="性别"
          showSearch
          allowClear={false}
          valueEnum={{
            man: '男',
            woman: '女',
          }}
        />
        <ProFormText name="name1" label="名称" allowClear={false} />
        <ProFormDatePicker name="name3" label="不能清空的日期" allowClear={false} />
        <ProFormSelect
          name="sex"
          label="性别"
          showSearch
          fieldProps={{
            allowClear: false,
          }}
          valueEnum={{
            man: '男',
            woman: '女',
          }}
        />
        <ProFormText
          name="name4"
          label="名称"
          fieldProps={{
            allowClear: false,
          }}
        />
        <ProFormDatePicker
          name="name5"
          label="不能清空的日期"
          fieldProps={{
            allowClear: false,
          }}
        />
      </LightFilter>,
    );

    expect(container.querySelectorAll('.ant-pro-core-field-label .anticon-close')).toHaveLength(0);
    await userEvent.click(container.querySelectorAll('.ant-pro-core-field-label')[1]);

    expect(await screen.findByDisplayValue('yutingzhao1991')).toBeInTheDocument();
    expect(container.querySelectorAll('.ant-input-suffix .close-circle')).toHaveLength(0);
    unmount();
  });

  it('🪕 ProFormField support lightProps', () => {
    const html = render(
      <LightFilter
        initialValues={{
          range: [1000000000, 1500000000],
        }}
      >
        <ProFormSlider
          name="range"
          label="活跃时间"
          range
          fieldProps={{
            min: 1000000000,
            max: 2000000000,
            tooltip: {
              formatter: (v: number | undefined) => (
                <div>{v ? dayjs.unix(v).format('YYYY-MM-DD HH:mm:ss') : 0}</div>
              ),
            },
          }}
          lightProps={{
            allowClear: false,
            labelFormatter: (values) => {
              return values
                ?.map((value: number) => {
                  return dayjs.unix(value).format('YYYY-MM-DD HH:mm:ss');
                })
                .join('~');
            },
          }}
        />
      </LightFilter>,
    );

    waitForComponentToPaint(100);
    const inputDom = html.findAllByText('活跃时间: 2001-09-09 01:46:40~2017-07-14 0...2项');
    expect(!!inputDom).toBeTruthy();
  });

  it('🪕 lightFilter lightWrapper support placement', async () => {
    const wrapper = render(
      <LightFilter
        initialValues={{
          name1: 'yutingzhao1991',
          name3: '2020-08-19',
          sex: 'man',
        }}
        placement="topRight"
        onFinish={async (values) => console.log(values)}
      >
        <ProFormSelect
          name="sex"
          label="性别"
          showSearch
          fieldProps={{
            allowClear: false,
          }}
          valueEnum={{
            man: '男',
            woman: '女',
          }}
        />
      </LightFilter>,
    );
    act(() => {
      wrapper.baseElement
        .querySelectorAll<HTMLDivElement>('.ant-pro-core-field-label')[0]
        .click?.();
    });
    waitForComponentToPaint(wrapper, 100);

    expect(
      !!wrapper.baseElement.querySelector('.ant-pro-field-select-light-select-container-topRight'),
    ).toBeTruthy();
  });

  it('🪕 lightFilter support placement', async () => {
    const wrapper = render(
      <LightFilter
        initialValues={{
          name1: 'yutingzhao1991',
          name3: '2020-08-19',
          sex: 'man',
        }}
        placement="bottomLeft"
        onFinish={async (values) => console.log(values)}
      >
        <ProFormText
          name="name4"
          label="名称"
          fieldProps={{
            allowClear: false,
          }}
        />
      </LightFilter>,
    );
    act(() => {
      wrapper.baseElement
        .querySelectorAll<HTMLDivElement>('.ant-pro-core-field-dropdown-label')[0]
        .click?.();
    });
    waitForComponentToPaint(wrapper, 100);

    expect(
      !!wrapper.baseElement.querySelector('.ant-pro-core-field-dropdown-overlay-bottomLeft'),
    ).toBeTruthy();
  });

  it('🪕 component placement priority should higher then lightFilter', async () => {
    const wrapper = render(
      <LightFilter
        initialValues={{
          name1: 'yutingzhao1991',
          name3: '2020-08-19',
          sex: 'man',
        }}
      >
        <ProFormSelect
          name="sex"
          label="性别"
          showSearch
          fieldProps={{
            allowClear: false,
            placement: 'bottomRight',
          }}
          valueEnum={{
            man: '男',
            woman: '女',
          }}
        />
      </LightFilter>,
    );

    act(() => {
      // 两种加载模式都需要判断（需要lightWrapper和不需要的）
      wrapper.baseElement
        .querySelectorAll<HTMLDivElement>('.ant-pro-core-field-label')[0]
        .click?.();
    });
    waitForComponentToPaint(wrapper, 100);
    expect(
      !!wrapper.baseElement.querySelector(
        '.ant-pro-field-select-light-select-container-bottomRight',
      ),
    ).toBeTruthy();
  });

  it('🪕 optionFilterProp props work', async () => {
    const { rerender } = render(
      <LightFilter>
        <ProFormSelect
          name="sex"
          label="性别"
          showSearch
          fieldProps={{
            optionFilterProp: 'label',
          }}
          options={[
            { label: '男', value: 'aaa' },
            { label: '女', value: 'bbb' },
          ]}
        />
      </LightFilter>,
    );

    await userEvent.click(await screen.findByText('性别'));
    fireEvent.change(await screen.findByRole('textbox'), {
      target: {
        value: '男',
      },
    });

    expect(screen.getByLabelText('男')).toBeInTheDocument();

    fireEvent.change(await screen.findByRole('textbox'), {
      target: {
        value: 'aaa',
      },
    });

    expect(screen.queryByLabelText('男')).not.toBeInTheDocument();

    rerender(
      <LightFilter>
        <ProFormSelect
          name="sex"
          label="性别"
          showSearch
          fieldProps={{
            optionFilterProp: 'value',
          }}
          options={[
            { label: '男', value: 'aaa' },
            { label: '女', value: 'bbb' },
          ]}
        />
      </LightFilter>,
    );

    fireEvent.change(await screen.findByRole('textbox'), {
      target: {
        value: '女',
      },
    });

    expect(screen.queryByLabelText('女')).not.toBeInTheDocument();

    fireEvent.change(await screen.findByRole('textbox'), {
      target: {
        value: 'bbb',
      },
    });

    expect(screen.getByLabelText('女')).toBeInTheDocument();
  });
});
