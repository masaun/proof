import React, { Component } from 'react'
import { Credentials } from 'uport-credentials';


// Get "DID" and "Private Key"
const credential = Credentials.createIdentity();
console.log('=== credential ===', credential)  // Success to get log of "DID" and "Private Key"




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
            <h1>Profile</h1>
            <p>Change these details in UPort to see them reflected here.</p>
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

export default Profile
