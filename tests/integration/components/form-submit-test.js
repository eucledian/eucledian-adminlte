import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | form submit', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    await render(hbs`{{form-submit}}`);

    assert.equal(this.$().text().trim(), 'Accept');
    assert.equal(this.$('button').attr('type'), 'submit');
  });
});