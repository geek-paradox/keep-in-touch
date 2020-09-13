const admin = require('./admin');
const appRegistrationStore = require('../appRegistration/store');
const userStore = require('../user/store');
const constants = require('../../util/constants');

const sendNotifications = async (contactName, contactPhoneNo, registrationTokens, userId) => {
	try {
		const message = {
			notification: {
				title: constants.notificationMessage.replace(constants.contactName, contactName),
				body: constants.notificationMessage.replace(constants.phoneNo, contactPhoneNo),
			},
			tokens: registrationTokens,
		};
		await admin.messaging().sendMulticast(message);
		console.log(`Notification send successfully to user: ${userId}`);
	} catch (e) {
		console.log(e);
	}
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
				.then(() => sendNotifications(contactName, contactPhoneNo, registrationTokens, userId))
				.catch((e) => console.log(e));
		});
	}
};

module.exports = notification;
