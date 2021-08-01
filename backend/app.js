const express = require('express');
const config = require('config');
const mongoose = require('mongoose');

const PORT = config.get('app.port') || 5000;
const DB_URL = config.get('app.db_url');

const app = express();
const router = express.Router();

mongoose.connect(DB_URL, { useNewUrlParser: true, useUnifiedTopology: true });

app.use('/', router);

router.get('/', (req, res) => {
	res.send('Hello World');
});

router.get('/api/payment', (req, res) => {});

app.listen(PORT, () => {
	console.log(`Server running at: ${PORT}`);
});
