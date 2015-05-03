Meteor.startup(function () {
  // code to run on server at startup
})
Meteor.publish('resolutions', function() {
  return Resolutions.find()
})

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
