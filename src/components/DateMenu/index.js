import React, { Component } from 'react';
import styled from 'styled-components';

export default class DateMenu extends Component {
  render() {
    const DateMenu = styled.form`
      width: 400px;
      border: 1px solid #c6c7cc;
      border-radius: 5px;

      ul {
        list-style-type: none;
      }
      body {
        font-family: Verdana, sans-serif;
      }

      /* Month header */
      .month {
        padding: 20px 25px;
        width: 350px;
        text-align: center;
        background: linear-gradient(#87b5ff, #5995f7);
      }

      /* Month list */
      .month ul {
        margin: 0;
        padding: 0;
      }

      .month ul li {
        color: white;
        font-size: 20px;
        text-transform: uppercase;
        letter-spacing: 3px;
      }

      /* Previous button inside month header */
      .month .prev {
        float: left;
        padding-top: 10px;
      }

      /* Next button */
      .month .next {
        float: right;
        padding-top: 10px;
      }

      /* Weekdays (Mon-Sun) */
      .weekdays {
        margin: 0;
        padding: 10px 0;
        background-color: #ddd;
      }

      .weekdays li {
        display: inline-block;
        width: 13.6%;
        color: #666;
        text-align: center;
      }

      /* Days (1-31) */
      .days {
        padding: 10px 0;
        background: #eee;
        margin: 0;
      }

      .days li {
        list-style-type: none;
        display: inline-block;
        width: 13.6%;
        text-align: center;
        margin-bottom: 5px;
        font-size: 12px;
        color: #777;
      }

      /* Highlight the "current" day */
      .days li .active {
        padding: 5px;
        background: linear-gradient(#87b5ff, #5995f7);
        color: white !important;
      }
    `;

    return (
      <div>
        <DateMenu>
          <div className="month">
            <ul>
              <li className="prev" />
              <li className="next" />
              <li>
                August<br />
                <span>2017</span>
              </li>
            </ul>
          </div>

          <ul className="weekdays">
            <li>Mo</li>
            <li>Tu</li>
            <li>We</li>
            <li>Th</li>
            <li>Fr</li>
            <li>Sa</li>
            <li>Su</li>
          </ul>

          <ul className="days">
            <li>1</li>
            <li>2</li>
            <li>3</li>
            <li>4</li>
            <li>5</li>
            <li>6</li>
            <li>7</li>
            <li>8</li>
            <li>9</li>
            <li>
              <span className="active">10</span>
            </li>
            <li>11</li>
            <li>12</li>
            <li>13</li>
            <li>14</li>
            <li>15</li>
            <li>16</li>
            <li>17</li>
            <li>18</li>
            <li>19</li>
            <li>20</li>
            <li>21</li>
            <li>22</li>
            <li>23</li>
            <li>24</li>
            <li>25</li>
            <li>26</li>
            <li>27</li>
            <li>28</li>
            <li>29</li>
            <li>30</li>
            <li>31</li>
          </ul>
        </DateMenu>
      </div>
    );
  }
}
