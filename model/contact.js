const mongoose = require('mongoose');

const ContactSchema = new mongoose.Schema({
	userId: String,
	contactId: String,
	intervalInDays: Number,
	hour: String,
	timezone: String,
	scheduledTime: String,
});

module.exports = mongoose.model('Contact', ContactSchema);
