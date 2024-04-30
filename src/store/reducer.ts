import { combineReducers } from '@reduxjs/toolkit';
import accountSlice from '../slices/account';

const rootReducer = combineReducers({
  account: accountSlice.reducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
