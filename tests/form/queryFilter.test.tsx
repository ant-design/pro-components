import { cleanup, fireEvent, render, waitFor } from '@testing-library/react';
import { ProFormGroup, ProFormText, QueryFilter } from '@xxlabs/pro-components';
import { afterEach, describe, expect, it, vi } from 'vitest';

afterEach(() => {
  cleanup();
});

describe('QueryFilter', () => {
  it('🕵️‍♀️ basic use', async () => {
    const onFinish = vi.fn();
    const { container } = render(
      <QueryFilter
        initialValues={{
          a: 'testa',
        }}
        onFinish={onFinish}
      >
        <ProFormText label="a" name="a" />
        <ProFormText label="b" name="b" />
      </QueryFilter>,
    );

    fireEvent.submit(container.querySelector('.ant-btn-primary')!);

    expect(container.querySelectorAll('.ant-input').length).toEqual(2);

    await waitFor(() => {
      expect(onFinish).toHaveBeenCalledWith({
        a: 'testa',
      });
    });
  });

  it('🕵️‍♀️ keep all field value when collapsed', async () => {
    const onFinish = vi.fn();
    const { container } = render(
      <QueryFilter
        defaultCollapsed
        initialValues={{
          a: 'testa',
          b: 'testb',
          c: 'testc',
        }}
        onFinish={onFinish}
      >
        <ProFormText label="a" name="a" />
        <ProFormText label="b" name="b" />
        <ProFormText label="c" name="c" />
      </QueryFilter>,
    );

    fireEvent.submit(container.querySelector('.ant-btn-primary')!);

    expect(container.querySelectorAll('.ant-input').length).toEqual(3);
    expect(container.querySelectorAll('.ant-row .ant-form-item-hidden').length).toEqual(1);

    await waitFor(() => {
      expect(onFinish).toHaveBeenCalledWith({
        a: 'testa',
        b: 'testb',
        c: 'testc',
      });
    });
  });

  it('🕵️‍♀️ no keep collapsed field value', async () => {
    const onFinish = vi.fn();
    const { container } = render(
      <QueryFilter
        defaultCollapsed
        initialValues={{
          a: 'testa',
          b: 'testb',
          c: 'testc',
        }}
        preserve={false}
        onFinish={onFinish}
      >
        <ProFormText label="a" name="a" />
        <ProFormText label="b" name="b" />
        <ProFormText label="c" name="c" />
        <ProFormText label="d" name="d" />
      </QueryFilter>,
    );

    fireEvent.submit(container.querySelector('.ant-btn-primary')!);

    expect(container.querySelectorAll('.ant-input')).toHaveLength(2);
    expect(container.querySelectorAll('.ant-row .ant-form-item-hidden')).toHaveLength(0);
    expect(container.querySelectorAll('.anticon-down')).toHaveLength(1);

    await waitFor(() => {
      expect(onFinish).toHaveBeenCalledWith({
        a: 'testa',
        b: 'testb',
      });
    });
  });

  it('🕵️‍♀️ labelWidth', async () => {
    const { container } = render(
      <QueryFilter
        initialValues={{
          a: 'testa',
        }}
        labelWidth={70}
      >
        <ProFormText label="a" name="a" />
      </QueryFilter>,
    );

    expect(container.querySelectorAll('.ant-col.ant-form-item-label')[0]).toHaveStyle('flex: 0 0 70px');
  });

  it('🕵️‍♀️ responsive 512', async () => {
    const { container } = render(
      <QueryFilter defaultCollapsed style={{ width: 512 }}>
        <ProFormText label="a" name="a" />
        <ProFormText label="b" name="b" />
      </QueryFilter>,
    );

    expect(container.querySelectorAll('.ant-row .ant-form-item-hidden')).toHaveLength(1);
  });

  it('🕵️‍♀️ responsive 1064', async () => {
    const { container } = render(
      <QueryFilter defaultCollapsed style={{ width: 1064 }}>
        <ProFormText label="a" name="a" />
        <ProFormText label="b" name="b" />
        <ProFormText label="c" name="c" />
        <ProFormText label="d" name="d" />
      </QueryFilter>,
    );

    expect(container.querySelectorAll('.ant-row .ant-form-item-hidden')).toHaveLength(2);
  });

  it('🕵️‍♀️ responsive 1064 with vertical', async () => {
    const { container } = render(
      <QueryFilter defaultCollapsed layout="vertical" style={{ width: 1064 }}>
        <ProFormText label="a" name="a" />
        <ProFormText label="b" name="b" />
        <ProFormText label="c" name="c" />
        <ProFormText label="d" name="d" />
      </QueryFilter>,
    );

    expect(container.querySelectorAll('.ant-row .ant-form-item-hidden')).toHaveLength(1);
  });

  it('🕵️‍♀️ submitter support render', async () => {
    const fn = vi.fn();
    const { container, findByText } = render(
      <QueryFilter
        defaultCollapsed
        layout="vertical"
        style={{ width: 1064 }}
        submitter={{
          render: (props) => {
            return [
              <a
                key="submit"
                id="submit"
                onClick={() => {
                  props.submit();
                }}
              >
                提交
              </a>,
              <a
                key="reset"
                id="reset"
                onClick={() => {
                  props.reset();
                }}
              >
                重置
              </a>,
            ];
          },
        }}
        onFinish={fn}
      >
        <ProFormText label="a" name="a" />
        <ProFormText label="b" name="b" />
        <ProFormText label="c" name="c" />
        <ProFormText label="d" name="d" />
        <ProFormText label="e" name="e" />
        <ProFormText label="f" name="f" />
      </QueryFilter>,
    );

    fireEvent.click(container.querySelector('.ant-pro-query-filter-collapse-button')!);
    fireEvent.click(await findByText('提交'));
    fireEvent.click(await findByText('重置'));

    await waitFor(() => {
      expect(fn).toHaveBeenCalled();
    });
  });

  it('🕵️‍♀️ collapseRender should work', async () => {
    const { container, rerender } = render(
      <QueryFilter
        defaultCollapsed
        collapseRender={(collapsed) => (collapsed ? 'open' : 'close')}
        layout="vertical"
        style={{ width: 1064 }}
      >
        <ProFormText label="a" name="a" />
        <ProFormText label="b" name="b" />
        <ProFormText label="c" name="c" />
        <ProFormText label="d" name="d" />
        <ProFormText label="e" name="e" />
        <ProFormText label="f" name="f" />
      </QueryFilter>,
    );
    expect(container.querySelector('a.ant-pro-query-filter-collapse-button')).toHaveTextContent('open');

    rerender(
      <QueryFilter
        defaultCollapsed
        collapseRender={(collapsed) => (collapsed ? 'open' : 'close')}
        collapsed={false}
        layout="vertical"
        style={{ width: 1064 }}
      >
        <ProFormText label="a" name="a" />
        <ProFormText label="b" name="b" />
        <ProFormText label="c" name="c" />
        <ProFormText label="d" name="d" />
        <ProFormText label="e" name="e" />
        <ProFormText label="f" name="f" />
      </QueryFilter>,
    );
    expect(container.querySelector('a.ant-pro-query-filter-collapse-button')).toHaveTextContent('close');
  });

  it('🕵️‍♀️ defaultColsNumber should work', async () => {
    const wrapper0 = render(
      <QueryFilter defaultColsNumber={1}>
        <ProFormText label="a" name="a" />
        <ProFormText label="b" name="b" />
        <ProFormText label="c" name="c" />
      </QueryFilter>,
    );
    expect(wrapper0.container.querySelectorAll('.ant-row .ant-form-item-hidden')).toHaveLength(2);

    const wrapper1 = render(
      <QueryFilter defaultColsNumber={2}>
        <ProFormText label="a" name="a" />
        <ProFormText label="b" name="b" />
        <ProFormText label="c" name="c" />
      </QueryFilter>,
    );
    expect(wrapper1.container.querySelectorAll('.ant-row .ant-form-item-hidden')).toHaveLength(1);

    const wrapper2 = render(
      <QueryFilter defaultColsNumber={3}>
        <ProFormText label="a" name="a" />
        <ProFormText label="b" name="b" />
        <ProFormText label="c" name="c" />
      </QueryFilter>,
    );
    expect(wrapper2.container.querySelectorAll('.ant-row .ant-form-item-hidden')).toHaveLength(1);
  });

  it('🕵️‍♀️ defaultFormItemsNumber should work', async () => {
    const wrapper0 = render(
      <QueryFilter defaultFormItemsNumber={5}>
        <ProFormText label="a" name="a" />
        <ProFormText label="b" name="b" />
        <ProFormText label="c" name="c" />
        <ProFormText label="d" name="d" />
        <ProFormText label="e" name="e" />
        <ProFormText label="f" name="f" />
      </QueryFilter>,
    );
    expect(wrapper0.container.querySelectorAll('.ant-row .ant-form-item-hidden')).toHaveLength(1);

    const wrapper1 = render(
      <QueryFilter defaultFormItemsNumber={1}>
        <ProFormText label="a" name="a" />
        <ProFormText label="b" name="b" />
        <ProFormText label="c" name="c" />
        <ProFormText label="d" name="d" />
        <ProFormText label="e" name="e" />
        <ProFormText label="f" name="f" />
      </QueryFilter>,
    );
    expect(wrapper1.container.querySelectorAll('.ant-row .ant-form-item-hidden')).toHaveLength(5);

    const wrapper2 = render(
      <QueryFilter defaultFormItemsNumber={6}>
        <ProFormText label="a" name="a" />
        <ProFormText label="b" name="b" />
        <ProFormText label="c" name="c" />
        <ProFormText label="d" name="d" />
        <ProFormText label="e" name="e" />
        <ProFormText label="f" name="f" />
      </QueryFilter>,
    );
    expect(wrapper2.container.querySelectorAll('.ant-row .ant-form-item-hidden')).toHaveLength(0);

    const wrapper3 = render(
      <QueryFilter defaultFormItemsNumber={7}>
        <ProFormText label="a" name="a" />
        <ProFormText label="b" name="b" />
        <ProFormText label="c" name="c" />
        <ProFormText label="d" name="d" />
        <ProFormText label="e" name="e" />
        <ProFormText label="f" name="f" />
      </QueryFilter>,
    );
    expect(wrapper3.container.querySelectorAll('.ant-row .ant-form-item-hidden')).toHaveLength(0);
  });

  it('🕵️‍♀️ colSize不全都是1，collapseRender应该存在', async () => {
    const { container } = render(
      <QueryFilter defaultCollapsed={false} defaultColsNumber={4}>
        <ProFormText colSize={4} label="应用名称" name="name" rules={[{ required: true }]} />
        <ProFormText colSize={3} label="创建人" name="creater" />
      </QueryFilter>,
    );

    expect(container.querySelectorAll('a.ant-pro-query-filter-collapse-button')).toHaveLength(1);
  });

  it('🕵️‍♀️ 表单首项独占一行，收起时应该只展示一项就行了', async () => {
    const { container } = render(
      <QueryFilter defaultCollapsed defaultColsNumber={4}>
        <ProFormText colSize={4} label="应用名称" name="name" rules={[{ required: true }]} />
        <ProFormText label="创建人" name="creater" />
        <ProFormText label="创建人" name="creater" />
        <ProFormText label="创建人" name="creater" />
        <ProFormText label="创建人" name="creater" />
        <ProFormText label="创建人" name="creater" />
        <ProFormText label="创建人" name="creater" />
        <ProFormText label="创建人" name="creater" />
      </QueryFilter>,
    );

    expect(container.querySelectorAll('.ant-row .ant-form-item-hidden')).toHaveLength(7);
  });

  it('🕵️‍♀️ QueryFilter support ProForm.Group', async () => {
    const { container } = render(
      <QueryFilter collapsed={true} layout="vertical">
        <ProFormGroup>
          <ProFormText label="a" name="a" />
          <ProFormText label="b" name="b" />
        </ProFormGroup>
        <ProFormText label="c" name="c" />
        <ProFormText label="d" name="d" />
      </QueryFilter>,
    );

    expect(container.querySelectorAll('.ant-pro-form-group')).toHaveLength(0);
  });

  it('🕵️‍♀️ collapseRender', async () => {
    const wrapper0 = render(
      <QueryFilter defaultColsNumber={2}>
        <ProFormText label="a" name="a" />
        <ProFormText label="b" name="b" />
        <ProFormText label="c" name="c" />
      </QueryFilter>,
    );
    expect(wrapper0.container.querySelectorAll('.ant-pro-query-filter-collapse-button')).toHaveLength(1);
    const wrapper1 = render(
      <QueryFilter defaultFormItemsNumber={5}>
        <ProFormText label="a" name="a" />
        <ProFormText label="b" name="b" />
        <ProFormText label="c" name="c" />
        <ProFormText label="d" name="d" />
        <ProFormText label="e" name="e" />
        <ProFormText label="f" name="f" />
      </QueryFilter>,
    );
    expect(wrapper1.container.querySelectorAll('.ant-pro-query-filter-collapse-button')).toHaveLength(1);
    const wrapper2 = render(
      <QueryFilter defaultFormItemsNumber={6}>
        <ProFormText label="a" name="a" />
        <ProFormText label="b" name="b" />
        <ProFormText label="c" name="c" />
        <ProFormText label="d" name="d" />
        <ProFormText label="e" name="e" />
        <ProFormText label="f" name="f" />
      </QueryFilter>,
    );
    expect(wrapper2.container.querySelectorAll('.ant-pro-query-filter-collapse-button')).toHaveLength(0);
  });
});
