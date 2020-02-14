/* eslint-disable no-param-reassign, no-console */
import axios from 'axios';

import { createSlice } from '@reduxjs/toolkit';
import routes from '@/routes';

const messagesSlice = createSlice({
  name: 'messages',
  initialState: [],
  reducers: {
    addMessageRequest: (state) => {
      // state.status = 'requesting';
    },
    addMessageSuccess: (state, action) => [...state, action.payload],
    addMessageFailure: (state) => {
      // state.status = 'failed';
    },
  },
});

const { actions, reducer } = messagesSlice;

export const {
  addMessageRequest,
  addMessageSuccess,
  addMessageFailure,
} = actions;

export const addMessage = (currentChannelId, values) => (dispatch) => {
  dispatch(addMessageRequest());
  axios.post(routes.channelMessagesPath(currentChannelId), {
    data: {
      attributes: values,
    },
  })
    .then((response) => {
      // const message = response.data.data.attributes;
      // dispatch(addMessageSuccess(message));
    })
    .catch((error) => {
      console.log(error);
      dispatch(addMessageFailure());
    });
};

export default reducer;
