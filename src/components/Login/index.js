import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import FacebookLogin from 'react-facebook-login';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import mountainBackround from './mountain1.png';

import * as actions from './actions';

const PageWrapperLeft = styled.div`
  width: 60%;
  height: 100%;
  float: left;
  ${'' /* display: flex;
  align-items: flex-start;
  justify-content: flex-start; */} .ImageLeft {
    background-image: url(${props => props.src});
    background-repeat: no-repeat;
    background-position: left;
    background-size: contain;
    width: 100%;
    height: 100%;
    background-color: red;
  }
`;

const SignUpWrapper = styled.div`
  display: flex;
  flex-direction: row-reverse;
  ${'' /* justify-content: flex-end; */} .signUpStyle {
    display: flex;
    justify-content: center;
    align-items: flex-start;
    margin: 5px;
    padding: 5px;
    width: 100px;
    background-color: #0085ff;
    color: white;
    border: none;
  }
`;

const PageWrapperRight = styled.div`
  height: 100%;
  width: 40%;
  float: left;
`;

const SlingWrapper = styled.div`
  margin: auto;
  font-family: Arial;
  display: flex;
  justify-content: center;
  color: #646464;
`;

const LoginWrapper = styled.div`
  margin: auto;
  display: flex;
  justify-content: center;
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
          <SignUpWrapper>
            <button className="signUpStyle">
              <a href="./SignUp">Sign up</a>
            </button>
          </SignUpWrapper>

          <img alt="Mountain" className="ImageLeft" src={mountainBackround} />
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
          </LoginWrapper>

          <LoginWrapper>
            <p>Log in</p>
          </LoginWrapper>

          <LoginWrapper>
            <p className="forgotPasswordStyle">
              Enter your <b>email address</b> and <b>password</b>
            </p>
          </LoginWrapper>

          <LoginWrapper>
            <input
              className="inputStyle"
              type="email"
              name="email"
              placeholder="Email address"
            />
          </LoginWrapper>
          <LoginWrapper>
            <input
              className="inputStyle"
              type="password"
              name="password"
              placeholder="Password"
            />
          </LoginWrapper>

          <LoginWrapper>
            <button className="buttonStyle">Next</button>
          </LoginWrapper>

          <LoginWrapper>
            <p className="forgotPasswordStyle">
              Forgot your{' '}
              <a href="/notimplemented">
                <u>password?</u>
              </a>
            </p>
          </LoginWrapper>

          <LoginWrapper>
            <button className="buttonStyle">Skip this step</button>
          </LoginWrapper>
        </PageWrapperRight>
        {/* </div> */}
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
