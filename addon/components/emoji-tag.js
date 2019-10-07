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
  scheduleEmojify () {
    once(this, this.runEmojify);
  },

  runEmojify () {
    emojify.run();
  },

  /**
   * Schedule `emojify` after render
   */
  didInsertElement () {
    this._super();
    this.scheduleEmojify = this.scheduleEmojify.bind(this);
    return scheduleOnce('afterRender', this, this.afterRenderEvent);
  },

  /**
   * Run `emojify` and schedule `emojify` whenever content changes
   */
  afterRenderEvent () {
    this.runEmojify();
    this.element.addEventListener("DOMSubtreeModified", this.scheduleEmojify);
  }
});
