import Component from '@ember/component';
import layout from '../templates/components/form-submit';

export default Component.extend({
  layout,
  tagName: 'button',
  action: null,
  classNames: ['btn', 'btn-primary', 'pull-right'],
  attributeBindings: ['type', 'disabled'],
  disabled: false,
  type: 'submit',
  submitAction: null,
  label: 'Accept',
});
