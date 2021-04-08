// SPDX-License-Identifier: MIT
pragma solidity >=0.6.0 <0.8.0;

import "../node_modules/openzeppelin-solidity/contracts/token/ERC20/ERC20.sol";

contract CurrencyToken is ERC20{
    address public minter;
    event MinterChanged(address indexed from, address to);

    constructor() public payable ERC20("Currency Token", "CT") {

    _setupDecimals(0);

        minter = msg.sender; //only initially
    }

    function passMinterRole(address dGame) public returns (bool) {
        // require(msg.sender == minter, 'Error, msg.sender does not have minter role');
        minter = dGame;

        // emit MinterChanged(msg.sender, dGame);
        return true;
    }

    function mint(address account, uint256 amount) public {
        // require(msg.sender==minter, 'Error, msg.sender does not have minter role'); //dBank
        _mint(account, amount);
    }

    function transferCTFrom(address sender, address recipient, uint256 amount) public {

        _transfer( sender,  recipient,  amount);

    }
}