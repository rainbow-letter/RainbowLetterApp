import { createSlice } from '@reduxjs/toolkit';
import { PayloadAction } from '@reduxjs/toolkit';

import { PetRegister } from '../model/Pet.model';

const initialState: PetRegister = {
  name: '',
  species: '',
  owner: '',
  personalities: [],
  deathAnniversary: '',
  image: '',
  year: '',
  month: '',
  day: '',
};

const PetRegisterSlice = createSlice({
  name: 'PetRegister',
  initialState,
  reducers: {
    setPetInfo(state, action: PayloadAction<Partial<PetRegister>>) {
      state = { ...state, ...action.payload };
      return state;
    },
    setYear(state, action: PayloadAction<string>) {
      state.year = action.payload;
      state.deathAnniversary = `${action.payload}-${state.month?.padStart(
        2,
        '0',
      )}-${state.day?.padStart(2, '0')}`;
    },
    setMonth(state, action: PayloadAction<string>) {
      state.month = action.payload;
      state.deathAnniversary = `${state.year}-${action.payload.padStart(
        2,
        '0',
      )}-${state.day?.padStart(2, '0')}`;
    },
    setDay(state, action: PayloadAction<string>) {
      state.day = action.payload;
      state.deathAnniversary = `${state.year}-${state.month?.padStart(
        2,
        '0',
      )}-${action.payload.padStart(2, '0')}`;
    },
    clearPetInfo(state) {
      state.name = '';
      state.species = '';
      state.owner = '';
      state.personalities = [];
      state.deathAnniversary = '';
      state.image = '';
      state.year = '';
      state.month = '';
      state.day = '';
    },
  },
});

export default PetRegisterSlice;
