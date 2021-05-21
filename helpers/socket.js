const { getDataFile, writeData } = require('./utils/writeReadData');
const { emitter } = require('./priceTicker');

function initSocketIO(server) {
	const io = require('socket.io')(server);

	io.on('connection', async socket => {
		const bitvavoSocket = emitter();
		const socketId = socket.id;

		try {
			const data = getDataFile('data.json');

			const { price } = data.eth;

			io.to(socketId).emit('loadDataModel', price);
		} catch (error) {
			console.error(error);
		}

		setInterval(() => {
			try {
				const tweetsData = getDataFile('tweets.json');
				const { tweets } = tweetsData;

				if (tweets.length >= 10) {
					tweets.shift();
					writeData(tweetsData, 'tweets.json');
					io.emit('tweet', tweets[0]);
				} else {
					io.emit('tweet', tweets[0]);
				}
			} catch (error) {
				console.error(error);
			}
		}, 8000);

		let intervalId = setInterval(() => {
			const data = getDataFile('data.json');

			const eth = data.eth.price;

			io.to(socketId).emit('currentPrice', eth[0]);
		}, 4000);

		socket.on('setMarket', message => {
			clearInterval(intervalId);

			if (message === 'BTC-EUR') {
				const data = getDataFile('data.json');

				const model = data.btc.price;

				io.to(socketId).emit('loadingNewMarket', model);

				let intervalId = setInterval(() => {
					const data = getDataFile('data.json');

					const price = data.btc.price;

					io.to(socketId).emit('currentPrice', price[0]);
				}, 4000);

				socket.on('setMarket', market => {
					if (market === 'ETH-EUR') {
						clearInterval(intervalId);
					}
				});
			} else {
				const data = getDataFile('data.json');

				const model = data.eth.price;

				io.to(socketId).emit('loadingNewMarket', model);

				let intervalId = setInterval(() => {
					const data = getDataFile('data.json');

					const price = data.eth.price;

					io.to(socketId).emit('currentPrice', price[0]);
				}, 4000);

				socket.on('setMarket', market => {
					if (market === 'BTC-EUR') {
						clearInterval(intervalId);
					}
				});
			}
		});

		bitvavoSocket.on('error', res => console.error(`Error: ${res}`));
		socket.on('disconnect', () => console.log('User disconnected'));
	});
}

module.exports = { initSocketIO };
