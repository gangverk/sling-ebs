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
  padding: 3px;
  background-color: #0085ff;
  display: flex;
  padding-left: 4vw;
  padding-right: 5vw;
  justify-content: space-between;
  align-items: center;
  font-family: 'Trebuchet MS';
  button {
    border: none;
    background-color: Transparent;
    outline: none;
    cursor: pointer;
    width: 32px;
    margin-right: 10px;
    margin-left: 10px;
  }
  .ebsLogo {
    width: 200px;
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    cursor: pointer;
  }
`;

const FlagWrapper = styled.div`
  .flags {
    @media screen and (max-width: 750px) {
      display: none;
    }
  }
`;

const UserInfo = styled.div`
  position: relative;
  height: 100%;
  display: flex;
  .userPhoto {
    border-radius: 50%;
    margin-right: 10px;
    @media screen and (max-width: 600px) {
      position: sticky;
    }
  }
  .userName {
    color: white;
    display: inline-block;
    white-space: nowrap;
    @media screen and (max-width: 600px) {
      display: none;
    }
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
        <img
          className="ebsLogo"
          alt="EBS logo"
          src={ebsLogo}
          onClick={() => window.location.reload(0)}
        />

        {this.props.userData != null && (
          <UserInfo>
            <img
              className="userPhoto"
              alt="User Pic"
              src={this.props.userData.picture}
            />
            <p className="userName">{this.props.userData.name}</p>
          </UserInfo>
        )}
        <FlagWrapper>
          <button
            className="flags"
            onClick={() => this.props.setLanguage('is')}
          >
            <img alt="Icelandic" src={iceFlag} />
          </button>

          <button
            className="flags"
            onClick={() => this.props.setLanguage('en')}
          >
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
