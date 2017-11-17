import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import ReactLoading from 'react-loading';

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
  .unavailable{
    background-color: #0085FF;
    cursor: default;
    text-align: center;
    	color: #FFFFFF;
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

class BookingTable extends Component {
  static propTypes = {
    dateMain: PropTypes.shape({
      _d: PropTypes.string.isRequired,
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
      })
    ),
    fetchUserShift: PropTypes.func.isRequired,
    userInfo: PropTypes.shape({}).isRequired,
    postShift: PropTypes.func.isRequired,
    fetchAllShifts: PropTypes.func.isRequired,
    allShifts: PropTypes.arrayOf(PropTypes.shape({})),
    errorShifts: PropTypes.string,
    loadingShifts: PropTypes.bool.isRequired,
  };
  static defaultProps = {
    dataAutentication: [],
    dataUsers: {},
    allShifts: [],
    errorShifts: '',
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
    this.props.fetchAllShifts(this.dateToString(this.props.dateMain));
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.dateMain._d !== this.props.dateMain._d) {
      this.props.fetchAllShifts(this.dateToString(nextProps.dateMain));
    }
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

    const timeArray = time.map(time => {
      const data = {};
      data.time = time.display;
      data.timeStamp = time.time;
      data.unavailable = users.map(user => {
        for (let i = 0; shifts.length > i; i++) {
          if (
            user.id === shifts[i].user.id &&
            time.time.slice(0, -5) === shifts[i].dtstart.slice(0, -6)
          ) {
            return user.id;
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
                if (time.unavailable.includes(user.id)) {
                  return (
                    <td key={user.id} className="unavailable">
                      Booked
                    </td>
                  );
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
        {this.props.errorShifts !== '' && (
          <ErrorMessage>{this.props.errorShifts}</ErrorMessage>
        )}
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
            {this.props.loadingShifts ? (
              <ReactLoading
                type={'spin'}
                color={'#0085ff'}
                delay={0}
                className="loadingSpinner"
              />
            ) : (
              this.renderTableBody(
                this.props.allShifts,
                this.props.dataUsers,
                this.props.dateMain
              )
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
  errorShifts: state.ApiReducer.errorShifts,
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
export default connect(mapStateToProps, mapDispatchToProps)(BookingTable);
