import React, { Component } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import usaFlag from './usaflag.png';
import iceFlag from './iceflag.png';
import ebsLogo from './logo.png';

import * as LocaleActions from '../../redux/locale/actions';

const HeaderWrapper = styled.header`
  padding: 7px;
  background-color: #0085ff;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const FlagWrapper = styled.div`
  margin-right: 64px;

  button {
    border: none;
    background-color: Transparent;
    outline: none;
  }
`;
const LogoHeader = styled.div`
  img {
    width: 45%;
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
  }
`;

const UserInfo = styled.div`
  margin-right: 160px;
  img {
    border-radius: 50%;
    margin-right: 10px;
    width: 20%;
  }
  p {
    color: white;
    display: inline-block;
    white-space: nowrap;
    font-family: 'Trebuchet MS';
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
        <LogoHeader>
          <img alt="logo of the website" src={ebsLogo} />
        </LogoHeader>
        {this.props.userData != null && (
          <UserInfo>
            <img alt="/" src={this.props.userData.picture} />
            <p>{this.props.userData.name}</p>
          </UserInfo>
        )}
        <FlagWrapper>
          <button onClick={() => this.props.setLanguage('is')}>
            {' '}
            <img alt="Icelandic" src={iceFlag} />
          </button>
          <button onClick={() => this.props.setLanguage('en')}>
            {' '}
            <img alt="English" src={usaFlag} />
          </button>
        </FlagWrapper>
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
