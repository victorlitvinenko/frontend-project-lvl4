/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

import routes from '@/routes';

const slice = createSlice({
  name: 'channels',
  initialState: {
    data: [],
    currentChannelId: null,
  },
  reducers: {
    addChannelSuccess: (state, action) => { state.data = [...state.data, action.payload]; },
    addChannelFinish: (state, action) => { state.currentChannelId = action.payload.id; },
    addChannelFailure: () => {},
    removeChannelSuccess: (state, action) => {
      const { id } = action.payload;
      if (state.currentChannelId === id) {
        state.currentChannelId = state.data[0].id;
      }
      state.data = state.data.filter((t) => t.id !== id);
    },
    removeChannelFailure: () => {},
    renameChannelSuccess: (state, action) => {
      const { id, name } = action.payload;
      state.data.find((c) => c.id === id).name = name;
    },
    renameChannelFailure: () => {},
    changeChannelRequest: (state, action) => { state.currentChannelId = action.payload.id; },
  },
});

const {
  addChannelFinish,
  addChannelFailure,
  removeChannelFailure,
  renameChannelFailure,
  changeChannelRequest,
} = slice.actions;

const addChannel = (name) => async (dispatch) => {
  try {
    const newChannel = await axios.post(routes.channelsPath(), {
      data: {
        attributes: { name },
      },
    });
    dispatch(addChannelFinish({ id: newChannel.data.data.id }));
  } catch (error) {
    dispatch(addChannelFailure(error.message));
  }
};

const removeChannel = (id) => async (dispatch) => {
  try {
    await axios.delete(routes.channelPath(id), {
      data: {
        id,
      },
    });
  } catch (error) {
    dispatch(removeChannelFailure(error.message));
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
    dispatch(renameChannelFailure(error.message));
  }
};

const changeChannel = (id) => async (dispatch) => {
  dispatch(changeChannelRequest({ id }));
};

const actions = { ...slice.actions };
const asyncActions = {
  addChannel, removeChannel, renameChannel, changeChannel,
};
export { actions, asyncActions };
export default slice.reducer;
