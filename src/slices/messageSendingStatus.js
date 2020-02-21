import { createSlice } from '@reduxjs/toolkit';

import { actions as messages } from './messages';

const slice = createSlice({
  name: 'messageSending',
  initialState: '',
  reducers: {},
  extraReducers: {
    [messages.addMessageRequest]: () => 'sending',
    [messages.addMessageSuccess]: () => 'finished',
    [messages.addMessageFailure]: () => 'error',
  },
});

export default slice.reducer;
