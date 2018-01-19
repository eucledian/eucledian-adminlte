import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('form/form-submit', 'Integration | Component | form/form submit', {
  integration: true
});

test('it renders', function(assert) {
  this.render(hbs`{{form/form-submit}}`);

  assert.equal(this.$().text().trim(), 'Accept');
});

