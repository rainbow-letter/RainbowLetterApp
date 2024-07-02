import { combineReducers } from '@reduxjs/toolkit';
import accountSlice from '../slices/account';
import PetRegisterSlice from '../slices/pets';

const rootReducer = combineReducers({
  account: accountSlice.reducer,
  petRegister: PetRegisterSlice.reducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
