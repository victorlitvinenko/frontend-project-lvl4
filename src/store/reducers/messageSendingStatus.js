import { createSlice } from '@reduxjs/toolkit';

import * as messages from './messages';

const messageSendingSlice = createSlice({
  name: 'messageSending',
  initialState: '',
  reducers: {},
  extraReducers: {
    [messages.addMessageRequest]: () => 'sending',
    [messages.addMessageSuccess]: () => 'finished',
    [messages.addMessageFailure]: () => 'error',
  },
});

const { reducer } = messageSendingSlice;

export default reducer;
