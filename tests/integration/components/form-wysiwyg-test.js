import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import EmberObject from '@ember/object';

module('Integration | Component | form wysiwyg', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders wysiwyg', async function(assert) {
    let label = 'name';
    let model = EmberObject.create({
      name: '<p>foo</p>',
    });
    this.set('model', model);
    this.set('label', label);
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });

    await render(hbs`{{form-wysiwyg
                      model=model
                      prop="name"
                      label=label}}`);

    assert.equal(this.$('label').attr('for'), 'name');
    assert.equal(this.$('label').text().trim(), label);
    assert.equal(this.$('.form-for-wysiwyg iframe').contents().find('.mce-content-body').html(), '<p>foo</p>');
    assert.ok(this.$('.form-for-wysiwyg').hasClass('model-name'));
  });

  test('it renders errors', async function(assert) {
    let model = EmberObject.create({
      name: 'foo',
      errors: {
        name: [{ message: 'Not present' }]
      }
    });
    this.set('model', model);

    await render(hbs`{{form-wysiwyg model=model prop="name"}}`);

    assert.equal(this.$('.errors:first').text().trim(), 'Not present');
  });
});
