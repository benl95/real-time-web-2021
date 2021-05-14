const socket = io();
const ctx = document.querySelector('#lineChart');
const currentDate = new Date().toLocaleDateString();

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

// function shiftAndPushChartArray() {}

// function pushChartArray() {}

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

	socket.on('currentPrice', ethCurrentPrice => {
		const { data } = lineChart.data.datasets[0];
		const { labels } = lineChart.data;

		const { price, time } = ethCurrentPrice;

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
		console.log(tweet);
	});
});
