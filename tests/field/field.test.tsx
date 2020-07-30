import { render } from 'enzyme';
import React from 'react';
import moment from 'moment';
import Field from '@ant-design/pro-field';
import Demo from './fixtures/demo';

describe('Field', () => {
  it('🥩 base use', async () => {
    const html = render(<Field text="100" valueType="money" mode="edit" />);
    expect(html).toMatchSnapshot();
  });

  it('🥩 edit ant no plain', async () => {
    const html = render(<Demo plain={false} state="edit" />);
    expect(html).toMatchSnapshot();
  });

  it('🥩 edit and plain', async () => {
    const html = render(<Demo plain state="edit" />);
    expect(html).toMatchSnapshot();
  });

  it('🥩 read and plain', async () => {
    const html = render(<Demo plain state="read" />);
    expect(html).toMatchSnapshot();
  });

  it('🥩 read ant no plain', async () => {
    const html = render(<Demo plain={false} state="read" />);
    expect(html).toMatchSnapshot();
  });

  const valueTypes = [
    'money',
    'textarea',
    'option',
    'date',
    'dateRange',
    'dateTimeRange',
    'dateTime',
    'time',
    'text',
    'progress',
    'percent',
    'digit',
    'code',
    'jsonCode',
  ];
  valueTypes.forEach((valueType) => {
    it(`🥩 valueType render ${valueType}`, async () => {
      const html = render(
        <Field
          text="1994-07-29 12:00:00"
          mode="read"
          // @ts-ignore
          valueType={valueType}
          render={() => <>qixian</>}
        />,
      );
      expect(html.text()).toBe('qixian');
    });
  });

  valueTypes.forEach((valueType) => {
    it(`🥩 valueType render ${valueType}`, async () => {
      const html = render(
        <Field
          text={moment().valueOf()}
          mode="edit"
          // @ts-ignore
          valueType={valueType}
          renderFormItem={() => <>qixian</>}
        />,
      );
      expect(html.text()).toBe('qixian');
    });
  });

  valueTypes.forEach((valueType) => {
    it(`🥩 valueType render ${valueType} when mode is error`, async () => {
      const html = render(
        <Field
          text="1994-07-29 12:00:00"
          // @ts-expect-error
          mode="xxx"
          // @ts-ignore
          valueType={valueType}
        />,
      );
      expect(html.text()).toBe('');
    });
  });

  it('🥩 money valueType is Object', async () => {
    let html = render(
      <Field
        text="100"
        valueType={{
          type: 'money',
          locale: 'en_US',
        }}
        mode="edit"
      />,
    );
    expect(html).toMatchSnapshot();

    html = render(
      <Field
        text="100"
        valueType={{
          type: 'money',
          locale: 'en_US',
        }}
        mode="read"
      />,
    );
    expect(html).toMatchSnapshot();
  });

  it('🥩 percent valueType is Object', async () => {
    let html = render(
      <Field
        text="100"
        valueType={{
          type: 'percent',
          showSymbol: true,
        }}
        mode="edit"
      />,
    );
    expect(html).toMatchSnapshot();

    html = render(
      <Field
        text="100"
        valueType={{
          type: 'percent',
          showSymbol: true,
        }}
        showColor
        mode="read"
      />,
    );
    expect(html.text()).toBe('+ 100.00%');

    html = render(
      <Field
        text="100"
        valueType={{
          type: 'percent',
          showSymbol: true,
          precision: 1,
        }}
        mode="read"
      />,
    );
    expect(html.text()).toBe('+ 100.0%');

    html = render(
      <Field
        text={-100}
        valueType={{
          type: 'percent',
          showSymbol: true,
          precision: 1,
        }}
        showColor
        mode="read"
      />,
    );
    expect(html.text()).toBe('- 100.0%');
  });
});
