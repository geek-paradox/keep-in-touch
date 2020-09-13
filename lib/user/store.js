const dbFactory = require('../../util/dbFactory');

const userModel = dbFactory.userModel;

const store = {
	getUserById(id) {
		return userModel.findOne(id);
	},

	getUserByPhoneNumber(phone) {
		return userModel.findOne({phone});
	},

	getUsersByArgs(args) {
		const condition = {};
		if (args.name) condition.name = {$regex: args.name, $options: 'i'};
		if (args.country) condition.country = args.country;
		if (args.phone) condition.phone = args.phone;
		if (args.after) condition._id = {$gt: args.after};
		console.log('User conditions: ', condition);
		let query = userModel.find(condition);
		if (args.limit) query = query.limit(args.limit);
		return query;
	},

	createUser(user) {
		const newUser = new userModel(user);
		return newUser.save();
	},

	updateUser(user) {
		const {id, ...rest} = user;
		return userModel.findByIdAndUpdate(id, {$set: rest}, {new: true})
			.catch(err => console.error(err));
	},

	deleteUser(id) {
		return userModel.findByIdAndDelete(id)
			.then(user => user.remove())
			.then(() => `${id} successfully deleted`)
			.catch(err => console.error(err));
	}
};

module.exports = store;
