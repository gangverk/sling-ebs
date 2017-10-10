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
  font-family: Arial;
  color: #0085ff;
`;

const PageWrapper = styled.div`background-color: #eee;`;

const SlingWrapper = styled.div`
  margin: auto;
  font-family: Arial;
  display: flex;
  justify-content: center;
  color: #646464;
`;

const buttonStyle = {
  backgroundColor: '#0085ff',
  width: '250px',
  border: 'none',
  margin: '5px',
  padding: '5px',
  color: 'white',
};

const inputStyle = {
  width: '250px',
  border: 'none',
  margin: '5px',
  padding: '5px',
};

const signUpStyle = {
  justifyContent: 'right',
  margin: '5px',
  padding: '5px',
  width: '100px',
  backgroundColor: '#0085ff',
  color: 'white',
  border: 'none',
  float: 'right',
};

const forgotPasswordStyle = {
  fontSize: '12px',
  color: 'grey',
};

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
      <PageWrapper>
        <div>
          <button style={signUpStyle}> Sign up </button>
          <SlingWrapper>
            <h1>Sling EBS</h1>
          </SlingWrapper>

          <LoginWrapper>
            <FacebookLogin
              appId={process.env.REACT_APP_FACEBOOK}
              autoLoad={false}
              fields="name,email,picture"
              onClick={e => this.onFbClick(e)}
              callback={response => this.onFbCallback(response)}
            />
          </LoginWrapper>

          <LoginWrapper>
            <p>Log in</p>
          </LoginWrapper>

          <LoginWrapper>
            <p style={forgotPasswordStyle}>
              Enter your <b>email address</b> and <b>password</b>
            </p>
          </LoginWrapper>

          <LoginWrapper>
            <input
              style={inputStyle}
              type="email"
              name="email"
              placeholder="Email address"
            />
          </LoginWrapper>
          <LoginWrapper>
            <input
              style={inputStyle}
              type="password"
              name="password"
              placeholder="Password"
            />
          </LoginWrapper>

          <LoginWrapper>
            <button style={buttonStyle}>Log in</button>
          </LoginWrapper>

          <LoginWrapper>
            <p style={forgotPasswordStyle}>
              Forgot your{' '}
              <a href="#">
                <u>password?</u>
              </a>
            </p>
          </LoginWrapper>

          <LoginWrapper>
            <button style={buttonStyle}>Skip Login</button>
          </LoginWrapper>
        </div>
      </PageWrapper>
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
