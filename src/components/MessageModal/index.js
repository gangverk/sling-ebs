import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as ApiActions from '../../components/Actions/actions';
import closeX from '../Modal/x.png';

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
  background-color: white;
  margin: auto;
  border: 2px solid #dadada;
  border-radius: 5px;
  width: 550px;
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
