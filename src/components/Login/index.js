import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import FacebookLogin from 'react-facebook-login';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import mountainBackround from './mountain1.png';
import ebsLogo from './logo.png';

import * as actions from './actions';

const PageWrapperLeft = styled.div`
  width: 60%;
  height: 100%;
  min-height: 100vh;
  float: left;
  background-image: url(${mountainBackround});
  background-repeat: no-repeat;
  background-position: left;
`;

const SignupHeader = styled.div`
  flex-direction: column;

  img {
    height: 27%;
    width: 27%;
  }
  button {
    top: 0;
    width: 25%;
    display: flex;
    justify-content: right;
    align-items: flex-start;
    margin: 5px;
    padding: 5px;
    width: 100px;
    background-color: #0085ff;
    color: white;
    border: none;
  }
  p {
    font-family: 'Open Sans';
    width: 25%;
  }
`;

const PageWrapperRight = styled.div`
  height: 100%;
  width: 40%;
  float: left;
`;

const SlingWrapper = styled.div`
  margin: auto;
  font-family: 'Arial';
  display: flex;
  justify-content: center;
  color: #0085ff;
`;

const LoginWrapper = styled.div`
  margin: auto;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  font-family: Arial;
  color: #0085ff;
  .inputStyle {
    width: 250px;
    border: none;
    margin: 5px;
    padding: 5px;
  }
  .forgotPasswordStyle {
    font-size: 12px;
    color: grey;
  }
  .buttonStyle {
    background-color: #0085ff;
    width: 250px;
    border: none;
    margin: 5px;
    padding: 5px;
    color: white;
  }
`;

class Login extends Component {
  static propTypes = {
    setUserData: PropTypes.func.isRequired,
  };
  constructor(props) {
    super(props);
    this.state = {
      facebook: null,
    };
  }
  onFbCallback(data) {
    if (data) {
      this.props.setUserData(data.name, data.email, data.picture.data.url);
    }
  }

  render() {
    return (
      <div>
        <PageWrapperLeft>
          <SignupHeader>
            <img alt="logo of the website" src={ebsLogo} />

            <p>Don´t have an account?</p>

            <button className="signUpStyle">
              <a href="./SignUp">Sign up</a>
            </button>
          </SignupHeader>
        </PageWrapperLeft>

        <PageWrapperRight>
          <SlingWrapper>
            <h1>Sling EBS</h1>
          </SlingWrapper>

          <LoginWrapper>
            <FacebookLogin
              appId={process.env.REACT_APP_FACEBOOK}
              autoLoad={false}
              fields="name,email,picture"
              callback={response => this.onFbCallback(response)}
            />

            <p className="forgotPasswordStyle">OR</p>

            <input
              className="inputStyle"
              type="email"
              name="email"
              placeholder="Email address"
            />

            <input
              className="inputStyle"
              type="password"
              name="password"
              placeholder="Password"
            />

            <button className="buttonStyle">Next</button>

            <button className="buttonStyle">Skip this step</button>

            <p className="forgotPasswordStyle">
              Forgot your{' '}
              <a href="/notimplemented">
                <u>password?</u>
              </a>
            </p>
          </LoginWrapper>
        </PageWrapperRight>
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
