import { describe, expect, it } from 'vitest';
import {
  fillResponsiveConfig,
  getResponsiveValue,
  normalizeScreens,
} from '../../src/utils/responsive';

describe('responsive utils', () => {
  describe('normalizeScreens', () => {
    it('returns defaults when screens is null/undefined', () => {
      expect(normalizeScreens(null)).toEqual({
        xs: true,
        sm: true,
        md: true,
        lg: false,
        xl: false,
        xxl: false,
      });
      expect(normalizeScreens(undefined)).toEqual({
        xs: true,
        sm: true,
        md: true,
        lg: false,
        xl: false,
        xxl: false,
      });
    });

    it('fills missing keys when Grid.useBreakpoint returns {}', () => {
      expect(normalizeScreens({})).toEqual({
        xs: true,
        sm: true,
        md: true,
        lg: false,
        xl: false,
        xxl: false,
      });
    });

    it('keeps matched breakpoint values', () => {
      expect(normalizeScreens({ lg: true, xl: true, xxl: false })).toEqual({
        xs: true,
        sm: true,
        md: true,
        lg: true,
        xl: true,
        xxl: false,
      });
    });
  });

  describe('fillResponsiveConfig', () => {
    it('cascades partial config forward like antd Col', () => {
      expect(fillResponsiveConfig({ md: 8, xl: 6 })).toEqual({
        xs: 8,
        sm: 8,
        md: 8,
        lg: 8,
        xl: 6,
        xxl: 6,
      });
    });

    it('returns undefined for empty config', () => {
      expect(fillResponsiveConfig({})).toBeUndefined();
    });

    it('keeps full config unchanged', () => {
      const full = { xs: 24, sm: 12, md: 8, lg: 6, xl: 4, xxl: 2 };
      expect(fillResponsiveConfig(full)).toEqual(full);
    });
  });

  describe('getResponsiveValue', () => {
    it('picks the largest matching breakpoint value', () => {
      const screens = {
        xs: true,
        sm: true,
        md: true,
        lg: true,
        xl: false,
        xxl: false,
      };
      expect(
        getResponsiveValue(screens, { md: 8, lg: 6, xl: 4 }, 24),
      ).toBe(6);
    });

    it('falls back when no config matches', () => {
      const screens = {
        xs: true,
        sm: true,
        md: true,
        lg: false,
        xl: false,
        xxl: false,
      };
      expect(getResponsiveValue(screens, { xl: 4 }, 24)).toBe(24);
    });
  });
});
