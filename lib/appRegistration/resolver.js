const appRegistrationStore = require('./store');
const userStore = require('../user/store');

const maxPageSize = 20;

const resolver = {
	AppRegistration: {
		user: (_, {userId}) => userStore.getUserById(userId),
	},
	Query: {
		appRegistration: (_, {id}) => appRegistrationStore.getAppRegistrationById(id),
		appRegistrationByToken: (_, {token}) => appRegistrationStore.getAppRegistrationByToken(token),
		appRegistrations: (_, args) => {
			if (!args.limit) args.limit = maxPageSize;
			else args.limit = Math.max(maxPageSize, args.limit);
			return appRegistrationStore.getAppRegistrationsByArgs(args);
		}
	},
	Mutation: {
		createAppRegistration: (_, appRegistration) => appRegistrationStore.createAppRegistration(appRegistration),
		updateAppRegistration: (_, appRegistration) => appRegistrationStore.updateAppRegistration(appRegistration),
		deleteAppRegistration: (_, {id}) => appRegistrationStore.deleteAppRegistration(id),
	},
};

module.exports = resolver;
