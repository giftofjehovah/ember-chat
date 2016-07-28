import Ember from 'ember'

export default Ember.Component.extend({
  init: function () {
    this._super()
    this.get('socket')
      .on('welcome', this, 'welcome')
      .on('online', this, 'online')
      .on('joined', this, 'joined')
      .on('chat', this, 'chat')
      .on('left', this, 'left')
  },

  hideOrShow: 'hidden',
  msg: [],
  names: '',

  welcome: function (msg) {
    this.set('hideOrShow', '')
    let msgDetail = {
      msg: msg,
      className: 'text-center'
    }
    this.msg.unshiftObject(msgDetail)
  },

  online: function (connections) {
    let names = ''
    for (let i = 0; i < connections.length; ++i) {
      if (connections[i].user) {
        if (i > 0) {
          if (i === connections.length - 1) names += ' and '
          else names += ', '
        }
        names += connections[i].user.name
      }
    }
    this.set('names', names)
  },

  joined: function (user) {
    let msgDetail = {
      msg: user.name + ' joined the chat',
      className: 'text-center'
    }
    this.msg.unshiftObject(msgDetail)
  },

  left: function (user) {
    let msgDetail = {
      msg: user.name + ' left the chat',
      className: 'text-center'
    }
    this.msg.unshiftObject(msgDetail)
  },

  chat: function (msg) {
    let msgDetail = {
      msg: msg.user.name,
      className: 'alert alert-success',
      text: msg.message
    }
    this.msg.unshiftObject(msgDetail)
  },

  actions: {
    sendMsg () {
      this.get('socket').emit('chat', this.get('newMsg'))
      console.log('Sending message: ', this.get('newMsg'))
      let msgDetail = {
        msg: this.get('newMsg'),
        className: 'alert alert-info text-right'
      }
      this.msg.unshiftObject(msgDetail)
      this.set('newMsg', '')
    }
  }

})
