import React from 'react';
import { ColorSelector } from './ColorsSelector';
import { Gradient } from './Gradient';

export function ColorsPage(): JSX.Element {
  return (
    <>
      <h3>Simple Color Selector</h3>
      <ColorSelector />
      <h3 className="pt-4">Gradient Generator</h3>
      <Gradient />
      <p className="small pt-4">
        Technical explanations can be found on:
        <ul>
          <li>
            <a
              href="https://segaretro.org/Sega_Mega_Drive/Palettes_and_CRAM"
              target="_blank"
              rel="noreferrer"
            >
              Sega Mega Drive/Palettes and CRAM (Sega Retro)
            </a>
          </li>
          <li>
            <a
              href="http://gendev.spritesmind.net/forum/viewtopic.php?t=2188"
              target="_blank"
              rel="noreferrer"
            >
              MD VDP color levels (spritesmind.net GenDev Forum, TmEE co.(TM)
              Post)
            </a>
          </li>
        </ul>
      </p>
    </>
  );
}
