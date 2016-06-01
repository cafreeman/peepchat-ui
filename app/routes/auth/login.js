import Ember from 'ember';

export default Ember.Route.extend({
  session: Ember.inject.service(),

  model() {
    return {
      email: '',
      password: ''
    };
  },

  actions: {
    doLogin() {
      const user = this.get('currentModel');
      this.get('session')
        .authenticate(
          'authenticator:peepchat', user.email, user.password
        );
    }
  }
});
