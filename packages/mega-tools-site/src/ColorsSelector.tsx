import React from 'react';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { getColor, setColor } from './features/palette/paletteSlice';
import { SMDColorSelector } from './features/palette/SMDColorSelector';

export function ColorSelector(): JSX.Element {
  const dispatch = useAppDispatch();
  const { color, colorMode } = useAppSelector(getColor);
  const onChangeColor = (ncolor: number) => {
    dispatch(setColor(ncolor));
  };
  return (
    <SMDColorSelector
      initialColor={color}
      initialBrightnessMode={colorMode}
      onChangeColor={onChangeColor}
    />
  );
}
