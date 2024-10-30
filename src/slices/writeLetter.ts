import { createSlice } from '@reduxjs/toolkit';
import { PayloadAction } from '@reduxjs/toolkit';

import { WriteLetter } from '../model/Letter.model';

const initialState: WriteLetter = {
  summary: '',
  content: '',
  image: '',
};

const WriteLetterSlice = createSlice({
  name: 'WriteLetter',
  initialState,
  reducers: {
    setLetter(state, action: PayloadAction<Partial<WriteLetter>>) {
      state = { ...state, ...action.payload };
      return state;
    },
    clearLetter(state) {
      state.summary = '';
      state.content = '';
      state.image = '';
    },
  },
});

export default WriteLetterSlice;
