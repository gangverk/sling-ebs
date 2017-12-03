import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import FacebookLogin from 'react-facebook-login';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import mountainBackround from './mountain1.png';
import ebsLogo from './logo.png';

import * as actions from './actions';
import * as ApiActions from '../Actions/actions';

const PageWrapperLeft = styled.div`
  width: 60%;
  height: 100%;
  min-height: 100vh;
  float: left;
  background-image: url(${mountainBackround});
  background-size: cover;
  img {
    width: 200px;
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
  }
  @media screen and (max-width: 750px) {
    display: none;
  }
`;
const PageWrapperRight = styled.div`
  height: 100%;
  width: 40%;
  float: left;
  @media screen and (max-width: 750px) {
    display: flex;
    justify-content: center;
    float: none;
    width: 100%;
  }
`;

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
    fetchAuthenticationData: PropTypes.func.isRequired,
  };
  constructor(props) {
    super(props);
    this.state = {
      facebook: null,
    };
  }

  componentDidMount() {
    this.props.fetchAuthenticationData();
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
          <div className="divLeft">
            <img alt="logo of the website" src={ebsLogo} />
          </div>
        </PageWrapperLeft>

        <PageWrapperRight>
          <div className="divRight">
            <LoginWrapper>
              <h1>Sling EBS</h1>
              <FacebookLogin
                size="medium"
                appId={process.env.REACT_APP_FACEBOOK}
                autoLoad={false}
                fields="name,email,picture"
                callback={response => this.onFbCallback(response)}
              />

              <p className="or">OR</p>
              <button className="buttonStyle">Skip this step</button>
            </LoginWrapper>
          </div>
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
      ...ApiActions,
      ...actions,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(Login);
