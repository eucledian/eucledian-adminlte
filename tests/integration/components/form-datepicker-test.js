import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import EmberObject from '@ember/object';
import { openDatepicker } from 'ember-pikaday/helpers/pikaday';

moduleForComponent('form-datepicker', 'Integration | Component | form datepicker', {
  integration: true
});

test('it renders', function(assert) {
  let label = 'name';
  let date = new Date(2017, 11, 23, 0, 0, 0, 0);
  let newDate = new Date(2017, 10, 19);
  let model = EmberObject.create({
    date,
  });

  this.set('model', model);
  this.set('label', label);

  this.render(hbs`{{form-datepicker
                    model=model
                    prop='date'
                    label=label}}`);

  assert.equal(this.$('label').attr('for'), 'date');
  assert.equal(this.$('label').text().trim(), label);
  assert.equal(this.$('.form-for-datepicker input').val(), '23/12/2017');

  let interactor = openDatepicker(this.$('.form-for-datepicker input'));
  interactor.selectDate(newDate);
  assert.deepEqual(model.get('date'), newDate);
});

