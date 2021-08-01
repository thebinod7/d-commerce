import React from 'react';
import { ethers } from 'ethers';
import axios from 'axios';

const API_URL = 'http://localhost:3401';

const ITEMS = [
	{ id: 1, price: ethers.utils.parseEther('100') },
	{ id: 2, price: ethers.utils.parseEther('200') },
	{ id: 3, price: ethers.utils.parseEther('300') }
];

export default function Store({ paymentProcessorIntance, daiInstance }) {
	const handleBuyClick = async item => {
		const res1 = await axios.get(`${API_URL}/api/getPaymentId/${item.id}`);
		const tx1 = await daiInstance.approve(paymentProcessorIntance.address, item.price);
		await tx1.wait();

		const tx2 = paymentProcessorIntance.purchasePay(item.price, res1.data.paymentId);
		await tx2.wait();

		await new Promise(resolve => setTimeout(resolve, 5000));

		const res2 = await axios.get(`${API_URL}/api/getItemUrl/${res1.data.paymentId}`);
		console.log({ res2 });
	};

	return (
		<div>
			<ul>
				{ITEMS.map((d, i) => {
					return (
						<li key={d.id}>
							Buy Item {i + 1}{' '}
							<button type="button" onClick={() => handleBuyClick(d)}>
								Buy Now
							</button>
						</li>
					);
				})}
			</ul>
		</div>
	);
}
