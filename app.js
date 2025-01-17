// Require modules
require('dotenv').config();
const express = require('express');
const hbs = require('express-handlebars');
const http = require('http');
const app = express();
const server = http.createServer(app);
const path = require('path');

// Port
const port = process.env.PORT || 3000;

// Routes
const home = require('./routes/home');

// Import modules
const { updateDataModel } = require('./helpers/priceTicker');
const { checkTweetsDBLength } = require('./helpers/tweetStream');
const { initSocketIO } = require('./helpers/socket');

// Set view engine
app.set('view engine', 'hbs')
	.set('views', __dirname + '/views')
	.engine('hbs', hbs({ extname: 'hbs', defaultLayout: 'main' }));

// Set static directory and routes
app.use(express.static(path.join(__dirname, '/public')))
	.use(express.urlencoded({ extended: true }))
	.use(home);

server.listen(port, () => {
	console.log(`Listening on port: ${port}`);
});

// Listen for price updates and store data
updateDataModel();

// Initialize tweet stream
checkTweetsDBLength();
setInterval(checkTweetsDBLength, 10000);

// Initialize Socket.io
initSocketIO(server);
