import { hex } from "./binutils";

test('Hex Defaults', () => {
    expect(hex(0x1234)).toBe("0x1234")
})

test('Hex With leading Zeros', () => {
    expect(hex(0x1234, 6)).toBe("0x001234")
})

test('Hex With leading Zeros and custom preffix', () => {
    expect(hex(0x1234, 6, '$0')).toBe("$0001234")
})

test('Hex With leading Zeros and custom postfix', () => {
    expect(hex(0x1234, 6, '', 'h')).toBe("001234h")
})

