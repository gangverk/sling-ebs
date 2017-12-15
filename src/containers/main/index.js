import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Route, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../../components/Login/actions';
import { bindActionCreators } from 'redux';

import Api from '../api';
import Login from '../../components/Login';

import Header from '../../components/Header';

const MainWrapper = styled.div`background-color: #f4f5f9;`;

class Main extends Component {
  static propTypes = {
    userData: PropTypes.shape({
      name: PropTypes.string,
    }),
  };
  static defaultProps = {
    userData: { name: '' },
  };
  constructor(props) {
    super(props);
    let user = localStorage.getItem('userdata');
    let parsed = JSON.parse(user);
    console.log(parsed);
    this.state = {
      user: parsed,
    };
  }

  componentWillMount() {
    if (this.state.user !== null) {
      this.props.setUserData(
        this.state.user.name,
        this.state.user.email,
        this.state.user.picture.data.url,
        this.state.user.id
      );
    }
  }

  render() {
    if (this.props.userData.name === '') {
      return <Login />;
    }
    return (
      <MainWrapper>
        <main>
          <Header userData={this.props.userData} />
          <Route exact path="/" component={Api} />
        </main>
      </MainWrapper>
    );
  }
}

const mapStateToProps = state => {
  return {
    userData: state.UserReducer,
  };
};
const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      ...actions,
    },
    dispatch
  );

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));
