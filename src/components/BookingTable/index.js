import React, { Component } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import moment from 'moment';

import * as ApiActions from '../../components/Actions/actions';

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
  .unavailable{
    background-color: blue;
  }
`;

class BookingTable extends Component {
  static propTypes = {
    fetchAuthenticationData: PropTypes.func.isRequired,
    fetchSessionData: PropTypes.func.isRequired,
    dataAutentication: PropTypes.shape({
      token: PropTypes.string,
    }),
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
      showModal2: false,
      name: '',
    };
  }

  componentWillMount() {
    this.props.fetchAllShifts();
    this.props.fetchUsers();
  }

  bookTime(time, user, id) {
    this.props.postShift(time, user, id, this.props.userInfo);
  }

  /*OLD STUFF */ userList(userData) {
    const tableHead = <div />;
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
        <DayMenu>
          {tableHead}
          {tableBody}
        </DayMenu>
      </DayMenuDiv>
    );
  }

  //TODO Fallið fetch all shifts fetchar bara hja þeim sem bjó til vaktirnar i planning mode need to fix!!!
  renderTableBody(shifts, users) {
    let tomorrow = moment().add(1, 'day');
    tomorrow.millisecond(0);
    tomorrow.second(0);
    tomorrow.minute(0);
    tomorrow.hour(8);

    const time = [];
    for (let i = 8; i <= 17; i++) {
      const newTime = { time: tomorrow.toISOString() };
      newTime.time = newTime.time.slice(0, -1);
      let display = tomorrow.hour();
      tomorrow.add(1, 'hour');
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
            time.time.slice(0, -4) === shifts[i].dtstart.slice(0, -6)
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
              <td>{time.time}</td>
              {users.map(user => {
                if (time.unavailable.includes(user.id)) {
                  return <td key={user.id} className="unavailable" />;
                } else
                  return (
                    <td
                      key={user.id}
                      onClick={() => {
                        alert('FUCK OFF ' + user.name + 'shifts ?');
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
    // <div>
    //   {/* {this.props.dataUsers.length > 0 && this.userList(this.props.dataUsers)} */}
    //
    // </div>
    return (
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
          {this.renderTableBody(this.props.allShifts, this.props.dataUsers)}
        </DayMenu>
      </DayMenuDiv>
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
