import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

import DropDown from '../../DropDown';
import timeBlue from '../timeblue.svg';
import timeRed from '../timered.svg';

export default class TimeSelector extends Component {
  static propTypes = {
    startText: PropTypes.string.isRequired,
    endText: PropTypes.string.isRequired,
    timeArray: PropTypes.arrayOf(PropTypes.shape({})),
    startOnChange: PropTypes.func.isRequired,
    endOnChange: PropTypes.func.isRequired,
    userId: PropTypes.string.isRequired,
    shifts: PropTypes.arrayOf(PropTypes.shape({})),
  };
  static defaultProps = {
    timeArray: [],
    shifts: [],
    range: [],
  };
  constructor(props) {
    super(props);
    this.state = {
      range: [],
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.userId !== this.props.userId) {
      this.setState({ range: this.range(nextProps.shifts, nextProps.userId) });
    }
  }

  componentWillUpdate(nextProps, nextState) {}
  range(shifts, id) {
    let userShifts = shifts.filter(shift => shift.user.id === id);
    const range = this.props.timeArray.map(time => {
      const currentTime = moment(time);
      const available = userShifts.every(shift => {
        const currentTimeMod = moment(currentTime._i.time);
        const shiftModStart = moment(shift.dtstart).format(
          'YYYY-MM-DDTHH:mm:ssZ'
        );
        const shiftModEnd = moment(shift.dtend).format('YYYY-MM-DDTHH:mm:ssZ');

        if (
          currentTimeMod.isSame(shiftModStart) ||
          currentTimeMod.isBetween(shiftModStart, shiftModEnd)
        ) {
          return false;
        } else {
          return true;
        }
      });
      return { ...time, available };
    });
    return range;
  }

  validateDate() {
    if (this.state.endTime === '') {
      return;
    }
    let startHour = this.state.startTime.slice(11, -11);
    let endHour = this.state.endTime.slice(11, -11);
    let startMin = this.state.startTime.slice(14, -8);
    let endMin = this.state.endTime.slice(14, -8);
    let hourTimeStart = Number(startHour);
    let hourTimeEnd = Number(endHour);
    let minTimeStart = Number(startMin);
    let minTimeEnd = Number(endMin);
    if (hourTimeStart > hourTimeEnd) {
      this.setState({ valid: false });
    } else if (
      (hourTimeStart === hourTimeEnd && minTimeStart > minTimeEnd) ||
      (hourTimeStart === hourTimeEnd && minTimeStart === minTimeEnd)
    ) {
      this.setState({ valid: false });
    } else {
      this.setState({ valid: true });
    }
  }
  render() {
    return (
      <div>
        <div>
          {this.props.startText}
          <img alt="Blue clock icon" src={timeBlue} />
          {this.props.timeArray.length > 0 && (
            <DropDown
              range={this.state.range}
              onChange={date => {
                this.props.startOnChange(date);
              }}
            />
          )}
          {/* {this.state.valid === false && (
            <img alt="NotValidIcon" src={notValid} />
          )} */}
        </div>
        <div>
          {this.props.endText}
          <img alt="Red clock icon" src={timeRed} />
          {this.props.timeArray.length > 0 && (
            <DropDown
              range={this.state.range}
              onChange={date => this.props.endOnChange(date)}
            />
          )}
        </div>
      </div>
    );
  }
}
