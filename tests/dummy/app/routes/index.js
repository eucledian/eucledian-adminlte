import Route from '@ember/routing/route';
import RSVP from 'rsvp';

export default Route.extend({
  model(){
    return RSVP.hash({
      users: this.store.findAll('user'),
      parts: this.store.findAll('part'),
      cars: this.store.findAll('car'),
    });
  }
});
