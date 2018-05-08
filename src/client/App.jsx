import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { withCookies } from 'react-cookie';

import { Route } from 'react-router-dom';
import Loadable from 'react-loadable';

const Root = Loadable({
  loader: () => import('./Root'), 
  loading: () => null
});

/**
 * Core app container
 */
class App extends Component {
  constructor(props) {
    super(props);
    this.cookies = this.props.cookies;
  }

  render = () => {
    return(
      <div>
        <Route path='/' component={Root} />
      </div>
    );
  }
}

export default withCookies(App);