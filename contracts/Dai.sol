// SPDX-License-Identifier: MIT
import "openzeppelin-solidity/contracts/token/ERC20/ERC20.sol";

pragma solidity 0.8.6;

contract Dai is ERC20 {
	constructor() ERC20('DAI Stable','DAI') {}

	function faucet(address to, uint amount) external {
		_mint(to, amount);
	}
}