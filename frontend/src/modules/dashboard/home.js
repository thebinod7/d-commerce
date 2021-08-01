import React, { useState, useEffect } from 'react';
import getBlockchain from '../../ethereum.js';
import Store from './store';

export default function Home() {
	const [paymentProcessorInstance, setPaymentProcessorInstance] = useState(null);
	const [daiInstance, setDaiInstance] = useState(null);

	useEffect(() => {
		const init = async () => {
			try {
				const { paymentProcessorInstance, daiInstance } = await getBlockchain();
				setDaiInstance(daiInstance);
				setPaymentProcessorInstance(paymentProcessorInstance);
			} catch (err) {
				alert(err);
			}
		};

		init();
	}, []);

	if (typeof window.ethereum === 'undefined') {
		return (
			<div>
				<h3>Please install latest version of metamask!</h3>
			</div>
		);
	}

	console.log('===>', paymentProcessorInstance);

	return (
		<div>
			<h3>Buy items available...</h3>
			<Store paymentProcessorIntance={paymentProcessorInstance} daiInstance={daiInstance} />
		</div>
	);
}
