/* eslint-disable no-console */
import axios from 'axios';
import { createSlice } from '@reduxjs/toolkit';

import routes from '@/routes';
import { actions as channels } from './channels';

const slice = createSlice({
  name: 'messages',
  initialState: [],
  reducers: {
    addMessageSuccess: (state, action) => [...state, action.payload],
  },
  extraReducers: {
    [channels.removeChannelSuccess]:
      (state, action) => state.filter((m) => m.channelId !== action.payload.id),
  },
});

const addMessage = (currentChannelId, values) => async () => {
  try {
    await axios.post(routes.channelMessagesPath(currentChannelId), {
      data: {
        attributes: values,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

const actions = { ...slice.actions };
const asyncActions = { addMessage };
export { actions, asyncActions };
export default slice.reducer;
