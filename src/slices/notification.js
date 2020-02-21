import { createSlice } from '@reduxjs/toolkit';

import { actions as messages } from './messages';
import { actions as channels } from './channels';

const slice = createSlice({
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

const { setNotificationRequest } = slice.actions;

const setNotification = (message) => (dispatch) => {
  dispatch(setNotificationRequest(message));
};

const actions = { ...slice.actions };
const asyncActions = { setNotification };
export { actions, asyncActions };
export default slice.reducer;
