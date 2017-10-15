import styled, { css } from 'styled-components';

export default styled.button`
  ${props => {
    if (props.bigButton) {
      return css`
        display: inline-block;
        border-radius: 25px;
        background-color: #0085ff;
        border: solid white;
        color: #ffffff;
        text-align: center;
        font-size: 15px;
        padding: 20px;
        width: 140px;
        transition: all 0.5s;
        cursor: pointer;
        margin: 5px;
      `;
    } else if (props.booked) {
      // some other props styles
      return css`
        display: inline-block;
        border-radius: 45px;
        background-color: #0085ff;
        border: solid white;
        color: #ffffff;
        text-align: center;
        font-size: 20px;
        padding: 20px;
        width: 200px;
        transition: all 0.5s;
        cursor: pointer;
        margin: 5px;
      `;
    } else if (props.timeOff) {
      // default button css
      return css`
        display: inline-block;
        border-radius: 45px;
        background-color: #999999;
        border: solid white;
        color: #ffffff;
        text-align: center;
        font-size: 20px;
        padding: 20px;
        width: 200px;
        transition: all 0.5s;
        cursor: pointer;
        margin: 5px;
      `;
    }
  }};
`;
