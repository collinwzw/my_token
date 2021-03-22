// SPDX-License-Identifier: MIT
pragma solidity >=0.4.21;

contract Tiling {
  	uint256[] public numberArr = [0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9];

    function shuffle() internal {
    for (uint256 i = 0; i < numberArr.length; i++) {
        uint256 n = i + uint256(keccak256(abi.encodePacked(now))) % (numberArr.length - i);
        uint256 temp = numberArr[n];
        numberArr[n] = numberArr[i];
        numberArr[i] = temp;
    }
	
}
