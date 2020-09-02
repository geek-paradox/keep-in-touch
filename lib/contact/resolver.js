const dbStore = require('./store');

const resolver = {
	Query: {
		contact: (_, {id}) => dbStore.getContactById(id),
		contacts: (_, args) => dbStore.getContactsByArgs(args),
	},
	Mutation: {
		createContact: (_, contact) => dbStore.createContact(contact),
		updateContact: (_, contact) => dbStore.updateContact(contact),
		deleteContact: (_, {id}) => dbStore.deleteContact(id),
	},
};

module.exports = resolver;
