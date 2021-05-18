import { mount, shallowMount } from '@vue/test-utils';
import SchemaForm from '../../lib/SchemaForm';
import NumberField from '../../lib/components/NumberField';

describe('SchemaForm', () => {
  it('numberField shoule be correct rendered', () => {
    let value = '';
    const wrapper = mount(SchemaForm as any, {
      props: {
        schema: {
          type: 'number',
        },
        value: value,
        onChang: (v: any) => {
          value = v;
        },
      },
    });
    const numberField = wrapper.findComponent(NumberField);
    expect(numberField.exists()).toBeTruthy();
  });
});
