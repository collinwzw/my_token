// SPDX-License-Identifier: MIT
pragma solidity >=0.6.0 <0.8.0;

import "openzeppelin-solidity/contracts/token/ERC721/ERC721.sol";

contract NFToken is ERC721{
    address public minter;

    function passMinterRole(address dGame) public returns (bool) {
        require(msg.sender == minter, 'Error, msg.sender does not have minter role');
        minter = dGame;

        emit MinterChanged(msg.sender, dGame);
        return true;
    }

    constructor() public ERC721("NF Token", "NFT"){
        minter = msg.sender; //only initially
    }
    event MinterChanged(address indexed from, address to);

    function mint(address _to, string memory _tokenURI) public returns(bool) {
        uint _tokenId = totalSupply() + 1;
        _mint(_to, _tokenId);
        _setTokenURI(_tokenId, _tokenURI);
        return true;
    }

}