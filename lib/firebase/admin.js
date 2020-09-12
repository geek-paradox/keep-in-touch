const admin = require('firebase-admin');

const serviceAccount = require(process.env.FIREBASE_SERVICE_JSON);

admin.initializeApp({
	credential: admin.credential.cert(serviceAccount),
	databaseURL: 'https://keep-in-touch-paradox.firebaseio.com'
});

module.exports = admin;
