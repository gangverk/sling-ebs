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
  @media (max-width: 50%) {
    ${'' /* display: none; */};
  }
  background-image: url(${mountainBackround});
  background-size: cover;
  ${'' /* background-position: left;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover; */};
`;

const LogoHeader = styled.div`
  ${'' /* display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: baseline;
  text-align: right; */} img {
    height: 27%;
    width: 27%;
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
  }
  ${'' /* button {
    top: 0;
    width: 25%;
    display: flex;
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
    color: white;
  } */};
`;

const PageWrapperRight = styled.div`
  height: 100%;
  width: 40%;
  float: left;
  ${'' /* justify-content: center;
  align-items: center; */};
`;

// const SlingWrapper = styled.div`
//   font-family: Arial;
//   color: #0085ff;
//   justify-content: center;
//   align-items: center;
// `;

const LoginWrapper = styled.div`
  margin: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: #0085ff;
  height: 604px;
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
  .or {
    color: #a4a4a4;
  }
  h1 {
    font-family: Trebuchet MS;
    color: #0085ff;
    margin-right: 115px;
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
          <LogoHeader>
            <img alt="logo of the website" src={ebsLogo} />

            {/* <p>Don´t have an account?</p>

            <button className="signUpStyle">
              <a href="./SignUp">Sign up</a>
            </button> */}
          </LogoHeader>
        </PageWrapperLeft>

        <PageWrapperRight>
          {/* <SlingWrapper>
            <h1>Sling EBS</h1>
          </SlingWrapper> */}

          <LoginWrapper>
            <h1>Sling EBS</h1>
            <FacebookLogin
              appId={process.env.REACT_APP_FACEBOOK}
              autoLoad={false}
              fields="name,email,picture"
              callback={response => this.onFbCallback(response)}
            />

            {/* <h1>Sling EBS</h1>

            <p>Log in</p>

            <p className="forgotPasswordStyle">
              Enter your <b>email address</b> and <b>password</b>
            </p>

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

            <p className="forgotPasswordStyle">
              Forgot your{' '}
              <a href="/notimplemented">
                <u>password?</u>
              </a>
            </p> */}
            <p className="or">OR</p>
            <button className="buttonStyle">Skip this step</button>
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
