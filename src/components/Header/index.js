import React, { Component } from 'react';
import styled from 'styled-components';
import slingLogo from './logo@2x.png';
import ebsLogo from './ebslogo2.png';

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
  display: inline-block;
  width: 200px;
  height: 50px;
`;

export default class Header extends Component {
  render() {
    return (
      <HeaderWrapper>
        <ImageLogo src={slingLogo} />
        <ImageLogo src={ebsLogo} />
      </HeaderWrapper>
    );
  }
}
