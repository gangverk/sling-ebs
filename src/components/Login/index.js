import React, { Component } from 'react';
import styled from 'styled-components';
import FacebookLogin from 'react-facebook-login';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as actions from './actions';

const LoginWrapper = styled.div`
  margin: auto;
  display: flex;
  justify-content: center;
`;

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      facebook: null,
    };
  }
  onFbClick(e) {
    console.log('Facebook app id');
    console.log(process.env.REACT_APP_FACEBOOK);
  }
  onFbCallback(data) {
    if (data) {
      this.props.setUserData(data.name, data.email, data.picture.data.url);
    }
  }
  render() {
    return (
      <div>
        <LoginWrapper>
          <FacebookLogin
            appId={process.env.REACT_APP_FACEBOOK}
            autoLoad={false}
            fields="name,email,picture"
            onClick={e => this.onFbClick(e)}
            callback={response => this.onFbCallback(response)}
          />
        </LoginWrapper>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  userData: state.UserReducer,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      ...actions,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(Login);
