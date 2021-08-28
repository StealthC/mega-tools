import React from 'react';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { getColor, setColor } from './features/palette/paletteSlice';
import { SMDColorSelector } from './features/palette/SMDColorSelector';

export function ColorsPage(): JSX.Element {
  const dispatch = useAppDispatch();
  const color = useAppSelector(getColor);
  const onChangeColor = (ncolor: number) => {
    dispatch(setColor(ncolor));
  };
  return (
    <div>
      <SMDColorSelector initialColor={color} onChangeColor={onChangeColor} />
    </div>
  );
}
