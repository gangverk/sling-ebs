import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as ApiActions from '../../components/Actions/actions';

class Api extends Component {
  static propTypes = {
    fetchCar: PropTypes.func.isRequired,
    fetchAuthenticationData: PropTypes.func.isRequired,
    fetchSessionData: PropTypes.func.isRequired,
    dataCar: PropTypes.shape({
      color: PropTypes.string,
      type: PropTypes.string,
      registryNumber: PropTypes.string,
    }),
    dataSession: PropTypes.shape({
      browser: PropTypes.string,
      org: PropTypes.shape({
        name: PropTypes.string,
        id: PropTypes.number,
      }),
      user: PropTypes.shape({
        name: PropTypes.string,
        id: PropTypes.string,
      }),
    }),
    dataAutentication: PropTypes.shape({
      token: PropTypes.string,
    }),
    fetchUsers: PropTypes.func.isRequired,
    dataUsers: PropTypes.array.isRequired,
  };
  static defaultProps = {
    dataSession: [],
    dataAutentication: [],
    dataCar: null,
  };

  constructor(props) {
    super(props);
    this.state = {};
  }
  componentWillMount() {
    this.props.fetchCar();
    this.props.fetchSessionData();
    this.props.fetchAuthenticationData();
    this.props.fetchUsers();
  }
  ListItem(props) {
    return <li>{props.value}</li>;
  }

  userList(userData) {
    return userData.map(user => {
      return (
        <li>
          {user.name} - {user.lastname}
        </li>
      );
    });
  }
  render() {
    return (
      <div>
        {this.props.dataUsers.length && (
          <ul>{this.userList(this.props.dataUsers)}</ul>
        )}

        {this.props.dataCar !== null && (
          <li>Litur: {this.props.dataCar.color}</li>
        )}
        {this.props.dataCar !== null && (
          <li>Týpa: {this.props.dataCar.type}</li>
        )}
        {this.props.dataCar !== null && (
          <li>Nr: {this.props.dataCar.registryNumber}</li>
        )}
        {this.props.dataSession !== null && (
          <li>Browser {this.props.dataSession.browser}</li>
        )}
        {this.props.dataSession !== null && (
          <li>Company Name: {this.props.dataSession.org.name}</li>
        )}
        {this.props.dataSession !== null && (
          <li>CompanyID: {this.props.dataSession.org.id}</li>
        )}
        {this.props.dataSession !== null && (
          <li>User name: {this.props.dataSession.user.name}</li>
        )}
        {this.props.dataSession !== null && (
          <li>User ID: {this.props.dataSession.user.id}</li>
        )}
        {this.props.dataAutentication !== null && (
          <li>Token: {this.props.dataAutentication.token}</li>
        )}
      </div>
    );
  }
}
const mapStateToProps = state => ({
  count: state.HomeReducer.count,
  dataAutentication: state.ApiReducer.dataAutentication,
  isIncrementing: state.HomeReducer.isIncrementing,
  isDecrementing: state.HomeReducer.isDecrementing,
  dataCar: state.ApiReducer.dataCar,
  dataSession: state.ApiReducer.dataSession,
  dataUsers: state.ApiReducer.dataUsers,
});
const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      ...ApiActions,
    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(Api);
