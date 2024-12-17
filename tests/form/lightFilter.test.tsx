import {
  LightFilter,
  ProFormDatePicker,
  ProFormDateRangePicker,
  ProFormDateTimePicker,
  ProFormSelect,
  ProFormSlider,
  ProFormText,
  ProFormTimePicker,
} from '@ant-design/pro-form';
import {
  cleanup,
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import dayjs from 'dayjs';
import KeyCode from 'rc-util/es/KeyCode';
import { act } from 'react';

afterEach(() => {
  cleanup();
});

describe('LightFilter', () => {
  it(' 🪕 basic use text', async () => {
    const onValuesChange = vi.fn();
    const onFinish = vi.fn();

    const { container } = render(
      <LightFilter
        initialValues={{
          name1: 'yutingzhao1991',
        }}
        onFinish={onFinish}
        onValuesChange={(_, values) => onValuesChange(values)}
      >
        <ProFormText name="name1" label="名称" />
      </LightFilter>,
    );
    await waitFor(() => {
      expect(
        container.querySelectorAll('div.ant-col.ant-form-item-control'),
      ).toHaveLength(1);
      expect(
        container.querySelectorAll('.ant-pro-core-field-label')[0],
      ).toHaveTextContent('名称: yutingzhao1991');
    });

    await act(() => {
      return userEvent.click(
        container.querySelector('.ant-pro-core-field-label')!,
      );
    });

    await waitFor(() => {
      expect(screen.getByDisplayValue('yutingzhao1991')).toBeInTheDocument();
    });

    await act(() => {
      return fireEvent.change(screen.getByDisplayValue('yutingzhao1991'), {
        target: {
          value: 'name1 update',
        },
      });
    });

    await act(async () => {
      return userEvent.click(await screen.findByText('确 认'));
    });

    await waitFor(
      () => {
        expect(onFinish).toHaveBeenCalledWith({
          name1: 'name1 update',
        });
      },
      {
        timeout: 1000,
      },
    );

    await waitFor(() => {
      expect(onValuesChange).toHaveBeenCalledWith({
        name1: 'name1 update',
      });
    });

    act(() => {
      userEvent.click(container.querySelector('.anticon-close-circle')!);
    });

    await waitFor(() => {
      expect(onValuesChange).toHaveBeenCalledWith({
        name1: undefined,
      });
    });
  });
  it(' 🪕 basic use secondary', async () => {
    const onValuesChange = vi.fn();
    const onFinish = vi.fn();
    render(
      <LightFilter
        onFinish={onFinish}
        onValuesChange={(_, values) => onValuesChange(values)}
      >
        <ProFormText name="name2" label="地址" secondary />
      </LightFilter>,
    );

    act(() => {
      userEvent.click(screen.getByText('更多筛选'));
    });

    await waitFor(
      () => {
        expect(screen.getByText('地址')).toBeInTheDocument();
      },
      {
        timeout: 1000,
      },
    );

    act(() => {
      fireEvent.change(screen.getByPlaceholderText('请输入'), {
        target: {
          value: 'new value',
        },
      });
    });

    await waitFor(
      () => {
        expect(onFinish).toHaveBeenCalledWith({
          name2: 'new value',
        });
      },
      {
        timeout: 1000,
      },
    );

    await waitFor(() => {
      expect(onValuesChange).toHaveBeenCalledWith({
        name2: 'new value',
      });
    });
  });

  it(' 🪕 basic use DatePicker', async () => {
    const onValuesChange = vi.fn();
    const onFinish = vi.fn();
    const { container } = render(
      <LightFilter
        initialValues={{
          name3: '2020-08-19',
        }}
        onFinish={onFinish}
        onValuesChange={(_, values) => onValuesChange(values)}
      >
        <ProFormDatePicker name="name3" label="日期" />
      </LightFilter>,
    );

    await waitFor(
      async () => {
        expect(
          await screen.findByDisplayValue('2020-08-19'),
        ).toBeInTheDocument();
      },
      {
        timeout: 1000,
      },
    );

    await act(async () => {
      userEvent.click(await screen.findByDisplayValue('2020-08-19'));
    });

    await waitFor(
      async () => {
        return screen.findByTitle('2020-08-01');
      },
      {
        timeout: 1000,
      },
    );

    await act(async () => {
      userEvent.click(await screen.findByTitle('2020-08-01'));
    });

    await waitFor(
      () => {
        expect(onFinish).toHaveBeenCalledWith({
          name3: '2020-08-01',
        });
      },
      {
        timeout: 1000,
      },
    );

    await waitFor(async () => {
      expect(onValuesChange).toHaveBeenCalledWith({
        name3: '2020-08-01',
      });
    });

    await act(async () => {
      fireEvent.mouseDown(
        container.querySelector('.ant-pro-core-field-label .ant-picker-clear')!,
      );
      fireEvent.mouseUp(
        container.querySelector('.ant-pro-core-field-label .ant-picker-clear')!,
      );
      fireEvent.click(
        container.querySelector('.ant-pro-core-field-label .ant-picker-clear')!,
      );
    });

    await waitFor(
      async () => {
        expect(onValuesChange).toHaveBeenCalledWith({});
        expect(onFinish).toHaveBeenCalledWith({});
      },
      {
        timeout: 1000,
      },
    );
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

    expect(
      container.querySelector('.ant-pro-core-field-label'),
    ).toHaveTextContent('名称: 杰克2');
    expect(
      container.querySelectorAll(
        '.ant-pro-core-field-label-arrow.anticon-down',
      ),
    ).toHaveLength(1);

    act(() => {
      userEvent.click(container.querySelector('.ant-pro-core-field-label')!);
    });

    expect(
      container.querySelectorAll(
        '.ant-pro-core-field-label-arrow.anticon-down',
      ),
    ).toHaveLength(1);

    await waitFor(() => screen.findByText('杰克'));

    await act(async () => {
      userEvent.click(await screen.findByText('杰克'));
    });
    expect(
      container.querySelector('.ant-pro-core-field-label'),
    ).toHaveTextContent('名称: 杰克');

    await act(async () => {
      userEvent.click(
        container.querySelector('.ant-pro-core-field-label .anticon-close')!,
      );
    });

    expect(
      container.querySelector('.ant-pro-core-field-label'),
    ).toHaveTextContent('名称');
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

    expect(
      container.querySelectorAll('.ant-pro-form-light-filter-effective'),
    ).toHaveLength(1);

    await userEvent.click(
      container.querySelector('.ant-pro-form-light-filter-container')!,
    );

    expect(
      container.querySelectorAll('.ant-pro-core-dropdown-footer'),
    ).toHaveLength(0);
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

    await userEvent.click(
      container.querySelectorAll('.ant-pro-core-field-label')[0],
    );

    expect(
      container.querySelectorAll('.ant-pro-core-dropdown-footer'),
    ).toHaveLength(0);
    unmount();
  });

  it(' 🪕 select showSearch', async () => {
    const { container, ...warp } = render(
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

    await waitFor(() => {
      expect(
        container.querySelector('.ant-pro-core-field-label'),
      ).toHaveTextContent('名称: 杰克2');
      expect(
        container.querySelectorAll(
          '.ant-pro-core-field-label-arrow.anticon-down',
        ),
      ).toHaveLength(1);
    });

    act(() => {
      userEvent.click(container.querySelector('.ant-pro-core-field-label')!);
    });

    await waitFor(() => {
      expect(
        container.querySelectorAll(
          '.ant-pro-core-field-label-arrow.anticon-down',
        ),
      ).toHaveLength(1);
    });

    await waitFor(
      () => {
        return warp.findByRole('textbox');
      },
      { timeout: 1000 },
    );

    await act(async () => {
      fireEvent.change(await warp.findByRole('textbox'), {
        target: {
          value: 'tech',
        },
      });
    });

    await act(async () => {
      userEvent.click(await warp.findByTitle('TechUI'));
    });

    await waitFor(() => {
      expect(
        container.querySelector('.ant-pro-core-field-label'),
      ).toHaveTextContent('名称: TechUI');
    });

    act(() => {
      userEvent.click(
        container.querySelector('.ant-pro-core-field-label .anticon-close')!,
      );
    });

    await waitFor(() => {
      expect(
        container.querySelector('.ant-pro-core-field-label'),
      ).toHaveTextContent('名称');
    });
  });

  it(' 🪕 select open true', async () => {
    const html = render(
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
          fieldProps={{
            open: true,
          }}
        />
      </LightFilter>,
    );

    await waitFor(() => {
      expect(
        html.baseElement.querySelectorAll('.ant-select-dropdown').length,
      ).toEqual(1);
    });
  });

  it(' 🪕 select open false', async () => {
    const html = render(
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
          fieldProps={{
            open: false,
          }}
        />
      </LightFilter>,
    );

    await waitFor(() => {
      expect(
        html.baseElement.querySelectorAll('.ant-select-dropdown').length,
      ).toEqual(0);
    });
  });

  it(' 🪕 multiple select showSearch', async () => {
    vi.useFakeTimers();
    const { container } = render(
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

    await waitFor(() => {
      expect(
        container.querySelector('.ant-pro-core-field-label'),
      ).toHaveTextContent('名称: 杰克2');
      expect(
        container.querySelectorAll(
          '.ant-pro-core-field-label-arrow.anticon-down',
        ),
      ).toHaveLength(1);
    });

    await act(async () => {
      userEvent.click(container.querySelector('.ant-pro-core-field-label')!);
    });

    await act(async () => {
      vi.runOnlyPendingTimers();
    });

    await waitFor(() => {
      expect(
        container.querySelectorAll(
          '.ant-pro-core-field-label-arrow.anticon-down',
        ),
      ).toHaveLength(1);
    });

    await act(async () => {
      vi.runOnlyPendingTimers();
    });

    await act(async () => {
      fireEvent.change(await screen.findByRole('textbox'), {
        target: {
          value: 'tech',
        },
      });
    });

    await act(async () => {
      userEvent.click(await screen.findByTitle('TechUI'));
    });

    await act(async () => {
      vi.runOnlyPendingTimers();
    });

    await waitFor(() => {
      expect(
        container.querySelector('.ant-pro-core-field-label')?.textContent,
      ).toEqual('名称: 杰克2,TechUI');
    });

    await act(async () => {
      fireEvent.change(await screen.findByRole('textbox'), {
        target: {
          value: 'YES',
        },
      });
    });

    await act(async () => {
      vi.runOnlyPendingTimers();
    });

    await act(async () => {
      userEvent.click(
        await screen.findByTitle(
          'YES这是一个很长很长的测试阿aa阿ABCDEFGHIJKLM',
        ),
      );
    });

    await act(async () => {
      vi.runOnlyPendingTimers();
    });

    await waitFor(() => {
      expect(
        container.querySelector('.ant-pro-core-field-label')?.textContent,
      ).toEqual(
        '名称: 杰克2,TechUI,YES这是一个很长很长的测试阿aa阿ABCDEFGHIJKL...3项',
      );
    });

    await act(async () => {
      fireEvent.keyDown(await screen.findByRole('textbox'), {
        target: {
          which: KeyCode.BACKSPACE,
        },
      });
    });

    await act(async () => {
      vi.runOnlyPendingTimers();
    });

    await waitFor(() => {
      expect(
        container.querySelector('.ant-pro-core-field-label')?.textContent,
      ).toEqual(
        '名称: 杰克2,TechUI,YES这是一个很长很长的测试阿aa阿ABCDEFGHIJKL...3项',
      );
    });
    vi.useRealTimers();
  });

  it(' 🪕 Base DateRangePicker', async () => {
    const onFinish = vi.fn();
    const onOpenChange = vi.fn();
    const onLoadingChange = vi.fn();
    const { baseElement, container } = render(
      <LightFilter
        onFinish={async (e) => {
          return new Promise((resolve) => {
            setTimeout(() => {
              onFinish(e);
              resolve(true);
            }, 100);
          });
        }}
        onLoadingChange={(e) => {
          onLoadingChange(e);
        }}
      >
        <ProFormDateRangePicker
          name="date"
          fieldProps={{
            onOpenChange(open) {
              onOpenChange(open);
            },
          }}
          label="日期范围"
        />
      </LightFilter>,
    );

    await screen.findAllByText('日期范围');

    expect(
      container.querySelector('.ant-pro-core-field-label'),
    ).toHaveTextContent('日期范围');

    const dom = await screen.findByText('日期范围');
    await act(async () => {
      userEvent.click(dom);
    });

    await waitFor(
      () => {
        return screen.findAllByPlaceholderText('请选择');
      },
      {
        timeout: 2000,
      },
    );

    act(() => {
      userEvent.click(
        screen.getAllByPlaceholderText('请选择')[0]!.parentElement!,
      );
    });

    await waitFor(
      () => {
        expect(onOpenChange).toHaveBeenCalledWith(true);
      },
      {
        timeout: 2000,
      },
    );

    // 随便找个日期，等日期存在了
    await screen.findAllByText('12');

    act(() => {
      userEvent.click(
        baseElement.querySelectorAll('.ant-picker-cell-inner')[2],
      );
    });

    act(() => {
      userEvent.click(
        baseElement.querySelectorAll('.ant-picker-cell-inner')[12],
      );
    });

    act(() => {
      userEvent.click(
        screen.getAllByPlaceholderText('请选择')[1]!.parentElement!,
      );
    });

    act(() => {
      userEvent.click(
        baseElement.querySelectorAll('.ant-picker-cell-inner')[2],
      );
    });

    act(() => {
      userEvent.click(
        baseElement.querySelectorAll('.ant-picker-cell-inner')[12],
      );
    });

    await act(async () => {
      userEvent.click(
        await baseElement.querySelector(
          '.ant-picker-ranges .ant-picker-ok .ant-btn-primary',
        )!,
      );
    });

    await waitFor(
      () => {
        expect(onLoadingChange).toHaveBeenCalledWith(true);
      },
      {
        timeout: 1000,
      },
    );

    await waitFor(
      () => {
        expect(onFinish).toHaveBeenCalledWith({
          date: ['2016-11-02', '2016-11-12'],
        });
      },
      {
        timeout: 2000,
      },
    );

    await waitFor(
      () => {
        expect(onLoadingChange).toHaveBeenCalledWith(false);
      },
      { timeout: 2000 },
    );
    // 等待20s，等待loading消失
    await waitFor(() => {
      expect(
        container
          .querySelector('.ant-pro-core-field-label')
          ?.textContent?.includes('日期范围: '),
      ).toBeTruthy();
    });

    await act(async () => {
      fireEvent.mouseDown(
        container.querySelector(
          '.ant-pro-core-field-label .anticon-close-circle',
        )!,
      );
      fireEvent.mouseUp(
        container.querySelector(
          '.ant-pro-core-field-label .anticon-close-circle',
        )!,
      );
    });

    await waitFor(
      () => {
        expect(onLoadingChange).toHaveBeenCalledWith(true);
      },
      {
        timeout: 1000,
      },
    );

    await waitFor(
      () => {
        expect(onLoadingChange).toHaveBeenCalledWith(false);
      },
      {
        timeout: 2000,
      },
    );

    await waitFor(() => {
      expect(
        container.querySelector('.ant-pro-core-field-label')?.textContent,
      ).toBe('日期范围: ');
    });
  });

  it(' 🪕 DateTimePicker', async () => {
    const onFinish = vi.fn();
    const { container } = render(
      <LightFilter onFinish={onFinish}>
        <ProFormDateTimePicker name="datetime" label="日期时间" />
      </LightFilter>,
    );

    await waitFor(() => {
      expect(
        container.querySelector('.ant-pro-core-field-label'),
      ).toHaveTextContent('日期时间');
    });

    act(() => {
      userEvent.click(container.querySelector('.ant-pro-core-field-label')!);
    });

    await screen.findByText('此刻');

    await act(async () => {
      (await screen.findByText('此刻'))?.click?.();
    });

    await waitFor(
      () => {
        expect(onFinish).toHaveBeenCalledWith({
          datetime: '2016-11-22 15:22:44',
        });
      },
      {
        timeout: 1000,
      },
    );

    await waitFor(() => {
      expect(
        container.querySelector('.ant-pro-core-field-label'),
      ).toMatchSnapshot();
    });
  });

  it(' 🪕 TimePicker', async () => {
    const onFinish = vi.fn();
    const { container, unmount } = render(
      <LightFilter onFinish={onFinish}>
        <ProFormTimePicker name="time" label="时间" />
      </LightFilter>,
    );

    expect(
      container.querySelector('.ant-pro-core-field-label'),
    ).toHaveTextContent('时间');

    act(() => {
      userEvent.click(container.querySelector('.ant-pro-core-field-label')!);
    });

    await waitFor(() => screen.findByText('此刻'));

    await act(async () => {
      (await screen.findByText('此刻'))?.click();
    });
    await waitFor(
      () => {
        expect(
          container.querySelector('.ant-pro-core-field-label'),
        ).toHaveTextContent('时间');
      },
      {
        timeout: 1000,
      },
    );
    expect(onFinish).toHaveBeenCalledWith({ time: '15:22:44' });
    unmount();
  });

  // it(' 🪕 use ProFormRadio', async () => {
  //   const onFinish = vi.fn();
  //   const { container } = render(
  //     <LightFilter
  //       onFinish={onFinish}
  //       initialValues={{
  //         radio: 'quarterly',
  //       }}
  //     >
  //       <ProFormRadio.Group
  //         name="radio"
  //         radioType="button"
  //         options={[
  //           {
  //             value: 'weekly',
  //             label: '每周',
  //           },
  //           {
  //             value: 'quarterly',
  //             label: '每季度',
  //           },
  //           {
  //             value: 'monthly',
  //             label: '每月',
  //           },
  //           {
  //             value: 'yearly',
  //             label: '每年',
  //           },
  //         ]}
  //       />
  //     </LightFilter>,
  //   );
  //   await waitFor(() => {
  //     expect(
  //       container.querySelector(
  //         '.ant-radio-button-wrapper.ant-radio-button-wrapper-checked',
  //       ),
  //     ).toHaveTextContent('每季度');
  //   });

  //   act(() => {
  //     userEvent.click(screen.getByText('每年'));
  //   });
  //   await waitFor(
  //     () => {
  //       expect(onFinish).toHaveBeenCalledWith({ radio: 'yearly' });
  //     },
  //     {
  //       timeout: 1000,
  //     },
  //   );
  //   await waitFor(() => {
  //     expect(
  //       container.querySelector(
  //         '.ant-radio-button-wrapper.ant-radio-button-wrapper-checked',
  //       ),
  //     ).toHaveTextContent('每年');
  //   });
  // });

  it(' 🪕 collapse mode', async () => {
    const onChange = vi.fn();
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
    expect(
      container.querySelectorAll('.ant-pro-form-light-filter-effective'),
    ).toHaveLength(1);

    act(() => {
      userEvent.click(container.querySelector('.collapselabel')!);
    });
    await waitFor(() => {
      expect(screen.getByText('蚂蚁')).toBeInTheDocument();
    });

    act(() => {
      userEvent.click(screen.getByText('清除'));
    });
    act(() => {
      userEvent.click(screen.getByText('确 认'));
    });

    await waitFor(() => {
      expect(onChange).toHaveBeenCalledWith(undefined);
      expect(
        container.querySelectorAll('.ant-pro-form-light-filter-effective'),
      ).toHaveLength(0);
    });
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
        <ProFormDatePicker
          name="name3"
          label="不能清空的日期"
          allowClear={false}
        />
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

    expect(
      container.querySelectorAll('.ant-pro-core-field-label .anticon-close'),
    ).toHaveLength(0);
    act(() => {
      userEvent.click(
        container.querySelectorAll('.ant-pro-core-field-label')[1],
      );
    });
    await waitFor(async () => {
      expect(
        await screen.findByDisplayValue('yutingzhao1991'),
      ).toBeInTheDocument();
      expect(
        container.querySelectorAll('.ant-input-suffix .close-circle'),
      ).toHaveLength(0);
    });
    unmount();
  });

  it('🪕 ProFormField support lightProps', async () => {
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
              formatter: (v?: number) => (
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

    await html.findByText('2001-09-09 01:46:40~2017-07-14 02:40:00');
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
    await wrapper.findAllByTitle('男');

    act(() => {
      wrapper.baseElement
        .querySelector<HTMLDivElement>('.ant-pro-core-field-label')
        ?.click?.();
    });

    expect(
      !!wrapper.baseElement.querySelector(
        '.ant-pro-field-select-light-select-container-topRight',
      ),
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

    await act(async () => {
      await wrapper.findByText('名称');
    });

    act(() => {
      wrapper.baseElement
        .querySelectorAll<HTMLDivElement>(
          '.ant-pro-core-field-dropdown-label',
        )[0]
        .click?.();
    });
    await act(async () => {
      await wrapper.findByText('名称');
    });
    expect(
      !!wrapper.baseElement.querySelector(
        '.ant-pro-core-field-dropdown-overlay-bottomLeft',
      ),
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
        ?.click?.();
    });
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
            popupMatchSelectWidth: true,
            optionFilterProp: 'label',
          }}
          options={[
            { label: '男', value: 'aaa' },
            { label: '女', value: 'bbb' },
          ]}
        />
      </LightFilter>,
    );

    await act(async () => {
      userEvent.click(await screen.findByText('性别'));
    });

    await screen.findByRole('textbox');

    await act(async () => {
      fireEvent.change(await screen.findByRole('textbox'), {
        target: {
          value: '男',
        },
      });
    });

    await waitFor(() => {
      expect(screen.getByLabelText('男')).toBeInTheDocument();
    });

    await act(async () => {
      fireEvent.change(await screen.findByRole('textbox'), {
        target: {
          value: 'aaa',
        },
      });
    });
    await waitFor(() => {
      expect(screen.queryByLabelText('男')).not.toBeInTheDocument();
    });
    rerender(
      <LightFilter>
        <ProFormSelect
          name="sex"
          label="性别"
          showSearch
          fieldProps={{
            optionFilterProp: 'value',
            popupMatchSelectWidth: true,
          }}
          options={[
            { label: '男', value: 'aaa' },
            { label: '女', value: 'bbb' },
          ]}
        />
      </LightFilter>,
    );
    await screen.findByRole('textbox');
    await act(async () => {
      fireEvent.change(await screen.findByRole('textbox'), {
        target: {
          value: '女',
        },
      });
    });

    await waitFor(() => {
      expect(screen.queryByLabelText('女')).not.toBeInTheDocument();
    });
    await act(async () => {
      fireEvent.change(await screen.findByRole('textbox'), {
        target: {
          value: 'bbb',
        },
      });
    });

    await waitFor(() => {
      expect(screen.getByLabelText('女')).toBeInTheDocument();
    });
  });
});
