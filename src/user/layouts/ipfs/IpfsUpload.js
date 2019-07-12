import React, { Component } from 'react'
import ipfs from './ipfsApi'
import getWeb3, { getGanacheWeb3, Web3 } from '../../../util/getWeb3'
import { Credentials } from 'uport-credentials';


class IpfsUpload extends Component {
  constructor(props, { authData }) {
    super(props)

    authData = this.props

    this.state = {
      /////// Default state
      web3: null,
      accounts: null,

      /////// IPFS uploader
      buffer: null,
      ipfsHash: ''
    }
    this.captureFile = this.captureFile.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }


  componentDidMount = async () => {
    let PhotoIdStorage = {};

    try {
      PhotoIdStorage = require("../../../../build/contracts/PhotoIdStorage.json");
    } catch (e) {
      console.log(e);
    }

    // Use web3 to get the user's accounts.
    const web3 = new Web3(window.ethereum);
    const accounts = await web3.eth.getAccounts();
    const networkId = await web3.eth.net.getId();
    const ContractAddress = PhotoIdStorage['networks'][networkId]['address']
    
    let instancePhotoIdStorage = null;
    instancePhotoIdStorage = new web3.eth.Contract(PhotoIdStorage.abi, ContractAddress);
    console.log('=== PhotoIdStorage["networks"]["5777"]["address"] ===', PhotoIdStorage['networks']['5777']['address']);
    console.log('=== instancePhotoIdStorage ===', instancePhotoIdStorage);

    if (instancePhotoIdStorage) {
      // Set web3, accounts, and contract to the state, and then proceed with an
      // example of interacting with the contract's methods.
      this.setState({ web3, accounts, instancePhotoIdStorage: instancePhotoIdStorage });
    }
  };

  captureFile(event) {
    event.preventDefault()
    const file = event.target.files[0]
    
    const reader = new window.FileReader()
    reader.readAsArrayBuffer(file)  // Read bufffered file

    // Callback
    reader.onloadend = () => {
      this.setState({ buffer: Buffer(reader.result) })
      console.log('=== buffer ===', this.state.buffer)
    }
  }

  
  onSubmit(event) {
    event.preventDefault()

    const { accounts, instancePhotoIdStorage } = this.state;

    // Get "DID" and "Private Key"
    const credential = Credentials.createIdentity();
    const did = credential['did']
    this.setState({ did: did })
    console.log('=== credential ===', credential)
    console.log('=== DID ===', credential['did'])

    // Upload to IPFS
    ipfs.files.add(this.state.buffer, (error, result) => {
      // In case of fail to upload to IPFS
      if (error) {
        console.error(error)
        return
      }

      // Save IpfsHash to Blockchain node
      instancePhotoIdStorage.methods.set(result[0].hash).send({ from: this.state.accounts[0] })

      // Upload to upload to IPFS
      this.setState({ ipfsHash: result[0].hash })
      console.log('=== ipfsHash ===', this.state.ipfsHash)
    })

    // Get saved value of ipfsHash on blockchain
    instancePhotoIdStorage.methods.get().call().then((r) => {
      console.log('== r ==', r);  // [Result]： == r == QmNgJ5tGRDNmXQyQQrehQBJWJXhQ6iPXazbiCrEc6odUHg
      instancePhotoIdStorage.methods.savePhotoID(accounts[0], did, this.props.authData.name, r).send({ from: this.state.accounts[0] })
      //instancePhotoIdStorage.methods.savePhotoID(accounts[0], this.props.authData.name, r).send({ from: this.state.accounts[0] })
    })

    // Get saved value in struct
    instancePhotoIdStorage.methods.getPhotoID(accounts[0]).call().then((s) => {
      console.log('== s ==', s);
    })
  }  


  render() {
    return(
      <main className="container">
        <div className="pure-g">
          <div className="pure-u-1-1">
            <h1>IPFS uploader</h1>
            <p>
              <strong>Name</strong><br />
              {this.props.authData.name}
            </p>

            <p>This image is stored on IPFS & The Ethereum Blockchain!</p>
            <img src={ `https://ipfs.io/ipfs/${this.state.ipfsHash}` } alt="" />
            <h2>Upload Image</h2>
            <form onSubmit={this.onSubmit}>
              <input type='file' onChange={this.captureFile} />
              <input type='submit' />
            </form>
          </div>
        </div>
      </main>
    )
  }
}

export default IpfsUpload
