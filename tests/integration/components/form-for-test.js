import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { click, fillIn, render, settled, triggerEvent } from '@ember/test-helpers';
import { selectChoose } from 'ember-power-select/test-support/helpers';
import hbs from 'htmlbars-inline-precompile';
import { run } from '@ember/runloop';
import { openDatepicker } from 'ember-pikaday/helpers/pikaday';

module('Integration | Component | form for', function(hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(function(){
    this.store = this.owner.lookup('service:store');
  });

  test('it renders', async function(assert) {
    let label = 'Name';
    let newDate = new Date(2017, 10, 19);
    let file = new Blob(['foo', 'bar'], { type: 'image/png' });
    file.name = 'test.png';
    let user = server.create('user', {
      date: new Date(2017, 11, 23),
      option: 0,
      accepted: 0,
      html: '<p>foo</p>',
    });
    let organization = server.create('organization');
    let part1 = server.create('part');
    let part2 = server.create('part');
    let model = run(() => this.store.createRecord('user', user.attrs));
    let parts = run(() => [
      this.store.createRecord('part', part1.attrs),
      this.store.createRecord('part', part2.attrs),
    ]);
    let organizations = run(() => [this.store.createRecord('organization', organization.attrs)]);

    this.set('model', model);
    this.set('parts', parts);
    this.set('organizations', organizations);
    this.set('label', label);
    this.set('onSubmit', (e) => {
      assert.equal(e.type, 'submit');
    });

    await render(hbs`
      {{#form-for model=model onSubmit=(action onSubmit) as |f|}}
        {{f.input prop="name" label=label}}
        {{f.textarea prop="description" label=label}}
        {{f.select prop="option" options=model.options label=label}}
        {{f.selectModel prop="organization" options=organizations label=label}}
        {{f.multiModel prop="parts" options=parts label=label}}
        {{f.datepicker prop="date" label=label}}
        {{f.toggle prop="accepted" label=label}}
        {{f.file prop="image" label=label}}
        {{f.wysiwyg prop="html" label=label}}
        {{f.submit}}
      {{/form-for}}
    `);

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

    // Renders Form element
    let firstElement = this.$('.form-for');
    assert.equal(firstElement.get(0).tagName, 'FORM');

    // Renders Child input element
    let textInput = firstElement.find('.model-name input');
    assert.equal(textInput.val(), user.name);
    await fillIn('.form-for .model-name input', 'bar');
    assert.equal(textInput.val(), 'bar');
    assert.equal(model.get('name'), 'bar');

    // Renders Child textarea element
    let textArea = firstElement.find('.model-description textarea');
    assert.equal(textArea.val(), user.description);
    await fillIn('.form-for .model-description textarea', 'bar');
    assert.equal(textArea.val(), 'bar');
    assert.equal(model.get('description'), 'bar');

    // Renders Child select element
    let select = firstElement.find('.model-option .ember-power-select-trigger');
    assert.equal(select.text().trim(), 'Inactive');
    await selectChoose('.form-for .model-option .ember-power-select-trigger', 'Active');
    assert.equal(select.text().trim(), 'Active');
    assert.equal(model.get('option'), 1);

    // Renders Child select model element
    let selectModel = firstElement.find('.model-organization .ember-power-select-trigger');
    assert.equal(selectModel.text().trim(), '');
    await selectChoose('.form-for .model-organization .ember-power-select-trigger', organization.name);
    assert.equal(selectModel.text().trim(), organization.name);
    assert.equal(model.get('organization.id'), organization.id);

    // Renders Multi Child select
    await selectChoose('.form-for .model-parts .ember-power-select-trigger', part1.name);
    await selectChoose('.form-for .model-parts .ember-power-select-trigger', part2.name);
    assert.equal(model.get('parts.length'), parts.length);
    assert.equal(model.get('parts.firstObject.name'), part1.name);
    assert.equal(model.get('parts.lastObject.name'), part2.name);

    // Renders Child datepicker element
    let datepicker = firstElement.find('.model-date input');
    assert.equal(datepicker.val(), '23/12/2017');
    let interactor = openDatepicker(this.$('.form-for-datepicker input'));
    interactor.selectDate(newDate);
    assert.deepEqual(model.get('date'), newDate);

    let wysiwyg = firstElement.find('.model-html iframe').contents().find('.mce-content-body');
    assert.equal(wysiwyg.html(), '<p>foo</p>');
    tinymce.activeEditor.setContent(`<p>bar</p>`);
    let iframe = document.querySelector('iframe').contentWindow.document.body;
    await triggerEvent(iframe, 'focus');

    // Renders Child toggle element
    assert.equal(firstElement.find('.model-accepted label[for="accepted"]').text().trim(), label);
    await click('.form-for-toggle .x-toggle-btn');
    assert.equal(model.get('accepted'), 1);

    // Renders Child file input
    assert.equal(firstElement.find('.form-for-file-input').text().trim(), 'Name');
    assert.ok(firstElement.find('.form-for-file-input').hasClass('model-image'));

    await click('.form-for button');

    return settled().then(() => {
      assert.equal(fileInput.data('value'), 'data:image/png;base64,Zm9vYmFy');
      assert.equal(model.get('image'), 'data:image/png;base64,Zm9vYmFy');
    });
  });
});
