import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  token: '',
  phoneNumber: '',
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
    setPhoneNumber(state, action) {
      state.phoneNumber = action.payload;
    },
  },
});

export default accountSlice;
