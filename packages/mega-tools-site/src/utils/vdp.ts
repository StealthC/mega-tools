// Mode Register 1
export interface ModeRegister1Values {
  clearLeftmost8pixels: boolean;
  enableHorizontalInterrupt: boolean;
  useAllcolorBits: boolean;
  stopHVCounter: boolean;
  displayEnabled: boolean;
}

export function getModeRegister1Values(n: number): ModeRegister1Values {
  return {
    clearLeftmost8pixels: (n & 0x20) !== 0,
    enableHorizontalInterrupt: (n & 0x10) !== 0,
    stopHVCounter: (n & 2) !== 0,
    displayEnabled: (n & 1) !== 0,
    useAllcolorBits: (n & 0b100) !== 0,
  };
}

export function setModeRegister1Byte(v: ModeRegister1Values): number {
  let n = 4;
  if (v.displayEnabled) n |= 1;
  if (v.stopHVCounter) n |= 2;
  if (v.enableHorizontalInterrupt) n |= 0x10;
  if (v.clearLeftmost8pixels) n |= 0x20;
  if (v.useAllcolorBits) n |= 0b100;
  return n;
}

export interface ModeRegister2Values {
  use128kbVRAM: boolean;
  displayEnabled: boolean;
  enableVerticalInterrupt: boolean;
  enableDMA: boolean;
  PALMode: boolean;
  MDMode: boolean;
}

export function getModeRegister2Values(n: number): ModeRegister2Values {
  return {
    use128kbVRAM: (0b10000000 & n) !== 0,
    displayEnabled: (0b1000000 & n) !== 0,
    enableVerticalInterrupt: (0b100000 & n) !== 0,
    enableDMA: (0b10000 & n) !== 0,
    PALMode: (0b1000 & n) !== 0,
    MDMode: (0b100 & n) !== 0,
  };
}

export interface BackgroundColorValues {
  paletteLine: number;
  colorIndex: number;
}

export function getBackgroundColorValues(n: number): BackgroundColorValues {
  return {
    paletteLine: (n & 0b110000) >>> 4,
    colorIndex: (n & 0b1111) >>> 0,
  };
}

export enum DMASourceOp {
  m68kToVRAM = 0,
  VRAM_FILL = 1,
  VRAM_TO_VRAM = 2,
}
export interface DMASource3Values {
  highBytes: number;
  DMAOp: DMASourceOp;
}

export function getDMASource3Values(n: number): DMASource3Values {
  const opb = (0b11000000 & n) >> 6;
  const r = {
    highBytes: (0b111111 & n) >>> 0,
    DMAOp: DMASourceOp.m68kToVRAM,
  };
  if (opb === 0b10) {
    r.DMAOp = DMASourceOp.VRAM_FILL;
  } else if (opb === 0b11) {
    r.DMAOp = DMASourceOp.VRAM_TO_VRAM;
  } else {
    r.highBytes = (0b1111111 & n) >>> 0;
  }
  return r;
}

// Interpret Register Write

export function getRegisterWordValues(n: number): RegisterWriteControlValues {
  return { register: (n & 0x1f00) >> 8, value: n & 0xff };
}

export function createModeRegisterWord(v: RegisterWriteControlValues): number {
  return ((v.register | 0x80) << 8) | v.value;
}

export enum MemorySpace {
  UNKNOWN = 0,
  VRAM = 1,
  CRAM = 2,
  VSRAM = 4,
  VRAM_BYTE = 5,
}

export interface RegisterWriteControlValues {
  register: number;
  value: number;
}

export interface AddressControlValues {
  memorySpace: MemorySpace;
  write: boolean;
  address: number;
  VRAM2VRAMcp: boolean;
  DMA: boolean;
}

export interface OperationResult {
  isRegisterOp?: boolean;
  operations: number[];
}

export function interpretControlOperation(n: number): OperationResult {
  const r: OperationResult = {
    operations: [],
  };
  if (Number.isNaN(n)) {
    throw new Error('Please type a number.');
  }
  if (n > 0xffffffff) {
    throw new Error('The number cannot be larger than longword (4 bytes)');
  }
  if (n < 0) {
    throw new Error('The number need to be positive');
  }
  if ((n & 0x8000) === 0x8000 && (n & 0x6000) === 0) {
    r.isRegisterOp = true;
    r.operations.push(n & 0xffff);
    if (n > 0xffff) {
      if ((n & 0x80000000) >>> 0 === 0x80000000 && (n & 0x60000000) === 0) {
        // It is two register operations
        r.operations.unshift((n & 0xffff0000) >>> 16);
      } else {
        throw new Error('Invalid Operation');
      }
    }
    return r;
  }
  if ((n & 0xff0c) !== 0) {
    // There's a error
    throw new Error('Invalid Operation');
  }
  // It is a address manipulation
  r.operations.push(n);
  return r;
}

export function getControlAddressValues(n: number): AddressControlValues {
  const msn = ((n & 0x80000000) >>> 31) | ((0b110000 & n) >>> 3);
  let memorySpace = MemorySpace.UNKNOWN;
  if (msn === 0b100 || msn === 0b001) memorySpace = MemorySpace.CRAM;
  if (msn === 0b000) memorySpace = MemorySpace.VRAM;
  if (msn === 0b010) memorySpace = MemorySpace.VSRAM;
  if (msn === 0b110) memorySpace = MemorySpace.VRAM_BYTE;
  return {
    memorySpace,
    write: (n & 0x40000000) !== 0,
    DMA: (n & 0x80) !== 0,
    VRAM2VRAMcp: (n & 0x40) !== 0,
    address: ((0x3fff0000 & n) >>> 16) | ((0b11 & n) << 14),
  };
}
