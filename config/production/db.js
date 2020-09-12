const mongoUser = process.env.MONGO_USER;
const mongoPassword = process.env.MONGO_PASSWORD;

module.exports = {
	mongoServer: `mongodb+srv://${mongoUser}:${mongoPassword}@geekparadox.mmr1h.gcp.mongodb.net/keepintouch?retryWrites=true&w=majority`
};
