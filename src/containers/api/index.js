import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import moment from 'moment';

import * as ApiActions from '../../components/Actions/actions';

import Modal from '../../components/Modal';
import BookingTable from '../../components/BookingTable';
import BookingTableHeader from '../../components/BookingTableHeader';

class Api extends Component {
  static propTypes = {
    fetchUsers: PropTypes.func.isRequired,
    dataUsers: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string.isRequired,
        avatar: PropTypes.string.isRequired,
        length: PropTypes.numb,
      })
    ),
    userInfo: PropTypes.shape({}).isRequired,
    postShift: PropTypes.func.isRequired,
  };
  static defaultProps = {
    dataUsers: {},
  };

  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      showModal2: false,
      name: '',
      date: moment(),
    };
  }

  componentWillMount() {
    this.props.fetchUsers();
  }

  //TODO action when we push the next day on the bookingtableheader.
  nextDay() {
    // let nextDay = this.state.date.add(1, 'days');
    // nextDay = nextDay.toISOString();
    // nextDay = nextDay.slice(0, -14);
    // alert(nextDay);
    console.log(this.state.date);
    this.setState({ date: this.state.date.add(1, 'days') });
  }

  render() {
    return (
      <div>
        <BookingTableHeader
          onClickPickDate={() => this.setState({ showModal: true })}
          onClickNextDay={() => this.nextDay()}
        />
        <BookingTable dateMain={this.state.date} />
        <Modal
          visable={this.state.showModal}
          modalHeader="Date Picking Modal"
          modalFooterSubmit="Pick Date"
          modalFooterSubmit2="Close modal"
          onSubmit={() => this.setState({ showModal: false })}
          onSubmit2={() => this.setState({ showModal: false })}
        >
          <div>
            <p>Calender comes here</p>
          </div>
        </Modal>
      </div>
    );
  }
}
const mapStateToProps = state => ({
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
