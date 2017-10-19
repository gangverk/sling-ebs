import React, { Component } from 'react';
import styled from 'styled-components';
import slingLogo from './logo@2x.png';
import ebsLogo from './ebslogo2.png';
import PropTypes from 'prop-types';

const HeaderWrapper = styled.header`
  display: flex;
  justify-content: center;
  padding: 7px;
  background-color: #0085ff;
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

export default class Header extends Component {
  static propTypes = {
    userData: PropTypes.shape({
      name: PropTypes.string,
      image: PropTypes.string,
    }),
  };
  static defaultProps = {
    userData: null,
  };
  render() {
    console.log(this.props);
    return (
      <HeaderWrapper>
        <ImageLogo src={slingLogo} />
        <ImageLogo src={ebsLogo} />
        {this.props.userData != null && (
          <UserInfo>
            <img src={this.props.userData.picture} />
            <p>{this.props.userData.name}</p>
          </UserInfo>
        )}
      </HeaderWrapper>
    );
  }
}
