// SPDX-License-Identifier: MIT
pragma solidity >=0.6.0 <0.8.0;

import "./dGame.sol";
contract MarketPlace{
    dGame public dg;

    constructor(dGame addr) public {
      dg = addr;
    }

    function forge(string memory token_URI)public{
        dg.buyNFToken(msg.sender, token_URI, 1);
    }
}