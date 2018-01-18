import Component from '@ember/component';
import { computed } from "@ember/object"
import { inject as service } from "@ember/service"
import layout from '../templates/components/navigation-link';

export default Component.extend({
  layout,
  router: service(),
  tagName: 'li',
  classNameBindings: ['active'],
  active: computed('router.currentRouteName', function(){
    if(this.get('router.currentRouteName') === this.get('link')){
      return true;
    }
    return false;
  }),
  link: 'index',
  icon: 'users',
  label: 'Link',
});
