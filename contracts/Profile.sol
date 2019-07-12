pragma solidity >=0.4.17 <0.7.0;
//pragma solidity ^0.4.17;


contract Profile {

    struct User {
        address applicantAddress;
        string DID;
        string authDataName;        
    }
    mapping (address => User) users;

    event SaveUser(address applicantAddress, string indexed DID, string indexed authDataName);
  

    function saveUser(
        address _applicantAddress,
        string memory _DID,
        string memory _authDataName
    )
        public returns (address, string memory, string memory, string memory) 
    {
        User storage user = users[_applicantAddress];
        user.applicantAddress = _applicantAddress;
        user.DID = _DID;
        user.authDataName = _authDataName;

        emit SaveUser(_applicantAddress, _DID, _authDataName);

        return (_applicantAddress, _DID, _authDataName);
    }
  

    function getUser(
        address _applicantAddress
    ) 
        public returns (address, string memory, string memory)
    {
        address _applicantAddress;
        string memory _DID;
        string memory _authDataName;

        User memory user = users[_applicantAddress];
        _applicantAddress = user.applicantAddress;
        _DID = user.DID;
        _authDataName = user.authDataName;

        return (_applicantAddress, _DID, _authDataName);
    }

}
