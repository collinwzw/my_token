// SPDX-License-Identifier: MIT
pragma solidity >=0.6.0 <0.8.0;
import "./dGame.sol";

contract Tiling {
    uint256[] private numberArr;
    uint8[] private resStack;
    bool[20] public matchedArr;
    uint8 public stackCount;
    dGame public dg;

    constructor(dGame addr) public {
      numberArr = [0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9];
      shuffle();
      stackCount = 0;
      resStack = [10,10];
      for(uint i = 0; i < 20; i++)
      {
        matchedArr[i] = false;
      }
      dg = addr;
    }

    function shuffle() private {
      for (uint256 i = 0; i < numberArr.length; i++) {
          uint256 n = i + uint256(keccak256(abi.encodePacked(block.timestamp))) % (numberArr.length - i);
          uint256 temp = numberArr[n];
          numberArr[n] = numberArr[i];
          numberArr[i] = temp;
      }
    }

    function revealAtIndex(uint8 index) public returns(uint){
        if(stackCount == 2)
        {
          stackCount = 0;
        }
          resStack[stackCount] = index;
          stackCount++;
          if(isMatch())
          {
            matchedArr[resStack[0]] = true;
            matchedArr[resStack[1]] = true;
            dg.mintCToken(msg.sender, 1);
          }
          return numberArr[index];
    }

    function flippedOne()public view returns(int, int){
      if(stackCount == 1)
      {
        return (int(resStack[0]), int(numberArr[resStack[0]]));
      }
      return (-1 , -1);
    }

    function isMatch()public view returns(bool){
      if(stackCount == 2)
      {
        return numberArr[resStack[0]] == numberArr[resStack[1]];
      }
      return false;
    }

    function reset()public {
      for(uint i = 0; i < 20; i++)
      {
        matchedArr[i] = false;
      }
      shuffle();
    }
}
