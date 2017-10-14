import React, { Component } from 'react';
import styled from 'styled-components';
import logo from './logo@2x.png';
import eblogo from './ebslogo2.png';

const Image = styled.div`
  background-image: url(${eblogo});
  background-repeat: no-repeat;
  background-size: 100%;
  background-position: 50% 50%;
  display: inline-block;
  width: 200px;
  height: 100px;
`;

export default class Header extends Component {
  render() {
    const Header = styled.header`
      padding: 7px;
      font-family: Helvetica Neue;
      font-size: 10px;
      color: black;
      background-color: #0085ff;
      clear: left;
      text-align: left;
      p {
        color: black;
      }
    `;

    return (
      <div>
        <Header>
          {/* <h1>Sling EBS </h1>
          <h3>The Greatest Booking Service in the World </h3>
          <h3>We will book it!</h3> */}
          <img src={logo} alt="The new logo" />
          <Image />
        </Header>
      </div>
    );
  }
}
