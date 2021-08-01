import { ethers, Contract } from 'ethers';

import PaymentProcessor from './abis/PaymentProcessor.json';
import Dai from './abis/Dai.json';

const NETWORK_ID = 5777;

const getBlockchain = () => {
	return new Promise((resolve, reject) => {
		window.addEventListener('load', async () => {
			if (window.ethereum) {
				await window.ethereum.enable();
				const provider = new ethers.providers.Web3Provider(window.ethereum);
				const signer = provider.getSigner();

				const paymentProcessorInstance = new Contract(
					PaymentProcessor.networks[NETWORK_ID].address,
					PaymentProcessor.abi,
					signer
				);
				const daiInstance = new Contract(Dai.networks[NETWORK_ID].address, Dai.abi, signer);

				resolve({ paymentProcessorInstance, daiInstance, provider });
			} else {
				resolve({ provider: null, paymentProcessorInstance: null, daiInstance: null });
			}
		});
	});
};

export default getBlockchain;
