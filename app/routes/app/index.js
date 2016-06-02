import Ember from 'ember';

const { RSVP, inject } = Ember;

export default Ember.Route.extend({

  flashMessages: inject.service(),

  model() {
    return RSVP.hash({
      // Live array of all rooms
      rooms: this.store.findAll('room'),
      // Object to use for creating a new room
      newRoom: {name: '', errors: []}
    });
  },

  actions: {
    // Create a new room
    createRoom() {
      // Get the "new room" model
      let data = this.get('currentModel.newRoom');
      // Create an ember-data record
      let room = this.store.createRecord('room', {name: data.name});
      // Clear any existing error messages
      this.set('currentModel.newRoom.errors', []);

      room.save().then(() => { // Successfu creation
        // Success notification
        this.get('flashMessages').success(`Created room: ${data.name}`);
        // Clear the room
        this.set('currentModel.newRoom.name', '');
      }).catch((err) => { // Server-side error message
        // Remove the ember-data record from the Store
        this.store.unloadRecord(room);
        // Pass any error messages into the UI
        this.set('currentModel.newRoom.errors', (err.errors || []).mapBy('detail'));
        // Notification of failure
        this.get('flashMessages').danger(`Problem creating room: ${data.name}`);
      });
    },

    // Delete a room
    removeRoom(room) {
      if (window.confirm('Are you sure?')) {
        room.destroyRecord().then(() => {
          this.get('flashMessages').success(`Deleted room: ${room.get('name')}`);
        }).catch(() => {
          this.get('flashMessages').danger(`Problem deleting room: ${room.get('name')}`);
        });
      }
    }
}});
