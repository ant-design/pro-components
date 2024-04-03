import { CheckCard } from '@ant-design/pro-components';
import { act, cleanup, render, waitFor } from '@testing-library/react';

afterEach(() => {
  cleanup();
});

describe('CheckCard', () => {
  it('should invoke onChange and onClick function when click option', async () => {
    const onChange = vi.fn();
    const onClick = vi.fn();
    const wrapper = render(
      <CheckCard
        title="示例一"
        onChange={(e) => {
          onChange(e);
        }}
        onClick={onClick}
      />,
    );
    /**
     * 执行 React Testing Library 中的 act 方法。
     */
    act(() => {
      // 从组件渲染后生成的容器中选择 `.ant-pro-checkcard` 元素，并模拟点击事件。
      wrapper.baseElement
        .querySelector<HTMLDivElement>('.ant-pro-checkcard')
        ?.click();
    });

    /**
     * 等待直到满足条件，然后执行一系列断言。
     */
    await waitFor(() => {
      // 断言 onChange 回调函数已被调用，并且传入参数为 true。
      expect(onChange).toBeCalledWith(true);
      // 断言 onClick 回调函数已被调用。
      expect(onClick).toHaveBeenCalled();
    });
  });

  it('should invoke onChange function when group click option', async () => {
    const onChange = vi.fn();
    const wrapper = render(
      <CheckCard.Group
        onChange={(e) => onChange(e)}
        options={[
          { title: '苹果', value: 'Apple' },
          { title: '梨', value: 'Pear' },
          { title: '橙子', value: 'Orange' },
        ]}
        size="large"
      />,
    );
    act(() => {
      wrapper.baseElement
        .querySelector<HTMLDivElement>('.ant-pro-checkcard')
        ?.click();
    });
    await waitFor(() => {
      expect(onChange).toHaveBeenLastCalledWith('Apple');
    });

    act(() => {
      wrapper.baseElement
        .querySelector<HTMLDivElement>('.ant-pro-checkcard')
        ?.click();
    });

    await waitFor(() => {
      expect(onChange).toHaveBeenLastCalledWith(undefined);
    });
    act(() => {
      wrapper.baseElement
        .querySelectorAll<HTMLDivElement>('.ant-pro-checkcard')[1]
        ?.click();
    });
    await waitFor(() => {
      expect(onChange).toHaveBeenLastCalledWith('Pear');
    });
  });

  it('should be controlled by value', () => {
    const wrapper = render(
      <CheckCard.Group
        options={[
          { title: '苹果', value: 'Apple' },
          { title: '梨', value: 'Pear' },
          { title: '橙子', value: 'Orange' },
        ]}
      />,
    );

    expect(
      wrapper.baseElement.querySelectorAll<HTMLDivElement>(
        '.ant-pro-checkcard-checked',
      ).length,
    ).toBe(0);
    act(() => {
      wrapper.rerender(
        <CheckCard.Group
          options={[
            { title: '苹果', value: 'Apple' },
            { title: '梨', value: 'Pear' },
            { title: '橙子', value: 'Orange' },
          ]}
          value={['Apple']}
        />,
      );
    });
    expect(
      wrapper.baseElement.querySelectorAll<HTMLDivElement>(
        '.ant-pro-checkcard-checked',
      ).length,
    ).toBe(0);

    wrapper.unmount();
  });

  it('should invoke onChange function when group click option in multiple mode', async () => {
    const onChange = vi.fn();
    const wrapper = render(
      <CheckCard.Group
        onChange={(e) => onChange(e)}
        options={['Apple', 'Pear', 'Orange']}
        size="large"
        multiple
      />,
    );
    act(() => {
      wrapper.baseElement
        .querySelector<HTMLDivElement>('.ant-pro-checkcard')
        ?.click();
    });
    await waitFor(() => {
      expect(onChange).toHaveBeenLastCalledWith(['Apple']);
    });
    act(() => {
      wrapper.baseElement
        .querySelectorAll<HTMLDivElement>('.ant-pro-checkcard')[1]
        ?.click();
    });
    await waitFor(() => {
      expect(onChange).toHaveBeenLastCalledWith(['Apple', 'Pear']);
    });

    act(() => {
      wrapper.baseElement
        .querySelectorAll<HTMLDivElement>('.ant-pro-checkcard')[1]
        ?.click();
    });

    await waitFor(() => {
      expect(onChange).toHaveBeenLastCalledWith(['Apple']);
    });
  });

  it('should support defaultValue', async () => {
    const onChange = vi.fn();
    const wrapper = render(
      <CheckCard.Group onChange={(e) => onChange(e)} defaultValue="A">
        <CheckCard title="Card A" description="选项一" value="A" />
        <CheckCard title="Card B" description="选项二" value="B" />
      </CheckCard.Group>,
    );

    expect(
      wrapper.baseElement
        .querySelector('.ant-pro-checkcard')
        ?.className.includes('ant-pro-checkcard-checked'),
    ).toBeTruthy();

    act(() => {
      wrapper.baseElement
        .querySelector<HTMLDivElement>('.ant-pro-checkcard')
        ?.click();
    });

    await waitFor(() => {
      expect(onChange).toHaveBeenCalledWith(undefined);
    });
    act(() => {
      wrapper.baseElement
        .querySelector<HTMLDivElement>('.ant-pro-checkcard')
        ?.click();
    });

    await waitFor(() => {
      expect(onChange).toHaveBeenCalledWith('A');
    });
  });

  it('should support defaultValue in multiple mode', async () => {
    const onChange = vi.fn();
    const wrapper = render(
      <CheckCard.Group
        onChange={(e) => onChange(e)}
        defaultValue={['A']}
        multiple
      >
        <CheckCard title="Card A" description="选项一" value="A" />
        <CheckCard title="Card B" description="选项二" value="B" />
      </CheckCard.Group>,
    );
    expect(
      wrapper.baseElement
        .querySelector('.ant-pro-checkcard')
        ?.className.includes('ant-pro-checkcard-checked'),
    ).toBeTruthy();

    act(() => {
      wrapper.baseElement
        .querySelector<HTMLDivElement>('.ant-pro-checkcard')
        ?.click();
    });
    await waitFor(() => {
      expect(onChange).toHaveBeenCalledWith([]);
    });
    act(() => {
      wrapper.baseElement
        .querySelectorAll<HTMLDivElement>('.ant-pro-checkcard')[1]
        ?.click();
    });
    await waitFor(() => {
      expect(onChange).toHaveBeenCalledWith(['B']);
    });
  });

  it('should disabled onChange when group disabled', async () => {
    const onChange = vi.fn();
    const wrapper = render(
      <CheckCard.Group onChange={(e) => onChange(e)} disabled defaultValue="A">
        <CheckCard title="Card A" description="选项一" value="A" />
        <CheckCard title="Card B" description="选项二" value="B" />
      </CheckCard.Group>,
    );
    act(() => {
      wrapper.baseElement
        .querySelector<HTMLDivElement>('.ant-pro-checkcard')
        ?.click();
    });

    await waitFor(() => {
      expect(onChange).not.toHaveBeenCalled();
    });
  });

  it('should display when title is number zero', async () => {
    const wrapper = render(<CheckCard title={0} />);

    expect(
      wrapper.baseElement.querySelector<HTMLDivElement>(
        '.ant-pro-checkcard-title',
      )?.innerHTML,
    ).toBe('0');
  });
});
