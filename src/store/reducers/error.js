import { createSlice } from '@reduxjs/toolkit';

import * as messages from './messages';

export const errorSlice = createSlice({
  name: 'error',
  initialState: false,
  reducers: {
    setErrorRequest: (state, action) => {
      const { isError } = action.payload;
      return isError;
    },
  },
  extraReducers: {
    [messages.addMessageFailure]: () => true,
  },
});

export const { actions, reducer } = errorSlice;

export const {
  setErrorRequest,
} = actions;

export const setError = (isError) => (dispatch) => {
  dispatch(setErrorRequest({ isError }));
};

export default reducer;
