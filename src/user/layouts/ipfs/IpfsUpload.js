import React, { Component } from 'react'

class IpfsUpload extends Component {
  constructor(props, { authData }) {
    super(props)

    authData = this.props

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
    console.log('onSummit...');
  }  


  render() {
    return(
      <main className="container">
        <div className="pure-g">
          <div className="pure-u-1-1">
            <h1>IPFS upload</h1>
            <p>Upload Image is here</p>
            <p>
              <strong>Name</strong><br />
              {this.props.authData.name}
            </p>

            <img src="" alt="" />
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
