const fs = require('fs');

function getDataFile(fileName) {
	const json = fs.readFileSync(`./data/${fileName}`, 'utf-8', err => {
		if (err) console.error(err);
	});

	const obj = JSON.parse(json);

	return obj;
}

function writeData(data, fileName) {
	const json = JSON.stringify(data);

	fs.writeFileSync(`./data/${fileName}`, json, error => {
		if (error) {
			console.error(error);
		} else {
			console.log('Data stored');
		}
	});
}

module.exports = { getDataFile, writeData };
