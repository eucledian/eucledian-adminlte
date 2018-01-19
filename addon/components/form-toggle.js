import Component from '@ember/component';
import { computed } from '@ember/object';
import layout from '../templates/components/form-toggle';

export default Component.extend({
  layout,
  classNames: ['form-for-toggle'],
  classNameBindings: ['propName'],
  showLabels: false,
  disabled: false,
  theme: 'default',
  size: 'large',
  onLabel: 'On',
  offLabel: 'Off',
  label: null,
  propName: computed(function(){
    return `model-${this.get('prop')}`;
  }),
  actions: {
    onToggle(value){
      if(value){
        this.set(`model.${this.get('prop')}`, 1);
      } else {
        this.set(`model.${this.get('prop')}`, 0);
      }
    }
  },
});
