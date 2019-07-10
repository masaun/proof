pragma solidity >=0.4.17 <0.7.0;
//pragma solidity ^0.4.17;


contract SimpleStorage {
  uint storedData;

  function set(uint x) public {
    storedData = x;
  }

  function get() public view returns (uint) {
    return storedData;
  }
}
