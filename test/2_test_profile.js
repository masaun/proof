var Profile = artifacts.require("./Profile.sol");

contract('=== Profile ===', function(accounts) {

  it("...should store the user data from uPort.", function() {
    return Profile.deployed().then(function(instance) {
      profileInstance = instance;

      return profileInstance.saveUser("0x6464835fdb341a46bffe7a25d63f6d9076e3032a", "did:ethr:0x.....", "Taro Yamada", {from: accounts[0]});
    }).then(function(savedUserData) {
      console.log('=== savedUserData ===', savedUserData)
    });
  });

  // it("...should store the user data from uPort.", function() {
  //   return Profile.deployed().then(function(instance) {
  //     profileInstance = instance;

  //     return profileInstance.saveUser("0x6464835fdb341a46bffe7a25d63f6d9076e3032a", "did:ethr:0x.....", "Taro Yamada", {from: accounts[0]});
  //   }).then(function() {
  //     return profileInstance.getUser("0x6464835fdb341a46bffe7a25d63f6d9076e3032a").call();
  //   }).then(function(getSavedUserData) {
  //     console.log('=== get savedUserData ===', getSavedUserData)
  //   });
  // });

});
