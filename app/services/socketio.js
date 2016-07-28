/* global io */

import Ember from 'ember';
// import io from 'socket.io';
let socket

export default Ember.Service.extend(Ember.Evented, {
  setUpSocket: function () {
    socket = io('localhost:3000')
    this
      .connect()
      .disconnect()
      .welcome()
      .chat()
      .joined()
      .left()
      .online()
  }.on('init'),

  connect: function () {
    socket.on('connect', () => {
      console.log('Connected to Chat Socket')
      this.trigger('connect')
    })
    return this
  },

  disconnect: function () {
    socket.on('disconnect', () => {
      console.log('Disconnected from Chat Socket')
      this.trigger('disconnect')
    })
    return this
  },

  welcome: function () {
    socket.on('welcome', (msg) => {
      console.log('Received welcome message: ', msg)
      this.trigger('welcome', msg)
    })
    return this
  },

  chat: function () {
    socket.on('chat', (msg) => {
      console.log('Received message: ', msg)
      this.trigger('chat', msg)
    })
    return this
  },

  joined: function () {
    socket.on('joined', (user) => {
      console.log(user.name + ' joined left the chat.')
      this.trigger('joined', user)
    })
    return this
  },

  left: function () {
    socket.on('joined', (user) => {
      console.log(user.name + ' left the chat.')
      this.trigger('left', user)
    })
    return this
  },

  online: function () {
    socket.on('online', (connections) => {
      console.log('Connections: ', connections)
      this.trigger('online', connections)
    })
    return this
  },

  emit: function (events, msg) {
    socket.emit(events, msg)
  }
});
