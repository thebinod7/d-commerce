// SPDX-License-Identifier: MIT
import "openzeppelin-solidity/contracts/token/ERC20/ERC20.sol";

pragma solidity 0.8.6;

contract PaymentProcessor {
	address public admin; // ADMIN/MERCHANT address
	IERC20 public dai; // DAI address

	constructor(address adminAddress, address daiAddress) {
		admin = adminAddress;
		dai = IERC20(daiAddress);
	}

	event PaymentDone(
		address payer,
		uint amount,
		uint paymentId,
		uint date
	);

	function purchasePay(uint amount, uint paymentId) external {
		dai.transferFrom(msg.sender, admin, amount);
		emit PaymentDone(msg.sender, amount, paymentId, block.timestamp);
	}
}