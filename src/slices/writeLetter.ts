import { createSlice } from '@reduxjs/toolkit';
import { PayloadAction } from '@reduxjs/toolkit';

import { WriteLetter } from '../model/Letter.model';

const initialState: WriteLetter = {
  summary: '',
  content: '',
  image: null,
};

const WriteLetterSlice = createSlice({
  name: 'WriteLetter',
  initialState,
  reducers: {
    setLetter(state, action: PayloadAction<Partial<WriteLetter>>) {
      state = { ...state, ...action.payload };
      return state;
    },
  },
});

export default WriteLetterSlice;
