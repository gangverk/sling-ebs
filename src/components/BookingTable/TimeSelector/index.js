import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import styled from 'styled-components';
import { connect } from 'react-redux';

import DropDown from '../../DropDown';
import timeBlue from '../timeblue.svg';
import timeRed from '../timered.svg';

const DropDownWrapper = styled.div`
  .startTime {
    display: flex;
    justify-content: flex-end;
    margin-top: 15px;
    margin-bottom: 10px;
    margin-right: 20px;
  }
  .endTime {
    display: flex;
    justify-content: flex-end;
    margin-right: 20px;
    margin-bottom: 10px;
  }
`;
class TimeSelector extends Component {
  static propTypes = {
    startText: PropTypes.string.isRequired,
    endText: PropTypes.string.isRequired,
    timeArray: PropTypes.arrayOf(PropTypes.shape({})),
    startOnChange: PropTypes.func.isRequired,
    endOnChange: PropTypes.func.isRequired,
    userId: PropTypes.string.isRequired,
    shifts: PropTypes.arrayOf(PropTypes.shape({})),
    startDefult: PropTypes.string.isRequired,
    endTime: PropTypes.string.isRequired,
    locale: PropTypes.shape({
      time: PropTypes.string,
    }).isRequired,
  };
  static defaultProps = {
    timeArray: [],
    shifts: [],
    range: [],
    rangeForEndTime: [],
    userId: '',
  };
  constructor(props) {
    super(props);
    this.state = {
      range: [],
      rangeForEndTime: [],
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.userId !== this.props.userId) {
      this.setState(
        { range: this.range(nextProps.shifts, nextProps.userId) },
        () => {
          this.rangeForEndTime(this.state.range, this.props.startDefult);
        }
      );
    }
  }

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

  rangeForEndTime(rangeOld, date) {
    let bool = true;
    const rangeNew = rangeOld.filter(time => moment(time.time).isAfter(date));

    const range = rangeNew.map(time => {
      if (time.available && bool === true) {
        return { ...time, range };
      } else if (!time.available && bool === true) {
        bool = false;
        return {
          time: time.time,
          display: time.display,
          available: true,
        };
      } else {
        return { available: false };
      }
    });
    this.setState({ rangeForEndTime: range });
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
        <DropDownWrapper>
          <div className="startTime">
            {this.props.startText}
            <img alt="Blue clock icon" src={timeBlue} />
            {this.props.timeArray.length > 0 && (
              <DropDown
                range={this.state.range}
                buttonText={this.props.startDefult.slice(11, -8)}
                onChange={date => {
                  this.props.startOnChange(date);
                  this.rangeForEndTime(this.state.range, date);
                }}
              />
            )}
            {/* {this.state.valid === false && (
            <img alt="NotValidIcon" src={notValid} />
          )} */}
          </div>
          <div className="endTime">
            {this.props.endText}
            <img alt="Red clock icon" src={timeRed} />
            {this.props.timeArray.length > 0 && (
              <DropDown
                range={this.state.rangeForEndTime}
                buttonText={
                  this.props.endTime === 'Time'
                    ? this.props.locale.time
                    : this.props.endTime.slice(11, -8)
                }
                onChange={date => this.props.endOnChange(date)}
              />
            )}
          </div>
        </DropDownWrapper>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  locale: state.LocaleReducer,
});
export default connect(mapStateToProps)(TimeSelector);
