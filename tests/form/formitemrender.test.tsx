import { pickControlProps, useControlModel } from '@ant-design/pro-form';
import { cleanup, renderHook } from '@testing-library/react';

afterEach(() => {
  cleanup();
});

describe('ProForm.FormItemRender target branch test', () => {
  test('should return correct object when model is a single object', () => {
    const onChange = vi.fn();
    const value = 'test value';
    const model = { valuePropName: 'value', trigger: 'onChange' };

    const { result } = renderHook(() =>
      useControlModel({ value, onChange }, model),
    );

    expect(result.current).toEqual({
      value: value,
      onChange: expect.any(Function),
    });

    // Trigger the onChange callback and verify if it's called with the correct value
    result.current.onChange('new value');
    expect(onChange).toHaveBeenCalledWith('new value');

    result.current.onChange({ target: { value: 'new value' } });
    expect(onChange).toHaveBeenCalledWith('new value');
  });

  test('should return correct object when model is an array', () => {
    const onChange = vi.fn();
    const value = { field1: 'value1', field2: 'value2' };
    const model = [
      'field1',
      { name: 'field2', valuePropName: 'value', trigger: 'onChange' },
    ];

    const { result } = renderHook(
      () => useControlModel({ value, onChange }, model as any) as any,
    );

    expect(result.current).toEqual({
      field1: {
        value: value.field1,
        onChange: expect.any(Function),
      },
      field2: {
        value: value.field2,
        onChange: expect.any(Function),
      },
    });

    // Trigger the onChange callback for field1 and verify if it's called with the correct value
    result.current.field1.onChange('new value');
    expect(onChange).toHaveBeenCalledWith({
      field1: 'new value',
      field2: 'value2',
    });

    result.current.field1.onChange({ target: { value: 'new value' } });
    expect(onChange).toHaveBeenCalledWith({
      field1: 'new value',
      field2: 'value2',
    });

    // Trigger the onChange callback for field2 and verify if it's called with the correct value
    result.current.field2.onChange('new value');
    expect(onChange).toHaveBeenCalledWith({
      field1: 'value1',
      field2: 'new value',
    });

    result.current.field2.onChange({ target: { value: 'new value' } });
    expect(onChange).toHaveBeenCalledWith({
      field1: 'value1',
      field2: 'new value',
    });
  });

  // 测试用例1：验证函数是否正确提取了value和onChange属性
  test('pickControlProps extracts value and onChange properties correctly', () => {
    const props: any = {
      value: 'initial value',
      onChange: (newValue: string) => {
        console.log('New value:', newValue);
      },
    };

    const controlProps = pickControlProps(props);

    expect(controlProps).toEqual({
      value: 'initial value',
      onChange: expect.any(Function),
    });
  });

  // 测试用例2：验证onChange函数是否正确处理传入的值
  test('onChange function extracts value correctly', () => {
    const props: any = {
      value: 'initial value',
      onChange: (newValue: string) => {
        expect(newValue).toBe('updated value');
      },
    };

    const controlProps = pickControlProps(props);

    controlProps.onChange('updated value');
  });

  // 测试用例3：验证onChange函数是否正确处理传入的事件对象
  test('onChange function extracts value from event object correctly', () => {
    const props: any = {
      value: 'initial value',
      onChange: (newValue: string) => {
        expect(newValue).toBe('event value');
      },
    };

    const controlProps = pickControlProps(props);

    const event = {
      target: {
        value: 'event value',
      },
    };

    controlProps.onChange(event);
  });
});
