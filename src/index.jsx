import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import cookies from 'js-cookie';
import faker from 'faker';
import io from 'socket.io-client';

import * as reducers from './store/reducers';
import actions from './store/actions';
import App from './components/App';
import UserContext from './context';

export default (gon) => {
  const { channels, messages, currentChannelId } = gon;
  const middleware = getDefaultMiddleware({
    immutableCheck: false,
    serializableCheck: false,
    thunk: true,
  });

  const store = configureStore({
    reducer: { ...reducers },
    middleware,
    devTools: process.env.NODE_ENV !== 'production',
    preloadedState: {
      channels, messages, currentChannelId,
    },
  });

  const socket = io();
  socket.on('newMessage', ({ data: { attributes } }) => store.dispatch(actions.addMessageSuccess(attributes)));
  socket.on('newChannel', ({ data: { attributes } }) => store.dispatch(actions.addChannelSuccess(attributes)));
  socket.on('removeChannel', ({ data: { id } }) => {
    const firstChannelId = store.getState().channels[0].id;
    store.dispatch(actions.removeChannelSuccess({ id, firstChannelId }));
  });
  socket.on('renameChannel', ({ data: { attributes } }) => store.dispatch(actions.renameChannelSuccess(attributes)));

  const userName = cookies.get('username') || faker.internet.userName();
  cookies.set('username', userName, { expires: 7 });

  ReactDOM.render(
    <UserContext.Provider value={userName}>
      <Provider store={store}>
        <App />
      </Provider>
    </UserContext.Provider>,
    document.getElementById('chat'),
  );
};
