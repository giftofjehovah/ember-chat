import Ember from 'ember';

export default Ember.Component.extend({
  init: function() {
    this._super()
    this.get('socket')
      .on('connect', this, 'connect')
      .on('disconnect', this, 'disconnect')
  },

  status: 'default',
  statusMsg: 'loading',

  connect: function() {
    this.set('status', 'success')
    this.set('statusMsg', 'connected')
  },

  disconnect: function() {
    this.set('status', 'danger')
    this.set('statusMsg', 'disconnected')
  }

});
