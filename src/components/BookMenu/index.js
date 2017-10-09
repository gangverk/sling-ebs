import React, { Component } from 'react';
import styled from 'styled-components';

export default class BookMenu extends Component {
  render() {
    const BookMenu = styled.form`
      border: 1px solid #c6c7cc;
      border-radius: 5px;
      font: 14px/1.4 'Helvetica Neue', Helvetica, Arial, sans-serif;
      overflow: hidden;
      width: 400px;
      fieldset {
        border: 0;
        margin: 0;
        padding: 0;
      }
      input {
        border-radius: 3px;
        font: 14px/1.4 'Helvetica Neue', Helvetica, Arial, sans-serif;
        margin: 0;
      }
      textarea {
        width: 100%;
        padding: 12px;
        border: 1px solid #ccc;
        border-radius: 4px;
        box-sizing: border-box;
        margin-top: 6px;
        margin-bottom: 16px;
        resize: vertical;
      }
      .account-info {
        padding: 20px 20px 0 20px;
      }
      .account-info label {
        color: #395870;
        display: block;
        font-weight: bold;
        margin-bottom: 10px;
        padding-top: 1px;
        padding-right: 10px;
        padding-bottom: 0px;
        padding-left: 20px;
      }
      .account-info input {
        background: #fff;
        border: 1px solid #c6c7cc;
        box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.1);
        color: #636466;
        padding: 3px;
        margin-top: 3px;
        width: 40%;
      }
      .account-action {
        background: #f0f0f2;
        border-top: 1px solid #c6c7cc;
        padding: 15px;
      }
      .account-action .btn {
        background: linear-gradient(#87b5ff, #5995f7);
        border: 0;
        color: #fff;
        cursor: pointer;
        font-weight: bold;
        float: center;
        padding: 8px 16px;
        display: block;
        margin: 0 auto;
      }
      .account-action label {
        color: #7c7c80;
        font-size: 12px;
        float: left;
        margin: 10px 0 0 20px;
      }
    `;

    return (
      <div>
        <BookMenu>
          <fieldset className="account-info">
            <label>
              Time
              <input type="time" />
              <input type="time" />
            </label>
            <label>
              Note
              <textarea placeholder="Optional" />
            </label>
          </fieldset>
          <fieldset className="account-action">
            <input className="btn" type="submit" name="submit" value="Book" />
          </fieldset>
        </BookMenu>
      </div>
    );
  }
}
