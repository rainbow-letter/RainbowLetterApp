import { createSlice } from '@reduxjs/toolkit';
import { PayloadAction } from '@reduxjs/toolkit';

import { Pets } from '../model/Pet.model';

const initialState: Pets = {
  id: 0,
  name: '',
  species: '',
  owner: '',
  letterCount: 0,
  favoriteCount: 0,
  image: {
    id: 0,
    objectKey: '',
    url: '',
  },
  deathAnniversary: '',
  personalities: [],
};

const PetSelectSlice = createSlice({
  name: 'PetSelect',
  initialState,
  reducers: {
    setPetInfo(state, action: PayloadAction<Partial<Pets>>) {
      state = { ...state, ...action.payload };
      return state;
    },
  },
});

export default PetSelectSlice;
