import React from 'react';
import { ControlOp } from './features/vdp-analysis/ControlOp';

export function VDPControl() {
  return (
    <>
      <ControlOp />
      <p className="small pt-4">
        Technical explanations can be found on:
        <ul>
          <li>
            <a
              href="https://segaretro.org/Sega_Mega_Drive/VDP_registers"
              target="_blank"
              rel="noreferrer"
            >
              Sega Mega Drive/VDP registers (Sega Retro)
            </a>
          </li>
          <li>
            <a
              href="https://segaretro.org/Sega_Mega_Drive/VDP_general_usage"
              target="_blank"
              rel="noreferrer"
            >
              Sega Mega Drive/VDP general usage (Sega Retro)
            </a>
          </li>
        </ul>
      </p>
    </>
  );
}
