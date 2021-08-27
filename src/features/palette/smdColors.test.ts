import * as smdColors from  './smdColors'

it('Get bits from color', () => {
    expect(smdColors.getBits(0x0)).toEqual({r: 0, g: 0, b: 0})
    expect(smdColors.getBits(0xEEE)).toEqual({r: 7, g: 7, b: 7})
    expect(smdColors.getBits(0x2E8)).toEqual({r: 4, g: 7, b: 1})
})
it('Get color from bits', () => {
    expect(smdColors.getColorFromBits({r: 0, g: 0, b: 0})).toBe(0x0)
    expect(smdColors.getColorFromBits({r: 7, g: 7, b: 7})).toBe(0xEEE)
    expect(smdColors.getColorFromBits({r: 4, g: 7, b: 1})).toBe(0x2E8)
})

it('Checks Valid Colors', () => {
    expect(smdColors.isValid(0x0)).toBe(true)
    expect(smdColors.isValid(0x2E8)).toBe(true)
    expect(smdColors.isValid(0xEEE)).toBe(true)
    expect(smdColors.isValid(0xEEF)).toBe(false)
    expect(smdColors.isValid(0xF00)).toBe(false)
    expect(smdColors.isValid(0xF000)).toBe(false)
})

it('Converts to 24-bit (default brightness)', () => {
    expect(smdColors.convertSMDTo24Bit(0x0)).toBe(0x0)
    expect(smdColors.convertSMDTo24Bit(0xEEE)).toBe(0xFFFFFF)
    expect(smdColors.convertSMDTo24Bit(0x666)).toBe(0x747474)
})

it('Converts to smdt (default brightness)', () => {
    expect(smdColors.convert24BitToSMD(0x0)).toBe(0x0)
    expect(smdColors.convert24BitToSMD(0xFFFFFF)).toBe(0xEEE)
    expect(smdColors.convert24BitToSMD(0x747474)).toBe(0x666)
})