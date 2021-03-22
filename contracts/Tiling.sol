// SPDX-License-Identifier: MIT
pragma solidity >=0.6.0 <0.8.0;


contract Tiling {
    uint256[] private numberArr;
    uint8[] private resStack;
    uint8 private stackCount;
    constructor() public {
      numberArr = [0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9];
      shuffle();
      stackCount = 0;
      resStack = [10,10];
    }

    function shuffle() public {
      for (uint256 i = 0; i < numberArr.length; i++) {
          uint256 n = i + uint256(keccak256(abi.encodePacked(block.timestamp))) % (numberArr.length - i);
          uint256 temp = numberArr[n];
          numberArr[n] = numberArr[i];
          numberArr[i] = temp;
      }
    }

    function revealAtIndex(uint8 index) public returns(uint){
            resStack[stackCount] = index;
            stackCount++;
            return numberArr[index];
    }

    function isMatch()public returns(string memory){
      if(stackCount == 2)
      {
        stackCount = 0;
        return numberArr[resStack[0]] == numberArr[resStack[1]]?"true":"false";
      }
      stackCount++;
      return "undefined";
    }

}
