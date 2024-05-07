import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  token: '',
};

const accountSlice = createSlice({
  name: 'account',
  initialState,
  reducers: {
    setToken(state, action) {
      state.token = action.payload.token;
    },
    removeToken(state) {
      state.token = '';
    },
  },
});

export default accountSlice;
