import { createSlice } from '@reduxjs/toolkit';
import { PayloadAction } from '@reduxjs/toolkit';

import { WriteLetter } from '../model/Letter.model';

const initialState: WriteLetter = {
  summary: '',
  content: '',
  image: {
    uri: '',
    name: '',
    type: '',
  },
};

const WriteLetterSlice = createSlice({
  name: 'WriteLetter',
  initialState,
  reducers: {
    setPetInfo(state, action: PayloadAction<Partial<WriteLetter>>) {
      state = { ...state, ...action.payload };
      return state;
    },
  },
});

export default WriteLetterSlice;
