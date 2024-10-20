import { createSlice } from '@reduxjs/toolkit';
import { PayloadAction } from '@reduxjs/toolkit';

import { PetsList } from '../model/Pet.model';

const initialState: PetsList = {
  id: 0,
  userId: 0,
  name: '',
  species: '',
  owner: '',
  personalities: [],
  deathAnniversary: '',
  image: '',
  favorite: {
    id: 0,
    total: 0,
    dayIncreaseCount: 0,
    canIncrease: true,
    lastIncreasedAt: '',
  },
  createdAt: '',
  updatedAt: '',
};

const PetSelectSlice = createSlice({
  name: 'PetSelect',
  initialState,
  reducers: {
    setPetInfo(state, action: PayloadAction<Partial<PetsList | undefined>>) {
      state = { ...state, ...action.payload };
      return state;
    },
  },
});

export default PetSelectSlice;
