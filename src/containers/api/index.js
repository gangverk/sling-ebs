import React, { Component } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as ApiActions from '../../components/Actions/actions';

const DayMenu = styled.table`
  margin: auto;
  margin-top: 10px;
  table,
  td,
  th {
    border: 1px solid #cecfd5;
    border-collapse: collapse;
    padding: 10px 15px;
  }
  th,
  td {
    padding: 10px 15px;
    vertical-align: middle;
  }
  thead {
    background: #395870;
    background: linear-gradient(#87b5ff, #5995f7);
    color: #fff;
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

  border-collapse: separate;
  border-spacing: 0;
  color: #4a4a4d;
  font: 14px/1.4 'Helvetica Neue', Helvetica, Arial, sans-serif;
`;

class Api extends Component {
  static propTypes = {
    fetchAuthenticationData: PropTypes.func.isRequired,
    fetchSessionData: PropTypes.func.isRequired,
    dataAutentication: PropTypes.shape({
      token: PropTypes.string,
    }),
    fetchUsers: PropTypes.func.isRequired,
    dataUsers: PropTypes.array.isRequired,
    fetchUserShift: PropTypes.func.isRequired,
  };
  static defaultProps = {
    dataAutentication: [],
  };

  componentWillMount() {
    this.props.fetchSessionData();
    this.props.fetchAuthenticationData();
    this.props.fetchUsers();
    this.props.fetchUserShift();
  }

  userList(userData) {
    let times = [];
    for (let i = 8; i <= 17; i++) {
      times.push(i);
    }
    const tableHead = (
      <thead>
        <tr>
          <th>Time</th>
          {userData.map(user => {
            return <th key={'tableHead' + user.name}>{user.name}</th>;
          })}
        </tr>
      </thead>
    );
    const tableBody = (
      <tbody>
        {times.map((time, index) => {
          return (
            <tr key={'tbody' + time + index}>
              <td>{time}</td>
              {userData.map(user => {
                return (
                  <td
                    key={user.name + time}
                    onClick={() => {
                      // eslint-disable-next-line
                      console.log(
                        'Bóka tíma hjá ' + user.name + ' ,kl: ' + time
                      );
                    }}
                  >
                    Bóka Tíma
                  </td>
                );
              })}
            </tr>
          );
        })}
      </tbody>
    );
    return (
      <DayMenu>
        {tableHead}
        {tableBody}
      </DayMenu>
    );
  }

  render() {
    return (
      <div>
        {this.props.dataUsers.length > 0 && this.userList(this.props.dataUsers)}
      </div>
    );
  }
}
const mapStateToProps = state => ({
  dataAutentication: state.ApiReducer.dataAutentication,
  dataUsers: state.ApiReducer.dataUsers,
  dataShift: state.ApiReducer.dataShift,
});
const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      ...ApiActions,
    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(Api);
