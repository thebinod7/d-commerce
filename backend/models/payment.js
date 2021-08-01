const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema(
	{
		id: { type: String, required: true },
		itemId: { type: String, required: true },
		paid: { type: Boolean, default: false }
	},
	{
		collection: 'payments'
	}
);

module.exports = mongoose.model('Pyament', paymentSchema);
