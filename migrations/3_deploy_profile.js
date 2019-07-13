var Profile = artifacts.require("./Profile.sol");

module.exports = function(deployer) {
  deployer.deploy(Profile);
};
