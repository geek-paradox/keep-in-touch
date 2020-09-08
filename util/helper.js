const moment = require('moment-timezone');

const helper = {
	/**
	 * @param {Object} contact
	 * @param {Number} contact.intervalInDays
	 * @param {String} contact.hour
	 * @param {String} contact.timezone
	 * @param {Number} contact.scheduledTime
	 * @param {Boolean} systemCall
	 * @return {Number}
	 */
	getNextContactTime: (contact, systemCall = false) => {
		const {intervalInDays, hour, timezone, scheduledTime} = contact;
		const scheduledTimeMoment = scheduledTime && moment.tz(scheduledTime, timezone);
		const currentTimeMoment = moment.tz(Date.now(), timezone);
		const lastTimeMoment = scheduledTimeMoment || currentTimeMoment;
		if (systemCall) {
			return lastTimeMoment.add(intervalInDays, 'day').valueOf();
		}
		const currentHour = currentTimeMoment.hour();
		const daysToAdd = currentHour < Number(hour) ? intervalInDays - 1: intervalInDays;
		const finalTime = moment.tz(currentTimeMoment.format('YYYY-MM-DD') + 'T' + hour, timezone);
		return finalTime.add(daysToAdd, 'day').valueOf();
	},
};

module.exports = helper;
