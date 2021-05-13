const needle = require('needle');
const fs = require('fs');
const token = process.env.BEARER_TOKEN;

const rulesURL = 'https://api.twitter.com/2/tweets/search/stream/rules';
const streamURL = 'https://api.twitter.com/2/tweets/search/stream';

function getDataFile() {
	const json = fs.readFileSync('./data/tweets.json', 'utf-8', err => {
		if (err) console.error(err);
	});

	const obj = JSON.parse(json);

	return obj;
}

function writeData(data) {
	const json = JSON.stringify(data);

	fs.writeFileSync('./data/tweets.json', json, error => {
		if (error) {
			console.error(error);
		} else {
			console.log('Data stored');
		}
	});
}

function storedRules() {
	const object = [
		{
			value: '#eth',
		},
		{
			value: 'ethereum',
		},
		{
			value: 'ethereum euro',
		},
		{
			value: 'ethereum news',
		},
		{
			value: 'elon',
		},
	];

	return object;
}

async function getAllRules() {
	const res = await needle('get', rulesURL, {
		headers: {
			authorization: `Bearer ${token}`,
		},
	});

	if (res.statusCode !== 200) {
		console.log(`Error: ${res.statusMessage}, ${res.statusCode}`);
		throw new Error(res.body);
	}

	return res.body;
}

async function deleteAllRules(rules) {
	if (!Array.isArray(rules.data)) {
		return null;
	}

	const ids = rules.data.map(rule => rule.id);

	const data = {
		delete: {
			ids: ids,
		},
	};

	const res = await needle('post', rulesURL, data, {
		headers: {
			'content-type': 'application/json',
			authorization: `Bearer ${token}`,
		},
	});

	if (res.statusCode !== 200) {
		throw new Error(res.body);
	}

	return res.body;
}

async function setRules() {
	const rules = storedRules();

	const data = {
		add: rules,
	};

	const response = await needle('post', rulesURL, data, {
		headers: {
			'content-type': 'application/json',
			authorization: `Bearer ${token}`,
		},
	});

	if (response.statusCode !== 201) {
		throw new Error(response.body);
	}

	return response.body;
}

function streamTweets(retryAttempt) {
	const stream = needle.get(streamURL, {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});

	stream
		.on('data', chunk => {
			try {
				const dataModel = getDataFile();
				const { tweets } = dataModel;

				const tweet = JSON.parse(chunk);
				const { text } = tweet.data;

				const object = {
					tweet: text,
					time: new Date().toLocaleTimeString(),
				};

				tweets.push(object);
				writeData(dataModel);

				retryAttempt = 0;
			} catch (error) {
				if (
					data.detail ===
					'This stream is currently at the maximum allowed connection limit.'
				) {
					console.log(data.detail);
					process.exit(1);
				} else {
				}
			}
		})
		.on('err', error => {
			if (error.code !== 'ECONNRESET') {
				console.log(error.code);
				process.exit(1);
			} else {
				setTimeout(() => {
					console.warn('A connection error occurred. Reconnecting...');
					streamTweets(++retryAttempt);
				}, 2 ** retryAttempt);
			}
		});

	return stream;
}

async function initTweetStream() {
	let currentRules;

	try {
		currentRules = await getAllRules();

		await deleteAllRules(currentRules);

		await setRules();
	} catch (error) {
		console.error(error);
		process.exit(1);
	}

	streamTweets(0);
}

module.exports = { initTweetStream };
