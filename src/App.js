import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import store, { history } from './redux/store';
import Main from './containers/main';

const target = document.querySelector('#root');

render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <div>
        <Main />
      </div>
    </ConnectedRouter>
  </Provider>,
  target
);
