pragma solidity >=0.4.17 <0.7.0;
//pragma solidity ^0.4.17;


contract SimpleStorage {
    string ipfsHash;

    struct PhotoID {
        address applicantAddress;
        string authDataName;
        string IPFSHash;
    }
    mapping (address => PhotoID) photoIDs;
  
  
    event SavePhotoID(address indexed applicantAddress, string indexed authDataName, string indexed ipfsHash);
  

    function set(string memory x) public {
        ipfsHash = x;
    }


    function get() public view returns (string memory) {
        return ipfsHash;
    }


    function savePhotoID(
        address _applicantAddress,
        string memory _authDataName, 
        string memory _ipfsHash
    ) 
        public returns (address, string memory, string memory) 
    {
        PhotoID storage photoID = photoIDs[_applicantAddress];
        photoID.authDataName = _authDataName;
        photoID.IPFSHash = _ipfsHash;

        emit SavePhotoID(_applicantAddress, _authDataName, _ipfsHash);

        return (_applicantAddress, _authDataName, _ipfsHash);
    }
  

    function getPhotoID(
        address _applicantAddress
    ) 
        public returns (address, string memory, string memory)
    {
        string memory _authDataName;
        string memory _IPFSHash;

        PhotoID memory photoID = photoIDs[_applicantAddress];
        _authDataName = photoID.authDataName;
        _IPFSHash = photoID.IPFSHash;

        return (_applicantAddress, _authDataName, _IPFSHash);
    }

}
