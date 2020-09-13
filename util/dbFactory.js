const mongoose = require('mongoose');
const model = require('../model');

let appRegistrationModel;
let contactModel;
let userModel;

const createMongooseModel = (modelName, schema) => {
	const mongooseSchema = new mongoose.Schema(schema);
	return mongoose.model(modelName, mongooseSchema);
};

const getAppRegistrationModel = () => {
	if (!appRegistrationModel) {
		appRegistrationModel = createMongooseModel('AppRegistration', model.appRegistration);
	}
	return appRegistrationModel;
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
	appRegistrationModel: getAppRegistrationModel(),
	contactModel: getContactModel(),
	userModel: getUserModel(),
};
