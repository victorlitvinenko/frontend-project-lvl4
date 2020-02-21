/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

import routes from '@/routes';

const slice = createSlice({
  name: 'channels',
  initialState: [],
  reducers: {
    addChannelRequest: () => {},
    addChannelSuccess: (state, action) => [...state, action.payload],
    addChannelAfterSuccess: () => {},
    addChannelFailure: () => {},
    removeChannelSuccess: (state, action) => state.filter((t) => t.id !== action.payload.id),
    removeChannelAfterSuccess: () => {},
    removeChannelFailure: () => {},
    renameChannelSuccess: (state, action) => {
      const { id, name } = action.payload;
      state.find((c) => c.id === id).name = name;
    },
    renameChannelFailure: () => {},
  },
});

const {
  addChannelRequest,
  addChannelAfterSuccess,
  addChannelFailure,
  removeChannelFailure,
  renameChannelFailure,
} = slice.actions;

const addChannel = (name) => async (dispatch) => {
  if (name.trim() === '') return;
  try {
    dispatch(addChannelRequest());
    const newChannel = await axios.post(routes.channelsPath(), {
      data: {
        attributes: { name },
      },
    });
    dispatch(addChannelAfterSuccess({ id: newChannel.data.data.id }));
  } catch (error) {
    dispatch(addChannelFailure());
  }
};

const removeChannel = (id) => async (dispatch) => {
  try {
    dispatch(addChannelRequest());
    await axios.delete(routes.channelPath(id), {
      data: {
        id,
      },
    });
  } catch (error) {
    dispatch(removeChannelFailure());
  }
};

const renameChannel = (id, name) => async (dispatch) => {
  try {
    await axios.patch(routes.channelPath(id), {
      data: {
        attributes: { name, id },
      },
    });
  } catch (error) {
    dispatch(renameChannelFailure());
  }
};

const actions = { ...slice.actions };
const asyncActions = { addChannel, removeChannel, renameChannel };
export { actions, asyncActions };
export default slice.reducer;
