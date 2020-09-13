const admin = require('./admin');
const appRegistrationStore = require('../appRegistration/store');
const userStore = require('../user/store');
const constants = require('../../util/constants');

const notification_options = {
	priority: 'high',
	timeToLive: 60 * 60,
};

const sendNotifications = async (message, registrationTokens, userId) => {
	try {
		for(let registrationToken of registrationTokens) {
			await admin.messaging().sendToDevice(registrationToken, message, notification_options);
		}
		console.log(`Notification send successfully to user: ${userId}`);
	} catch (e) {
		console.log(e);
	}
};

const createNotificationData = (contactName, contactPhoneNo) => {
	const notification = {
		notification: {
			title: constants.notificationMessage.replace(constants.contactName, contactName),
			body: constants.notificationMessage.replace(constants.phoneNo, contactPhoneNo),
		}
	};
	return Promise.resolve(notification);
};

const notification = {
	/**
	 * @param {Array} contacts
	 */
	sendPushToContacts: (contacts) => {
		contacts.forEach((contact) => {
			const {userId, contactId} = contact;
			const registrationTokens = [];
			let contactPhoneNo;
			let contactName = contact.contactName;
			appRegistrationStore.getAppRegistrationsByArgs({userId})
				.then((appRegistrations) => appRegistrations.forEach((reg) => registrationTokens.push(reg.registrationToken)))
				.then(() => userStore.getUserById(contactId))
				.then((contactDetails) => {
					contactPhoneNo = contactDetails.phone;
					if (!contactName || contactName === '') contactName = contactDetails.name;
					return Promise.resolve();
				})
				.then(() => createNotificationData(contactName, contactPhoneNo))
				.then((msg) => sendNotifications(msg, registrationTokens, userId))
				.catch((e) => console.log(e));
		});
	}
};

module.exports = notification;
