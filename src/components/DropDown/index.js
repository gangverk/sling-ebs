import React, { Component } from 'react';
import styled from 'styled-components';

const DropDownWrapper = styled.div`
  position: relative;
  display: inline-block;
`;

const DropDownButton = styled.button`
  width: 160px;
  background-color: white;
  color: #5f7183;
  font-family: 'Open Sans';
  border: 1px solid #0085ff;
  border-radius: 2px;
  font-size: 16px;
  cursor: pointer;
`;

const DropDownContent = styled.div`
  display: none;
  position: absolute;
  background-color: #f9f9f9;
  min-width: 160px;
  border-radius: 0px 0px 2px 2px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  z-index: 1;
  a {
    color: black;
    padding: 5px 5px;
    text-decoration: none;
    display: block;
  }
  ${DropDownWrapper}:hover & {
    display: block;
  }
`;

export default class DropDown extends Component {
  render() {
    return (
      <DropDownWrapper>
        <DropDownButton>Drop Down</DropDownButton>
        <DropDownContent>
          <a href="http://www.mbls.is">Link 1</a>
          <a href="http://www.mbls.is">Link 2</a>
          <a href="http://www.mbls.is">Link 3</a>
        </DropDownContent>
      </DropDownWrapper>
    );
  }
}
