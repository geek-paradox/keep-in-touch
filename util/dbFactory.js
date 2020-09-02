const mongoose = require('mongoose');
const model = require('../model');

let contactModel;
let userModel;

const createMongooseModel = (modelName, schema) => {
	const mongooseSchema = new mongoose.Schema(schema);
	return mongoose.model(modelName, mongooseSchema);
};

const getContactModel = () => {
	if (!contactModel) {
		contactModel = createMongooseModel('Contact', model.contact);
	}
	return contactModel;
};

const getUserModel = () => {
	if (!userModel) {
		userModel = createMongooseModel('User', model.user);
	}
	return userModel;
};

module.exports = {
	contactModel: getContactModel(),
	userModel: getUserModel(),
};
