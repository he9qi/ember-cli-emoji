import Ember from 'ember';
import layout from '../templates/components/emoji-tag';

export default Ember.Component.extend({
  layout: layout,
  classNames: ['emoji-tag'],

  didInsertElement: function() {
    this._super();
    return Ember.run.scheduleOnce('afterRender', this, this.afterRenderEvent);
  },

  afterRenderEvent: function() {
    emojify.run();
  }

});
