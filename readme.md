# Real-Time Web @cmda-minor-web · 2020/21

## Cryptowatcher

Cryptowatcher is a platform where users can track the real-time price of Bitcoin
and Ethereum. The price of the cryptocurrency will be displayed in a real-time
line graph. The application also provides a real-time Tweet stream that streams
all the streams and renders all the tweets regarding Bitcoin or Ethereum to the
application.

## Live version

You can view the live version here:

[Live version](https://rtw-cryptowatcher.herokuapp.com/)

## Concepts

-   Real time COVID-19 Dashboard
-   Karaoke room
-   Real Time Cryptocurrency Dashboard

The concept I chose to develop is the Cryptocurrency dashboard in combination
with the Twitter API.

## Data flow diagram

<img src="https://user-images.githubusercontent.com/43675725/119106701-df1df600-ba1e-11eb-9883-e7da57424a79.jpg" width="900" height="500">

## API

The API's I will use for this application are the Bitvavo API to track the
current price of a cryptocurrency and the Twitter API to track the current
discussion regarding a cryptocoin on Twitter. The Bitvavo API returns a response
with the current price of a coin every 2 seconds and the Twitter API returns a
response with a Tweet regarding Bitcoin/Ethereum.

### Fetching the data

<details>
<summary>Bitvavo API</summary>
<br>
Fetching data:

```js
// TO DO
```

<br>
Response:

```json
[
	{
		"market": "BTC-EUR",
		"price": "5003.2"
	}
]
```

</details>

<details>
<summary>Twitter API</summary>
<br>
Fetching the data:

```js
function streamTweets(socket) {
	const stream = needle.get(streamURL, {
		headers: {
			Authorization: `Bearer ${process.env.TWITTER_TOKEN}`,
		},
	});

	stream.on('data', async data => {
		try {
			const json = JSON.parse(data);
			socket.emit('tweet', json);
		} catch (error) {
			console.error(error);
		}
	});
}
```

<br>
Response:

```json
  "data": [
    {
      "author_id": "2244994945",
      "created_at": "2020-02-14T19:00:55.000Z",
      "id": "1228393702244134912",
      "text": "What did the developer write in their Valentine’s card?\n  \nwhile(true) {\n    I = Love(You);  \n}"
    },
  ]
```

</details>

## Features

-   Real-time line graph with price updates
-   Real-time Tweet stream

## Sketches UI

<img src="https://user-images.githubusercontent.com/43675725/116655424-5a920780-a98b-11eb-8492-8509dd29224d.jpeg" width="400" height="400">

## Dependencies

-   Express
-   Express-handlebars
-   Bitvavo
-   Needle
-   dotenv
-   Socket.io
-   Nodemon

## Installation guide

Navigate to your desired directory

> cd <desired-directory>

Clone the repository locally

> git clone https://github.com/benl95/real-time-web-2021.git

Install packages

> npm install

Run the project locally

> node app.js

## License

MIT
