import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface PaletteState {
  color: number;
}

const initialState: PaletteState = {
  color: 0,
};

export const paletteSlice = createSlice({
  name: 'palette',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    setColor: (state, action: PayloadAction<number>) => {
      state.color = action.payload;
    },
  },
});

export const { setColor } = paletteSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.palette.value)`
// export const selectPalette = (state: RootState) => state.palette;

export default paletteSlice.reducer;
