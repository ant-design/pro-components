import { CheckCard } from '@ant-design/pro-components';
import { render, waitFor } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import { waitTime } from '../util';

describe('CheckCard', () => {
  it('should invoke onChange and onClick function when click option', async () => {
    const onChange = jest.fn();
    const onClick = jest.fn();
    const wrapper = render(
      <CheckCard
        title="示例一"
        onChange={(e) => {
          onChange(e);
        }}
        onClick={onClick}
      />,
    );

    act(() => {
      wrapper.baseElement.querySelector<HTMLDivElement>('.ant-pro-checkcard')?.click();
    });

    await waitFor(() => {
      expect(onChange).toBeCalledWith(true);
      expect(onClick).toHaveBeenCalled();
    });
  });

  it('should invoke onChange function when group click option', async () => {
    const onChange = jest.fn();
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
      wrapper.baseElement.querySelector<HTMLDivElement>('.ant-pro-checkcard')?.click();
    });
    await waitFor(() => {
      expect(onChange).toHaveBeenLastCalledWith('Apple');
    });

    act(() => {
      wrapper.baseElement.querySelector<HTMLDivElement>('.ant-pro-checkcard')?.click();
    });

    await waitFor(() => {
      expect(onChange).toHaveBeenLastCalledWith(undefined);
    });
    act(() => {
      wrapper.baseElement.querySelectorAll<HTMLDivElement>('.ant-pro-checkcard')[1]?.click();
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
      wrapper.baseElement.querySelectorAll<HTMLDivElement>('.ant-pro-checkcard-checked').length,
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
      wrapper.baseElement.querySelectorAll<HTMLDivElement>('.ant-pro-checkcard-checked').length,
    ).toBe(0);

    wrapper.unmount();
  });

  it('should invoke onChange function when group click option in multiple mode', async () => {
    const onChange = jest.fn();
    const wrapper = render(
      <CheckCard.Group
        onChange={(e) => onChange(e)}
        options={['Apple', 'Pear', 'Orange']}
        size="large"
        multiple
      />,
    );
    act(() => {
      wrapper.baseElement.querySelector<HTMLDivElement>('.ant-pro-checkcard')?.click();
    });
    await waitFor(() => {
      expect(onChange).toHaveBeenLastCalledWith(['Apple']);
    });
    act(() => {
      wrapper.baseElement.querySelectorAll<HTMLDivElement>('.ant-pro-checkcard')[1]?.click();
    });
    await waitFor(() => {
      expect(onChange).toHaveBeenLastCalledWith(['Apple', 'Pear']);
    });

    act(() => {
      wrapper.baseElement.querySelectorAll<HTMLDivElement>('.ant-pro-checkcard')[1]?.click();
    });

    await waitFor(() => {
      expect(onChange).toHaveBeenLastCalledWith(['Apple']);
    });
  });

  it('should support defaultValue', async () => {
    const onChange = jest.fn();
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
      wrapper.baseElement.querySelector<HTMLDivElement>('.ant-pro-checkcard')?.click();
    });

    await waitFor(() => {
      expect(onChange).toHaveBeenCalledWith(undefined);
    });
    act(() => {
      wrapper.baseElement.querySelector<HTMLDivElement>('.ant-pro-checkcard')?.click();
    });

    await waitFor(() => {
      expect(onChange).toHaveBeenCalledWith('A');
    });
  });

  it('should support defaultValue in multiple mode', async () => {
    const onChange = jest.fn();
    const wrapper = render(
      <CheckCard.Group onChange={(e) => onChange(e)} defaultValue={['A']} multiple>
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
      wrapper.baseElement.querySelector<HTMLDivElement>('.ant-pro-checkcard')?.click();
    });
    await waitFor(() => {
      expect(onChange).toHaveBeenCalledWith([]);
    });
    act(() => {
      wrapper.baseElement.querySelectorAll<HTMLDivElement>('.ant-pro-checkcard')[1]?.click();
    });
    await waitFor(() => {
      expect(onChange).toHaveBeenCalledWith(['B']);
    });
  });

  it('should disabled onChange when group disabled', async () => {
    const onChange = jest.fn();
    const wrapper = render(
      <CheckCard.Group onChange={(e) => onChange(e)} disabled defaultValue="A">
        <CheckCard title="Card A" description="选项一" value="A" />
        <CheckCard title="Card B" description="选项二" value="B" />
      </CheckCard.Group>,
    );
    act(() => {
      wrapper.baseElement.querySelector<HTMLDivElement>('.ant-pro-checkcard')?.click();
    });

    await waitFor(() => {
      expect(onChange).not.toHaveBeenCalled();
    });
  });
});
