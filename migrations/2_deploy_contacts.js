const Articles = artifacts.require("Articles");

module.exports = function(deployer) {
  deployer.deploy(Articles);
};
