const socket = io();
const ctx = document.querySelector('#lineChart');
const currentDate = new Date().toLocaleDateString();

const node = document.querySelector('main');
const section = document.createElement('section');
node.appendChild(section);

const ethButton = document.getElementById('eth');
const btcButton = document.getElementById('btc');

btcButton.onclick = () => {
	socket.emit('setMarket', 'BTC-EUR');

	const { data } = lineChart.data.datasets[0];
	const { labels } = lineChart.data;

	if (data.length > 0 && labels.length > 0) {
		data.length = 0;
		labels.length = 0;
	}
};

ethButton.onclick = () => {
	socket.emit('setMarket', 'ETH-EUR');

	const { data } = lineChart.data.datasets[0];
	const { labels } = lineChart.data;

	if (data.length > 0 && labels.length > 0) {
		data.length = 0;
		labels.length = 0;
	}
};

const lineChart = new Chart(ctx, {
	type: 'line',
	data: {
		labels: [],
		datasets: [
			{
				label: 'Rate ETH/EUR',
				backgroundColor: 'rgba(18, 18, 18, 0.75)',
				borderColor: 'rgb(255, 99, 132)',
				data: [],
			},
		],
	},
	options: {
		plugins: {
			legend: {
				labels: {
					legend: false,
					usePointStyle: true,
				},
			},
		},
		color: '#ffffff',
		animations: {
			tension: {
				duration: 500,
				easing: 'linear',
				loop: true,
			},
		},
		scales: {
			y: {
				beginAtZero: false,
				ticks: {
					callback: function (value, index, values) {
						return `€ ${value}`;
					},
				},
			},
			x: {
				beginAtZero: false,
				ticks: {
					stepSize: 0.2,
				},
			},
		},
	},
});

socket.on('connect', () => {
	socket.on('loadDataModel', price => {
		const { data } = lineChart.data.datasets[0];
		const { labels } = lineChart.data;

		price.forEach(item => {
			const { price, time } = item;

			data.push(price);
			labels.push(time);
			lineChart.update();
		});
	});

	socket.on('loadingNewMarket', dataset => {
		const { data } = lineChart.data.datasets[0];
		const { labels } = lineChart.data;

		console.log(dataset);

		dataset.forEach(entry => {
			labels.push(entry.time);
			data.push(entry.price);
		});

		lineChart.update();
	});

	socket.on('currentPrice', currentPrice => {
		const { data } = lineChart.data.datasets[0];
		const { labels } = lineChart.data;

		console.log(currentPrice);

		const { price, time } = currentPrice;

		if (data.length >= 30 && labels.length >= 30) {
			data.shift();
			data.push(price);

			labels.shift();
			labels.push(time);

			lineChart.update();
		} else {
			data.shift();
			data.push(price);

			labels.shift();
			labels.push(time);

			lineChart.update();
		}
	});

	socket.on('tweet', tweet => {
		const tweetElement = document.createElement('article');
		tweetElement.innerHTML = `
				<h4>${tweet.tweet}</h4>
				<time>${tweet.time}</time>
		`;

		section.appendChild(tweetElement);
		setInterval(() => tweetElement.remove(), 10000);
	});
});
