import Component from '@ember/component';
import { computed } from '@ember/object';
import layout from '../templates/components/form-multiselect-checkboxes';

export default Component.extend({
  layout,
  classNames: ['form-group', 'form-for-multiselect-checkboxes'],
  classNameBindings: ['propName'],
  disabled: false,
  label: null,
  propName: computed(function(){
    return `model-${this.get('prop')}`;
  }),
  actions: {
    updateSelection: function (newSelection, value, operation) {
      this.set('selection', newSelection);

    },
  },
});
