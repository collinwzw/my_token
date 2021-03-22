pragma solidity >=0.6.0 <0.8.0;

import "openzeppelin-solidity/contracts/token/ERC721/ERC721.sol";

contract NFToken is ERC721{
    constructor() public ERC721("NF Token", "NFT"){

    }
    function mint(address _to, string memory _tokenURI) public returns(bool) {
        uint _tokenId = totalSupply() + 1;
        _mint(_to, _tokenId);
        _setTokenURI(_tokenId, _tokenURI);
        return true;
    }

}