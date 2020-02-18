import { createSlice } from '@reduxjs/toolkit';

import * as channels from './channels';

export const currentChannelIdSlice = createSlice({
  name: 'currentChannelId',
  initialState: 0,
  reducers: {
    changeChannelRequest: (state, action) => action.payload.id,
  },
  extraReducers: {
    [channels.addChannelAfterSuccess]: (state, action) => action.payload.id,
    [channels.removeChannelSuccess]:
      (state, action) => (state === action.payload.id ? action.payload.firstChannelId : state),
  },
});

export const { actions, reducer } = currentChannelIdSlice;

export const {
  changeChannelRequest,
} = actions;

export const changeChannel = (id) => async (dispatch) => {
  dispatch(changeChannelRequest({ id }));
};

export default reducer;
