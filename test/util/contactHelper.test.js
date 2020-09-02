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

	it('should count 5 days as time has passed', () => {
		const timezone = 'Europe/Berlin';
		const ts = contactHelper.getNextContactTime(5, '04', timezone, null);
		expect(ts).to.equal(moment.tz('2020-09-06 04:00', timezone).valueOf());
	});

	it('should count 4 days as time has not passed', () => {
		const timezone = 'Europe/Berlin';
		const ts = contactHelper.getNextContactTime(5, '12', timezone, null);
		expect(ts).to.equal(moment.tz('2020-09-05 12:00', timezone).valueOf());
	});

	it('should count 4 days even if scheduledTime is passed', () => {
		const timezone = 'Europe/Berlin';
		const ts = contactHelper.getNextContactTime(5, '12', timezone, 1598972400000);
		expect(ts).to.equal(moment.tz('2020-09-05 12:00', timezone).valueOf());
	});

	it('should count 5 days when system call is true', () => {
		const timezone = 'Europe/Berlin';
		const ts = contactHelper.getNextContactTime(5, '12', timezone, 1598972400000, true);
		expect(ts).to.equal(moment.tz('2020-09-06 17:00', timezone).valueOf());
	});
});
