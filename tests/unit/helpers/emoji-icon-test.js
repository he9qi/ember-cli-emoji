import { emojiIcon } from '../../../helpers/emoji-icon';
import { module, test } from 'qunit';

module('Unit | Helper | emoji icon');

test('it shows emoji icon', function(assert) {
  var result = emojiIcon('smile');

  assert.equal(result, '<span title=":smile:" class="emoji emoji-smile"></span>');
});
