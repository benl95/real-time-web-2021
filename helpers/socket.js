const { getDataFile } = require('./priceTicker');
const { emitter } = require('./priceTicker');

function initSocketIO(server) {
	const io = require('socket.io')(server);

	io.on('connection', async socket => {
		const bitvavoSocket = emitter();
		const socketId = socket.id;

		try {
			const dataModel = getDataFile();
			const { price } = dataModel.eth;

			io.to(socketId).emit('loadDataModel', price);
		} catch (error) {
			console.error(error);
		}

		bitvavoSocket.on('error', res => console.error(`Error: ${res}`));

		bitvavoSocket.on('tickerPrice', res => {
			const { price } = res;

			const ethCurrentPrice = {
				price: price,
				time: new Date().toLocaleTimeString(),
			};

			io.to(socketId).emit('currentPrice', ethCurrentPrice);
		});

		socket.on('disconnect', () => console.log('User disconnected'));
	});
}

module.exports = { initSocketIO };
