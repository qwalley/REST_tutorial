const mongoose = require('mongoose');
let count = 0;

const options = {
	autoIndex: false, // to improve performance
	poolSize: 10, // maintain up to 10 socketed connections
	useNewUrlParser: true, // avoid deprecation notice
	useUnifiedTopology: true, // use new connection management engine
	bufferCommands: false // immediately throw connection errors
}

const connectWithRetry = () => {
	console.log('MongoDB connection with retry');
	mongoose.connect("mogodb://127.0.0.1:27017/rest-tutorial", options)
		.then(() => {
			console.log('MongoDB is connected');
		})
		.catch(err => {
			console.log('MongoDB connection unseccessful, retry after 5 seconds. ', ++count);
			setTimeout(connectWithRetry, 5000);
		});
};

connectWithRetry();

exports.mongoose = mongoose;