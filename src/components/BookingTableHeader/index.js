import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { connect } from 'react-redux';

import calender from './calender.svg';

const HeaderWrapper = styled.div`
  height: 100%;
  width: 90%;
  border-radius: 4px;
  background-color: #ffffff;
  box-shadow: 0 4px 10px 0 rgba(50, 70, 90, 0.1);
  margin: auto;
  margin-top: 20px;
  font-family: 'Trebuchet MS';
  display: flex;
  justify-content: space-between;
  @media screen and (max-width: 495px) {
    justify-content: center;
  }

  button {
    background-color: #ffffff;
    border: 2px solid #dadada;
    border-radius: 5px;
    color: #0085ff;
    padding: 10px 25px;
    font-size: 13px;
    margin: 13px;
    cursor: pointer;
    font-family: 'Trebuchet MS';
    outline: none;
    img {
      width: 15px;
      height: 15px;
      margin-right: 4px;
    }
  }

  .date {
    font-weight: 700;
    color: #0085ff;
    margin: auto 10px auto 10px;
    letter-spacing: 2px;
  }
  .nextButton {
    @media screen and (max-width: 495px) {
      display: none;
    }
  }
  .previousButton {
    @media screen and (max-width: 495px) {
      display: none;
    }
  }
`;

class BookingTableHeader extends Component {
  static propTypes = {
    locale: PropTypes.shape({
      prevDay: PropTypes.string,
      pickDate: PropTypes.string,
      nextDay: PropTypes.string,
    }).isRequired,
    onClickPickDate: PropTypes.func.isRequired,
    onClickNextDay: PropTypes.func.isRequired,
    onClickPrevDay: PropTypes.func.isRequired,
    prevDay: PropTypes.bool.isRequired,
    date: PropTypes.shape({
      format: PropTypes.func,
    }).isRequired,
  };

  static defaultProps = {
    date: '',
  };
  render() {
    return (
      <HeaderWrapper>
        {/* {this.props.prevDay === true && ( */}
        <button
          disabled={!this.props.prevDay}
          className="previousButton"
          onClick={() => this.props.onClickPrevDay()}
        >
          {this.props.locale.prevDay}
        </button>

        <button
          className="calendarButton"
          onClick={() => this.props.onClickPickDate()}
        >
          <img alt="calender" src={calender} />
          {this.props.date.format('DD.MMM.YYYY')}{' '}
        </button>
        <button
          className="nextButton"
          onClick={() => this.props.onClickNextDay()}
        >
          {this.props.locale.nextDay}
        </button>
      </HeaderWrapper>
    );
  }
}
const mapStateToProps = state => ({
  locale: state.LocaleReducer,
});
export default connect(mapStateToProps)(BookingTableHeader);
