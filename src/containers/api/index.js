import React, { Component } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import moment from 'moment';

import Modal from '../../components/Modal';
import * as ApiActions from '../../components/Actions/actions';
import timeBlue from './timeblue.svg';
import timeRed from './timered.svg';
import noteGray from './notesgray.svg';

const HeaderDiv = styled.div`
  button {
    height: 32px;
    width: 132px;
    border: 2px solid #dadada;
    border-radius: 2px;
    margin-right: 10px;
    margin-left: 10px;
    background: white;
    color: #0085ff;
    font: 14px/1.4 'Helvetica Neue';
  }
  height: 50px;
  width: 95%;
  border-radius: 4px;
  background-color: #ffffff;
  box-shadow: 0 4px 10px 0 rgba(50, 70, 90, 0.1);
  margin: auto;
  margin-top: 12px;
  align-items: center;
  display: flex;
  justify-content: space-between;
`;

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
`;

class Api extends Component {
  static propTypes = {
    fetchAuthenticationData: PropTypes.func.isRequired,
    fetchSessionData: PropTypes.func.isRequired,
    dataAutentication: PropTypes.shape({
      token: PropTypes.string,
    }),
    fetchUsers: PropTypes.func.isRequired,
    dataUsers: PropTypes.shape({
      name: PropTypes.string.isRequired,
      avatar: PropTypes.string.isRequired,
      length: PropTypes.numb,
    }),
    fetchUserShift: PropTypes.func.isRequired,
    userInfo: PropTypes.shape({}).isRequired,
    postShift: PropTypes.func.isRequired,
  };
  static defaultProps = {
    dataAutentication: [],
    dataUsers: {},
  };

  constructor(props) {
    super(props);
    //TODO: fix, initalize the day tomorrow
    let tomorrow = moment().add(1, 'day');
    tomorrow.millisecond(0);
    tomorrow.second(0);
    tomorrow.minute(0);
    tomorrow.hour(8);
    const time = [];
    for (let i = 8; i <= 17; i++) {
      const newTime = { time: tomorrow.toISOString() };
      let display = tomorrow.hour();
      tomorrow.add(1, 'hour');
      newTime.display = display;
      time.push(newTime);
    }
    this.state = {
      time,
      showModal: false,
      showModal2: false,
      name: '',
    };
  }

  componentWillMount() {
    this.props.fetchSessionData();
    this.props.fetchAuthenticationData();
    this.props.fetchUsers();
    this.props.fetchUserShift();
  }

  bookTime(time, user, id) {
    this.props.postShift(time, user, id, this.props.userInfo);
  }

  userList(userData) {
    const tableHead = (
      <thead>
        <tr>
          <th className="TimeEdit">Time</th>{' '}
          {userData.map(user => {
            return (
              <th key={'tableHead' + user.name}>
                <img alt="avatar" src={user.avatar} />
                <p>{user.name}</p>
              </th>
            );
          })}
        </tr>
      </thead>
    );
    const tableBody = (
      <tbody>
        {this.state.time.map((time, index) => {
          return (
            <tr key={'tbody' + time.display + index}>
              <td className="TimeEdit">{time.display}</td>
              {userData.map(user => {
                return (
                  <td
                    key={user.name + time.display}
                    onClick={() => {
                      this.bookTime(time.time, user.name, user.id);
                      alert(
                        'You booked a time with ' +
                          user.name +
                          ' at ' +
                          time.time
                      );
                    }}
                  />
                );
              })}
            </tr>
          );
        })}
      </tbody>
    );
    return (
      <DayMenuDiv>
        <HeaderDiv>
          <button onClick={() => this.setState({ showModal: true })}>
            Koma Date hér
          </button>
          <button>Next Day</button>
        </HeaderDiv>
        <DayMenu>
          {tableHead}
          {tableBody}
        </DayMenu>
      </DayMenuDiv>
    );
  }

  render() {
    return (
      <div>
        {this.props.dataUsers.length > 0 && this.userList(this.props.dataUsers)}
        <Modal
          visable={this.state.showModal}
          modalHeader="Date Picking Modal"
          modalFooterSubmit="Pick Date"
          modalFooterCancel="Cancel Date Pick"
          onSubmit={() => this.setState({ showModal: false })}
        >
          <div>
            <p>Calender comes here</p>
          </div>
        </Modal>
        <Modal
          visable={this.state.showModal2}
          modalHeader="Booking Modal"
          modalFooterSubmit="Book Time"
          modalFooterCancel="Cancel Booking"
          onSubmit={() => this.setState({ showModal2: false })}
        >
          <div>
            <div>
              Start <img alt="Blue clock icon" src={timeBlue} />
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
        <button onClick={() => this.setState({ showModal2: true })}>
          show bookin modal
        </button>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  dataAutentication: state.ApiReducer.dataAutentication,
  dataUsers: state.ApiReducer.dataUsers,
  dataShift: state.ApiReducer.dataShift,
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
