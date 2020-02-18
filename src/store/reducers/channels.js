/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

import routes from '@/routes';

export const channelsSlice = createSlice({
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

export const { actions, reducer } = channelsSlice;

export const {
  addChannelRequest,
  addChannelSuccess,
  addChannelAfterSuccess,
  addChannelFailure,
  removeChannelSuccess,
  removeChannelAfterSuccess,
  removeChannelFailure,
  renameChannelSuccess,
  renameChannelFailure,
} = actions;

export const addChannel = (name) => async (dispatch) => {
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

export const removeChannel = (id) => async (dispatch) => {
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

export const renameChannel = (id, name) => async (dispatch) => {
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

export default reducer;
