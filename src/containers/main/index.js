import React, { Component } from 'react';
import { Route, Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import Home from '../home';
import About from '../about';
import Login from '../../components/Login';
import WeekMenu from '../../components/WeekMenu';

class Main extends Component {
  render() {
    console.log('blablalb', this.props.userData);
    if (this.props.userData.name === '') {
      return <Login />;
    }
    return (
      <div>
        <header>
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
        </header>

        <main>
          <WeekMenu />
          <Route exact path="/" component={Home} />
          <Route exact path="/about" component={About} />
        </main>
      </div>
    );
  }
}

const mapStateToProps = state => {
  console.log('the state', state);
  return {
    userData: state.UserReducer,
  };
};

export default withRouter(connect(mapStateToProps, null)(Main));
