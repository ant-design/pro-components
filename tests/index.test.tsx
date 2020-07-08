import Field from '../packages/field/src/index';

import { render } from 'enzyme';
import React from 'react';

describe('Field', () => {
  beforeAll(() => {
    Object.defineProperty(window, 'matchMedia', {
      value: jest.fn(() => ({
        matches: false,
        addListener() {},
        removeListener() {},
      })),
    });
  });

  it('🥩 base use', async () => {
    const html = render(<Field text="100" valueType="money" mode="edit" />);
    expect(html).toMatchSnapshot();
  });
});
