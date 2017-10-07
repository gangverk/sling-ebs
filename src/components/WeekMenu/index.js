import React, { Component } from 'react';
import styled from 'styled-components';

export default class WeekMenu extends Component {
  render() {
    const WeekMenu = styled.table`
      table,
      td,
      th {
        border: 1px solid #cecfd5;
        border-collapse: collapse;
        padding: 10px 15px;
      }
      th,
      td {
        padding: 10px 15px;
        vertical-align: middle;
      }
      thead {
        background: #395870;
        background: linear-gradient(#49708f, #293f50);
        color: #fff;
        font-size: 11px;
        text-transform: uppercase;
      }
      th:first-child {
        border-top-left-radius: 5px;
        text-align: left;
      }
      th:last-child {
        border-top-right-radius: 5px;
      }
      tfoot tr:last-child td:first-child {
        border-bottom-left-radius: 5px;
      }
      tfoot tr:last-child td:last-child {
        border-bottom-right-radius: 5px;
      }

      border-collapse: separate;
      border-spacing: 0;
      color: #4a4a4d;
      font: 14px/1.4 'Helvetica Neue', Helvetica, Arial, sans-serif;
    `;

    return (
      <div>
        <WeekMenu>
          <caption>WeekMenu</caption>
          <thead>
            <tr>
              <th>Time</th>
              <th>Kristinn</th>
              <th>Hreinn</th>
              <th>Tómas</th>
              <th>Björgvin</th>
              <th>Sólberg</th>
              <th>Atli</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>8:00-9:00</td>
              <td />
              <td />
              <td />
              <td />
              <td />
              <td />
            </tr>
            <tr>
              <td>9:00-10:00</td>
              <td />
              <td />
              <td />
              <td />
              <td />
              <td />
            </tr>
            <tr>
              <td>10:00-11:00</td>
              <td />
              <td />
              <td />
              <td />
              <td />
              <td />
            </tr>
            <tr>
              <td>11:00-12:00</td>
              <td />
              <td />
              <td />
              <td />
              <td />
              <td />
            </tr>
            <tr>
              <td>12:00-13:00</td>
              <td />
              <td />
              <td />
              <td />
              <td />
              <td />
            </tr>
            <tr>
              <td>13:00-14:00</td>
              <td />
              <td />
              <td />
              <td />
              <td />
              <td />
            </tr>
            <tr>
              <td>14:00-15:00</td>
              <td />
              <td />
              <td />
              <td />
              <td />
              <td />
            </tr>
            <tr>
              <td>15:00-16:00</td>
              <td />
              <td />
              <td />
              <td />
              <td />
              <td />
            </tr>
          </tbody>
          <tfoot>
            <tr>
              <td>16:00-17:00</td>
              <td />
              <td />
              <td />
              <td />
              <td />
              <td />
            </tr>
          </tfoot>
        </WeekMenu>
      </div>
    );
  }
}
