import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import state from './slice';

const middleware = getDefaultMiddleware({
  immutableCheck: false,
  serializableCheck: false,
  thunk: true,
});

const store = configureStore({
  reducer: { state },
  middleware,
  devTools: process.env.NODE_ENV !== 'production',
});

export default store;
