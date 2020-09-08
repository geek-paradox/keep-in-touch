const dbFactory = require('../../util/dbFactory');

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
		console.log(`getContactsByArgs condition: ${condition} with limit ${args.limit}`);
		let query = contactModel.find(condition);
		if (args.limit) query = query.limit(args.limit);
		return query;
	},

	getContactsToSchedule(startTime, endTime, limit, after) {
		const condition = { scheduledTime: {$gte: startTime, $lte: endTime} };
		if (after) condition._id = {$gt: after};
		console.log(`getContactsToSchedule condition: ${condition} with limit ${limit}`);
		return contactModel.find(condition).limit(limit);
	},

	createContact(contact) {
		const newContact = new contactModel(contact);
		return newContact.save();
	},

	updateContact(contact) {
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
