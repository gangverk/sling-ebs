import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Route, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import Api from '../api';
import Login from '../../components/Login';

import Header from '../../components/Header';

const MainWrapper = styled.div`background-color: #f4f5f9;`;

// const LinkWrapper = styled.div`
//   a {
//     margin-left: 10px;
//   }
// `;

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

export default withRouter(connect(mapStateToProps, null)(Main));
