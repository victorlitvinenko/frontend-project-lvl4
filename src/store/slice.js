/* eslint-disable no-param-reassign, no-console */
import axios from 'axios';

import { createSlice } from '@reduxjs/toolkit';
import routes from '@/routes';

const initialState = {
  channels: [],
  messages: [],
  currentChannelId: null,
  status: 'none',
};

const stateSlice = createSlice({
  name: 'state',
  initialState,
  reducers: {
    initStateSuccess: (state, action) => {
      const { gon: { channels, messages, currentChannelId } } = action.payload;
      state.channels = channels;
      state.messages = messages;
      state.currentChannelId = currentChannelId;
    },
    addMessageRequest: (state) => {
      state.status = 'requesting';
    },
    addMessageSuccess: (state, action) => {
      const { message } = action.payload;
      state.messages.push(message);
      state.status = 'success';
    },
    addMessageFailure: (state) => {
      state.status = 'failed';
    },
  },
});

const { actions, reducer } = stateSlice;

export const {
  initStateSuccess,
  addMessageRequest,
  addMessageSuccess,
  addMessageFailure,
} = actions;

export const initState = (gon) => (dispatch) => {
  dispatch(initStateSuccess({ gon }));
};

export const addMessage = (currentChannelId, values) => (dispatch) => {
  dispatch(addMessageRequest());
  axios.post(routes.channelMessagesPath(currentChannelId), {
    data: {
      attributes: values,
    },
  })
    .then((response) => {
      const message = response.data.data.attributes;
      dispatch(addMessageSuccess({ message }));
    })
    .catch((error) => {
      console.log(error);
      dispatch(addMessageFailure());
    });
};

export default reducer;
