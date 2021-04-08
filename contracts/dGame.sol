// SPDX-License-Identifier: MIT
pragma solidity >=0.6.0 <0.8.0;
pragma abicoder v2;

import "./CurrencyToken.sol";
import "./NFToken.sol";

contract dGame{
    CurrencyToken public ctoken;
    NFToken public nftoken;

    constructor(CurrencyToken _ctoken, NFToken _nftoken) public {
        ctoken = _ctoken;
        nftoken = _nftoken;
    }

    // mint Currency Token
    function mintCToken(address account, uint256 amount) public {
        ctoken.mint(account,amount);
    }

    // mintNFToken, called in buyNFToken function
    function mintNFToken(address account, string memory _tokenURI) private {
        nftoken.mint(account, _tokenURI);
    }

    // return account's currency token balance
    function showCurrencyTokenBalance(address account) public view returns (uint256){
        uint256  ctokenBalanceWei = ctoken.balanceOf(account);
        return ctokenBalanceWei;
    }

//    function showNFToken(address account) public view returns (string memory){
//        string memory tokenURIs;
//        uint256 balanceOf = nftoken.balanceOf(account);
//        for (uint i = 0; i < balanceOf; i++){
//            uint256 id = nftoken.tokenOfOwnerByIndex(account, i);
//            string memory tokenURI = nftoken.tokenURI(id);
//            tokenURIs = tokenURI;
//        }
//        return tokenURIs;
//    }

    // buy NF token using currency token with input sender address, NF token string and price of token
    function buyNFToken(address account, string memory _tokenURI, uint256 price) payable public {
        uint256 balance = showCurrencyTokenBalance(account);
        require (balance >= price, 'Error, not enough currency tokens');
        mintNFToken(account, _tokenURI);
        ctoken.transferCTFrom(account, address(this), price);
    }
}