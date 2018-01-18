import Component from '@ember/component';
import { computed } from '@ember/object';
import layout from '../templates/components/lte-footer';

export default Component.extend({
  layout,
  tagName: 'footer',
  classNames: ['main-footer'],
  year: computed(function(){
    let now = new Date();
    return now.getFullYear();
  }),
});
