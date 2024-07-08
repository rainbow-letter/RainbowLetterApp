import { createSlice } from '@reduxjs/toolkit';
import { PayloadAction } from '@reduxjs/toolkit';

import { Pet } from '../model/Pet.model';

const initialState: Pet = {
  name: '',
  species: '',
  owner: '',
  personalities: [],
  deathAnniversary: '',
  image: {
    uri: '',
    name: '',
    type: '',
  },
  year: '',
  month: '',
  day: '',
};

const PetRegisterSlice = createSlice({
  name: 'PetRegister',
  initialState,
  reducers: {
    setPetInfo(state, action: PayloadAction<Partial<Pet>>) {
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
  },
});

export default PetRegisterSlice;
