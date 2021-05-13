const bitvavo = require('bitvavo')();
const fs = require('fs');

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

function getDataFile() {
	const json = fs.readFileSync('./data/data.json', 'utf-8', err => {
		if (err) console.error(err);
	});

	const obj = JSON.parse(json);

	return obj;
}

function writeData(data) {
	const json = JSON.stringify(data);

	fs.writeFileSync('./data/data.json', json, error => {
		if (error) {
			console.error(error);
		} else {
			console.log('Data stored');
		}
	});
}

function shiftAndPushDataModel(model, arr, data) {
	arr.shift();
	arr.push(data);
	writeData(model);
}

function pushDataModel(model, arr, data) {
	arr.push(data);
	writeData(model);
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
		const dataModel = getDataFile();
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

module.exports = { updateDataModel, getDataFile, emitter };
