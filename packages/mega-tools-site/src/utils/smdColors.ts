// Got the correct values from http://gendev.spritesmind.net/forum/viewtopic.php?t=2188

export const BrightnessMode = {
  normal: 0,
  shadow: 1,
  highlight: 2,
  linearNormal: 3,
  linearShadow: 4,
  linearHighlight: 5,
};

export const BrightnessModeIndex = [
  [0, 52, 87, 116, 144, 172, 206, 255],
  [0, 29, 52, 70, 87, 101, 116, 130],
  [130, 144, 158, 172, 187, 206, 228, 255],
  [0, 36, 72, 108, 144, 180, 216, 255],
  [0, 18, 36, 54, 72, 90, 108, 126],
  [126, 144, 162, 180, 198, 216, 234, 255],
];

export function selectMode(index: number) {
  return BrightnessModeIndex[index];
}

export interface ColorBits {
  r: number;
  g: number;
  b: number;
}

export function isValid(smdColor: number): boolean {
  return (smdColor & ~0xeee) === 0;
}

export function getBits(smdColor: number): ColorBits {
  const r = (smdColor >>> 1) & 7;
  const g = (smdColor >>> 5) & 7;
  const b = (smdColor >>> 9) & 7;
  return { r, g, b };
}

export function getColorFromBits(colorBits: ColorBits): number {
  return (colorBits.b << 9) | (colorBits.g << 5) | (colorBits.r << 1);
}

export function convertByteToIndex(byte: number, byteTable: number[]): number {
  for (let i = 0; i < byteTable.length; i += 1) {
    if (byteTable[i] >= byte) {
      if (i > 0) {
        if (byte - byteTable[i - 1] < byteTable[i] - byte) {
          return i - 1;
        }
      } else {
        return i;
      }
    }
  }
  return byteTable.length - 1;
}

function lerp(start: number, end: number, pos: number) {
  return (1 - pos) * start + pos * end;
}

export function convert24BitToSMD(
  B32Color: number,
  brightness = BrightnessModeIndex[0],
): number {
  const b = convertByteToIndex(B32Color & 0xff, brightness);
  const g = convertByteToIndex((B32Color >>> 8) & 0xff, brightness);
  const r = convertByteToIndex((B32Color >>> 16) & 0xff, brightness);
  return getColorFromBits({ r, g, b });
}

export function convertSMDTo24Bit(
  smdColor: number,
  brightness = BrightnessModeIndex[0],
): number {
  const bits = getBits(smdColor);
  bits.r = brightness[bits.r];
  bits.g = brightness[bits.g];
  bits.b = brightness[bits.b];
  return (bits.r << 16) | (bits.g << 8) | bits.b;
}

export function gradientPosition(
  from: number,
  to: number,
  position: number,
): number {
  const fromBits = getBits(from);
  const toBits = getBits(to);
  const resultBits = {
    r: Math.round(lerp(fromBits.r, toBits.r, position)),
    g: Math.round(lerp(fromBits.g, toBits.g, position)),
    b: Math.round(lerp(fromBits.b, toBits.b, position)),
  };

  return getColorFromBits(resultBits);
}

export function generateGradient(
  from: number,
  to: number,
  steps: number,
): number[] {
  const gradient = [];
  for (let i = 0; i < steps; i += 1) {
    const color = gradientPosition(from, to, i / (steps - 1));
    gradient.push(color);
  }
  return gradient;
}

export function convert24BitsToWeb(color: number) {
  const colorString = color.toString(16);
  return `#${'0'.repeat(Math.max(0, 6 - colorString.length))}${colorString}`;
}
