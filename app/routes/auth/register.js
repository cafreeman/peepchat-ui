import Ember from 'ember';

export default Ember.Route.extend({
  flashMessages: Ember.inject.service(),

  model() {
    return this.store.createRecord('user');
  },

  actions: {
    doRegister() {
      this.get('currentModel').save().then(() => {
          // Succesful save
          this.transitionTo('auth.login');
          this.get('flashMessages').success('Registered! Please login now');
        }).catch((resp) => {
          // Errors while saving
          const { errors } = resp;
          this.get('flashMessages').danger(errors.mapBy('detail').join(', '));
        });
    }
  }
});
