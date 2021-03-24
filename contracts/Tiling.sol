// SPDX-License-Identifier: MIT
pragma solidity >=0.6.0 <0.8.0;
import "./dGame.sol";

contract Tiling {
    dGame public dg;
    struct tile{
      bool initialized;
      uint256[20] numberArr;
      uint8[2] resStack;
      bool[20] matchedArr;
      uint8 stackCount;
    }
    mapping(address => tile) public tiles;
    mapping(address => bool) public initialized;
    constructor(dGame addr) public {
      dg = addr;
    }

    function isInitialized(address playerId) public view returns (bool) {
        return initialized[playerId];
    }

    function setInitialized(address playerId) public  returns (bool) {
        initialized[playerId] = true;
    }

    function initializeIfNeeded(address playerId) public {
            tile storage _tile = tiles[playerId];
            if(_tile.initialized == false)
            {
               _tile.initialized = true;
              for (uint i = 0; i < 10; i += 1){
                _tile.numberArr[2*i] = i;
                _tile.numberArr[2*i + 1] = i;
              }
              _tile.resStack[0] = 10;
              _tile.resStack[1] = 10;
              _tile.stackCount = 0;
              for(uint i = 0; i < 20; i++)
              {
                _tile.matchedArr[i] = false;
              }
              shuffle(playerId);
              initialized[playerId] = true;
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

    function revealAtIndex(address playerId, uint8 index) public returns(uint256){
      tile storage _tile = tiles[playerId];
        if(_tile.stackCount == 2)
        {
          _tile.stackCount = 0;
        }
          _tile.resStack[tiles[playerId].stackCount] = index;
          _tile.stackCount++;
          if(isMatch(playerId))
          {
            _tile.matchedArr[_tile.resStack[0]] = true;
            _tile.matchedArr[_tile.resStack[1]] = true;
            dg.mintCToken(msg.sender, 100);
          }
          return _tile.numberArr[index];
    }

    function flippedOne(address playerId)public returns(int, int){
      tile storage _tile = tiles[playerId];
      if(_tile.initialized == false )
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

    function reset(address playerId) public {
      tile storage _tile = tiles[playerId];
      for(uint i = 0; i < 20; i++)
      {
        _tile.matchedArr[i] = false;
      }
      shuffle(playerId);
    }

     function getMatched(address playerId, uint8 index)public returns (bool){
      tile storage _tile = tiles[playerId];
      // address playerId = msg.sender;
      if(_tile.initialized == false )
      {
        return false;
      }
      return _tile.matchedArr[index];
    }
}
