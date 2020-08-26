import React from 'react';
import glob from 'glob';
import { render, mount } from 'enzyme';
import MockDate from 'mockdate';
import moment from 'moment';
import { waitForComponentToPaint } from './util';

type CheerIO = ReturnType<typeof render>;
type CheerIOElement = CheerIO[0];
// We should avoid use it in 4.0. Reopen if can not handle this.
const USE_REPLACEMENT = false;
const testDist = process.env.LIB_DIR === 'dist';

/**
 * rc component will generate id for aria usage.
 * It's created as `test-uuid` when env === 'test'.
 * Or `f7fa7a3c-a675-47bc-912e-0c45fb6a74d9`(randomly) when not test env.
 * So we need hack of this to modify the `aria-controls`.
 */
function ariaConvert(wrapper: CheerIO) {
  if (!testDist || !USE_REPLACEMENT) return wrapper;

  const matches = new Map();

  function process(entry: CheerIOElement) {
    const { attribs, children } = entry;
    if (matches.has(entry)) return;
    matches.set(entry, true);

    // Change aria
    if (attribs && attribs['aria-controls']) {
      attribs['aria-controls'] = ''; // Remove all the aria to keep render sync in jest & jest node
    }

    // Loop children
    if (!children) return;
    (Array.isArray(children) ? children : [children]).forEach(process);
  }

  wrapper.each((_, entry) => process(entry));

  return wrapper;
}

type Options = {
  skip?: boolean;
};

function demoTest(component: string, options: Options = {}) {
  const LINE_STR_COUNT = 20;
  const errorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
  const logSpy = jest.spyOn(console, 'log').mockImplementation(() => {});

  // Mock offsetHeight
  // @ts-expect-error
  const originOffsetHeight = Object.getOwnPropertyDescriptor(HTMLElement.prototype, 'offsetHeight')
    .get;
  Object.defineProperty(HTMLElement.prototype, 'offsetHeight', {
    get() {
      let html = this.innerHTML;
      html = html.replace(/<[^>]*>/g, '');
      const lines = Math.ceil(html.length / LINE_STR_COUNT);
      return lines * 16;
    },
  });

  // Mock getComputedStyle
  const originGetComputedStyle = window.getComputedStyle;
  window.getComputedStyle = (ele) => {
    const style = originGetComputedStyle(ele);
    style.lineHeight = '16px';
    return style;
  };

  afterEach(() => {
    logSpy.mockReset();
    errorSpy.mockReset();
  });

  afterAll(() => {
    errorSpy.mockRestore();
    logSpy.mockReset();
    Object.defineProperty(HTMLElement.prototype, 'offsetHeight', {
      get: originOffsetHeight,
    });
    window.getComputedStyle = originGetComputedStyle;
  });
  const files = glob.sync(`./packages/${component}/src/demos/*.tsx`);

  describe(`${component} demos`, () => {
    files.forEach((file) => {
      let testMethod = options.skip === true ? test.skip : test;
      if (Array.isArray(options.skip) && options.skip.some((c) => file.includes(c))) {
        testMethod = test.skip;
      }
      testMethod(`renders ${file} correctly`, async () => {
        MockDate.set(moment('2016-11-22').valueOf());
        const Demo = require(`.${file}`).default; // eslint-disable-line global-require, import/no-dynamic-require
        const wrapper = mount(<Demo />);

        await waitForComponentToPaint(wrapper, component === 'table' ? 1000 : 16);
        // Convert aria related content
        const dom = wrapper.render();
        ariaConvert(dom);
        expect(dom).toMatchSnapshot();
        MockDate.reset();
      });
    });
  });
}

export default demoTest;
