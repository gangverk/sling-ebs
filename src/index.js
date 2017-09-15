import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import store, { history } from './redux/store';
import Main from './containers/main';
import Login from './containers/login';

const target = document.querySelector('#root');

render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <div>
        <Login />
        <Main />
      </div>
    </ConnectedRouter>
  </Provider>,
  target
);
