import * as smdColors from './smdColors';

it('Get bits from color', () => {
  expect(smdColors.getBits(0x0)).toEqual({ r: 0, g: 0, b: 0 });
  expect(smdColors.getBits(0xeee)).toEqual({ r: 7, g: 7, b: 7 });
  expect(smdColors.getBits(0x2e8)).toEqual({ r: 4, g: 7, b: 1 });
});
it('Get color from bits', () => {
  expect(smdColors.getColorFromBits({ r: 0, g: 0, b: 0 })).toBe(0x0);
  expect(smdColors.getColorFromBits({ r: 7, g: 7, b: 7 })).toBe(0xeee);
  expect(smdColors.getColorFromBits({ r: 4, g: 7, b: 1 })).toBe(0x2e8);
});

it('Checks Valid Colors', () => {
  expect(smdColors.isValid(0x0)).toBe(true);
  expect(smdColors.isValid(0x2e8)).toBe(true);
  expect(smdColors.isValid(0xeee)).toBe(true);
  expect(smdColors.isValid(0xeef)).toBe(false);
  expect(smdColors.isValid(0xf00)).toBe(false);
  expect(smdColors.isValid(0xf000)).toBe(false);
});

it('Converts to 24-bit (default brightness)', () => {
  expect(smdColors.convertSMDTo24Bit(0x0)).toBe(0x0);
  expect(smdColors.convertSMDTo24Bit(0xeee)).toBe(0xffffff);
  expect(smdColors.convertSMDTo24Bit(0x666)).toBe(0x747474);
});

it('Converts to smdt (default brightness)', () => {
  expect(smdColors.convert24BitToSMD(0x0)).toBe(0x0);
  expect(smdColors.convert24BitToSMD(0xffffff)).toBe(0xeee);
  expect(smdColors.convert24BitToSMD(0x747474)).toBe(0x666);
});

it('Calculate Gradient position', () => {
  expect(smdColors.gradientPosition(0x0, 0xeee, 0.0)).toBe(0x0);
  expect(smdColors.gradientPosition(0x0, 0xeee, 1.0)).toBe(0xeee);
});
