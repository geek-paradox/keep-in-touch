const constants = {
	env: {
		development: 'DEVELOPMENT',
		localhost: 'LOCALHOST',
		staging: 'STAGING',
		production: 'PRODUCTION'
	},
	contactName: '%CONTACT_NAME',
	phoneNo: '%PHONE_NO',
};

constants.notificationMessage = {
	title: `Contact ${constants.contactName} now`,
	body: `It's time to contact ${constants.contactName}. Try calling on ${constants.phoneNo}`,
},

module.exports = constants;
