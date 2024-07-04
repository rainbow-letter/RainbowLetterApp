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
  name: 'PetRegister',
  initialState,
  reducers: {
    setPetInfo(state, action: PayloadAction<Partial<Pet>>) {
      state = { ...state, ...action.payload };
      return state;
    },
  },
});

export default PetRegisterSlice;
