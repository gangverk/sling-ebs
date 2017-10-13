import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Route, Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import Home from '../home';
import About from '../about';
import Login from '../../components/Login';
import WeekMenu from '../../components/WeekMenu';
import BookMenu from '../../components/BookMenu';
import DateMenu from '../../components/DateMenu';
import Footer from '../../components/Footer';

class Main extends Component {
  static propTypes = {
    userData: PropTypes.shape({
      name: PropTypes.string,
    }),
  };
  static defaultProps = {
    userData: { name: '' },
  };
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
          <Link to="/BookMenu">Book</Link>
          <Link to="/DateMenu">Date</Link>
          <Link to="/WeekMenu">Week</Link>
        </header>

        <main>
          <Footer />

          <Route exact path="/DateMenu" component={DateMenu} />
          <Route exact path="/BookMenu" component={BookMenu} />
          <Route exact path="/WeekMenu" component={WeekMenu} />
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
