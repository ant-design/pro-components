/* eslint-disable global-require */
import { render } from 'enzyme';
import * as React from 'react';
import { readdirSync } from 'fs';
import { join } from 'path';

const demoPath = join(__dirname, '../demo/');
const demos = readdirSync(demoPath);

describe('ProList render', () => {
  demos.forEach((file) => {
    test(`${file} should match snapshot `, () => {
      // eslint-disable-next-line import/no-dynamic-require
      const Demo = require(join(demoPath, file)).default;
      const wrapper = render(<Demo />);
      expect(wrapper).toMatchSnapshot();
    });
  });
});
