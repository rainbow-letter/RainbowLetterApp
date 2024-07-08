import { createSlice } from '@reduxjs/toolkit';
import { PayloadAction } from '@reduxjs/toolkit';

import { PetDashBoard } from '../model/Home.model';

const initialState: PetDashBoard = {
  id: 0,
  name: '',
  letterCount: 0,
  favoriteCount: 0,
  image: {
    id: 0,
    objectKey: '',
    url: '',
  },
  deathAnniversary: '',
};

const PetSelectSlice = createSlice({
  name: 'PetSelect',
  initialState,
  reducers: {
    setPetInfo(state, action: PayloadAction<Partial<PetDashBoard>>) {
      state = { ...state, ...action.payload };
      return state;
    },
  },
});

export default PetSelectSlice;
