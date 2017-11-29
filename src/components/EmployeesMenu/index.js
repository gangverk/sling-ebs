import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import styled from 'styled-components';

import * as ApiActions from '../../components/Actions/actions';

class EmployeesMenu extends Component {
  static propTypes = {
    userAlldata: PropTypes.shape({}).isRequired,
  };
  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {
      userAlldata: [],
    };
  }

  componentWillMount() {}
  componentDidUpdate(prevProps, prevState) {}
  renderAllEmployees(data) {
    return (
      <ul>
        {data.map(user => {
          return <li>{user.name}</li>;
        })}
      </ul>
    );
  }
  render() {
    return (
      <div>
        <button onClick={this.renderAllEmployees()}>hello</button>
        {this.props.userAlldata.lengt > 0 &&
          this.renderAllEmployees(this.props.userAlldata)}
      </div>
    );
  }
}
const mapStateToProps = state => ({
  userInfo: state.UserReducer,
  userAlldata: state.ApiReducer.dataAllUsers,
  fetchingAllInfo: state.ApiReducer.fetchingAllInfo,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      ...ApiActions,
    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(EmployeesMenu);
