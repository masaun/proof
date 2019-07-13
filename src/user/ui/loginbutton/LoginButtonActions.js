import { uport } from './../../../util/connectors.js'
import { browserHistory } from 'react-router'
import getWeb3, { getGanacheWeb3, Web3 } from '../../../util/getWeb3'


export const USER_LOGGED_IN = 'USER_LOGGED_IN'
function userLoggedIn(user) {
  return {
    type: USER_LOGGED_IN,
    payload: user
  }
}

export function loginUser() {
  return function(dispatch) {
    // UPort and its web3 instance are defined in ./../../../util/wrappers.
    // Request uPort persona of account passed via QR
    uport.requestCredentials().then((credentials) => {
      dispatch(userLoggedIn(credentials))

      // [Debug]
      console.log('=== credentials（created by uport.requestCredentials()）===', credentials)

      // Read contract of Profile.sol
      let Profile = {};
      try {
        Profile = require("../../../../build/contracts/Profile.json");
      } catch (e) {
        console.log(e);
      }
      const web3 = new Web3(window.ethereum);
      const accounts = web3.eth.getAccounts();
      const networkId = web3.eth.net.getId();
      const ContractAddress = Profile['networks'][networkId]['address'];
      
      let instanceProfile = null;
      instanceProfile = new web3.eth.Contract(Profile.abi, ContractAddress);
      console.log('=== Profile["networks"]["5777"]["address"] ===', Profile['networks']['5777']['address']);
      console.log('=== instanceProfile ===', instanceProfile);

      if (instanceProfile) {
        // Set web3, accounts, and contract to the state, and then proceed with an
        // example of interacting with the contract's methods.
        this.setState({ web3, accounts, instanceProfile: instanceProfile });
      }
        

      // Save in blockchain


      // Used a manual redirect here as opposed to a wrapper.
      // This way, once logged in a user can still access the home page.
      var currentLocation = browserHistory.getCurrentLocation()

      if ('redirect' in currentLocation.query)
      {
        return browserHistory.push(decodeURIComponent(currentLocation.query.redirect))
      }

      return browserHistory.push('/dashboard')
    })
  }
}
