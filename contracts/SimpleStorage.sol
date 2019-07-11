pragma solidity >=0.4.17 <0.7.0;
//pragma solidity ^0.4.17;


contract SimpleStorage {
  string ipfsHash;

  function set(string memory x) public {
    ipfsHash = x;
  }

  function get() public view returns (string memory) {
    return ipfsHash;
  }
}
