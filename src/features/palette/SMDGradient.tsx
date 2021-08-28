import React from 'react';
import {
  Convert24BitsToWeb,
  convertSMDTo24Bit,
  GradientPosition,
} from './smdColors';

export interface SMDGradientProps {
  from: number;
  to: number;
  steps: number;
}

export function SMDGradient({
  from,
  to,
  steps = 8,
}: SMDGradientProps): JSX.Element {
  const gradient = [];
  for (let i = 0; i < steps; i += 1) {
    const color = GradientPosition(from, to, i / (steps - 1));
    gradient.push(color);
  }
  const colors = gradient.map((color) => (
    <div
      className="h-100"
      style={{
        backgroundColor: Convert24BitsToWeb(convertSMDTo24Bit(color)),
        minWidth: '15vw',
      }}
    >
      &nbsp;
    </div>
  ));
  return <div className="border rounded border-2 p-1">{colors}</div>;
}
