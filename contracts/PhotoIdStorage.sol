pragma solidity >=0.4.17 <0.7.0;
//pragma solidity ^0.4.17;


contract PhotoIdStorage {

    string ipfsHash;

    struct PhotoID {
        address applicantAddress;
        string DID;
        string authDataName;
        string IPFSHash;
    }
    mapping (address => PhotoID) photoIDs;
  
  
    event SavePhotoID(address applicantAddress, string indexed DID, string indexed authDataName, string indexed ipfsHash);
  

    function set(string memory x) public {
        ipfsHash = x;
    }


    function get() public view returns (string memory) {
        return ipfsHash;
    }


    function savePhotoID(
        address _applicantAddress,
        string memory _DID,
        string memory _authDataName, 
        string memory _ipfsHash
    )
        public returns (address, string memory, string memory, string memory) 
    {
        PhotoID storage photoID = photoIDs[_applicantAddress];
        photoID.DID = _DID;
        photoID.authDataName = _authDataName;
        photoID.IPFSHash = _ipfsHash;

        emit SavePhotoID(_applicantAddress, _DID, _authDataName, _ipfsHash);

        return (_applicantAddress, _DID, _authDataName, _ipfsHash);
    }
  

    function getPhotoID(
        address _applicantAddress
    )
        public returns (address, string memory, string memory, string memory)
    {
        string memory _DID;
        string memory _authDataName;
        string memory _IPFSHash;

        PhotoID memory photoID = photoIDs[_applicantAddress];
        _DID = photoID.DID;
        _authDataName = photoID.authDataName;
        _IPFSHash = photoID.IPFSHash;

        return (_applicantAddress, _DID, _authDataName, _IPFSHash);
    }

}
