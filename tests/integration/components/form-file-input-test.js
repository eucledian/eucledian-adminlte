import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, settled } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import EmberObject from '@ember/object';

module('Integration | Component | form file input', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    let label = 'name';
    let model = EmberObject.create({
      image: null,
    });
    let file = new Blob(['foo', 'bar'], { type: 'image/png' });
    file.name = 'test.png';

    this.set('label', label);
    this.set('model', model);

    await render(hbs`{{form-file-input model=model prop="image" label=label}}`);

    let fileInput = this.$('.form-for-file-input input[type="file"]');

    fileInput.triggerHandler({
      type: 'change',
      target: {
        files: {
          0: file,
          length: 1,
          item(){ return file; },
        },
      },
    });

    assert.equal(this.$('.form-for-file-input').text().trim(), 'name');
    assert.ok(this.$('.form-for-file-input').hasClass('model-image'));
    return settled().then(() => {
      assert.equal(fileInput.data('value'), 'data:image/png;base64,Zm9vYmFy');
      assert.equal(model.get('image'), 'data:image/png;base64,Zm9vYmFy');
    });
  });

  test('it renders errors', async function(assert) {
    let model = EmberObject.create({
      name: 'foo',
      errors: {
        name: [{ message: 'Not present' }]
      }
    });
    this.set('model', model);

    await render(hbs`{{form-file-input model=model prop="name"}}`);

    assert.equal(this.$('.errors:first').text().trim(), 'Not present');
  });
});
