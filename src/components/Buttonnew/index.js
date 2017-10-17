import styled, { css } from 'styled-components';

export default styled.button`
  ${props => {
    if (props.bigButton) {
      return css`
        display: inline-block;
        border-radius: 25px;
        background-color: #0085ff;
        border: none;
        color: #ffffff;
        text-align: center;
        font-size: 15px;
        padding: 20px;
        width: 140px;
        transition: all 0.5s;
        cursor: pointer;
        margin: 5px;
        outline: none !important;
        &:hover {
          background-color: #eee;
          color: #0085ff;
          border-radius: 5px;
          border-color: #0085ff;
        }
      `;
    } else if (props.booked) {
      // some other props styles
      return css`
        display: inline-block;
        border-radius: 45px;
        background-color: #0085ff;
        border: none;
        color: #ffffff;
        text-align: center;
        font-size: 15px;
        padding: 20px;
        width: 140px;
        transition: all 0.5s;
        cursor: pointer;
        margin: 5px;
        outline: none !important;
        &:hover {
          cursor: default;
        }
      `;
    } else if (props.timeOff) {
      // default button css
      return css`
        display: inline-block;
        border-radius: 45px;
        background-color: #999999;
        border: none;
        color: #ffffff;
        text-align: center;
        font-size: 15px;
        padding: 20px;
        width: 140px;
        transition: all 0.5s;
        cursor: pointer;
        margin: 5px;
        outline: none !important;
        &:hover {
          cursor: default;
        }
      `;
    }
  }};
`;
