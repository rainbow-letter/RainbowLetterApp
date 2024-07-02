import { createSlice } from '@reduxjs/toolkit';
import { PayloadAction } from '@reduxjs/toolkit';

import { Pet } from '../model/Pet.model';

const initialState: Pet = {
  name: '',
  species: '',
  owner: '',
  personalities: [],
  deathAnniversary: '',
  image: null,
};

const PetRegisterSlice = createSlice({
  name: 'account',
  initialState,
  reducers: {
    setPetInfo(state, action: PayloadAction<Partial<Pet>>) {
      state = { ...state, ...action.payload };
    },
  },
});

export default PetRegisterSlice;
