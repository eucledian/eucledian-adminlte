import { moduleForComponent, test } from 'ember-qunit';
import { selectChoose } from 'ember-power-select/test-support/helpers';
import hbs from 'htmlbars-inline-precompile';
import EmberObject from '@ember/object';

moduleForComponent('form/form-select-model', 'Integration | Component | form/form select model', {
  integration: true
});

test('it renders', async function(assert) {
  let label = 'name';
  let model = EmberObject.create({
    option: EmberObject.create({
      name: 'Inactive',
      value: 0,
    }),
    options: [
      EmberObject.create({
        name: 'Inactive',
        value: 0,
      }),
      EmberObject.create({
        name: 'Active',
        value: 1,
      })
    ],
  });

  this.set('model', model);
  this.set('label', label);

  this.render(hbs`{{form/form-select-model
                    model=model
                    label=label
                    prop="option"
                    options=model.options}}`);

  assert.equal(this.$('label').attr('for'), 'option');
  assert.equal(this.$('label').text().trim(), label);
  await selectChoose('.form-for-select-model .ember-power-select-trigger', 'Inactive');
  await selectChoose('.form-for-select-model .ember-power-select-trigger', 'Active');
  await selectChoose('.form-for-select-model .ember-power-select-trigger', 'Active');
  assert.equal(model.get('option.value'), 1);
  assert.ok(this.$('.form-for-select-model').hasClass('model-option'));
});

test('it renders errors', function(assert) {
  let model = EmberObject.create({
    option: 0,
    options: [
      EmberObject.create({
        name: 'Inactive',
        value: 0,
      }),
      EmberObject.create({
        name: 'Active',
        value: 1,
      })
    ],
    errors: {
      option: [{ message: 'Not present' }]
    }
  });
  this.set('model', model);

  this.render(hbs`{{form/form-select-model
                    model=model
                    prop="option"
                    options=model.options}}`);

  assert.equal(this.$('.errors:first').text().trim(), 'Not present');
});

