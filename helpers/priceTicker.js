// Modules
const bitvavo = require('bitvavo')();
const { getDataFile, writeData } = require('./utils/writeReadData');

function emitter() {
	return bitvavo.getEmitter();
}

function getEthPrice() {
	return bitvavo.websocket.tickerPrice({
		market: 'ETH-EUR',
	});
}

function getBtcPrice() {
	return bitvavo.websocket.tickerPrice({
		market: 'BTC-EUR',
	});
}

function initiatePriceTicker() {
	try {
		setInterval(getEthPrice, 2000);
		setInterval(getBtcPrice, 2000);
	} catch (err) {
		console.error(err);
	}
}

function shiftAndPushDataModel(model, arr, data) {
	arr.shift();
	arr.push(data);
	writeData(model, 'data.json');
}

function pushDataModel(model, arr, data) {
	arr.push(data);
	writeData(model, 'data.json');
}

function updateDataModel() {
	const bitvavoSocket = emitter();

	try {
		initiatePriceTicker();
	} catch (error) {
		console.error(error);
	}

	bitvavoSocket.on('error', res => console.error(`Error: ${res}`));

	bitvavoSocket.on('tickerPrice', res => {
		const dataModel = getDataFile('data.json');

		const eth = dataModel.eth.price;
		const btc = dataModel.btc.price;

		if (res.market === 'BTC-EUR') {
			const object = {
				price: res.price,
				time: new Date().toLocaleTimeString(),
			};

			btc.length >= 30
				? shiftAndPushDataModel(dataModel, btc, object)
				: pushDataModel(dataModel, btc, object);
		} else {
			const object = {
				price: res.price,
				time: new Date().toLocaleTimeString(),
			};

			eth.length >= 30
				? shiftAndPushDataModel(dataModel, eth, object)
				: pushDataModel(dataModel, eth, object);
		}
	});
}

module.exports = { updateDataModel, emitter };
