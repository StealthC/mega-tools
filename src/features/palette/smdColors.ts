// Got the correct values from http://gendev.spritesmind.net/forum/viewtopic.php?t=2188
export const BRIGHTNESS_NORMAL = [0, 52, 87, 116, 144, 172, 206, 255];
export const BRIGHTNESS_SHADOW = [0, 29, 52, 70, 87, 101, 116, 130];
export const BRIGHTNESS_HIGHLIGHT = [130, 144, 158, 172, 187, 206, 228, 255];

export const BRIGHTNESS_NORMAL_LINEAR = [0, 36, 72, 108, 144, 180, 216, 255];
export const BRIGHTNESS_SHADOW_LINEAR = [0, 18, 36, 54, 72, 90, 108, 126];
export const BRIGHTNESS_HIGHLIGHT_LINEAR = [
  126, 144, 162, 180, 198, 216, 234, 255,
];

export interface ColorBits {
  r: number;
  g: number;
  b: number;
}

export function isValid(smdColor: number): boolean {
  return (smdColor & ~0xeee) === 0;
}

export function getBits(smdColor: number): ColorBits {
  const r = (smdColor >> 1) & 7;
  const g = (smdColor >> 5) & 7;
  const b = (smdColor >> 9) & 7;
  return { r, g, b };
}

export function getColorFromBits(colorBits: ColorBits): number {
  return (colorBits.b << 9) | (colorBits.g << 5) | (colorBits.r << 1);
}

export function ConvertByteToIndex(byte: number, byteTable: number[]): number {
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

export function convert24BitToSMD(
  B32Color: number,
  brightness = BRIGHTNESS_NORMAL,
): number {
  const b = ConvertByteToIndex(B32Color & 0xff, brightness);
  const g = ConvertByteToIndex((B32Color >> 8) & 0xff, brightness);
  const r = ConvertByteToIndex((B32Color >> 16) & 0xff, brightness);
  return getColorFromBits({ r, g, b });
}

export function convertSMDTo24Bit(
  smdColor: number,
  brightness = BRIGHTNESS_NORMAL,
): number {
  const bits = getBits(smdColor);
  bits.r = brightness[bits.r];
  bits.g = brightness[bits.g];
  bits.b = brightness[bits.b];
  return (bits.r << 16) | (bits.g << 8) | bits.b;
}
