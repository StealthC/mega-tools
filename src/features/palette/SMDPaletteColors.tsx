import React from 'react';
import {
  BrightnessMode,
  convert24BitsToWeb,
  convertSMDTo24Bit,
  selectMode,
} from '../../utils/smdColors';

export interface SMDPaletteColors {
  colors: number[];
  mode?: number;
}

export function SMDPaletteColors({
  colors,
  mode = BrightnessMode.normal,
}: SMDPaletteColors): JSX.Element {
  const elements = colors.map((color) => (
    <div
      className="text-center"
      style={{
        backgroundColor: convert24BitsToWeb(
          convertSMDTo24Bit(color, selectMode(mode)),
        ),
      }}
    >
      <span style={{ color: 'white', mixBlendMode: 'difference' }}>
        {`0x${color.toString(16)}`}&nbsp;
      </span>
    </div>
  ));
  return <div className="border rounded border-2 p-1">{elements}</div>;
}
