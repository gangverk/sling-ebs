import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import styled from 'styled-components';

import * as ApiActions from '../../components/Actions/actions';

const EmployeesWrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: space-around;
  max-width: 50%;
  min-height: 110px;
  margin: 20px auto;
  border-radius: 4px;
  background-color: white;
  box-shadow: 0 4px 10px 0 rgba(50, 70, 90, 0.1);
  &:hover {
    background-color: #f7f7f7;
  }
  .closeButton {
    position: absolute;
    top: 5px;
    right: 5px;
    border: none;
    background: none;
    transition: all 500ms;
    &:hover {
      transform: rotate(90deg) translateZ(0);
      transition: all 500ms;
    }
  }
  a {
    display: block;
    color: black;
    text-decoration: none;
    &:hover {
      text-decoration: underline;
    }
  }

  img {
    height: 100px;
    width: 100px;
    border-radius: 50%;
    margin-top: auto;
    margin-bottom: auto;
  }
`;

class EmployeesMenu extends Component {
  static propTypes = {
    userAlldata: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string,
        avatar: PropTypes.string,
        lastname: PropTypes.string,
        phone: PropTypes.string,
      })
    ).isRequired,
    close: PropTypes.func.isRequired,
    userId: PropTypes.number.isRequired,
  };
  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {
      userAlldata: [],
    };
  }

  render() {
    const userInfo = this.props.userAlldata.find(
      user => user.id === this.props.userId
    );
    return userInfo ? (
      <EmployeesWrapper>
        <img src={userInfo.avatar} alt="UserPic" />
        <div>
          <p>
            {userInfo.name} {userInfo.lastname}
          </p>
          <a href={`tel:${userInfo.phone}`}>{userInfo.phone}</a>
          <a href={`mailto:${userInfo.email}`}>{userInfo.email}</a>
          <button className="closeButton" onClick={() => this.props.close()}>
            X
          </button>
        </div>
      </EmployeesWrapper>
    ) : null;
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
