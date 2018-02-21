import Component from '@ember/component';
import { computed } from '@ember/object';
import layout from '../templates/components/form-select-model';

export default Component.extend({
  layout,
  init(){
    this._super(...arguments);
    this.set('selected', this.get(`model.${this.get('prop')}`));
  },
  classNames: ['form-group', 'form-for-select-model'],
  classNameBindings: ['propName'],
  label: null,
  options: computed(function(){ return []; }),
  disabled: false,
  prop: null,
  name: 'name',
  searchField: 'name',
  selected: null,
  propName: computed(function(){
    return `model-${this.get('prop')}`;
  }),
  actions: {
    onSelect(value){
      this.set('selected', value);
      this.set(`model.${this.get('prop')}`, value);
    },
  },
});
