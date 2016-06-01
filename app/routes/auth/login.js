import Ember from 'ember';

export default Ember.Route.extend({
  session: Ember.inject.service(),
  flashMessages: Ember.inject.service(),

  model() {
    return {
      email: '',
      password: ''
    };
  },

  actions: {
    doLogin() {
      const user = this.get('currentModel');
      this.get('session').authenticate(
          'authenticator:peepchat',
          user.email,
          user.password
        ).then(() => {
          // Successful login
          this.get('flashMessages').success('Logged in!');
        }).catch(response => {
          const { errors } = response;

          // Check for 401 status
          if (errors.mapBy('code').indexOf(401) >= 0) {
            // Unauthorized
            this.get('flashMessages')
              .danger('There was a problem with your username or password, please try again');
          } else {
            // All other API errors
            this.get('flashMessages').danger('Server Error');
          }
        });
    }
  }
});
