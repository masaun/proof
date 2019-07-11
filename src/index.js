import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router'
import { Provider } from 'react-redux'
import { syncHistoryWithStore } from 'react-router-redux'
import { UserIsAuthenticated } from './util/wrappers.js'

// Layouts
import App from './App'
import Home from './layouts/home/Home'
import Dashboard from './layouts/dashboard/Dashboard'
import Profile from './user/layouts/profile/Profile'
import IpfsUpload from './user/layouts/ipfs/IpfsUpload'               // IPFS upload and Save to blockchain page
import IpfsUploadSimple from './user/layouts/ipfs/IpfsUploadSimple'   // IPFS upload page (Only upload to IPFS. Not upload to blockchain)

// Redux Store
import store from './store'

const history = syncHistoryWithStore(browserHistory, store)

ReactDOM.render((
    <Provider store={store}>
      <Router history={history}>
        <Route path="/" component={App}>
          <IndexRoute component={Home} />
          <Route path="dashboard" component={UserIsAuthenticated(Dashboard)} />
          <Route path="profile" component={UserIsAuthenticated(Profile)} />
          <Route path="ipfs" component={UserIsAuthenticated(IpfsUpload)} />
          <Route path="ipfs_upload_simple" component={UserIsAuthenticated(IpfsUploadSimple)} />
        </Route>
      </Router>
    </Provider>
  ),
  document.getElementById('root')
)
