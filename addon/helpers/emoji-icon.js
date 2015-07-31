import Ember from 'ember';

const EMOJI_PREFIX = /^emoji\-.+/;

const warn = Ember.Logger.warn;
const { typeOf, isArray } = Ember;

/**
 * Handlebars helper for generating HTML that renders a Emoji icon.
 *
 * @param  {String} name   The icon name. For `emoji-smile`, just set `smile`.
 * @param  {Object} params Options passed to helper.
 * @return {Ember.Handlebars.SafeString} The HTML markup.
 */
var emojiIcon = function emojiIcon(name, {
  classNames,
  tagName
} = {}) {
  if (typeOf(name) !== 'string') {
    const message = "emoji-icon: no icon specified";
    warn(message);
    return Ember.String.htmlSafe(message);
  }

  if (classNames === undefined) {
    classNames = [];
  }

  if (!isArray(classNames)) {
    classNames = [ classNames ];
  }

  classNames.push("emoji");

  const htmlTitle = name ? `title=":${name}:"` : "";

  if (!name.match(EMOJI_PREFIX)) {
    name = `emoji-${name}`;
  }

  classNames.push(name);

  tagName = tagName || 'span';

  const htmlClass = `class="${classNames.join(" ")}"`;

  const html = `<${tagName} ${htmlTitle} ${htmlClass}></${tagName}>`;

  return html.replace(/\s+/g, " ");
};

export { emojiIcon };

export default Ember.Helper.helper(function emojiIconHelper([name], params) {
  return Ember.String.htmlSafe(emojiIcon(name, params));
});
