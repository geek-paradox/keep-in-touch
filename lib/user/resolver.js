const contactStore = require('../contact/store');
const userStore = require('./store');

const maxPageSize = 20;

const resolver = {
	User: {
		contacts: (_, {userId}) => contactStore.getContactsByArgs({userId}),
	},
	Query: {
		user: (_, {id}) => userStore.getUserById(id),
		users: (_, args) => {
			if (!args.limit) args.limit = maxPageSize;
			else args.limit = Math.max(maxPageSize, args.limit);
			return userStore.getUsersByArgs(args);
		},
	},
	Mutation: {
		createUser: (_, user) => userStore.createUser(user),
		updateUser: (_, user) => userStore.updateUser(user),
		deleteUser: (_, {id}) => userStore.deleteUser(id),
	},
};

module.exports = resolver;
