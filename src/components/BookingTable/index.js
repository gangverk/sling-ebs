import React, { Component } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import moment from 'moment';

import * as ApiActions from '../../components/Actions/actions';
import Modal from '../../components/Modal';
import timeBlue from './timeblue.svg';
import timeRed from './timered.svg';
import noteGray from './notesgray.svg';

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
  .unavailable{
    background-color: #0085FF;
    cursor: default;
  }
`;

class BookingTable extends Component {
  static propTypes = {
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
      })
    ),
    fetchUserShift: PropTypes.func.isRequired,
    userInfo: PropTypes.shape({}).isRequired,
    postShift: PropTypes.func.isRequired,
    fetchAllShifts: PropTypes.func.isRequired,
    allShifts: PropTypes.arrayOf(PropTypes.shape({})),
  };
  static defaultProps = {
    dataAutentication: [],
    dataUsers: {},
    allShifts: [],
  };

  constructor(props) {
    super(props);
    this.state = {
      tableBody: [],
      showModal: false,
      name: '',
      timeStamp: '',
      userId: '',
      userName: '',
    };
  }

  componentWillMount() {
    this.props.fetchAllShifts(this.dateToString());
    this.props.fetchUsers();
  }
  componentWillReceiveProps(nextProps) {}
  shouldComponentUpdate(nextProps, nextState) {
    return true;
  }
  //setja skilyrði fyrir því að updatea hérna töfluna ?
  componentWillUpdate(nextProps, nextState) {
    //this.props.fetchAllShifts(this.dateToString());
  }

  dateToString() {
    let returnDate = this.props.dateMain;
    let returnDate2 = this.props.dateMain;
    let seperator = '/';
    returnDate.millisecond(0);
    returnDate.second(0);
    returnDate.minute(0);
    returnDate.hour(8);
    returnDate = returnDate.toISOString();
    returnDate2.hour(23);
    returnDate2 = returnDate2.toISOString();
    returnDate = returnDate.concat(seperator, returnDate2);
    return returnDate;
  }

  bookTime(time, user, id) {
    this.props.postShift(time, user, id, this.props.userInfo);
    this.setState({ showModal: false });
  }

  modalInfo(timeStamp, userName, userId) {
    this.setState({
      timeStamp: timeStamp,
      userName: userName,
      userId: userId,
      showModal: true,
    });
  }

  //TODO Fallið fetch all shifts fetchar bara hja þeim sem bjó til vaktirnar i planning mode need to fix!!!
  renderTableBody(shifts, users, dateMain) {
    dateMain.millisecond(0);
    dateMain.second(0);
    dateMain.minute(0);
    dateMain.hour(8);

    const time = [];
    for (let i = 8; i <= 17; i++) {
      const newTime = { time: dateMain.toISOString() };
      let display = dateMain.hour();
      dateMain.add(1, 'hour');
      newTime.display = display;
      time.push(newTime);
    }
    const timeArray = [];
    time.map(time => {
      const data = {};
      data.time = time.display;
      data.timeStamp = time.time;
      data.unavailable = users.map(user => {
        var i = 0;
        for (i = 0; shifts.length > i; i++) {
          if (
            user.id === shifts[i].user.id &&
            time.time.slice(0, -5) === shifts[i].dtstart.slice(0, -6)
          ) {
            return user.id;
          }
        }
        return 0;
      });
      timeArray.push(data);
    });
    return (
      <tbody>
        {timeArray.map(time => {
          return (
            <tr key={time.time}>
              <td className="TimeEdit">{time.time}</td>
              {users.map(user => {
                if (time.unavailable.includes(user.id)) {
                  return <td key={user.id} className="unavailable" />;
                } else
                  return (
                    <td
                      key={user.id}
                      onClick={() => {
                        this.modalInfo(time.timeStamp, user.name, user.id);
                        this.setState({ showModal: true });
                      }}
                    />
                  );
              })}
            </tr>
          );
        })}
      </tbody>
    );
  }

  render() {
    return (
      <div>
        <DayMenuDiv>
          <DayMenu>
            <thead>
              <tr>
                <th className="TimeEdit">Time</th>
                {this.props.dataUsers.map(user => {
                  return (
                    <th key={'tableHead' + user.id}>
                      <img alt="avatar" src={user.avatar} />
                      <p>{user.name}</p>
                    </th>
                  );
                })}
              </tr>
            </thead>
            {this.renderTableBody(
              this.props.allShifts,
              this.props.dataUsers,
              this.props.dateMain
            )}
          </DayMenu>
        </DayMenuDiv>
        <Modal
          visable={this.state.showModal}
          modalHeader="Booking Modal"
          modalFooterSubmit="Book Time"
          modalFooterSubmit2="Close modal"
          onSubmit={() =>
            this.bookTime(
              this.state.timeStamp,
              this.state.userName,
              this.state.userId
            )}
          onSubmit2={() => this.setState({ showModal: false })}
        >
          <div>
            <div>
              Start <img alt="Blue clock icon" src={timeBlue} />
              {this.state.timeStamp}
            </div>
            <div>
              End<img alt="Red clock icon" src={timeRed} />
            </div>
            <div>
              Note<img alt="Grey note icon" src={noteGray} />
              <input type="text" placeholder="optional" />
            </div>
          </div>
        </Modal>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  dataUsers: state.ApiReducer.dataUsers,
  dataShift: state.ApiReducer.dataShift,
  userInfo: state.UserReducer,
  allShifts: state.ApiReducer.allShifts,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      ...ApiActions,
    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(BookingTable);
