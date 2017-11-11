import React, { Component } from 'react';
import styled from 'styled-components';

const HeaderContainer = styled.div`
  height: 100%;
  width: 90%;
  border-radius: 4px;
  background-color: #ffffff;
  box-shadow: 0 4px 10px 0 rgba(50, 70, 90, 0.1);
  margin: auto;
  margin-top: 20px;
  div {
    display: flex;
    justify-content: space-between;
    button {
      background-color: #0085ff;
      border: none;
      border-radius: 2px;
      color: white;
      padding: 10px 25px;
      text-align: center;
      text-decoration: none;
      display: inline-block;
      font-size: 12px;
      margin: 10px;
      cursor: pointer;
    }
  }
`;

export default class BookingTableHeader extends Component {
  render() {
    return (
      <HeaderContainer>
        <div>
          <button>Pick date</button>
          <button>Next day</button>
        </div>
      </HeaderContainer>
    );
  }
}
