const contactStore = require('../contact/store');
const userStore = require('./store');

const resolver = {
	User: {
		contacts: (_, {contactIds}) => contactStore.getContactsByArgs({id: contactIds}),
	},
	Query: {
		user: (_, {id}) => userStore.getUserById(id),
		users: (_, args) => userStore.getUsersByArgs(args),
	},
	Mutation: {
		createUser: (_, user) => userStore.createUser(user),
		updateUser: (_, user) => userStore.updateUser(user),
		deleteUser: (_, {id}) => userStore.deleteUser(id),
	},
};

module.exports = resolver;
