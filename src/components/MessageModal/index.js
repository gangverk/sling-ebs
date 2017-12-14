import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as ApiActions from '../../components/Actions/actions';
import closeX from '../Modal/x.png';
import checkV from './task-green.svg';

const ModalWrapper = styled.div`
  ${props => {
    if (!props.visable) {
      return css`
        display: none;
      `;
    } else {
      return css`
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
    }
  }};
`;

const MessageWrapper = styled.div`
  border: 1px solid #888;
  width: 461px;
  height: 360px;
  min-width: 461px;
  min-height: 360px;
  border-radius: 8px;
  background-color: #f4f5f9;
  box-shadow: 0 8 px 20px 0 rgba(0, 0, 0, 0.5);
  top: 50%;
  left:50%;
  position: absolute;
  transform: translateX(-50%) translateY(-50%);
  font-family: Trebuchet MS;
  font-size: 14px;
  color: #738190;
  img {
    height 30px;
    padding: 0px 10px;
  }
  p{
    padding: 7px 0px 0px 128px;
    margin: 0px 0px;
    ${'' /* background-color: yellow; */}
  }
  button {
    border: none;
    background-color: Transparent;
    ${'' /* background-color: red; */}
    margin-left:89%;
    margin-top: 2%;
    border-radius:8px;
    cursor: pointer;
    padding: 0;
    outline: none;
    }
  .checkV{
    ${'' /* background-color: purple; */}
    margin: 15% 0% 7% 45%;
    padding: 0% 0%;
    width: 16%;
    height: 16%;

    }
  }
`;

class MessageModal extends Component {
  static propTypes = {
    messageModal: PropTypes.bool.isRequired,
    modalText: PropTypes.string.isRequired,
  };

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {
      visable: false,
    };
  }
  componentWillReceiveProps(nextProps) {
    if (this.props.messageModal === false && nextProps.messageModal === true) {
      this.showModal();
    }
  }
  componentWillUpdate(nextProps, nextState) {}

  showModal() {
    this.setState({
      visable: true,
    });
  }

  render() {
    return (
      <ModalWrapper visable={this.state.visable}>
        <MessageWrapper>
          <button onClick={() => this.setState({ visable: false })}>
            <img alt="X button" src={closeX} />
          </button>
          <img className="checkV" alt="X button" src={checkV} />
          <p>{this.props.modalText}</p>
        </MessageWrapper>
      </ModalWrapper>
    );
  }
}

const mapStateToProps = state => ({
  messageModal: state.ApiReducer.messageModal,
  modalText: state.ApiReducer.modalText,
  channels: state.ApiReducer.channels,
  channelsArticles: state.ApiReducer.channelsArticles,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      ...ApiActions,
    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(MessageModal);
