import { moduleForComponent, test } from 'ember-qunit';
import wait from 'ember-test-helpers/wait';
import hbs from 'htmlbars-inline-precompile';
import EmberObject from '@ember/object';

moduleForComponent('form-file-input', 'Integration | Component | form file input', {
  integration: true
});

test('it renders', function(assert) {
  let label = 'name';
  let model = EmberObject.create({
    image: null,
  });
  let file = new Blob(['foo', 'bar'], { type: 'image/png' });
  file.name = 'test.png';

  this.set('label', label);
  this.set('model', model);

  this.render(hbs`{{form-file-input model=model prop="image" label=label}}`);

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
  return wait().then(() => {
    assert.equal(fileInput.data('value'), 'data:image/png;base64,Zm9vYmFy');
    assert.equal(model.get('image'), 'data:image/png;base64,Zm9vYmFy');
  });
});
