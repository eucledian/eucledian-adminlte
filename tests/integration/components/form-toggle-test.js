import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { click, render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import EmberObject from '@ember/object';

module('Integration | Component | form toggle', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    let label = 'name';
    let model = EmberObject.create({
      accepted: 0,
    });

    this.set('model', model);
    this.set('label', label);

    await render(hbs`{{form-toggle
                      model=model
                      prop="accepted"
                      label=label}}`);

    assert.equal(this.$('label').attr('for'), 'accepted');
    assert.equal(this.$('label[for="accepted"]').text().trim(), label);
    await click('.form-for-toggle .x-toggle-container .x-toggle-btn');
    assert.equal(model.get('accepted'), 1);
  });
});
