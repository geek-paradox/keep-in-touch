const moment = require('moment-timezone');
const contactStore = require('../lib/contact/store');
const helper = require('../util/helper');

const maxSize = 20;

const notifyUser = async () => {
	const currentTimeUtc = moment.utc();
	let startTime = moment(currentTimeUtc).startOf('hour');
	let endTime = moment(currentTimeUtc).endOf('hour');
	if (currentTimeUtc.diff(startTime, 'minute') > 30) {
		startTime.add(30, 'minute');
	} else {
		endTime.subtract(30, 'minute');
	}

	let after = null;
	let hasNext = true;
	while (hasNext) {
		const contacts = await contactStore.getContactsToSchedule(startTime, endTime, maxSize, after);
		const len = contacts.length;
		if (len < maxSize) {
			hasNext = false;
		} else {
			after = contacts[len - 1]._id;
		}
		for (let contact in contacts) {
			// send notifications
			contact.scheduledTime = helper.getNextContactTime(contact, true);
			await contactStore.updateContact(contact);
		}
	}
};

module.exports = notifyUser;
