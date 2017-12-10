import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { connect } from 'react-redux';

import calender from './calender.svg';

const HeaderContainer = styled.div`
  height: 100%;
  width: 90%;
  border-radius: 4px;
  background-color: #ffffff;
  box-shadow: 0 4px 10px 0 rgba(50, 70, 90, 0.1);
  margin: auto;
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
  font-family: 'Trebuchet MS';
  button{
    background-color: #ffffff;
    border: 2px solid #dadada;
    border-radius: 2px;
    color: #0085ff;
    padding: 10px 25px;
    font-size: 12px;
    margin: 10px;
    cursor: pointer;
    background-color: red;
    img {
      width: 15px;
      height: 15px;
      margin-right: 4px;
      }
    }
  }
  .date {
    font-weight: 700;
    color: #0085ff;
    margin: auto 10px auto 10px;
    letter-spacing: 2px;
  }
`;

const previousWrapper = styled.div`
  margin-top: 20px;
  background-color: #ffffff;
  border: 2px solid #dadada;
  border-radius: 2px;
  color: #0085ff;
  padding: 10px 25px;
  font-size: 12px;
  margin: 10px;
  cursor: pointer;
`;

const calendarPicker = styled.div`
  margin-top: 20px;
  background-color: #ffffff;
  border: 2px solid #dadada;
  border-radius: 2px;
  color: #0085ff;
  padding: 10px 25px;
  font-size: 12px;
  margin: 10px;
  cursor: pointer;
  background-color: yellow;
`;

const nextWrapper = styled.div`
  margin-top: 20px;
  background-color: #ffffff;
  border: 2px solid #dadada;
  border-radius: 2px;
  color: #0085ff;
  padding: 10px 25px;
  font-size: 12px;
  margin: 10px;
  cursor: pointer;
  background-color: blue;
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
      <HeaderContainer>
        <previousWrapper>
          {this.props.prevDay === true && (
            <button onClick={() => this.props.onClickPrevDay()}>
              {this.props.locale.prevDay}
            </button>
          )}
        </previousWrapper>
        <calendarPicker>
          <button onClick={() => this.props.onClickPickDate()}>
            <img alt="calender" src={calender} />
            {this.props.date.format('DD.MMM.YYYY')}{' '}
          </button>
        </calendarPicker>
        <nextWrapper>
          <button onClick={() => this.props.onClickNextDay()}>
            {this.props.locale.nextDay}
          </button>
        </nextWrapper>
      </HeaderContainer>
    );
  }
}
const mapStateToProps = state => ({
  locale: state.LocaleReducer,
});
export default connect(mapStateToProps)(BookingTableHeader);
