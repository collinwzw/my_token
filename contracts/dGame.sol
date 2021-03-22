pragma solidity >=0.6.0 <0.8.0;

import "./CurrencyToken.sol";
import "./NFToken.sol";

contract dGame{
    CurrencyToken public ctoken;
    NFToken public nftoken;

    constructor(CurrencyToken _ctoken, NFToken _nftoken) public {
        ctoken = _ctoken;
        nftoken = _nftoken;
    }

    function mintCToken(address account, uint256 amount) public {
        ctoken.mint(account,amount);
    }

    function mintNFToken(address account, string memory _tokenURI) public {
        nftoken.mint(account, _tokenURI);
    }

    function showCurrencyTokenBalance(address account) public view returns (uint256){
        uint256  ctokenBalanceWei = ctoken.balanceOf(account);
        return ctokenBalanceWei;
    }

    function showNFToken(address account) public view returns (string memory){
        string memory tokenURIs;
        uint256 balanceOf = nftoken.balanceOf(account);
        for (uint i = 0; i < balanceOf; i++){
            uint256 id = nftoken.tokenOfOwnerByIndex(account, i);
            string memory tokenURI = nftoken.tokenURI(id);
            tokenURIs = tokenURI;
        }
        return tokenURIs;
    }

//    function buyNFToken(address account, string memory _tokenURI) public {
//        uint256 balance = showCurrencyTokenBalance(account);
//        msg.sender.transfer()
//    }
}