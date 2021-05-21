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

## Data model

<details>
<summary>Crypto data model</summary>

```json
{
	"eth": {
		"price": [
			{ "price": "2231.8", "time": "08:28:04" },
			{ "price": "2231.8", "time": "08:28:06" },
			{ "price": "2232.7", "time": "08:28:08" },
			{ "price": "2232.7", "time": "08:28:10" },
			{ "price": "2235.3", "time": "08:28:12" },
			{ "price": "2235.3", "time": "08:28:14" },
			{ "price": "2235.3", "time": "08:28:16" },
			{ "price": "2235.3", "time": "08:28:18" },
			{ "price": "2235.3", "time": "08:28:20" },
			{ "price": "2235.3", "time": "08:28:22" },
			{ "price": "2235.3", "time": "08:28:24" },
			{ "price": "2235.3", "time": "08:28:26" },
			{ "price": "2235.3", "time": "08:28:28" },
			{ "price": "2237.3", "time": "08:28:30" },
			{ "price": "2237", "time": "08:28:32" },
			{ "price": "2237", "time": "08:28:34" },
			{ "price": "2236.1", "time": "08:28:36" },
			{ "price": "2236.1", "time": "08:28:38" },
			{ "price": "2236.1", "time": "08:28:40" },
			{ "price": "2235.2", "time": "08:28:42" },
			{ "price": "2231.6", "time": "08:28:45" },
			{ "price": "2231.6", "time": "08:28:46" },
			{ "price": "2231.6", "time": "08:28:49" },
			{ "price": "2231.4", "time": "08:28:51" },
			{ "price": "2231.4", "time": "08:28:53" },
			{ "price": "2231.4", "time": "08:28:54" },
			{ "price": "2231.4", "time": "08:28:57" },
			{ "price": "2231.4", "time": "08:28:59" },
			{ "price": "2234.2", "time": "08:29:01" },
			{ "price": "2234.2", "time": "08:29:03" },
			{ "price": "2233.2", "time": "08:29:05" }
		]
	},
	"btc": {
		"price": [
			{ "price": "32508", "time": "08:28:04" },
			{ "price": "32510", "time": "08:28:06" },
			{ "price": "32515", "time": "08:28:08" },
			{ "price": "32515", "time": "08:28:10" },
			{ "price": "32515", "time": "08:28:12" },
			{ "price": "32515", "time": "08:28:14" },
			{ "price": "32549", "time": "08:28:16" },
			{ "price": "32549", "time": "08:28:18" },
			{ "price": "32549", "time": "08:28:20" },
			{ "price": "32548", "time": "08:28:22" },
			{ "price": "32548", "time": "08:28:24" },
			{ "price": "32548", "time": "08:28:26" },
			{ "price": "32548", "time": "08:28:28" },
			{ "price": "32548", "time": "08:28:31" },
			{ "price": "32548", "time": "08:28:33" },
			{ "price": "32548", "time": "08:28:35" },
			{ "price": "32548", "time": "08:28:37" },
			{ "price": "32549", "time": "08:28:39" },
			{ "price": "32549", "time": "08:28:41" },
			{ "price": "32549", "time": "08:28:43" },
			{ "price": "32549", "time": "08:28:45" },
			{ "price": "32549", "time": "08:28:47" },
			{ "price": "32549", "time": "08:28:49" },
			{ "price": "32533", "time": "08:28:51" },
			{ "price": "32533", "time": "08:28:53" },
			{ "price": "32533", "time": "08:28:55" },
			{ "price": "32533", "time": "08:28:57" },
			{ "price": "32533", "time": "08:28:59" },
			{ "price": "32537", "time": "08:29:01" },
			{ "price": "32537", "time": "08:29:03" },
			{ "price": "32537", "time": "08:29:05" }
		]
	}
}
```

</details>

<details>
	<summary>Tweet data model</summary>

