import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { push } from 'react-router-redux';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import styled, { css } from 'styled-components';
import * as actions from './actions';
import Button from '../../components/Button';
const Text = styled.p`
  color: ${props => props.color};
  ${props => {
    if (props.colorHover) {
      return css`
        &:hover {
          color: ${props.colorHover};
        }
      `;
    }
  }};
`;
class Home extends Component {
  static propTypes = {
    count: PropTypes.number.isRequired,
    increment: PropTypes.func.isRequired,
    isIncrementing: PropTypes.bool.isRequired,
    incrementAsync: PropTypes.func.isRequired,
    decrement: PropTypes.func.isRequired,
    isDecrementing: PropTypes.bool.isRequired,
    decrementAsync: PropTypes.func.isRequired,
    changePage: PropTypes.func.isRequired,
  };
  static defaultProps = {
    dataCar: null,
  };
  constructor(props) {
    super(props);
    this.state = {
      stateCounter: 0,
    };
  }
  render() {
    return (
      <div>
        <h1>Home</h1>
        <Text color="blue" colorHover="green">
          Blue Text
        </Text>
        <Text color="red">Count: {this.props.count}</Text>
        <Button onClick={() => this.setStateCounterToPropsCounter()}>
          State counter is {this.state.stateCounter}
        </Button>
        <p>
          <button
            onClick={this.props.increment}
            disabled={this.props.isIncrementing}
          >
            Increment
          </button>
          <button
            onClick={this.props.incrementAsync}
            disabled={this.props.isIncrementing}
          >
            Increment Async
          </button>
        </p>
        <p>
          <button
            onClick={this.props.decrement}
            disabled={this.props.isDecrementing}
          >
            Decrementing
          </button>
          <button
            onClick={this.props.decrementAsync}
            disabled={this.props.isDecrementing}
          >
            Decrement Async
          </button>
        </p>
        <p>
          <button onClick={() => this.props.changePage()}>
            Go to about page via redux
          </button>
        </p>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  count: state.HomeReducer.count,
});
const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      ...actions,
      changePage: () => push('/about'),
    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(Home);
