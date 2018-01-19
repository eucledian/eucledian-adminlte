import { moduleForComponent, test } from 'ember-qunit';
import { click } from 'ember-native-dom-helpers';
import hbs from 'htmlbars-inline-precompile';
import EmberObject from '@ember/object';

moduleForComponent('form/form-toggle', 'Integration | Component | form/form toggle', {
  integration: true
});

test('it renders', async function(assert) {
  let label = 'name';
  let model = EmberObject.create({
    accepted: 0,
  });

  this.set('model', model);
  this.set('label', label);

  this.render(hbs`{{form/form-toggle
                    model=model
                    prop="accepted"
                    label=label}}`);

  assert.equal(this.$('label').attr('for'), 'accepted');
  assert.equal(this.$('label[for="accepted"]').text().trim(), label);
  await click('.form-for-toggle .x-toggle-container .x-toggle-btn');
  assert.equal(model.get('accepted'), 1);
});

