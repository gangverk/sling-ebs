import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import moment from 'moment';
import 'react-dates/initialize';
import { DayPicker, DayPickerSingleDateController } from 'react-dates';
import 'react-dates/lib/css/_datepicker.css';
import styled from 'styled-components';

import * as ApiActions from '../../components/Actions/actions';

import Modal from '../../components/Modal';
import BookingTable from '../../components/BookingTable';
import BookingTableHeader from '../../components/BookingTableHeader';

const DayPickerWrapper = styled.div`
  position: fixed; /* Stay in place */
  z-index: 1; /* Sit on top */
  left: 0;
  top: 0;
  width: 100vw; /* Full width */
  height: 100vh; /* Full height */
  background-color: rgba(0, 0, 0, 0.4);
  & > div{
    position: absolute;
    top: 50%;
    left 50%;
    transform: translateX(-50%) translateY(-50%);
  }
`;
class Api extends Component {
  static propTypes = {
    fetchUsers: PropTypes.func.isRequired,
    dataUsers: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string.isRequired,
        avatar: PropTypes.string.isRequired,
        length: PropTypes.numb,
      })
    ),
    userInfo: PropTypes.shape({}).isRequired,
    postShift: PropTypes.func.isRequired,
  };
  static defaultProps = {
    dataUsers: [],
  };

  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      showModal2: false,
      showModal3: false,
      name: '',
      date: moment(),
      date2: moment(),
      numberOfMonths: 1,
      keepOpenOnDateSelect: true,
      focused: true,
    };
  }

  componentWillMount() {
    this.props.fetchUsers();
  }

  nextDay() {
    const newDate = this.state.date.clone();
    newDate.add(1, 'days');
    this.setState({ date: newDate });
  }
  prevDay() {
    const newDate = this.state.date.clone();
    newDate.subtract(1, 'days');
    this.setState({ date: newDate });
  }

  DayPickerSingleDateController_onOutsideClick() {
    this.setState({ showModal3: false });
  }
  // Hér að lita reitinn eða eitthvað ?
  clickDay(bla) {
    const newDate = bla.clone();
    this.setState({
      date: newDate,
      showModal3: false,
    });
  }

  render() {
    return (
      <div>
        <BookingTableHeader
          onClickPickDate={() => this.setState({ showModal3: true })}
          onClickNextDay={() => this.nextDay()}
          onClickPrevDay={() => this.prevDay()}
        />
        <BookingTable dateMain={this.state.date} />
        {this.state.showModal3 === true && (
          <DayPickerWrapper>
            <DayPickerSingleDateController
              hideKeyboardShortcutsPanel={true}
              date={this.state.date} // momentPropTypes.momentObj or null
              onDateChange={date => this.clickDay(date)}
              numberOfMonths={this.state.numberOfMonths}
              isOutsideRange={day => {
                const min = moment().subtract(1, 'd');
                const max = moment().add(3, 'months');
                return day.isBefore(min) || day.isAfter(max);
              }}
              enableOutsideDays={false}
              onOutsideClick={() =>
                this.DayPickerSingleDateController_onOutsideClick()}
            />
          </DayPickerWrapper>
        )}
        <Modal
          visable={this.state.showModal}
          modalHeader="Date Picking Modal"
          modalFooterSubmit="Pick Date"
          modalFooterSubmit2="Close modal"
          onSubmit={() => this.setState({ showModal: false })}
          onSubmit2={() => this.setState({ showModal: false })}
        >
          <div>
            <DayPicker />
          </div>
        </Modal>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  userInfo: state.UserReducer,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      ...ApiActions,
    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(Api);
