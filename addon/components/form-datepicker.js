import Component from '@ember/component';
import { computed } from '@ember/object';
import layout from '../templates/components/form-datepicker';

export default Component.extend({
  layout,
  classNames: ['form-group', 'form-for-datepicker'],
  classNameBindings: ['propName'],
  label: null,
  propName: computed(function(){
    return `model-${this.get('prop')}`;
  }),
  actions: {
    onDateSelected(value){
      this.set(`model.${this.get('prop')}`, value);
    },
  },
});
