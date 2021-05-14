const { getDataFile, writeData } = require('./utils/writeReadData');
const { emitter } = require('./priceTicker');

function initSocketIO(server) {
	const io = require('socket.io')(server);

	io.on('connection', async socket => {
		const bitvavoSocket = emitter();
		const socketId = socket.id;

		try {
			const ethData = getDataFile('data.json');

			const { price } = ethData.eth;

			io.to(socketId).emit('loadDataModel', price);
		} catch (error) {
			console.error(error);
		}

		setInterval(() => {
			try {
				const tweetsData = getDataFile('tweets.json');
				const { tweets } = tweetsData;

				if (tweets.length >= 30) {
					tweets.shift();
					writeData(tweetsData, 'tweets.json');
					io.emit('tweet', tweets[0]);
				} else {
					io.emit('tweet', tweets[0]);
				}
			} catch (error) {
				console.error(error);
			}
		}, 5000);

		try {
			bitvavoSocket.on('tickerPrice', res => {
				const { price } = res;

				const ethCurrentPrice = {
					price: price,
					time: new Date().toLocaleTimeString(),
				};

				io.to(socketId).emit('currentPrice', ethCurrentPrice);
			});
		} catch (error) {
			console.error(error);
		}

		bitvavoSocket.on('error', res => console.error(`Error: ${res}`));
		socket.on('disconnect', () => console.log('User disconnected'));
	});
}

module.exports = { initSocketIO };
