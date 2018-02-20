import Component from '@ember/component';
import { computed } from '@ember/object';
import layout from '../templates/components/form-wysiwyg';

export default Component.extend({
  layout,
  classNames: ['form-group', 'form-for-wysiwyg'],
  classNameBindings: ['propName'],
  options: computed(function(){
    return {
      plugins: [
        'advlist autolink lists link image charmap print preview anchor textcolor',
        'searchreplace visualblocks code fullscreen',
        'insertdatetime media table contextmenu paste code help wordcount'
      ],
      toolbar: 'insert | undo redo | formatselect | bold italic backcolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | help',
    };
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
