import { ProForm, ProFormDependency, ProFormText } from '@ant-design/pro-components';
import { mount } from 'enzyme';
import { act } from 'react-dom/test-utils';
import { waitForComponentToPaint } from '../util';

describe('ProForm Dependency component', () => {
  it('⛲ shouldUpdate of ProFormDependency is Boolean', async () => {
    const Demo: React.FC<{
      shouldUpdate?: boolean;
    }> = ({ shouldUpdate = false }) => {
      return (
        <ProForm>
          <ProFormText name="name" label="姓名" />
          <ProFormDependency name={['name']} shouldUpdate={shouldUpdate}>
            {({ name }) => {
              return <div id="show">{name || 'first'}</div>;
            }}
          </ProFormDependency>
        </ProForm>
      );
    };

    const html = mount(<Demo />);

    act(() => {
      html.find('input.ant-input').simulate('change', {
        target: {
          value: 'second',
        },
      });
    });

    await waitForComponentToPaint(html);

    expect(html.find('div#show').text()).toBe('first');

    html.setProps({
      shouldUpdate: true,
    });

    await waitForComponentToPaint(html);

    act(() => {
      html.find('input.ant-input').simulate('change', {
        target: {
          value: 'ProComponents',
        },
      });
    });

    await waitForComponentToPaint(html);

    expect(html.find('div#show').text()).toBe('ProComponents');
  });

  it('⛲ shouldUpdate of ProFormDependency is Function', async () => {
    const html = mount(
      <ProForm>
        <ProFormText name="name" label="姓名" />
        <ProFormDependency
          name={['name']}
          shouldUpdate={(prevValues, nextValues) => {
            if (nextValues.name === 'update') {
              return true;
            }
            return false;
          }}
        >
          {({ name }) => {
            return <div id="show">{name || 'first'}</div>;
          }}
        </ProFormDependency>
      </ProForm>,
    );

    act(() => {
      html.find('input.ant-input').simulate('change', {
        target: {
          value: "Don't update",
        },
      });
    });

    await waitForComponentToPaint(html);

    act(() => {
      html.find('input.ant-input').simulate('change', {
        target: {
          value: 'update',
        },
      });
    });

    await waitForComponentToPaint(html);

    expect(html.find('div#show').text()).toBe('update');
  });

  it('⛲  ProFormDependency support transform', async () => {
    const dependencyFn = jest.fn();
    const Demo: React.FC<{
      shouldUpdate?: boolean;
    }> = () => {
      return (
        <ProForm>
          <ProFormText
            name="name"
            label="姓名"
            transform={(value) => {
              return {
                name: value,
                nickName: 'chen',
              };
            }}
          />
          <ProFormDependency name={['name', 'nickName']}>
            {({ name, nickName }) => {
              dependencyFn(name + ' ' + nickName);
              return <div id="show">{name || 'first'}</div>;
            }}
          </ProFormDependency>
        </ProForm>
      );
    };

    const html = mount(<Demo />);

    act(() => {
      html.find('input.ant-input').simulate('change', {
        target: {
          value: 'second',
        },
      });
    });

    await waitForComponentToPaint(html);
    expect(dependencyFn).toBeCalledWith('second chen');
  });
});
