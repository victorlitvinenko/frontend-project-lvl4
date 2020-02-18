import axios from 'axios';
import { createSlice } from '@reduxjs/toolkit';

import routes from '@/routes';
import * as channels from './channels';

const messagesSlice = createSlice({
  name: 'messages',
  initialState: [],
  reducers: {
    addMessageRequest: () => {
    },
    addMessageSuccess: (state, action) => [...state, action.payload],
    addMessageFailure: () => {
    },
  },
  extraReducers: {
    [channels.removeChannelSuccess]:
      (state, action) => state.filter((m) => m.channelId !== action.payload.id),
  },
});

const { actions, reducer } = messagesSlice;

export const {
  addMessageRequest,
  addMessageSuccess,
  addMessageFailure,
} = actions;

export const addMessage = (currentChannelId, values) => async (dispatch) => {
  dispatch(addMessageRequest());
  try {
    await axios.post(routes.channelMessagesPath(currentChannelId), {
      data: {
        attributes: values,
      },
    });
  } catch (error) {
    dispatch(addMessageFailure());
  }
};

export default reducer;
