import { createSlice } from '@reduxjs/toolkit';

import { actions as channels } from './channels';

const slice = createSlice({
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

const { changeChannelRequest } = slice.actions;

const changeChannel = (id) => async (dispatch) => {
  dispatch(changeChannelRequest({ id }));
};

const actions = { ...slice.actions };
const asyncActions = { changeChannel };
export { actions, asyncActions };
export default slice.reducer;
