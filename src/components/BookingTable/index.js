import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import ReactLoading from 'react-loading';
import moment from 'moment';

import * as ApiActions from '../../components/Actions/actions';
import TimeSelector from './TimeSelector';
import Modal from '../../components/Modal';
import EmployeesMenu from '../../components/EmployeesMenu';
import noteGray from './notesgray.svg';
import plus from './plus.svg';

const DayMenuDiv = styled.div`height: 100%;`;

const DayMenu = styled.table`
  margin: auto;
  margin-top: 10px;
  border-collapse: separate;
  border-spacing: 0;
  width: 95%;
  height: 100%
  color: #4a4a4d;
  font: 14px/1.4 'Helvetica Neue';
  position: relative;
  table,
  td,
  th {
    border-bottom: 1px solid #cecfd5;
    border-collapse: collapse;
    padding: 10px 15px;
  }
  th,
  td {
    padding: 10px 15px;
    vertical-align: middle;
  }
  td{
    cursor: pointer;
  }
  thead {
    font-size: 11px;
    text-transform: uppercase;
  }
  th:first-child {
    border-top-left-radius: 5px;
    text-align: left;
  }
  th:last-child {
    border-top-right-radius: 5px;
  }
  tfoot tr:last-child td:first-child {
    border-bottom-left-radius: 5px;
  }
  tfoot tr:last-child td:last-child {
    border-bottom-right-radius: 5px;
  }
  .TimeEdit {
    border-style: hidden;
    width: 2px;
    cursor: default;
  }
  img {
    height: 25px;
    width: 25px;
    border-radius: 50%;
    margin-right: 10px;
  }
  p {
    display: inline-block;
    white-space: nowrap;
  }
  .facebook{
    border-right: 1px solid #cecfd5;
    background-color: pink;
    position: relative;
    padding: 1px;
  }
  .facebook > div{
    text-align: center;
    color: #FFFFFF;
    height: 100%;
  }
  .unavailable {
    cursor: default;
    border-right: 1px solid #cecfd5;
    background-color: #0085FF;
    position: relative;
    padding: 1px;
  }
  .unavailable > div{
    cursor: default;
    text-align: center;
    color: #FFFFFF;
    height: 100%;
  }
  .leave {
    cursor: default;
    border-right: 1px solid #cecfd5;
    background-color: #A9A9A9	;
    position: relative;
    padding: 1px;
  }
  .leave > div{
    cursor: default;
    text-align: center;
    color: #FFFFFF;
    height: 100%;
  }
  .available:hover {
    position: relative;
    margin: 5px;
    border 1px solid grey;
    & div{
      position: absolute;
      background-image: url(${plus});
      width: 30px;
      height: 30px;
      top: 50%;
      left: 50%;
      transform: translateX(-50%) translateY(-50%);
    }
  }

  .loadingSpinner {
    position: absolute;
    top: 50vh;
    left: 50vw;
    transform: translateX(-50%) translateY(-50%);
  }
`;
const ErrorMessage = styled.p`
  color: red;
  font-weight: 700;
  margin-top: 10px;
  margin-bottom: 10px;
  text-align: center;
`;

const ModalWrapper = styled.div`
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
  .textInput {
    display: flex;
    justify-content: flex-end;
    margin-right: 20px;
    margin-bottom: 10px;
  }
  .textArea {
    width: 278px;
    height: 93px;
    resize: none;
    border-radius: 2px;
    border: none;
    text-align: initial;
  }
  .employeeName {
    padding-top: 10px;
    padding-left: 161px;
    font-weight: bold;
  }
`;

const TimeSelectorWrapper = styled.div``;

