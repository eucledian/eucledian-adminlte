import Component from '@ember/component';
import { computed } from '@ember/object';
import layout from '../templates/components/form-wysiwyg';

export default Component.extend({
  layout,
  classNames: ['form-group', 'form-for-wysiwyg'],
  classNameBindings: ['propName'],
  options: computed(function(){
    return {
      height: 300,
      theme: 'modern',
      plugins: [
        'advlist autolink lists link image charmap print preview hr anchor pagebreak',
        'searchreplace wordcount visualblocks visualchars code fullscreen',
        'insertdatetime media nonbreaking save table contextmenu directionality',
        'emoticons template paste textcolor colorpicker textpattern imagetools'
      ],
      toolbar1: 'insertfile undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image',
      toolbar2: 'print preview media | forecolor backcolor emoticons',
      image_advtab: true,
      templates: [
        { title: 'Test template 1', content: 'Test 1' },
        { title: 'Test template 2', content: 'Test 2' }
      ]
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
