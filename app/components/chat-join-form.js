import Ember from 'ember';

export default Ember.Component.extend({
  init: function () {
    this._super()
    this.get('socket')
      .on('connect', this, 'connect')
      .on('disconnect', this, 'disconnect')
  },

  hideOrShow: 'hidden',
  enableOrNot: true,

  connect: function () {
    this.set('hideOrShow', '')
  },

  disconnect: function () {
    this.set('enableOrNot', true)
  },

  actions: {
    joinChat () {
      let user = {
        name: this.get('name')
      }
      this.set('hideOrShow', 'hidden')
      this.get('socket').emit('join', user)
      console.log('Joining chat with name: ', user.name)
    },
    checkForNull () {
      if (this.name) this.set('enableOrNot', false)
      else this.set('enableOrNot', true)
    }
  }
});
