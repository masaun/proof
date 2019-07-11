import React, { Component } from 'react'
import ipfs from './ipfsApi'


class IpfsUpload extends Component {
  constructor(props, { authData }) {
    super(props)

    authData = this.props

    this.state = {
      buffer: null,
      ipfsHash: ''
    }
    this.captureFile = this.captureFile.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }


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

    ipfs.files.add(this.state.buffer, (error, result) => {
      // In case of fail to upload to IPFS
      if (error) {
        console.error(error)
        return
      }

      // In case of successful to upload to IPFS
      this.setState({ ipfsHash: result[0].hash })
      console.log('=== ipfsHash ===', this.state.ipfsHash)
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
