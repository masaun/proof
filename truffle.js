require('dotenv').config() // Store key/value from '.env' to process.env
const HDWalletProvider = require("truffle-hdwallet-provider");

const mnemonic = process.env.MNEMONIC;
const infura_api_key = process.env.INFURA_API_KEY;


module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // to customize your Truffle configuration!
   networks: {
    development: {
      host: "127.0.0.1",
      port: 7545,     // Ganache-GUI
      //port: 8545,   // Ganache-CLI
      network_id: "*",
    },
    ropsten: {
      provider: function() {
        return new HDWalletProvider(mnemonic, "https://ropsten.infura.io/v3/" + infura_api_key);
      },
      network_id: '3',
    }
  }
};
