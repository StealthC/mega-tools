import classNames from 'classnames';
import React from 'react';
import {
  BrightnessMode,
  convert24BitsToWeb,
  convertSMDTo24Bit,
  isValid,
  selectMode,
} from '../../utils/smdColors';

export interface SMDPaletteColors {
  colors: number[];
  inline?: boolean;
  mode?: number;
}

export function SMDPaletteColors({
  colors,
  mode = BrightnessMode.normal,
  inline = false,
}: SMDPaletteColors): JSX.Element {
  const elements = colors.map((color) => (
    <div
      className={classNames('text-center px-4 d-inline', {
        'd-inline': inline,
        'd-block': !inline,
      })}
      style={{
        backgroundColor: isValid(color)
          ? convert24BitsToWeb(convertSMDTo24Bit(color, selectMode(mode)))
          : 'none',
      }}
    >
      <span style={{ color: 'white', mixBlendMode: 'difference' }}>
        {`0x${color.toString(16)}`}
        {isValid(color) ? null : ' (Invalid)'}&nbsp;
      </span>
    </div>
  ));
  return (
    <div
      className={classNames('border rounded border-2 p-1 d-inline', {
        'd-inline': inline,
        'd-block': !inline,
      })}
    >
      {elements}
    </div>
  );
}
