const bitvavo = require('bitvavo')().options({
	ACCESSWINDOW: 10000,
	RESTURL: 'https://api.bitvavo.com/v2',
	WSURL: 'wss://ws.bitvavo.com/v2/',
	DEBUGGING: false,
});

// Get cryptocurrency price, store in object and send object to client side by emitting event
// async function getTickerPrice(socket) {
// 	return setInterval(async () => {
// 		try {
// 			const res = await bitvavo.TickerPrice({ market: 'BTC-EUR' });
// 			const { price } = res;
// 			const currentTime = new Date();

// 			const cryptoPriceData = {
// 				price: price,
// 				time: currentTime.toLocaleTimeString(),
// 			};

// 			socket.emit('priceUpdate', cryptoPriceData);
// 		} catch (error) {
// 			console.error(error);
// 		}
// 	}, 5000);
// }

function setMarketFilter(socket) {
	socket.on('setMarket', market => {
		console.log(market);

		if (market === 'BTC-EUR') {
			getBitcoinPrice(socket, market);
		} else {
			getEthereumPrice(socket, market);
		}
	});
}

function getEthereumPrice(socket, market) {
	const interval = setInterval(async () => {
		bitvavo.tickerPrice({ market: await market }, (err, res) => {
			if (err === null) {
				console.log(res);

				const data = {
					price: res.price,
					time: new Date().toLocaleTimeString(),
				};

				socket.on('setMarket', market => {
					if (market === 'BTC-EUR') {
						clearInterval(interval);
					}
				});

				socket.emit('data', data);
			} else {
				console.log(err);
			}
		});
	}, 2000);
}

function getBitcoinPrice(socket, market) {
	const interval = setInterval(async () => {
		bitvavo.tickerPrice({ market: await market }, (err, res) => {
			if (err === null) {
				console.log(res);

				const data = {
					price: res.price,
					time: new Date().toLocaleTimeString(),
				};

				socket.on('setMarket', market => {
					if (market === 'ETH-EUR') {
						clearInterval(interval);
					}
				});

				socket.emit('data', data);
			} else {
				console.log(err);
			}
		});
	}, 2000);
}

module.exports = { setMarketFilter, getBitcoinPrice };
