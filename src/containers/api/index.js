import React, { Component } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import moment from 'moment';

import * as ApiActions from '../../components/Actions/actions';

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

const ModalBackground = styled.div`
  background-color: purple;
  position: fixed; /* Stay in place */
  z-index: 1; /* Sit on top */
  padding-top: 100px; /* Location of the box */
  left: 0;
  top: 0;
  width: 100%; /* Full width */
  height: 100%; /* Full height */
  overflow: auto; /* Enable scroll if needed */
  background-color: rgb(0, 0, 0); /* Fallback color */
  background-color: rgba(0, 0, 0, 0.4); /* Black w/ opacity */
`;

const Modal = styled.div`
  background-color: #fefefe;
  margin: auto;
  border: 1px solid #888;
  width: 50%;
  border-radius: 8px;
  background-color: #f4f5f9;
  box-shadow: 0 8px 20px 0 rgba(0, 0, 0, 0.5);
`;
const ModalHeader = styled.div`
  margin-top: 0;
  height: 30px;
  background-color: #ffffff;
  border-radius: 8px 8px 0 0;
  width: 100%;
  padding: 10px 0;
  h3 {
    margin: 0;
    margin-left: 20px;
  }
`;

const ModalBody = styled.div`padding: 10px;`;
const ModalFooter = styled.div`
  padding: 2px 16px;
  border-radius: 0 0 8px 8px;
  padding: 10px;
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
    modal: false,
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
      modal: false,
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
          <button onClick={() => this.setState({ modal: true })}>
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
        {this.state.modal === true && (
          <ModalBackground>
            <Modal>
              <ModalHeader>
                <h3>Modal Header</h3>
              </ModalHeader>
              <ModalBody>
                <p>Pick date biatch</p>
              </ModalBody>
              <ModalFooter>
                <button onClick={() => this.setState({ modal: false })}>
                  Close Modal
                </button>
              </ModalFooter>
            </Modal>
          </ModalBackground>
        )}
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
