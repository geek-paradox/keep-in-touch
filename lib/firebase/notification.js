const admin = require('./admin');

const notification_options = {
	priority: 'high',
	timeToLive: 60 * 60,
};

const sendNotification = async (message, registrationToken, userId) => {
	try {
		await admin.messaging().sendToDevice(registrationToken, message, notification_options);
		console.log(`Notification send successfully to user: ${userId}`);
	} catch (e) {
		console.log(e);
	}
};

const notification = {
	createNotificationData: () => {

	},

	sendNotification: () => {

	},

	/**
	 * @param {Array} contacts
	 */
	sendPushToContacts: (contacts) => {
		contacts.forEach((contact) => {
			const {userId, contactId} = contact;
		});
	}
};

module.exports = notification;
