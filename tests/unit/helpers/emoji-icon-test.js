import { emojiIcon } from '../../../helpers/emoji-icon';
import { module, test } from 'qunit';

module('Unit | Helper | emoji icon');

test('it shows emoji icon', function(assert) {
  var result = emojiIcon('smiley');

  assert.equal(result, '<span title=":smiley:" class="emoji emoji-smiley"></span>');
});
