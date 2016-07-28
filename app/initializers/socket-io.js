export function initialize(application) {
  application.inject('component', 'socket', 'service:socketio');
}

export default {
  name: 'socket-io',
  initialize
};
