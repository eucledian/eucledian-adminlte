import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { selectChoose } from 'ember-power-select/test-support/helpers';
import { run } from '@ember/runloop';
import hbs from 'htmlbars-inline-precompile';
import EmberObject from '@ember/object';

module('Integration | Component | form multi model', function(hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(function(){
    this.store = this.owner.lookup('service:store');
  });

  test('it renders', async function(assert) {
    let label = 'name';
    let user = server.create('user');
    let model = run(() => this.store.createRecord('user', user.attrs));
    let part1 = server.create('part');
    let part2 = server.create('part');
    let part3 = server.create('part');
    let options = run(() => [
      this.store.createRecord('part', part1.attrs),
      this.store.createRecord('part', part2.attrs),
      this.store.createRecord('part', part3.attrs),
    ]);

    run(() => model.get('parts').pushObject(options[options.length - 1]));

    this.set('options', options);

    this.set('model', model);
    this.set('label', label);

    await render(hbs`{{form-multi-model
                      model=model
                      label=label
                      prop="parts"
                      options=options}}`);

    assert.equal(this.$('label').attr('for'), 'parts');
    assert.equal(this.$('label').text().trim(), label);
    await selectChoose('.form-for-multi-model .ember-power-select-trigger', part1.name);
    await selectChoose('.form-for-multi-model .ember-power-select-trigger', part2.name);
    assert.equal(model.get('parts.length'), options.length);
    assert.equal(model.get('parts.firstObject.name'), part3.name);
    assert.equal(model.get('parts.lastObject.name'), part2.name);
    assert.ok(this.$('.form-for-multi-model').hasClass('model-parts'));
  });

  test('it renders errors', async function(assert) {
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

    await render(hbs`{{form-select-model
                      model=model
                      prop="option"
                      options=model.options}}`);

    assert.equal(this.$('.errors:first').text().trim(), 'Not present');
  });
});
