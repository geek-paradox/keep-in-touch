const dbFactory = require('../../util/dbFactory');

const appRegistrationModel = dbFactory.appRegistrationModel;

const store = {
	getAppRegistrationById(id) {
		return appRegistrationModel.findOne(id);
	},

	getAppRegistrationByToken(registrationToken) {
		return appRegistrationModel.findOne({registrationToken});
	},

	getAppRegistrationsByArgs(args) {
		const condition = {};
		if (args.userId) condition.userId = args.userId;
		if (args.after) condition._id = {$gt: args.after};
		console.log('AppRegistration conditions: ', condition);
		let query = appRegistrationModel.find(condition);
		if (args.limit) query = query.limit(args.limit);
		return query;
	},

	createAppRegistration(user) {
		const newAppRegistration = new appRegistrationModel(user);
		return newAppRegistration.save();
	},

	updateAppRegistration(user) {
		const {id, ...rest} = user;
		return appRegistrationModel.findByIdAndUpdate(id, {$set: rest}, {new: true})
			.catch(err => console.error(err));
	},

	deleteAppRegistration(id) {
		return appRegistrationModel.findByIdAndDelete(id)
			.then(user => user.remove())
			.then(() => `appRegistration: ${id} successfully deleted`)
			.catch(err => console.error(err));
	}
};

module.exports = store;
