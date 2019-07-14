var PhotoIdStorage = artifacts.require("./PhotoIdStorage.sol");

contract('=== PhotoIdStorage ===', function(accounts) {

  it("...should store the value 89.", function() {
    return PhotoIdStorage.deployed().then(function(instance) {
      photoIdStorageInstance = instance;

      return photoIdStorageInstance.set("QmPmJ4tGRDNmXQyQQrehQBLTJXhQ3iPXazbiRrEc9odUHg", {from: accounts[0]});
    }).then(function() {
      return photoIdStorageInstance.get.call();
    }).then(function(storedData) {
      console.log('=== storedData ===', storedData)
    });
  });

});
