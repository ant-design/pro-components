import { render } from 'enzyme';
import React from 'react';
import Field from '../packages/field/src/index';

describe('Field', () => {
  it('🥩 base use', async () => {
    const html = render(<Field text="100" valueType="money" mode="edit" />);
    expect(html).toMatchSnapshot();
  });
});
