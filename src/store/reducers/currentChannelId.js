import { createSlice } from '@reduxjs/toolkit';

export const currentChannelIdSlice = createSlice({
  name: 'currentChannelId',
  initialState: 0,
  reducers: {
    changeChannel: (state, action) => {
      const { id } = action.payload;
      return id;
    },
  },
});

export const { actions, reducer } = currentChannelIdSlice;

export default reducer;
