const dbStore = require('./store');
const helper = require('../../util/helper');

const maxPageSize = 20;

const resolver = {
	Query: {
		contact: (_, {id}) => dbStore.getContactById(id),
		contacts: (_, args) => {
			if (!args.limit) args.limit = maxPageSize;
			else args.limit = Math.max(maxPageSize, args.limit);
			return dbStore.getContactsByArgs(args);
		},
	},
	Mutation: {
		createContact: (_, contact) => {
			contact.scheduledTime = null;
			contact.scheduledTime = helper.getNextContactTime(contact);
			return dbStore.createContact(contact);
		},
		updateContact: (_, contact) => {
			contact.scheduledTime = helper.getNextContactTime(contact);
			return dbStore.updateContact(contact);
		},
		deleteContact: (_, {id}) => dbStore.deleteContact(id),
	},
};

module.exports = resolver;
