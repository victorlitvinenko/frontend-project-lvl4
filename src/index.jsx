import 'core-js/stable';
import 'regenerator-runtime/runtime';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import gon from 'gon';
import cookies from 'js-cookie';
import faker from 'faker';
// import io from 'socket.io-client';

import store from './store';
import App from './components/App';
import UserContext from './context/UserContext';
import '../assets/application.scss';

if (process.env.NODE_ENV !== 'production') {
  localStorage.debug = 'chat:*';
}

const userName = cookies.get('username') || faker.internet.userName();
cookies.set('username', userName, { expires: 7 });

ReactDOM.render(
  <UserContext.Provider value={userName}>
    <Provider store={store}>
      <App gon={gon} />
    </Provider>
  </UserContext.Provider>,
  document.getElementById('chat'),
);
