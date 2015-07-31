import Ember from 'ember';
import layout from '../templates/components/emoji-tag';

export default Ember.Component.extend({
  layout: layout,

  /**
   * Default class name of `emoji-tag` component
   */
  classNames: ['emoji-tag'],

  /**
   * Schedule `emojify` during run loop
   */
  scheduleEmojify: function() {
    Ember.run.once(this, function() {
      emojify.run();
    });
  },

  /**
   * Schedule `emojify` after render
   */
  didInsertElement: function() {
    this._super();
    return Ember.run.scheduleOnce('afterRender', this, this.afterRenderEvent);
  },

  /**
   * Run `emojify` and schedule `emojify` whenever content changes
   */
  afterRenderEvent: function() {
    emojify.run();
    this.$().bind("DOMSubtreeModified", this.scheduleEmojify);
  }

});
