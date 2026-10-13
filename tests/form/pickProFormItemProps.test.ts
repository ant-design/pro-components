import {
  omitProFormItemProps,
  pickProFormItemProps,
  proFormItemPropKeys,
} from '@ant-design/pro-components/form';
import { describe, expect, it } from 'vitest';

describe('pickProFormItemProps / omitProFormItemProps', () => {
  it('picks only Form.Item keys from field props', () => {
    const picked = pickProFormItemProps({
      label: 'Label',
      name: 'user',
      className: 'item-class',
      fieldProps: { placeholder: 'x' },
      onChange: () => undefined,
      valueType: 'text',
    });

    expect(picked.label).toBe('Label');
    expect(picked.name).toBe('user');
    expect(picked.className).toBe('item-class');
    expect(picked).not.toHaveProperty('fieldProps');
    expect(picked).not.toHaveProperty('onChange');
    expect(picked).not.toHaveProperty('valueType');
  });

  it('omit strips Form.Item keys but keeps name, id, and fieldId on inner field spread', () => {
    const omitted = omitProFormItemProps({
      name: 'tags',
      id: 'form_tags',
      fieldId: 'field_tags',
      label: 'Tags',
      rules: [{ required: true }],
      placeholder: 'Select',
      fieldProps: { mode: 'multiple' },
    });

    expect(omitted.name).toBe('tags');
    expect(omitted.id).toBe('form_tags');
    expect(omitted.fieldId).toBe('field_tags');
    expect(omitted.fieldProps).toEqual({ mode: 'multiple' });
    expect(omitted.placeholder).toBe('Select');
    expect(omitted).not.toHaveProperty('label');
    expect(omitted).not.toHaveProperty('rules');
  });

  it('documents the canonical Form.Item key list', () => {
    expect(proFormItemPropKeys).toContain('name');
    expect(proFormItemPropKeys).toContain('id');
    expect(proFormItemPropKeys).toContain('tooltip');
    expect(proFormItemPropKeys).not.toContain('fieldProps');
  });
});
