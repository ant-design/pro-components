import { ProForm } from '@ant-design/pro-components';
import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';
import { WarpFieldDependencyWrapper } from '../../src/form/components/FormItem/warpFieldDependency';

afterEach(() => {
  cleanup();
});

describe('WarpFieldDependencyWrapper', () => {
  it('renders renderDirect when dependencies is absent', () => {
    render(
      <WarpFieldDependencyWrapper
        renderDirect={<span data-testid="direct">ok</span>}
        renderWithDependencyValues={() => <span>no</span>}
      />,
    );
    expect(screen.getByTestId('direct')).toHaveTextContent('ok');
  });

  it('injects dependency values when dependencies is set', () => {
    render(
      <ProForm initialValues={{ city: 'Shanghai' }}>
        <WarpFieldDependencyWrapper
          dependencies={['city']}
          renderDirect={<span>skip</span>}
          renderWithDependencyValues={(values) => (
            <span data-testid="dep">{String(values.city)}</span>
          )}
        />
      </ProForm>,
    );
    expect(screen.getByTestId('dep')).toHaveTextContent('Shanghai');
  });
});
