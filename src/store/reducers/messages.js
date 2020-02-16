/* eslint-disable no-param-reassign, no-console */
import axios from 'axios';

import { createSlice } from '@reduxjs/toolkit';
import routes from '@/routes';

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
