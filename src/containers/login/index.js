import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import styled from 'styled-components';
import FacebookLogin from 'react-facebook-login';
import Main from '../main';

const LoginWrapper = styled.div`
  margin: auto;
  display: flex;
  justify-content: center;
`;

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      facebook: null
    };
  }
  onFbClick(e) {
    console.log('got facebook log click', e);
    console.log(process.env.REACT_APP_FACEBOOK);
  }
  onFbCallback(data) {
    console.log('got facebook login callback', data);
    this.setState({ facebook: data });
    if (this.state.facebook != null) {
      console.log('Hello you can go to next site');
    }
  }
  render() {
    return (
      <div>
        <LoginWrapper>
          <FacebookLogin
            appId={process.env.REACT_APP_FACEBOOK}
            autoLoad={true}
            fields="name,email,picture"
            onClick={e => this.onFbClick(e)}
            callback={response => this.onFbCallback(response)}
          />
        </LoginWrapper>
      </div>
    );
  }
}
