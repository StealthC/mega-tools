// http://md.railgun.works/index.php?title=VDP

// Mode Register 1
export interface ModeRegister1Values {
  clearLeftmost8pixels: boolean;
  generateHorizontalInterrupt: boolean;
  stopHVCounter: boolean;
  displayEnabled: boolean;
}

export function getModeRegister1Values(n: number): ModeRegister1Values {
  return {
    clearLeftmost8pixels: (n & 0x20) !== 0,
    generateHorizontalInterrupt: (n & 0x10) !== 0,
    stopHVCounter: (n & 2) !== 0,
    displayEnabled: (n & 1) !== 0,
  };
}

export function setModeRegister1Byte(v: ModeRegister1Values): number {
  let n = 4;
  if (v.displayEnabled) n |= 1;
  if (v.stopHVCounter) n |= 2;
  if (v.generateHorizontalInterrupt) n |= 0x10;
  if (v.clearLeftmost8pixels) n |= 0x20;
  return n;
}

// Interpret Register Write

export function getRegisterWordValues(n: number): RegisterWriteControlValues {
  return { register: (n & 0x1f00) >> 8, value: n & 0xff };
}

export function createModeRegisterWord(v: RegisterWriteControlValues): number {
  return ((v.register | 0x80) << 8) | v.value;
}

export enum MemorySpace {
  VRAM,
  CRAM,
  VSRAM,
  VRAM_BYTE,
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
  const msn = (n >>> 15) | (((0x30 & n) >>> 4) << 1);
  let memorySpace = MemorySpace.CRAM;
  if (msn === 0b0) memorySpace = MemorySpace.VRAM;
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
