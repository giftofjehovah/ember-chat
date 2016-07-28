import Ember from 'ember';

export default Ember.Component.extend({
  init: function() {
    this._super()
    this.get('socket')

  }

});
