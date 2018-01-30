import { run } from '@ember/runloop';
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('emoji-tag', 'Integration | Component | emoji tag', {
  integration: true
});

test('it converts to emoji', function(assert) {
  assert.expect(1);

  this.render(hbs`
    {{#emoji-tag}}
      Hello :smiley:
    {{/emoji-tag}}
  `);

  assert.equal(this.$('span')[0].outerHTML,
    '<span class="emoji emoji-smiley" title=":smiley:"></span>');
});

test('it detects changes', function(assert) {
  assert.expect(1);

  this.render(hbs`
    {{#emoji-tag}}
      Hello :smiley:
    {{/emoji-tag}}
  `);

  run(this, function() {
    this.$('.emoji-tag:first').text(':frog:');
  });

  assert.equal(this.$('span')[0].outerHTML,
    '<span class="emoji emoji-frog" title=":frog:"></span>');
});
