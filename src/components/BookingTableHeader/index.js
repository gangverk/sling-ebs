import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { connect } from 'react-redux';

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
      background-color: #ffffff;
      border: 2px solid #dadada;
      border-radius: 2px;
      color: #d2d2d2;
      padding: 10px 25px;
      font-size: 12px;
      margin: 10px;
      cursor: pointer;
    }
  }
`;

class BookingTableHeader extends Component {
  static propTypes = {
    onClickPickDate: PropTypes.func.isRequired,
    onClickNextDay: PropTypes.func.isRequired,
    onClickPrevDay: PropTypes.func.isRequired,
  };
  render() {
    return (
      <HeaderContainer>
        <div>
          <button onClick={() => this.props.onClickPrevDay()}>
            {this.props.locale.prevDay}
          </button>
          <button onClick={() => this.props.onClickPickDate()}>
            {this.props.locale.pickDate}
          </button>
          <button onClick={() => this.props.onClickNextDay()}>
            {this.props.locale.nextDay}
          </button>
        </div>
      </HeaderContainer>
    );
  }
}
const mapStateToProps = state => ({
  locale: state.LocaleReducer,
});
export default connect(mapStateToProps)(BookingTableHeader);
