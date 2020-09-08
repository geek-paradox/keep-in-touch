const expect = require('chai').expect;
const moment = require('moment-timezone');
const sinon = require('sinon');

const contactHelper = require('../../util/helper');

describe('getNextContactTime', () => {
	const now = new Date('2020-09-01T08:00:00.197Z'); //GMT
	let clock;
	beforeEach(() => {
		clock = sinon.useFakeTimers(now);
	});

	afterEach(() => {
		clock.restore();
	});

	it('should return time in utc', () => {
		const timezone = 'Europe/Berlin';
		const contact = {
			intervalInDays: 5,
			hour: '04',
			timezone,
			scheduledTime: null,
		};
		const ts = contactHelper.getNextContactTime(contact);
		expect(ts).to.equal(moment.utc('2020-09-06 02:00').valueOf());
	});

	it('should count 5 days as time has passed', () => {
		const timezone = 'Europe/Berlin';
		const contact = {
			intervalInDays: 5,
			hour: '04',
			timezone,
			scheduledTime: null,
		};
		const ts = contactHelper.getNextContactTime(contact);
		expect(ts).to.equal(moment.tz('2020-09-06 04:00', timezone).valueOf());
	});

	it('should count 4 days as time has not passed', () => {
		const timezone = 'Europe/Berlin';
		const contact = {
			intervalInDays: 5,
			hour: '12',
			timezone,
			scheduledTime: null,
		};
		const ts = contactHelper.getNextContactTime(contact);
		expect(ts).to.equal(moment.tz('2020-09-05 12:00', timezone).valueOf());
	});

	it('should schedule tomorrow as time has passed', () => {
		const timezone = 'Europe/Berlin';
		const contact = {
			intervalInDays: 1,
			hour: '04',
			timezone,
			scheduledTime: null,
		};
		const ts = contactHelper.getNextContactTime(contact);
		expect(ts).to.equal(moment.tz('2020-09-02 04:00', timezone).valueOf());
	});

	it('should schedule today as time has not passed', () => {
		const timezone = 'Europe/Berlin';
		const contact = {
			intervalInDays: 1,
			hour: '12',
			timezone,
			scheduledTime: null,
		};
		const ts = contactHelper.getNextContactTime(contact);
		expect(ts).to.equal(moment.tz('2020-09-01 12:00', timezone).valueOf());
	});

	it('should count 4 days even if scheduledTime is passed', () => {
		const timezone = 'Europe/Berlin';
		const contact = {
			intervalInDays: 5,
			hour: '12',
			timezone,
			scheduledTime: 1598972400000,
		};
		const ts = contactHelper.getNextContactTime(contact);
		expect(ts).to.equal(moment.tz('2020-09-05 12:00', timezone).valueOf());
	});

	it('should count 5 days when system call is true', () => {
		const timezone = 'Europe/Berlin';
		const contact = {
			intervalInDays: 5,
			hour: '12',
			timezone,
			scheduledTime: 1598972400000,
		};
		const ts = contactHelper.getNextContactTime(contact, true);
		expect(ts).to.equal(moment.tz('2020-09-06 17:00', timezone).valueOf());
	});
});
