import Component from '@ember/component';
import { schedule } from "@ember/runloop";
import layout from '../templates/components/lte-navigation';

export default Component.extend({
  layout,
  tagName: '',
  logoRoute: 'index',
  logoUrl: null,
  collapsed: false,
  currentUser: 'John Doe',
  init(){
    this._super(...arguments);
    schedule('afterRender', ()=>{
      let header = document.getElementsByTagName('header')[0];
      let footer = document.getElementsByTagName('footer')[0];

      let minHeight = window.innerHeight - (header.offsetHeight + footer.offsetHeight);
      let contentWrapper = document.getElementsByClassName('content-wrapper')[0];

      contentWrapper.style.minHeight = `${minHeight}px`;
    });
  },
  actions: {
    logout(){
      this.get('onLogout')();
    },
    toggleNavigation(){
      if(!this.get('collapsed')){
        document.getElementsByTagName("body")[0].classList.add('sidebar-collapse');
        this.set('collapsed', !this.get('collapsed'));
      } else {
        document.getElementsByTagName("body")[0].classList.remove('sidebar-collapse');
        this.set('collapsed', !this.get('collapsed'));
      }
    },
  }
});
