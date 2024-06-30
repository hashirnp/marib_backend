const mongoose = require('mongoose');

// Define the schema for HolidayModel
const holidaySchema = new mongoose.Schema({
  startDate: { type: Number, required: true }, // Start date as Unix timestamp (milliseconds)
  endDate: { type: Number, required: true },   // End date as Unix timestamp (milliseconds)
  reason: { type: String, required: true },
  expireAt: { type: Date, required: true }     // Date object for TTL index
});

// Create a TTL index on expireAt field
holidaySchema.index({ expireAt: 1 }, { expireAfterSeconds: 0 });

// Create a model for HolidayModel
const HolidayModel = mongoose.model('HolidayModel', holidaySchema);

module.exports = HolidayModel;
