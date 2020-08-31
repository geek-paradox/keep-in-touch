const contactHelper = require('./helper');
const model = require('../../model');
const Contact = model.Contact;

const resolver = {
	Query: {
		contact: (_, {id}) => {
			return Contact.findOne(id);
		},
		contacts: (_, args) => {
			if (args.userId) return Contact.find({userId: args.userId});
			return Contact.find(args.id);
		},
	},
	Mutation: {
		createContact: (_, contact) => {
			contact.scheduledTime = contactHelper.getNextContactTime(
				contact.intervalInDays, contact.hour, contact.timezone, null);
			const newContact = new Contact(contact);
			return newContact.save();
		},
		updateContact: (_, contact) => {
			contact.scheduledTime = contactHelper.getNextContactTime(
				contact.intervalInDays, contact.hour, contact.timezone, contact.scheduledTime);
			const {id, ...rest} = contact;
			return Contact.findByIdAndUpdate(id, {$set: rest}, {new: true})
				.catch(err => console.error(err));
		},
		deleteContact: (_, {id}) => {
			return Contact.findByIdAndDelete(id)
				.then(contact => contact.remove())
				.then(() => `${id} successfully deleted`)
				.catch(err => console.error(err));
		},
	},
};

module.exports = resolver;