```json
{
	"tweets": [
		{
			"tweet": "RT @Moonshot7161969: @elonmusk @heydave7 #IOTA vs #ADA vs #BTC vs #ETH https://t.co/L7pFQOokm4",
			"time": "23:52:17"
		},
		{
			"tweet": "RT @AngeL_QueeN815: $100 in 24 Hours ⏰\n\n☑️ RT + Join TG (Post Proof)\nhttps://t.co/mveocVtyzb\n\nTheir token mission is to end Elon's influenc…",
			"time": "08:28:44"
		},
		{
			"tweet": "RT @itsprettyjamie: $50 in 24hrs\n\n- RT\n- Join TG + Post proof\n\nTG: https://t.co/1mZSAQa1gL\n\nTheir token mission is to end Elon's influence…",
			"time": "08:28:44"
		},
		{
			"tweet": "RT @DogelonMars: We thought we would do a couple more passes over Earth before we took off to Mars.  We're airdropping 24,521,824,423 $ELON…",
			"time": "08:28:45"
		},
		{
			"tweet": "Pro Darth tip #2\n\nhttps://t.co/reVCGivTI5\n\nhttps://t.co/zm0oNT1sjV\n\nhttps://t.co/hAFOHl2LvC\n\n@Darth_Elon @elonmusk @bscbombs @GeorgeLucasILM @HamillHimself @jakepaul @SpaceX @Tesla @PancakeSwap https://t.co/rVDwpDBVx6",
			"time": "08:28:46"
		},
		{ "tweet": "#KISHU https://t.co/DN4VLmyPJ4", "time": "08:28:46" },
		{
			"tweet": "#TTT ATH🚀🚀🚀🎉🎉🎉\n\n#TheTransferToken\n#The Transfer Token\n#BTC\n#ETH\n#仮想通貨 https://t.co/KUJUsptuB8",
			"time": "08:28:46"
		},
		{
			"tweet": "RT @cryptowhitewalk: $ETH #Ethereum \nit needs to break this parabola and close above the blue box soon https://t.co/0gCuid5Hxf",
			"time": "08:28:46"
		},
		{
			"tweet": "RT @cryptovenizo: $100 to one random person in 24 hours\n\n✓ RT this\n✓ Join TG + Post proof\n\nTG: https://t.co/vwjYLsbvFK \n\nTheir token missio…",
			"time": "08:28:46"
		},
		{
			"tweet": "@Crypto888crypto https://t.co/YG5bzBjilA this also needs some love :)",
			"time": "08:28:46"
		},
		{
			"tweet": "Elon mowaa carefull!😂💤\n#NotaTweetInvestor \n@elonmusk @Bitcoin @dogecoin @ShibainuCoin",
			"time": "08:28:47"
		},
		{
			"tweet": "RT @wallstwolverine: Soy el Elon Musk español, sí.",
			"time": "08:28:47"
		},
		{
			"tweet": "RT @bricepromos: $75 to one random person in 16hrs \n\nRT &amp; follow me + @Cheecoin + RT Their 📌\n\n$ETH #Ethereum #ERC20 #BNB    #Sushiswap #Uni…",
			"time": "08:28:47"
		},
		{
			"tweet": "Awesome project 🖤🖤🖤🖤\n@SubhoDi60419393 @Indroni96300340 https://t.co/Ro65phIQOH",
			"time": "08:28:47"
		},
		{
			"tweet": "Yo aquí solo veo oportunidades 👁 \n\n$VRA #Bitcoin #ETH $CHZ #BNB $UBX $EWT $BEPRO $MTV $BTT $LINK $XRP $ADA $LINK  $TEL $ACE $TRIAS $EQZ $POLX $TLOS $PDEX https://t.co/RARwSfVLuu",
			"time": "08:28:47"
		},
		{
			"tweet": "Küresel piyasalar ABD tahvil ihalesi ile sakinleşti.\n\n#forex #forextrade #fx #Brent #dowjones #dax #NASDAQ #Bitcoin #BTC #XRP #BNB #Ripple #Ethereum  #etherium #nftart  #viop #borsa #bist100 #cryptocurrency #onsaltın #ingiltere https://t.co/uRLDfRLJtJ https://t.co/tYlxBACB0f",
			"time": "08:28:48"
		},
		{
			"tweet": "@elonmusk @teslaownersSV We losing our monies because of you Elon",
			"time": "08:28:48"
		}
	]
}
```

</details>

### Fetching the data

<details>
<summary>Bitvavo API</summary>
<br>
Fetching data:

```js
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
function streamTweets(retryAttempt) {
	const stream = needle.get(streamURL, {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});

	stream.on('data', chunk => {
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
	});

	return stream;
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
