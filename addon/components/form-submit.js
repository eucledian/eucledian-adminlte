import Component from '@ember/component';
import layout from '../templates/components/form-submit';

export default Component.extend({
  layout,
  tagName: 'button',
  action: null,
  type: 'submit',
  classNames: ['btn', 'btn-primary', 'pull-right'],
  attributeBindings: ['disabled'],
  disabled: false,
  submitAction: null,
  label: 'Accept',
});
