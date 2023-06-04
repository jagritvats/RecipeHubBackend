const mongoose = require('mongoose');

const MONGO_URI = process.env.MONGO_URI;

const connectDB = () => {
	// Connect to DB
	mongoose
		.connect(MONGO_URI)
		.then(() => {
			console.log('Connected to DB');
		})
		.catch((err) => {
			console.log('Error connecting to DB', err);
			return;
		});
};

module.exports = { connectDB };