class BookingTable extends Component {
  static propTypes = {
    locale: PropTypes.shape({
      booked: PropTypes.string,
      leave: PropTypes.string,
      time: PropTypes.string,
      bookTime: PropTypes.string,
      closeModal: PropTypes.string,
      start: PropTypes.string,
      end: PropTypes.string,
      note: PropTypes.string,
      optional: PropTypes.string,
      employee: PropTypes.string,
      cancel: PropTypes.string,
    }).isRequired,
    dateMain: PropTypes.shape({
      _d: PropTypes.date,
    }).isRequired,
    fetchAuthenticationData: PropTypes.func.isRequired,
    fetchSessionData: PropTypes.func.isRequired,
    dataAutentication: PropTypes.arrayOf(
      PropTypes.shape({
        token: PropTypes.string,
      })
    ),
    fetchUsers: PropTypes.func.isRequired,
    dataUsers: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string.isRequired,
        avatar: PropTypes.string.isRequired,
        length: PropTypes.numb,
        id: PropTypes.numb,
      })
    ),
    fetchUserShift: PropTypes.func.isRequired,
    userInfo: PropTypes.shape({
      id: PropTypes.string,
    }).isRequired,
    postShift: PropTypes.func.isRequired,
    fetchAllShifts: PropTypes.func.isRequired,
    allShifts: PropTypes.arrayOf(PropTypes.shape({})),
    errorLoadingShifts: PropTypes.string,
    loadingShifts: PropTypes.bool.isRequired,
    cancelShift: PropTypes.func.isRequired,
  };
  static defaultProps = {
    dataAutentication: [],
    dataUsers: {},
    allShifts: [],
    errorLoadingShifts: '',
    range: [],
  };

  constructor(props) {
    super(props);
    this.state = {
      tableBody: [],
      showModal: false,
      showModal2: false,
      name: '',
      timeStamp: '',
      userId: '',
      userName: '',
      bookTimeText: '',
      range: [],
      startTime: '',
      endTime: 'Time',
      valid: true,
      showUser: false,
      selectedUserId: {},
      timeArray: [],
      allTimes: [],
      shiftId: '',
      startOfShift: '',
      endOfShift: '',
    };
    this.handleChange = this.handleChange.bind(this);
  }

  componentWillMount() {
    this.props.fetchAllShifts(this.dateToString(this.props.dateMain));
    this.rangeForDropDown(this.props.dateMain);
    this.constructAllTimesArray(this.props.dateMain);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.dateMain._d !== this.props.dateMain._d) {
      this.props.fetchAllShifts(this.dateToString(nextProps.dateMain));
      this.constructAllTimesArray(nextProps.dateMain);
    }
  }
  componentDidUpdate(prevProps, prevState) {
    if (this.state.showModal) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }

  constructAllTimesArray(dateMain) {
    // Construct new all times array that is stored in the state
    dateMain.millisecond(0);
    dateMain.second(0);
    dateMain.minute(0);
    dateMain.hour(8);
    const newAllTimes = [];
    for (let i = 8; i <= 44; i++) {
      const newTime = { time: dateMain.toISOString() };
      let display = dateMain.toISOString().slice(11, -8);
      dateMain.add(15, 'm');
      newTime.display = display;
      newAllTimes.push(newTime);
    }
    this.setState({ allTimes: newAllTimes });
  }

  dateToString(selectedDate) {
    let beginingOfDay = selectedDate;
    let endOfDay = beginingOfDay;
    let seperator = '/';
    beginingOfDay.millisecond(0);
    beginingOfDay.second(0);
    beginingOfDay.minute(0);
    beginingOfDay.hour(8);
    beginingOfDay = beginingOfDay.toISOString();
    endOfDay.hour(23);
    endOfDay = endOfDay.toISOString();
    beginingOfDay = beginingOfDay.concat(seperator, endOfDay);
    return beginingOfDay;
  }

  bookTime(time, user, id, bookTimeText, startTime, endTime) {
    this.props.postShift(
      time,
      user,
      id,
      this.props.userInfo,
      this.dateToString(this.props.dateMain),
      bookTimeText,
      startTime,
      endTime,
      this.props.userInfo.id
    );
    this.setState({ showModal: false });
  }

  modalInfo(timeStamp, userName, userId, shiftId) {
    this.setState({
      timeStamp: timeStamp,
      userName: userName,
      userId: userId,
      startTime: timeStamp,
      endTime: 'Time',
      shiftId: shiftId,
    });
  }

  shiftEndStart(shiftId) {
    if (this.props.allShifts.length > 0) {
      this.props.allShifts.map(shift => {
        if (shift.id === shiftId) {
          this.setState(
            {
              startOfShift: shift.dtstart.slice(11, -9),
              endOfShift: shift.dtend.slice(11, -9),
            },
            this.setState({
              showModal2: true,
            })
          );
          return 0;
        }
        return 0;
      });
    }
  }

  handleChange(event) {
    this.setState({ bookTimeText: event.target.value });
  }

  changeShiftsToMoment(shifts) {
    const data = [];
    var i;
    for (i = 0; i < shifts.length; i++) {
      let startDate = shifts[i].dtstart;
      let endDate = shifts[i].dtend;
      startDate = moment(startDate);
      endDate = moment(endDate);
      if (shifts[i].type !== 'leave') {
        while (endDate.toISOString() !== startDate.toISOString()) {
          var object = {
            start: startDate.toISOString(),
            id: shifts[i].user.id,
            leave: false,
            facebookBool: shifts[i].summary.includes(this.props.userInfo.id),
            shiftId: shifts[i].id,
          };
          data.push(object);
          startDate = startDate.add(15, 'm');
        }
      } else {
        startDate.millisecond(0);
        startDate.second(0);
        startDate.minute(0);
        startDate.hour(8);
        for (let j = 8; j <= 44; j++) {
          var object2 = {
            start: startDate.toISOString(),
            id: shifts[i].user.id,
            leave: true,
          };
          data.push(object2);
          startDate = startDate.add(15, 'm');
        }
      }
    }
    return data;
  }

  //TODO Fallið fetch all shifts fetchar bara hja þeim sem bjó til vaktirnar i planning mode need to fix!!!
  renderTableBody(shifts, users) {
    shifts = this.changeShiftsToMoment(shifts);
    const timeArray = this.state.allTimes.map(time => {
      const data = {};
      data.time = time.display;
      data.timeStamp = time.time;
      data.unavailable = users.map(user => {
        for (let i = 0; shifts.length > i; i++) {
          if (
            user.id === shifts[i].id &&
            time.time.slice(0, -8) === shifts[i].start.slice(0, -8) &&
            shifts[i].leave === false
          ) {
            return user.id;
          }
        }
        return 0;
      });
      data.leave = users.map(user => {
        for (let j = 0; shifts.length > j; j++) {
          if (
            user.id === shifts[j].id &&
            time.time.slice(0, -8) === shifts[j].start.slice(0, -8) &&
            shifts[j].leave === true
          ) {
            return user.id;
          }
        }
        return 0;
      });
      data.facebookBool = users.map(user => {
        for (let k = 0; shifts.length > k; k++) {
          if (
            user.id === shifts[k].id &&
            time.time.slice(0, -8) === shifts[k].start.slice(0, -8) &&
            shifts[k].facebookBool === true
          ) {
            return user.id;
          }
        }
        return 0;
      });
      data.shiftId = users.map(user => {
        for (let l = 0; shifts.length > l; l++) {
          if (
            user.id === shifts[l].id &&
            time.time.slice(0, -8) === shifts[l].start.slice(0, -8) &&
            shifts[l].facebookBool === true
          ) {
            return shifts[l].shiftId;
          }
        }
        return 0;
      });
      return data;
    });
    return (
      <tbody>
        {timeArray.map(time => {
          return (
            <tr key={time.time}>
              <td className="TimeEdit">{time.time}</td>
              {users.map(user => {
                if (time.facebookBool.includes(user.id)) {
                  let index = time.facebookBool.indexOf(user.id);
                  let shiftId = time.shiftId[index];
                  return (
                    <td
                      key={user.id}
                      className="facebook"
                      onClick={() => {
                        this.modalInfo(
                          time.timeStamp,
                          user.name,
                          user.id,
                          shiftId
                        );
                        this.shiftEndStart(shiftId);
                      }}
                    >
                      <div>{this.props.locale.cancel}</div>
                    </td>
                  );
                } else if (time.unavailable.includes(user.id)) {
                  return (
                    <td key={user.id} className="unavailable">
                      <div>{this.props.locale.booked}</div>
                    </td>
                  );
                } else if (time.leave.includes(user.id)) {
                  return (
                    <td key={user.id} className="leave">
                      <div>{this.props.locale.leave}</div>
                    </td>
                  );
                } else
                  return (
                    <td
                      key={user.id}
                      className="available"
                      onClick={() => {
                        this.modalInfo(time.timeStamp, user.name, user.id);
                        this.setState({ showModal: true });
                      }}
                    >
                      <div />
                    </td>
                  );
              })}
            </tr>
          );
        })}
      </tbody>
    );
  }

  rangeForDropDown(dateMain) {
    var time = [];
    dateMain.millisecond(0);
    dateMain.second(0);
    dateMain.minute(0);
    dateMain.hour(8);
    for (let i = 8; i <= 44; i++) {
      const newTime = { time: dateMain.toISOString() };
      let display = dateMain.toISOString().slice(11, -8);
      dateMain.add(15, 'm');
      newTime.display = display;
      time.push(newTime);
    }
    this.setState({ range: time }, () => {});
  }

  validateDate() {
    if (this.state.endTime === '' || this.state.endTime === 'Time') {
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

  // show modal with next available time for today
  // vantar timestamp userName og userId.
  // showModal og senda inn í modal info fallið
  nextAvailableDay() {
    let allTime = this.state.allTimes;
    let allShifts = this.props.allShifts;
    const shiftsMin = [];
    var i;
    for (i = 0; i < allShifts.length; i++) {
      let startDate = allShifts[i].dtstart;
      let endDate = allShifts[i].dtend;
      startDate = moment(startDate);
      endDate = moment(endDate);
      if (allShifts[i].type !== 'leave') {
        while (endDate.toISOString() !== startDate.toISOString()) {
          var object = {
            start: startDate.toISOString(),
            id: allShifts[i].user.id,
            leave: false,
            facebookBool: allShifts[i].summary.includes(this.props.userInfo.id),
            shiftId: allShifts[i].id,
          };
          shiftsMin.push(object);
          startDate = startDate.add(15, 'm');
        }
      } else {
        startDate.millisecond(0);
        startDate.second(0);
        startDate.minute(0);
        startDate.hour(8);
        for (let j = 8; j <= 44; j++) {
          var object2 = {
            start: startDate.toISOString(),
            id: allShifts[i].user.id,
            leave: true,
          };
          shiftsMin.push(object2);
          startDate = startDate.add(15, 'm');
        }
      }
    }
    let unavailable = 'unavailable';
    let leave = 'leave';
    let timeArray = allTime.map(time => {
      const data = [];
      data.push(time.time);
      this.props.dataUsers.map(user => {
        let userShifts = shiftsMin.filter(
          shift => shift.id === user.id && shift.start === time.time
        );
        for (let i = 0; i < userShifts.length; i++) {
          if (
            time.time === userShifts[i].start &&
            user.id === userShifts[i].id &&
            userShifts[i].leave === false
          ) {
            return data.push(unavailable);
          } else if (
            time.time === userShifts[i].start &&
            userShifts[i].leave === true
          ) {
            return data.push(leave);
          }
        }
        return data.push(0);
      });
      return data;
    });
    for (let j = 0; j < timeArray.length; j++) {
      if (timeArray[j].includes(0)) {
        let index = timeArray[j].indexOf(0);
        index = index - 1;
        this.modalInfo(
          timeArray[j][0],
          this.props.dataUsers[index].name,
          this.props.dataUsers[index].id
        );
        this.setState({ showModal: true });
        break;
      }
    }
  }
  render() {
    return (
      <div>
        <button onClick={() => this.nextAvailableDay()}>
          next available time
        </button>
        {/* <button onClick={() => this.nextAvailableDay()}>Next time</button> */}
        {this.props.errorLoadingShifts !== '' && (
          <ErrorMessage>{this.props.errorLoadingShifts}</ErrorMessage>
        )}
        <DayMenuDiv>
          {this.state.showUser === true && (
            <EmployeesMenu
              userId={this.state.selectedUserId}
              close={() => this.setState({ showUser: false })}
            />
          )}
          <DayMenu>
            <thead>
              <tr>
                <th className="TimeEdit">{this.props.locale.time}</th>
                {this.props.dataUsers.map(user => {
                  return (
                    <th
                      onClick={() =>
                        this.setState({
                          selectedUserId: user.id,
                          showUser: true,
                        })}
                      key={'tableHead' + user.id}
                    >
                      <img alt="avatar" src={user.avatar} />
                      <p>{user.name}</p>
                    </th>
                  );
                })}
              </tr>
            </thead>
            {this.props.loadingShifts ? (
              <ReactLoading
                type={'spin'}
                color={'#0085ff'}
                delay={0}
                className="loadingSpinner"
              />
            ) : (
              this.renderTableBody(this.props.allShifts, this.props.dataUsers)
            )}
          </DayMenu>
        </DayMenuDiv>

        <ModalWrapper>
          <Modal
            visable={this.state.showModal}
            modalHeader="Book Appointment"
            modalFooterSubmit={this.props.locale.bookTime}
            modalFooterSubmit2={this.props.locale.closeModal}
            valid={this.state.valid}
            onSubmit={() =>
              this.bookTime(
                this.state.timeStamp,
                this.state.userName,
                this.state.userId,
                this.state.bookTimeText,
                this.state.startTime,
                this.state.endTime
              )}
            onSubmit2={() => {
              this.setState({
                showModal: false,
              });
            }}
          >
            <div>
              <div className="employeeName">
                {this.props.locale.employee}: {this.state.userName}
              </div>
              <TimeSelectorWrapper>
                <TimeSelector
                  startText={this.props.locale.start}
                  endText={this.props.locale.end}
                  timeArray={this.state.allTimes}
                  userId={this.state.userId}
                  shifts={this.props.allShifts}
                  startDefult={this.state.startTime}
                  endTime={this.state.endTime}
                  startOnChange={date => {
                    this.setState({ startTime: date }, () => {
                      this.validateDate();
                    });
                  }}
                  endOnChange={date => {
                    this.setState({ endTime: date }, () => {
                      this.validateDate();
                    });
                  }}
                />
              </TimeSelectorWrapper>
              <div className="textInput">
                {this.props.locale.note}
                <img alt="Grey note icon" src={noteGray} />
                <textarea
                  className="textArea"
                  type="text"
                  placeholder={this.props.locale.optional}
                  value={this.state.bookTimeText}
                  onChange={this.handleChange}
                />
              </div>
            </div>
          </Modal>
        </ModalWrapper>

        <Modal
          visable={this.state.showModal2}
          modalHeader="Cancel Booking"
          modalFooterSubmit={this.props.locale.cancel}
          modalFooterSubmit2={this.props.locale.closeModal}
          valid={this.state.valid}
          onSubmit={() => {
            this.props.cancelShift(
              this.state.shiftId,
              this.dateToString(this.props.dateMain)
            );
            this.setState({ showModal2: false });
          }}
          onSubmit2={() => {
            this.setState({
              showModal2: false,
            });
          }}
        >
          <div>
            <div>
              {this.props.locale.employee} {this.state.userName}
            </div>
            <button> {this.state.startOfShift}</button>
            <button> {this.state.endOfShift} </button>
            <div />
          </div>
        </Modal>
      </div>
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
  locale: state.LocaleReducer,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      ...ApiActions,
    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(BookingTable);
