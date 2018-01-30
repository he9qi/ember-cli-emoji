import Component from '@ember/component';
import { scheduleOnce, once } from '@ember/runloop';
import layout from '../templates/components/emoji-tag';

export default Component.extend({
  layout: layout,

  /**
   * Default class name of `emoji-tag` component
   */
  classNames: ['emoji-tag'],

  /**
   * Schedule `emojify` during run loop
   */
  scheduleEmojify: function() {
    once(this, function() {
      emojify.run();
    });
  },

  /**
   * Schedule `emojify` after render
   */
  didInsertElement: function() {
    this._super();
    return scheduleOnce('afterRender', this, this.afterRenderEvent);
  },

  /**
   * Run `emojify` and schedule `emojify` whenever content changes
   */
  afterRenderEvent: function() {
    emojify.run();
    this.$().bind("DOMSubtreeModified", this.scheduleEmojify);
  }

});
