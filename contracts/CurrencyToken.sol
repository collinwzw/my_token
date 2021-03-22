// SPDX-License-Identifier: MIT
pragma solidity >=0.6.0 <0.8.0;

import "openzeppelin-solidity/contracts/token/ERC20/ERC20.sol";

contract CurrencyToken is ERC20{
    address public minter;
    constructor() public payable ERC20("Currency Token", "CT") {
        minter = msg.sender; //only initially
    }

    function mint(address account, uint256 amount) public {
        require(msg.sender==minter, 'Error, msg.sender does not have minter role'); //dBank
        _mint(account, amount);
    }
}