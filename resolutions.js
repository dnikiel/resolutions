// collection
Resolutions = new Mongo.Collection('resolutions')

if (Meteor.isClient) {
  Meteor.subscribe('resolutions')

  // template helper
  Template.body.helpers({
    resolutions: function() {
      if (Session.get('hideFinished')) {
        return Resolutions.find({author: Meteor.userId(), checked: {$ne: true}}) // mongo not equal
      } else {
        return Resolutions.find({author: Meteor.userId()})
      }
    }
  , hideFinished: function() {
      return Session.get('hideFinished')
    }
  })
  Template.body.events({
    'submit .new-resolution': function(event) {
      var title = event.target.title.value

      Meteor.call('addResolution', title) // call meteor method instead of inserting value to mongo

      event.target.title.value = ''

      return false
    }
  , 'change .hide-finished': function(event) {
      Session.set('hideFinished', event.target.checked)
    }
  })

  Template.resolution.events({
    'click .delete': function() {
      Meteor.call('deleteResolution', this._id) // _id - default mongo record id
    }
  , 'click .toggle-checked': function() {
      Meteor.call('updateResolution', this._id, !this.checked)
    }
  })

  Accounts.ui.config({
    passwordSignupFields: 'USERNAME_ONLY'
  })
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  })
  Meteor.publish('resolutions', function() {
    return Resolutions.find()
  })
}

Meteor.methods({
  addResolution: function(title) {
    Resolutions.insert({
      title: title
    , createdAt: new Date()
    , author: Meteor.userId()
    })
  }
, deleteResolution: function(id) {
    Resolutions.remove(id)
  }
, updateResolution: function(id, checked) {
    Resolutions.update(id, {$set: {checked: checked}})
  }
})
