const express = require('express');
const config = require('config');
const mongoose = require('mongoose');
const ethers = require('ethers');

const PORT = config.get('app.port') || 5000;
const DB_URL = config.get('app.db_url');

const PaymentModel = require('./models/payment');
const PaymentProcessor = require('../frontend/src/abis/PaymentProcessor.json');

const app = express();
const router = express.Router();

mongoose.connect(DB_URL, { useNewUrlParser: true, useUnifiedTopology: true });

const ITEMS = { 1: { id: 1, url: 'http://downloadUrl1' }, 2: { id: 2, url: 'http://downloadUrl2' } };

app.use('/', router);

router.get('/', (req, res) => {
	res.send('Hello World');
});

router.get('/api/getPaymentId/:itemId', async (req, res) => {
	const paymentId = (Math.random() * 1000).toFixed(0);
	await PaymentModel.create({
		id: paymentId,
		itemId: req.params.itemId
	});
	res.json({ paymentId });
});

router.get('/api/getItemUrl/:pyamentId', async (req, res) => {
	const payment = await PaymentModel.finOne({ id: req.params.paymentId });
	if (payment && payment.paid) return res.json({ url: ITEMS[payment.itemId].url });
	if (payment && payment.paid) res.json({ url: null });
});

app.listen(PORT, () => {
	console.log(`Server running at: ${PORT}`);
});

const listenToEvents = () => {
	const provider = new etheres.provider.JsonRpcProvider('http://localhost:9545');
	const networkId = '5777';

	const paymentProcessCtr = new ethers.Contract(
		PaymentProcessor.networks[networkId].address,
		PaymentProcessor.abi,
		provider
	);

	paymentProcessCtr.on('PyamentDone', async (payer, amount, paymentId, date) => {
		console.log(
			`From ${payer}
			 Amount ${amount}
			 PaymentId ${paymentId}
			 Date ${date}
			`
		);

		const payment = await PaymentModel.findOne({ id: paymentId });
		if (payment) {
			payment.paid = true;
			payment.save();
		}
	});
};

listenToEvents();
