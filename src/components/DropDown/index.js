import React, { Component } from 'react';
import styled, { css } from 'styled-components';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as ApiActions from '../../components/Actions/actions';

const DropDownWrapper = styled.div`
  position: relative;
  display: inline-block;
  .dropbtn {
    width: 90px;
    height: 30px;
    color: white;
    font-size: 16px;
    border: none;
    border-radius: 2px 2px 2px 2px;
    cursor: pointer;
    outline: none !important;
    color: #5f7183;
  }
  ${props => {
    if (props.menuHidden) {
      return css`
        .dropdown-content {
          display: none;
        }
      `;
    } else {
      return css`
        .dropdown-content {
          position: absolute;
          background-color: #f9f9f9;
          box-shadow: 2px 2px 5px 2px rgba(0, 0, 0, 0.1);
          border-radius: 2px 2px 2px 2px;
          z-index: 1;
          max-height: 150px;
          overflow-y: scroll;
        }
      `;
    }
  }};
  .bookingButton {
    width: 90px;
    height: 30px;
    color: white;
    font-size: 16px;
    cursor: pointer;
    outline: none !important;
    background-color: white;
    color: black;
    border-radius: 2px 2px 2px 2px;
    border: 0.5px solid #e7e7e7; /* Green */
    &:hover {
      color: grey;
    }
  }
`;

class DropDown extends Component {
  constructor(props) {
    super(props);
    this.state = {
      menuHidden: true,
    };
  }
  render() {
    return (
      <DropDownWrapper className="dropdown" menuHidden={this.state.menuHidden}>
        <button
          className="dropbtn"
          onClick={() =>
            this.setState({
              menuHidden: !this.state.menuHidden,
            })}
        >
          Start
        </button>
        <div className="dropdown-content">
          {/* Tekur við array af objectum og renderar lista af tökkum sem kalla í prop fall sem sér um að bóka tíma eða what ever */}
          {/* classname booking button væri með engum bakgrunn */}
          {/* dropdown-content væri með css sem setur maxheight í ? 300px ? og overflow-y: scroll svo að hægt sé að skrolla inní því */}
          {this.props.range.map(item => {
            return (
              <button
                className="bookingButton"
                key={item.time}
                onClick={() =>thos.props.bookTime(iitem.time, userid) console.log(item.time)}
              >
                {item.display}
              </button>
            );
          })}
          {/* <button className="bookingButton">8:00</button>
          <button className="bookingButton">8:00</button>
          <button className="bookingButton">8:00</button>
          <button className="bookingButton">8:00</button>
          <button className="bookingButton">8:00</button>
          <button className="bookingButton">8:00</button>
          <button className="bookingButton">8:00</button>
          <button className="bookingButton">8:00</button>
          <button className="bookingButton">8:00</button>
          <button className="bookingButton">8:00</button>
          <button className="bookingButton">8:00</button>
          <button className="bookingButton">8:00</button>
          <button className="bookingButton">8:00</button>
          <button className="bookingButton">8:00</button>
          <button className="bookingButton">8:00</button>
          <button className="bookingButton">8:00</button> */}
        </div>
      </DropDownWrapper>
    );
  }
}

const mapStateToProps = state => ({
  dataUsers: state.ApiReducer.dataUsers,
  dataShift: state.ApiReducer.dataShift,
  errorLoadingShifts: state.ApiReducer.errorLoadingShifts,
  userInfo: state.UserReducer,
  allShifts: state.ApiReducer.allShifts,
  loadingShifts: state.ApiReducer.loadingShifts,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      ...ApiActions,
    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(DropDown);
