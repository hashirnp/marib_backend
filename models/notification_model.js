const mongoose = require('mongoose');

const eventNotificationSchema = new mongoose.Schema({
  title: { type: String, required: true },
  timestamp: { type: String, required: true },
  imageUrl: { type: String },
  text: { type: String }
});

const EventNotificationModel = mongoose.model('EventNotification', eventNotificationSchema);

module.exports = EventNotificationModel;
