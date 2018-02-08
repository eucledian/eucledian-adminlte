import Component from '@ember/component';
import { computed } from '@ember/object';
import layout from '../templates/components/form-wysiwyg';

export default Component.extend({
  layout,
  classNames: ['form-group', 'form-for-wysiwyg'],
  classNameBindings: ['propName'],
  options: computed(function(){
    return {};
  }),
  propName: computed(function(){
    return `model-${this.get('prop')}`;
  }),
  actions: {
    onChange(content){
      this.set(`model.${this.get('prop')}`, content);
    }
  },
});
