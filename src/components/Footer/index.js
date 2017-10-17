import React, { Component } from 'react';
import styled from 'styled-components';

export default class Footer extends Component {
  render() {
    const Footer = styled.div`
      .FooterDistributed {
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;

        display: flex;
        justify-content: space-around;

        background-color: #0085ff;
        box-sizing: border-box;
        width: 100%;
        padding-top: 10px;
        margin-top: 1%;
        color: white;
      }
      .FooterDistributed p {
        margin-top: 0px;
      }
    `;

    return (
      <div>
        <Footer>
          <footer className="FooterDistributed">
            <div className="FooterLeft">
              <p>This is the left part of the footer</p>
            </div>

            <div className="FooterRight">
              <p>This is the right part of the footer</p>
            </div>

            <div className="FooterCenter">
              <p>This is the center part of the footer</p>
            </div>
          </footer>
        </Footer>
      </div>
    );
  }
}
