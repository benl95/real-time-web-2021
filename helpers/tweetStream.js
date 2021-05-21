// Modules
const needle = require('needle');
const { getDataFile, writeData } = require('./utils/writeReadData');

// Enviroment variables
const token = process.env.BEARER_TOKEN;
const rulesURL = process.env.RULES_URL;
const streamURL = process.env.STREAM_URL;

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

// Source: https://github.com/twitterdev/Twitter-API-v2-sample-code/blob/master/Filtered-Stream/filtered_stream.js
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

// Source: https://github.com/twitterdev/Twitter-API-v2-sample-code/blob/master/Filtered-Stream/filtered_stream.js
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

// Source: https://github.com/twitterdev/Twitter-API-v2-sample-code/blob/master/Filtered-Stream/filtered_stream.js
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
				const dataModel = getDataFile('tweets.json');
				const { tweets } = dataModel;

				if (tweets.length === 60) {
					stream.close();
				} else {
					const tweet = JSON.parse(chunk);
					const { text } = tweet.data;

					const object = {
						tweet: text,
						time: new Date().toLocaleTimeString(),
					};

					tweets.push(object);
					writeData(dataModel, 'tweets.json');
				}

				retryAttempt = 0;
			} catch (error) {
				if (
					chunk.detail ===
					'This stream is currently at the maximum allowed connection limit.'
				) {
					console.log(chunk.detail);
					console.error(error);
					stream.close();
				} else {
				}
			}
		})
		.on('err', error => {
			if (error.code !== 'ECONNRESET') {
				console.log(error.code);
				console.error(error);
				stream.close();
			} else {
				setTimeout(() => {
					console.warn(
						'A connection error occurred. Reconnecting...'
					);
					streamTweets(++retryAttempt);
				}, 2 ** retryAttempt);
			}
		});

	return stream;
}

// Source: https://github.com/twitterdev/Twitter-API-v2-sample-code/blob/master/Filtered-Stream/filtered_stream.js
async function initTweetStream() {
	let currentRules;

	try {
		currentRules = await getAllRules();

		await deleteAllRules(currentRules);

		await setRules();
	} catch (error) {
		console.error(error);
	}

	streamTweets(0);
}

function checkTweetsDBLength() {
	const dataModel = getDataFile('tweets.json');
	const { tweets } = dataModel;

	console.log('Checking tweets...');

	if (tweets.length < 10) {
		console.log(
			`Currently there are ${tweets.length} tweets in the DB, initializing stream`
		);
		initTweetStream();
	} else {
		console.log(
			`Currently there are ${tweets.length} tweets in the DB, stream is closed`
		);
	}
}

module.exports = { checkTweetsDBLength };
