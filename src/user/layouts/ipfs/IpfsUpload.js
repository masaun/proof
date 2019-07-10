import React, { Component } from 'react'

class Profile extends Component {
  constructor(props, { authData }) {
    super(props)
    authData = this.props
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
          </div>
        </div>
      </main>
    )
  }
}

export default IpfsUpload
