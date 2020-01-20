import 'core-js/stable';
import 'regenerator-runtime/runtime';
import '../assets/application.scss';
import React from 'react';
import ReactDOM from 'react-dom';
import gon from 'gon';
import cookies from 'js-cookie';
import faker from 'faker';
import App from './components/App';
import UserContext from './UserContext';
// import io from 'socket.io-client';

if (process.env.NODE_ENV !== 'production') {
  localStorage.debug = 'chat:*';
}

const userName = cookies.get('username') || faker.internet.userName();
cookies.set('username', userName, { expires: 7 });

ReactDOM.render(<UserContext.Provider value={userName}><App gon={gon} /></UserContext.Provider>,
  document.getElementById('chat'));
