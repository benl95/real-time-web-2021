// Modules
const bitvavo = require('bitvavo')();
const { getDataFile, writeData } = require('./utils/writeReadData');

function emitter() {
	return bitvavo.getEmitter();
}

function getEthPrice() {
	return bitvavo.websocket.tickerPrice({ market: 'ETH-EUR' });
}

function initiatePriceTicker() {
	try {
		setInterval(getEthPrice, 2000);
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
		const { price } = dataModel.eth;

		const object = {
			price: res.price,
			time: new Date().toLocaleTimeString(),
		};

		price.length >= 30
			? shiftAndPushDataModel(dataModel, price, object)
			: pushDataModel(dataModel, price, object);
	});
}

module.exports = { updateDataModel, emitter };
