const DaiContract = artifacts.require('Dai.sol');
const PaymentContract = artifacts.require('PaymentProcessor.sol');

module.exports = async function (deployer, network, addresses) {
	const [admin, payer, _] = addresses;

	if (network === 'develop') {
		await deployer.deploy(DaiContract);
		const dai = await DaiContract.deployed();
		await dai.faucet(payer, web3.utils.toWei('1000'));

		await deployer.deploy(PaymentContract, admin, dai.address);
	} else {
		const ADMIN_ADDRESS = '';
		const DAI_ADDRESS = '';
		await deployer.deploy(PaymentContract, ADMIN_ADDRESS, DAI_ADDRESS);
	}
};
