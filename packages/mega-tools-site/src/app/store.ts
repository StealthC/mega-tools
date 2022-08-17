import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import paletteReducer from '../features/palette/paletteSlice';

export const store = configureStore({
  reducer: {
    palette: paletteReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
