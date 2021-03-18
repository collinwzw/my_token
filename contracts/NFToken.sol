pragma solidity >=0.6.0 <0.8.0;

import "openzeppelin-solidity/contracts/token/ERC721/ERC721.sol";

contract NFToken is ERC721{
    address public minter;
    constructor() public payable ERC721("NF Token", "NFT"){

    }
    function mint(address account, uint256 amount) public {
        require(msg.sender==minter, 'Error, msg.sender does not have minter role'); //dBank
        _mint(account, amount);
    }
}