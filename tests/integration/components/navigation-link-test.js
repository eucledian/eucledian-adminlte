import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import Service from '@ember/service';

const routerStub = Service.extend({
  transitionTo() {
    return true;
  },
});

moduleForComponent('navigation-link', 'Integration | Component | navigation link', {
  integration: true,
  beforeEach(){
    this.register('service:router', routerStub);
    this.inject.service('router');
  }
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{navigation-link}}`);

  assert.equal(this.$().text().trim(), 'Link');
});
