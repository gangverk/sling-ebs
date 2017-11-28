import React, { Component } from 'react';
import styled from 'styled-components';
import slingLogo from './logo@2x.png';
import ebsLogo from './ebslogo2.png';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as LocaleActions from '../../redux/locale/actions';

const HeaderWrapper = styled.header`
  display: flex;
  justify-content: center;
  padding: 7px;
  background-color: #0085ff;
  button {
    height: 25px;
    border-radius: 2px;
    font-family: Arial;
    color: #ffffff;
    font-size: 15px;
    background: #3498db;
    padding: 2px 2px 2px 2px;
    text-decoration: none;
  }
`;
const ImageLogo = styled.div`
  background-image: url(${props => props.src});
  background-repeat: no-repeat;
  background-position: center;
  background-size: contain;
  width: 200px;
  height: 50px;
`;
const UserInfo = styled.div`
  position: relative;
  height: 100%;
  display: flex;
  img {
    border-radius: 50%;
    margin-right: 10px;
  }
  p {
    color: white;
    display: inline-block;
    white-space: nowrap;
  }
`;

class Header extends Component {
  static propTypes = {
    userData: PropTypes.shape({
      name: PropTypes.string,
      picture: PropTypes.string,
    }),
    setLanguage: PropTypes.func.isRequired,
  };
  static defaultProps = {
    userData: null,
  };
  render() {
    return (
      <HeaderWrapper>
        <ImageLogo src={slingLogo} />
        <ImageLogo src={ebsLogo} />
        {this.props.userData != null && (
          <UserInfo>
            <img alt="/" src={this.props.userData.picture} />
            <p>{this.props.userData.name}</p>
          </UserInfo>
        )}
        <button onClick={() => this.props.setLanguage('is')}>is</button>
        <button onClick={() => this.props.setLanguage('en')}>en</button>
      </HeaderWrapper>
    );
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      ...LocaleActions,
    },
    dispatch
  );

export default connect(null, mapDispatchToProps)(Header);
