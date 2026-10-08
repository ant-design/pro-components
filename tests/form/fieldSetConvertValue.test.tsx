import {
  ProForm,
  ProFormDigit,
  ProFormFieldSet,
} from '@ant-design/pro-components';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { waitForWaitTime } from '../util';

afterEach(() => {
  cleanup();
});

/**
 * #8907:ProFormFieldSet 的 convertValue/transform 在新增/编辑表单表现不一致。
 * 场景:编辑表单里 initialValue 是序列化后的 string("11:52"),
 * 期望 convertValue 将其转成 [11,52] 供组件消费,transform 提交时还原为 "11:52"。
 */
describe('#8907 ProFormFieldSet convertValue/transform 一致性', () => {
  it('edit form: string initial value is converted for display and restored on submit', async () => {
    const onFinish = vi.fn();
    const { container } = render(
      <ProForm
        initialValues={{ printing_time: '11:52' }}
        onFinish={async (values) => onFinish(values)}
      >
        <ProFormFieldSet
          name="printing_time"
          convertValue={(value: any) => {
            if (typeof value === 'string') {
              return value.split(':').map((item) => Number(item));
            }
            return value;
          }}
          transform={(value: any) => ({
            printing_time: `${value?.[0]}:${value?.[1]}`,
          })}
        >
          <ProFormDigit fieldProps={{ id: 'hours', controls: false }} noStyle />
          <ProFormDigit fieldProps={{ id: 'minutes', controls: false }} noStyle />
        </ProFormFieldSet>
      </ProForm>,
    );

    await waitForWaitTime(300);

    // 展示:字符串被 convertValue 转成数组,两个输入框分别显示 11 / 52
    expect(container.querySelector('#hours')).toHaveValue('11');
    expect(container.querySelector('#minutes')).toHaveValue('52');

    // 直接提交(未触碰字段):transform 拿到组件值并还原为字符串
    fireEvent.click(screen.getByText('提 交'));
    await waitForWaitTime(300);
    expect(onFinish).toHaveBeenCalledWith({ printing_time: '11:52' });
  });

  it('edit form: user edits a value then submit keeps both convertValue and transform consistent', async () => {
    const onFinish = vi.fn();
    const { container } = render(
      <ProForm
        initialValues={{ printing_time: '11:52' }}
        onFinish={async (values) => onFinish(values)}
      >
        <ProFormFieldSet
          name="printing_time"
          convertValue={(value: any) => {
            if (typeof value === 'string') {
              return value.split(':').map((item) => Number(item));
            }
            return value;
          }}
          transform={(value: any) => ({
            printing_time: `${value?.[0]}:${value?.[1]}`,
          })}
        >
          <ProFormDigit fieldProps={{ id: 'hours2', controls: false }} noStyle />
          <ProFormDigit
            fieldProps={{ id: 'minutes2', controls: false }}
            noStyle
          />
        </ProFormFieldSet>
      </ProForm>,
    );

    await waitForWaitTime(300);
    expect(container.querySelector('#hours2')).toHaveValue('11');

    // 用户修改第一个输入框: 11 -> 12
    fireEvent.change(container.querySelector('#hours2')!, {
      target: { value: '12' },
    });
    await waitForWaitTime(200);

    // 修改后展示不回退:convertValue 不应把组件值 [12,52] 再次错误转换
    expect(container.querySelector('#hours2')).toHaveValue('12');
    expect(container.querySelector('#minutes2')).toHaveValue('52');

    // 提交:store 中已是组件值,transform 正常还原
    fireEvent.click(screen.getByText('提 交'));
    await waitForWaitTime(300);
    expect(onFinish).toHaveBeenCalledWith({ printing_time: '12:52' });
  });
});
