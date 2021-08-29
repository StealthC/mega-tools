import * as vdp from './vdp';

it('Mode Register 1', () => {
  expect(
    vdp.setModeRegister1Byte({
      clearLeftmost8pixels: true,
      displayEnabled: true,
      enableHorizontalInterrupt: true,
      stopHVCounter: true,
      useAllcolorBits: true,
    }),
  ).toBe(0x37);

  expect(vdp.getModeRegister1Values(0x37)).toEqual({
    clearLeftmost8pixels: true,
    displayEnabled: true,
    enableHorizontalInterrupt: true,
    stopHVCounter: true,
    useAllcolorBits: true,
  });
});

it('Register Write Word', () => {
  expect(vdp.getRegisterWordValues(0x8004)).toEqual({
    register: 0x0,
    value: 0x04,
  });
  expect(
    vdp.createModeRegisterWord({
      register: 0x0,
      value: 0x04,
    }),
  ).toBe(0x8004);
});

it('interprets values to control port (register word)', () => {
  expect(vdp.interpretControlOperation(0x8004)).toEqual({
    isRegisterOp: true,
    operations: [0x8004],
  });
  expect(vdp.interpretControlOperation(0x8134)).toEqual({
    isRegisterOp: true,
    operations: [0x8134],
  });
});

it('interprets values to control port (register long)', () => {
  expect(vdp.interpretControlOperation(0x80048134)).toEqual({
    isRegisterOp: true,
    operations: [0x8004, 0x8134],
  });
});

it('interprets values to control port (address)', () => {
  expect(vdp.interpretControlOperation(0x40000010)).toEqual({
    operations: [0x40000010],
  });
});

it('interpret control addresses', () => {
  expect(vdp.getControlAddressValues(0x00000020)).toEqual({
    memorySpace: vdp.MemorySpace.CRAM,
    write: false,
    DMA: false,
    VRAM2VRAMcp: false,
    address: 0x0,
  });
  expect(vdp.getControlAddressValues(0x00600020)).toEqual({
    memorySpace: vdp.MemorySpace.CRAM,
    write: false,
    DMA: false,
    VRAM2VRAMcp: false,
    address: 0x60,
  });
  expect(vdp.getControlAddressValues(0xc0000000)).toEqual({
    memorySpace: vdp.MemorySpace.CRAM,
    write: true,
    DMA: false,
    VRAM2VRAMcp: false,
    address: 0x0,
  });
});

it('results in a error when trying a big number', () => {
  expect(() => {
    vdp.interpretControlOperation(0x100000000);
  }).toThrow();
});

it('results in a error when trying a invalid number', () => {
  expect(() => {
    vdp.interpretControlOperation(0xffff);
  }).toThrow();
});

it('results in a error when trying a negative number', () => {
  expect(() => {
    vdp.interpretControlOperation(-1);
  }).toThrow();
});
