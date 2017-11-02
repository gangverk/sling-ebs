import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import FacebookLogin from 'react-facebook-login';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import mountainBackround from './mountain1.png';

import * as actions from './actions';

const PageWrapperLeft = styled.div`
  .left {
    background-color: red;
  }
`;

const PageWrapperRight = styled.div`
  .right {
    background-color: pink;
    float: right;
    padding: 175px;
  }
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
`;

const SignUpWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const ImageLogo = styled.div`
  background-image: url(${props => props.src});
  background-repeat: no-repeat;
  background-position: left;
  background-size: contain;
  width: 900px;
  height: 900px;
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
  display: 'flex',
  justifyContent: 'center',
  margin: '5px',
  padding: '5px',
  width: '100px',
  backgroundColor: '#0085ff',
  color: 'white',
  border: 'none',
};

const forgotPasswordStyle = {
  fontSize: '12px',
  color: 'grey',
};

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
          <ImageLogo src={mountainBackround} />
        </PageWrapperLeft>

        <PageWrapperRight>
          <SignUpWrapper>
            <button style={signUpStyle}>
              <a href="./SignUp">Sign up</a>
            </button>
          </SignUpWrapper>
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
            <button style={buttonStyle}>Next</button>
          </LoginWrapper>

          <LoginWrapper>
            <p style={forgotPasswordStyle}>
              Forgot your{' '}
              <a href="/notimplemented">
                <u>password?</u>
              </a>
            </p>
          </LoginWrapper>

          <LoginWrapper>
            <button style={buttonStyle}>Skip this step</button>
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
