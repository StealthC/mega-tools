import { register } from '../serviceWorker';
import * as vdp from './vdp';

it('Mode Register 1', () => {
  expect(
    vdp.setModeRegister1Byte({
      clearLeftmost8pixels: true,
      displayEnabled: true,
      generateHorizontalInterrupt: true,
      stopHVCounter: true,
    }),
  ).toBe(0x37);

  expect(vdp.getModeRegister1Values(0x37)).toEqual({
    clearLeftmost8pixels: true,
    displayEnabled: true,
    generateHorizontalInterrupt: true,
    stopHVCounter: true,
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

it('interprets long values to control port', () => {
  expect(vdp.interpretLongValueToControl(0x80048134)).toEqual([0x8004, 0x8134]);
  expect(vdp.interpretLongValueToControl(0x40000010)).toEqual([0x40000010]);
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
