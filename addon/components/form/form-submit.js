import Component from '@ember/component';
import layout from '../../templates/components/form/form-submit';

export default Component.extend({
  layout,
  tagName: 'button',
  action: null,
  type: 'submit',
  attributeBindings: ['disabled'],
  disabled: false,
  submitAction: null,
  label: 'Accept',
});
