import React, { Component } from 'react';
import styled from 'styled-components';

export default class Footer extends Component {
  render() {
    const Footer = styled.form`
      .FooterDistributed {
        background-color: #0085ff;
        box-sizing: border-box;
        width: 100%;
        padding-top: 10px;
        margin-top: 1%;
        color: white;
        position: fixed;
        bottom: 0;
        left: 0;
        right: 0;
      }
      .FooterDistributed .FooterLeft p {
        margin-top: 0px;
        padding-left: 1%;
        float: left;
      }
      .FooterDistributed .FooterCenter p {
        text-align: center;
        margin-top: 0px;
      }
      .FooterDistributed .FooterRight p {
        float: right;
        margin-top: 0px;
        padding-right: 1%;
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
