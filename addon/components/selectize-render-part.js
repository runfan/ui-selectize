import Ember from 'ember';
const { keys, create } = Object; // jshint ignore:line
const { RSVP: {Promise, all, race, resolve, defer} } = Ember; // jshint ignore:line
const { inject: {service} } = Ember; // jshint ignore:line
const { computed, observe, $, run, on, typeOf } = Ember;  // jshint ignore:line
const { get, set, debug } = Ember; // jshint ignore:line
const a = Ember.A; // jshint ignore:line

import layout from '../templates/components/selectize-render-part';

const renderPart = Ember.Component.extend({
  layout,
  tagName: '',
  init() {
    this._super(...arguments);
    const {part, register} = this.getProperties('part', 'register');
    run.schedule('afterRender', () => {
      if (register) {
        register({
          id: this.elementId,
          part: part,
          getTemplate: Ember.$.proxy(this.getTemplate, this)
        });
      } else {
        debug('could\'t register with selectize control');
      }
    });
  },
  getTemplate() {
    const $find = `#${this.elementId}-for-${get(this, 'containerId')}`;
    return window.$($find).html();
  },
  willDestroyElement() {
    const unregister = get(this, 'unregister');
    if(unregister) {
      unregister(this);
    }
  }
});

renderPart.reopenClass({
  positionalParams: ['inlineContent']
});
renderPart[Ember.NAME_KEY] = 'render-part';
export default renderPart;
