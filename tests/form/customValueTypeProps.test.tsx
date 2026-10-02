import { render } from '@testing-library/react';
import { useContext } from 'react';
import { describe, expect, it, vi } from 'vitest';
import type { ProFormColumnsType } from '../../src';
import { BetaSchemaForm, ProProvider } from '../../src';

/**
 * #9148:自定义 valueType(ProProvider.valueTypeMap)的 formItemRender
 * 第二参 props 中应能取到 fieldProps 与 request。
 */
describe('#9148 custom valueType formItemRender props', () => {
  it('formItemRender receives fieldProps and request in props', () => {
    const formItemRender = vi.fn(
      (_text: unknown, _props: Record<string, any>) => (
        <input data-testid="custom" />
      ),
    );
    const request = vi.fn().mockResolvedValue([]);

    const columns: ProFormColumnsType<any, 'my'>[] = [
      {
        title: '自定义',
        dataIndex: 'custom',
        valueType: 'my',
        fieldProps: { placeholder: '自定义占位' },
        request,
      } as ProFormColumnsType<any, 'my'>,
    ];

    const App = () => {
      const values = useContext(ProProvider);
      return (
        <ProProvider.Provider
          value={{
            ...values,
            valueTypeMap: {
              my: {
                render: (dom) => <>{dom}</>,
                formItemRender,
              },
            },
          }}
        >
          <BetaSchemaForm<any, 'my'> columns={columns} submitter={false} />
        </ProProvider.Provider>
      );
    };

    render(<App />);

    expect(formItemRender).toHaveBeenCalled();
    const call = formItemRender.mock.calls[0];
    const [, props] = call;
    // request 应该在 props 中可获取
    expect(props?.request).toBe(request);
    // fieldProps 中的自定义内容应该可获取
    expect(props?.fieldProps?.placeholder).toBe('自定义占位');
  });
});
