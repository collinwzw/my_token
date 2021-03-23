// SPDX-License-Identifier: MIT
pragma solidity >=0.6.0 <0.8.0;
import "./dGame.sol";

contract Tiling {
    dGame public dg;
    struct tile{
      bool initialized;
      uint256[] numberArr;
      uint8[] resStack;
      bool[20] matchedArr;
      uint8 stackCount;
    }
    mapping(address => tile) public tiles;
    

    constructor(dGame addr) public {
      dg = addr;
    }

    function initializeIfNeeded(address playerId) internal {
        tile storage _tile = tiles[playerId];
        if (!_tile.initialized) {
            _tile.numberArr = [0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9];
            _tile.resStack = [10,10];
            _tile.stackCount = 0;
            for(uint i = 0; i < 20; i++)
            {
              _tile.matchedArr[i] = false;
            }
        }        
    }

    function shuffle(address playerId) private {
      tile storage _tile = tiles[playerId];
      for (uint256 i = 0; i < _tile.numberArr.length; i++) {
          uint256 n = i + uint256(keccak256(abi.encodePacked(block.timestamp))) % (_tile.numberArr.length - i);
          uint256 temp = _tile.numberArr[n];
          _tile.numberArr[n] = _tile.numberArr[i];
          _tile.numberArr[i] = temp;
      }
    }

    function revealAtIndex(uint8 index) public returns(uint256){
      address playerId = msg.sender;
      initializeIfNeeded(playerId);
      tile storage _tile = tiles[playerId];
        if(_tile.stackCount == 2)
        {
          _tile.stackCount = 0;
        }
          _tile.resStack[_tile.stackCount] = index;
          _tile.stackCount++;
          if(isMatch(playerId))
          {
            _tile.matchedArr[_tile.resStack[0]] = true;
            _tile.matchedArr[_tile.resStack[1]] = true;
            dg.mintCToken(msg.sender, 100);
          }
          return _tile.numberArr[index];
    }

    function flippedOne()public returns(int, int){
      address playerId = msg.sender;
      tile storage _tile = tiles[playerId];
      if(tiles[playerId].initialized == false )
      {
        return (-1 , -1);
      }
      if(_tile.stackCount == 1)
      {
        return (int(_tile.resStack[0]), int(_tile.numberArr[_tile.resStack[0]]));
      }
      return (-1 , -1);
    }

    function isMatch(address playerId)private returns(bool){
      tile storage _tile = tiles[playerId];
      if(_tile.stackCount == 2)
      {
        return _tile.numberArr[_tile.resStack[0]] == _tile.numberArr[_tile.resStack[1]];
      }
      return false;
    }

    function reset()public {
      address playerId = msg.sender;
      tile storage _tile = tiles[playerId];
      for(uint i = 0; i < 20; i++)
      {
        _tile.matchedArr[i] = false;
      }
      shuffle(playerId);
    }

     function matchedArr(address playerId, uint8 index)public returns (bool){
      // address playerId = msg.sender;
      require(playerId == address(0), "0 address");
      require(tiles[playerId].initialized == false, "not initialized");
      if(tiles[playerId].initialized == false )
      {
        return false;
      }
    }
}
