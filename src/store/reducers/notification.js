import { createSlice } from '@reduxjs/toolkit';

import * as messages from './messages';
import * as channels from './channels';

export const notificationSlice = createSlice({
  name: 'notification',
  initialState: '',
  reducers: {
    setNotificationRequest: (state, action) => action.payload,
  },
  extraReducers: {
    [messages.addMessageFailure]: () => 'Message sending error! Check your connection.',
    [channels.addChannelFailure]: () => 'Channel adding error!',
    [channels.removeChannelFailure]: () => 'Channel removing error!',
    [channels.renameChannelFailure]: () => 'Channel renaming error!',
    [channels.renameChannelSuccess]: (state, action) => `Channel renamed to '${action.payload.name}' successfully.`,
    [channels.removeChannelSuccess]: () => 'Channel removed successfully.',
    [channels.addChannelSuccess]: (state, action) => `Channel '${action.payload.name}' added successfully.`,
  },
});

export const { actions, reducer } = notificationSlice;

export const {
  setNotificationRequest,
} = actions;

export const setNotification = (message) => (dispatch) => {
  dispatch(setNotificationRequest(message));
};

export default reducer;
