import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import EmberObject from '@ember/object';

moduleForComponent('form-input', 'Integration | Component | form input', {
  integration: true
});

test('it renders text input', function(assert) {
  let label = 'name';
  let placeholder = 'A Name';
  let model = EmberObject.create({
    name: 'foo',
  });
  this.set('model', model);
  this.set('label', label);
  this.set('placeholder', placeholder);

  this.render(hbs`{{form-input
                    model=model
                    prop="name"
                    placeholder=placeholder
                    label=label}}`);

  assert.equal(this.$('label').attr('for'), 'name');
  assert.equal(this.$('label').text().trim(), label);
  assert.equal(this.$('input').attr('type'), 'text');
  assert.equal(this.$('input').attr('placeholder'), placeholder);
  assert.equal(this.$('input').val(), 'foo');
  assert.ok(this.$('.form-for-input').hasClass('model-name'));
});

test('it renders', function(assert) {
  let model = EmberObject.create({
    name: 'foo',
  });
  this.set('model', model);

  this.render(hbs`{{form-input model=model prop="name"}}`);

  assert.equal(this.$('label').length, 0);
  assert.equal(this.$('input').attr('type'), 'text');
  assert.equal(this.$('input').val(), 'foo');
});

test('it renders errors', function(assert) {
  let model = EmberObject.create({
    name: 'foo',
    errors: {
      name: [{ message: 'Not present' }]
    }
  });
  this.set('model', model);

  this.render(hbs`{{form-input model=model prop="name"}}`);

  assert.equal(this.$('.errors:first').text().trim(), 'Not present');
});

test('it renders number', function(assert) {
  let min = 0;
  let max = 1;
  let model = EmberObject.create({
    number: 2,
  });
  this.set('model', model);
  this.set('min', min);
  this.set('max', max);

  this.render(hbs`{{form-input
                    model=model
                    prop="number"
                    type="number"
                    min=min
                    max=max}}`);

  assert.equal(this.$('input').attr('type'), 'number');
  assert.equal(this.$('input').attr('min'), min);
  assert.equal(this.$('input').attr('max'), max);
  assert.equal(this.$('input').val(), 2);
});

