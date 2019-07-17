var Profile = artifacts.require("./Profile.sol");

contract('=== Profile ===', function(accounts) {

  const _applicantAddress = "0x6464835fdb341a46bffe7a25d63f6d9076e3032a"
  const _DID = "did:ethr:0x....."
  const _authDataName = "Taro Yamada"


  // async/await version
  it('Execute saveUser function（async/await）', async () => {
      const accounts = await web3.eth.getAccounts();

      // Execute function
      const contract = await new web3.eth.Contract(Profile.abi, Profile.address);
      const response = await contract.methods.saveUser(_applicantAddress, _DID, _authDataName).send({ from: accounts[0], gas: 3000000 });
      console.log('=== response of saveUser function ===', response);  // Result: OK

      // Get event value
      const event = response.events.SaveUser.returnValues.DID;
      console.log('=== Check event value of did of saveUser function ===', event);  // Result: OK
  });


  // Promise/then version
  it("Execute saveUser function（Promise/then）", function() {
    return Profile.deployed().then(function(instance) {
      profileInstance = instance;

      return profileInstance.saveUser(_applicantAddress, _DID, _authDataName, {from: accounts[0]});
    }).then(function(savedUserData) {
      console.log('=== savedUserData ===', savedUserData)
    });
  });



  it("...should get saved user data from uPort.", function() {
    return Profile.deployed().then(function(instance) {
      profileInstance = instance;

      return profileInstance.saveUser("0x6464835fdb341a46bffe7a25d63f6d9076e3032a", "did:ethr:0x.....", "Taro Yamada", {from: accounts[0]});
    }).then(function() {
      return profileInstance.getUser("0x6464835fdb341a46bffe7a25d63f6d9076e3032a");
    }).then(function(getSavedUserData) {
      console.log('=== get savedUserData ===', getSavedUserData)
    });
  });

});
