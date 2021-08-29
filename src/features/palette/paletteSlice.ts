import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { BrightnessMode } from '../../utils/smdColors';

export interface PaletteState {
  color: number;
  colorMode: number;
  gradientStart: number;
  gradientEnd: number;
  gradientSteps: number;
  gradientMode: number;
}

const initialState: PaletteState = {
  color: 0,
  colorMode: BrightnessMode.normal,
  gradientStart: 0,
  gradientEnd: 0xeee,
  gradientSteps: 8,
  gradientMode: BrightnessMode.normal,
};

export const paletteSlice = createSlice({
  name: 'palette',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    setColor: (state, action: PayloadAction<number>) => {
      state.color = action.payload;
    },
    setColorMode: (state, action: PayloadAction<number>) => {
      state.colorMode = action.payload;
    },
    setGradientStart: (state, action: PayloadAction<number>) => {
      state.gradientStart = action.payload;
    },
    setGradientEnd: (state, action: PayloadAction<number>) => {
      state.gradientEnd = action.payload;
    },
    setGradientSteps: (state, action: PayloadAction<number>) => {
      state.gradientSteps = action.payload;
    },
    setGradientMode: (state, action: PayloadAction<number>) => {
      state.gradientMode = action.payload;
    },
  },
});

export const {
  setColor,
  setColorMode,
  setGradientStart,
  setGradientEnd,
  setGradientSteps,
  setGradientMode,
} = paletteSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.palette.value)`
export const getColor = (state: RootState) => ({
  color: state.palette.color,
  colorMode: state.palette.colorMode,
});
export const getGradient = (state: RootState) => ({
  gradientStart: state.palette.gradientStart,
  gradientEnd: state.palette.gradientEnd,
  gradientSteps: state.palette.gradientSteps,
  gradientMode: state.palette.gradientMode,
});

export default paletteSlice.reducer;
