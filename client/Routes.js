/** @format */

import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { withRouter, Route, Switch, Redirect } from 'react-router-dom';
import { Login, Signup } from './components/AuthForm';
import Home from './components/Home';
import AlbumView from './components/AlbumView';
import SingleAlbumView from './components/SingleAlbumView';
import Cart from './components/Cart';
import UserData from './components/UserData';
import { me } from './store';
import AllOrders from './components/AllOrders';
import SingleOrder from './components/SingleOrder';
import SingleUser from './components/SingleUser';

/**
 * COMPONENT
 */
class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData();
  }

  render() {
    const { isLoggedIn } = this.props;

    return (
      <div className="mainPage">
        {isLoggedIn ? (
          <div>
            <Switch>
              <Route path="/home" component={Home} />
              <Redirect from="/login" to="/home" />
            </Switch>
            <Route exact path="/home" component={AlbumView} />
            <Route exact path="/cart" component={Cart} />
            <Route exact path="/orders" component={AllOrders} />
            <Route path="/users" component={UserData} />
            <Route path="/profile" component={SingleUser} />
          </div>
        ) : (
          <Switch>
            <Route exact path="/login" component={Login} />
            <Route path="/signup" component={Signup} />
            <Redirect from="/signup" to="/home" />
            <Route exact path="/cart" component={Cart} />
            <Route exact path="/home" component={AlbumView} />
            <Route exact path="/" component={AlbumView} />
          </Switch>
        )}
        <Switch>
          <Route path="/albums/:id" component={SingleAlbumView} />
          <Route exact path="/order/:id" component={SingleOrder} />
        </Switch>
      </div>
    );
  }
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.auth that has a truthy id.
    // Otherwise, state.auth will be an empty object, and state.auth.id will be falsey
    isLoggedIn: !!state.auth.id,
  };
};

const mapDispatch = (dispatch) => {
  return {
    loadInitialData() {
      dispatch(me());
    },
  };
};

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes));
