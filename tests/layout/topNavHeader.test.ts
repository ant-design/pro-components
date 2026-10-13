import { describe, expect, it } from 'vitest';
import { getTopNavMenuPopupBg } from '../../src/layout/components/TopNavHeader';

describe('TopNavHeader', () => {
  it('uses the header popup token for submenu backgrounds (#8637)', () => {
    expect(
      getTopNavMenuPopupBg({
        colorBgElevated: '#ffffff',
        layout: {
          header: {
            colorBgMenuElevated: '#001529',
          },
        },
      }),
    ).toBe('#001529');
  });

  it('falls back to the global elevated background', () => {
    expect(
      getTopNavMenuPopupBg({
        colorBgElevated: '#ffffff',
      }),
    ).toBe('#ffffff');
  });
});
