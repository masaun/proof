import React, { Component } from 'react'
import getWeb3, { getGanacheWeb3, Web3 } from '../../../util/getWeb3'
import { Credentials } from 'uport-credentials';


class Profile extends Component {
  constructor(props, { authData }) {
    super(props)
    authData = this.props

    this.state = {
      /////// Default state
      web3: null,
      accounts: null,

      /////// User data from uPort credencials
      buffer: null,
      ipfsHash: ''
    }
  }


  componentDidMount = async () => {
    let Profile = {};

    try {
      Profile = require("../../../../build/contracts/Profile.json");
    } catch (e) {
      console.log(e);
    }

    // Use web3 to get the user's accounts.
    const web3 = new Web3(window.ethereum);
    const accounts = await web3.eth.getAccounts();
    const networkId = await web3.eth.net.getId();
    const ContractAddress = Profile['networks'][networkId]['address']
    
    let instanceProfile = null;
    instanceProfile = new web3.eth.Contract(Profile.abi, ContractAddress);
 
    if (instanceProfile) {
      this.setState({ web3, accounts, instanceProfile: instanceProfile });
    }
 
    // Get saved value in struct
    instanceProfile.methods.getUser(accounts[0]).call().then((profileOfUport) => {
      console.log('== response of getUser function ==', profileOfUport);

      this.setState({ 
        applicant_address: profileOfUport[0],
        did: profileOfUport[1],
        auth_data_name: profileOfUport[2], 
      });
    })
  };


  render() {
    const { accounts, applicant_address, did, auth_data_name } = this.state;

    return(
      <main className="container">
        <div className="pure-g">
          <div className="pure-u-1-1">
            <h1>Profile</h1>
            <p>Change these details in UPort to see them reflected here.</p>
            <p>
              <strong>Name</strong><br />
              {this.props.authData.name}
            </p>
            <p>
              <strong>Applicant ddress</strong><br />
              { applicant_address }
            </p>
            <p>
              <strong>DID</strong><br />
              { did }
            </p>
            <p>
              <strong>Auth data name</strong><br />
              { auth_data_name }
            </p>
          </div>
        </div>
      </main>
    )
  }
}

export default Profile
