import axios from 'axios';
import { createSlice } from '@reduxjs/toolkit';

import routes from '@/routes';
import { actions as channels } from './channels';

const slice = createSlice({
  name: 'messages',
  initialState: [],
  reducers: {
    addMessageRequest: () => {
    },
    addMessageSuccess: (state, action) => [...state, action.payload],
    addMessageFailure: () => {},
  },
  extraReducers: {
    [channels.removeChannelSuccess]:
      (state, action) => state.filter((m) => m.channelId !== action.payload.id),
  },
});

const { addMessageRequest, addMessageFailure } = slice.actions;

const addMessage = (currentChannelId, values) => async (dispatch) => {
  dispatch(addMessageRequest());
  try {
    await axios.post(routes.channelMessagesPath(currentChannelId), {
      data: {
        attributes: values,
      },
    });
  } catch (error) {
    dispatch(addMessageFailure(error.message));
  }
};

const actions = { ...slice.actions };
const asyncActions = { addMessage };
export { actions, asyncActions };
export default slice.reducer;
