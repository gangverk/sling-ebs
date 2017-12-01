import React, { Component } from 'react';
import styled from 'styled-components';
import { css } from 'styled-components';
import PropTypes from 'prop-types';

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
const ModalContainer = styled.div`
  background-color: #fefefe;
  border: 1px solid #888;
  width: 32%;
  height: 44%;
  min-width: 200px;
  min-height: 200px;
  border-radius: 8px;
  background-color: #f4f5f9;
  box-shadow: 0 8px 20px 0 rgba(0, 0, 0, 0.5);
  top: 50%;
  left: 50%;
  position: absolute;
  transform: translateX(-50%) translateY(-50%);
  img {
    height: 30px;
  }
`;

const ModalHead = styled.div`
  margin-top: 0;
  height: 20px;
  background-color: #ffffff;
  border-radius: 8px 8px 0 0;
  width: 100%;
  padding: 22px 0;
  font-family: Trebuchet MS;
  font-size: 20px;
  color: #0085ff;
`;
const ModalFooter = styled.div``;

export default class Modal extends Component {
  componentDidUpdate(prevProps, prevState) {
    if (this.props.visable) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }

  render() {
    return (
      <ModalWrapper visable={this.props.visable}>
        <ModalContainer>
          {this.props.modalHeader.length > 0 && (
            <ModalHead>{this.props.modalHeader}</ModalHead>
          )}
          {this.props.children}
          <ModalFooter>
            <button onClick={() => this.props.onSubmit()}>
              {this.props.modalFooterSubmit}
            </button>
            <button onClick={() => this.props.onSubmit2()}>
              {this.props.modalFooterSubmit2}
            </button>
          </ModalFooter>
        </ModalContainer>
      </ModalWrapper>
    );
  }
}

Modal.propTypes = {
  visable: PropTypes.bool.isRequired,
  modalHeader: PropTypes.string,
  onSubmit: PropTypes.func.isRequired,
  onSubmit2: PropTypes.func.isRequired,
  children: PropTypes.shape({}).isRequired,
  modalFooterSubmit: PropTypes.string,
  modalFooterSubmit2: PropTypes.string,
};
Modal.defaultProps = {
  modalHeader: '',
  modalFooterSubmit: '',
  modalFooterSubmit2: '',
};
