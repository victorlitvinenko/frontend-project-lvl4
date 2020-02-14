import { createSlice } from '@reduxjs/toolkit';

export const channelsSlice = createSlice({
  name: 'channels',
  initialState: [],
  reducers: {
    addChannel: (state, action) => {
      const { channel } = action.payload;
      return [...state, channel];
    },
    removeChannel: (state, action) => state.filter((t) => t.id !== action.payload.id),
    renameChannel: (state, action) => state.filter((t) => t.id !== action.payload.id),
  },
});

export const { actions, reducer } = channelsSlice;

export default reducer;
