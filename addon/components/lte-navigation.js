import Component from '@ember/component';
import { computed } from '@ember/object';
import { schedule } from "@ember/runloop";
import layout from '../templates/components/lte-navigation';

export default Component.extend({
  layout,
  /**
   * Empty tag name since element needs to be direct child of main node
   */
  tagName: '',
  /**
   * Defines clickable route for top left logo
   */
  logoRoute: 'index',
  /**
   * URI path for `img` `src` attribute
   */
  logoUrl: null,
  /**
   * Profile Image
   */
  profileImage: '/eucledian-adminlte/user.svg',
  /**
   * Left sidebar status
   */
  collapsed: false,
  /**
   * User options panel open
   */
  userDropdownOpen: false,
  /**
   * Current User
   */
  currentUser: 'John Doe',
  init(){
    this._super(...arguments);
    schedule('afterRender', ()=>{
      // Calculates window height for canvas
      let header = document.getElementsByTagName('header')[0];
      let footer = document.getElementsByTagName('footer')[0];

      let minHeight = window.innerHeight - (header.offsetHeight + footer.offsetHeight);
      let contentWrapper = document.getElementsByClassName('content-wrapper')[0];

      contentWrapper.style.minHeight = `${minHeight}px`;
    });
  },
  year: computed(function(){
    let now = new Date();
    return now.getFullYear();
  }),
  actions: {
    /**
     * Calls logout function
     */
    logout(){
      this.get('onLogout')();
    },
    /**
     * Toggles left sidebar status
     */
    toggleNavigation(){
      let klass = 'sidebar-collapse';
      if(window.innerWidth < 768) { klass = 'sidebar-open'; }
      if(!this.get('collapsed')){
        document.getElementsByTagName("body")[0].classList.add(klass);
        this.set('collapsed', !this.get('collapsed'));
      } else {
        document.getElementsByTagName("body")[0].classList.remove(klass);
        this.set('collapsed', !this.get('collapsed'));
      }
    },
    /**
     * Toggles user panel settings view
     */
    openUserDropdown(){
      this.toggleProperty('userDropdownOpen');
    },
  }
});
