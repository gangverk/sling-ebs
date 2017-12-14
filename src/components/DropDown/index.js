import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as ApiActions from '../../components/Actions/actions';

const DropDownWrapper = styled.div`
  position: relative;

  .dropbtn {
    width: 280px;
    height: 36px;
    color: white;
    font-size: 16px;
    border: none;
    border-radius: 2px 2px 2px 2px;
    cursor: pointer;
    outline: none !important;
    color: #5f7183;
    text-align: initial;
    background-color: white;
  }
  ${props => {
    if (props.menuHidden) {
      return css`
        .dropdown-content {
          display: none;
        }
      `;
    } else {
      return css`
        .dropdown-content {
          position: absolute;
          background-color: #f9f9f9;
          box-shadow: 2px 2px 5px 2px rgba(0, 0, 0, 0.1);
          border-radius: 2px 2px 2px 2px;
          z-index: 1;
          max-height: 150px;
          overflow-y: scroll;
        }
      `;
    }
  }};
  .bookingButton {
    width: -webkit-fill-available;
    display: inline-flex;
    justify-content: flex-start;
    height: 30px;
    color: white;
    font-size: 16px;
    cursor: pointer;
    outline: none !important;
    background-color: white;
    color: black;
    border-radius: 2px 2px 2px 2px;
    border: 0.5px solid #e7e7e7; /* Green */
    &:hover {
      color: grey;
    }
  }
`;

class DropDown extends Component {
  static propTypes = {
    onChange: PropTypes.func.isRequired,
    range: PropTypes.arrayOf(
      PropTypes.shape({
        map: PropTypes.func,
      })
    ).isRequired,
    buttonText: PropTypes.string.isRequired,
    dropDownClose: PropTypes.bool.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      menuHidden: true,
    };
  }

  componentWillReceiveProps(nextProps) {
    if (
      nextProps.dropDownClose === true &&
      this.props.dropDownClose === false
    ) {
      this.setState({ menuHidden: true });
    }
  }

  render() {
    return (
      <DropDownWrapper className="dropdown" menuHidden={this.state.menuHidden}>
        <button
          className="dropbtn"
          onClick={() =>
            this.setState({
              menuHidden: !this.state.menuHidden,
            })}
        >
          {this.props.buttonText}
        </button>
        <div className="dropdown-content">
          {this.props.range.map(item => {
            if (item.available === false) {
              return null;
            } else {
              return (
                <button
                  className="bookingButton"
                  key={item.time}
                  onClick={() => {
                    this.setState({
                      menuHidden: !this.state.menuHidden,
                      buttonText: item.display,
                    });
                    this.props.onChange(item.time);
                  }}
                >
                  {item.display}
                </button>
              );
            }
          })}
        </div>
      </DropDownWrapper>
    );
  }
}

const mapStateToProps = state => ({
  dataUsers: state.ApiReducer.dataUsers,
  dataShift: state.ApiReducer.dataShift,
  errorLoadingShifts: state.ApiReducer.errorLoadingShifts,
  userInfo: state.UserReducer,
  allShifts: state.ApiReducer.allShifts,
  loadingShifts: state.ApiReducer.loadingShifts,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      ...ApiActions,
    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(DropDown);
