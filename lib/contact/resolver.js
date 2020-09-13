const contactStore = require('./store');
const userStore = require('../user/store');
const helper = require('../../util/helper');

const maxPageSize = 20;

const resolver = {
	Query: {
		contact: (_, {id}) => contactStore.getContactById(id),
		contacts: (_, args) => {
			if (!args.limit) args.limit = maxPageSize;
			else args.limit = Math.max(maxPageSize, args.limit);
			return contactStore.getContactsByArgs(args);
		},
	},
	Mutation: {
		createContact: async (_, contact) => {
			const contactUserDetails = await userStore.getUserByPhoneNumber(contact.contactPhoneNo);
			if (!contactUserDetails || contactUserDetails.length() === 0) {
				const user = {
					name: contact.contactName,
					phone: contact.contactPhoneNo,
					image: contact.contactImage,
				};
				const newUser = await userStore.createUser(user);
				contact.contactId = newUser.id;
			} else {
				contact.contactId = contactUserDetails.id;
				contact.contactName = contact.contactName || contactUserDetails.name;
				contact.contactImage = contact.contactImage || contactUserDetails.image;
			}
			contact.scheduledTime = null;
			contact.scheduledTime = helper.getNextContactTime(contact);
			return contactStore.createContact(contact);
		},
		updateContact: (_, contact) => {
			contact.scheduledTime = helper.getNextContactTime(contact);
			return contactStore.updateContact(contact);
		},
		deleteContact: (_, {id}) => contactStore.deleteContact(id),
	},
};

module.exports = resolver;
