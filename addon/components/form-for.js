import Component from '@ember/component';
import layout from '../templates/components/form-for';

export default Component.extend({
  layout,
  tagName: 'form',
  classNames: ['form-for'],
  model: 'null',
  disabled: false,
  onSubmit: null,
  submit(e){
    e.preventDefault();
    this.get('onSubmit')(e);
  },
});
