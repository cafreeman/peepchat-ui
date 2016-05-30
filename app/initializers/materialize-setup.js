export function initialize(/* application */) {
  if (window && window.validate_field) {
    window.validate_field = function() {};
  }
  // application.inject('route', 'foo', 'service:foo');
}

export default {
  name: 'materialize-setup',
  initialize
};
