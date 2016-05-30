import Ember from 'ember';

const { computed } = Ember;

export default Ember.Component.extend({
  classNames: ['input-field'],
  type: 'text',

  _errorMessages: computed('errors.[]', function() {
    return (this.get('errors') || []).join(', ');
  })
});
