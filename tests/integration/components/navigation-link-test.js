import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import Service from '@ember/service';

const routerStub = Service.extend({
  transitionTo() {
    return true;
  },
});

module('Integration | Component | navigation link', function(hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(function() {
    this.owner.register('service:router', routerStub);
    this.router = this.owner.lookup('service:router');
  });

  test('it renders', async function(assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });

    await render(hbs`{{navigation-link}}`);

    assert.equal(this.$().text().trim(), 'Link');
  });
});