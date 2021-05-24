import { mount, shallowMount } from '@vue/test-utils';
import SchemaForm from '../../lib/SchemaForm';
// import NumberField from '../../lib/components/NumberField';

describe('SchemaForm', () => {
  it('SchemaForm name should be right', () => {
    const wrapper = shallowMount(SchemaForm as any, {});
    expect(SchemaForm.name).toBe('SchemaForm');
  });
});
