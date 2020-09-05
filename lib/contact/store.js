const dbFactory = require('../../util/dbFactory');
const helper = require('../../util/helper');

const contactModel = dbFactory.contactModel;

const store = {
	getContactById(id) {
		return contactModel.findOne(id);
	},

	getContactsByArgs(args) {
		const condition = {};
		if (args.userId) condition.userId = args.userId;
		if (args.contactId) condition.contactId = args.contactId;
		if (args.after) condition._id = {$gt: args.after};
		console.log('Contact conditions: ', condition);
		let query = contactModel.find(condition);
		if (args.limit) query = query.limit(args.limit);
		return query;
	},

	getContactsToSchedule(scheduledTime) {
		return contactModel.find({scheduledTime});
	},

	createContact(contact) {
		contact.scheduledTime = helper.getNextContactTime(
			contact.intervalInDays, contact.hour, contact.timezone, null);
		const newContact = new contactModel(contact);
		return newContact.save();
	},

	updateContact(contact) {
		contact.scheduledTime = helper.getNextContactTime(
			contact.intervalInDays, contact.hour, contact.timezone, contact.scheduledTime);
		const {id, ...rest} = contact;
		return contactModel.findByIdAndUpdate(id, {$set: rest}, {new: true})
			.catch(err => console.error(err));
	},

	deleteContact(id) {
		return contactModel.findByIdAndDelete(id)
			.then(contact => contact.remove())
			.then(() => `${id} successfully deleted`)
			.catch(err => console.error(err));
	}
};

module.exports = store;
