import { combineReducers } from '@reduxjs/toolkit';
import accountSlice from '../slices/account';
import PetRegisterSlice from '../slices/pets';
import PetSelectSlice from '../slices/petSelect';
import WriteLetterSlice from '../slices/writeLetter';

const rootReducer = combineReducers({
  account: accountSlice.reducer,
  petRegister: PetRegisterSlice.reducer,
  petSelect: PetSelectSlice.reducer,
  writeLetter: WriteLetterSlice.reducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
