import {
  getBackgroundColorValues,
  getControlAddressValues,
  getDMASource3Values,
  getModeRegister1Values,
  getModeRegister2Values,
  getRegisterWordValues,
} from '../../utils/vdp';

export type AnalysisData = {
  title: string;
  data: { key: string | JSX.Element; value: string | JSX.Element }[];
};
export const MemorySpaceStrings = [
  'UNKNOWN',
  'VRAM',
  'CRAM',
  'VSRAM',
  'VRAM  (byte)',
];

export function getAddressOpAnalysis(op: number): AnalysisData {
  const values = getControlAddressValues(op);
  return {
    title: `0x${op.toString(16)} - VDP Address Operation`,
    data: [
      { key: 'Memory Space', value: MemorySpaceStrings[values.memorySpace] },
      { key: 'Operation type', value: values.write ? 'Write' : 'Read' },
      { key: 'Address', value: `0x${values.address.toString(16)}` },
      { key: 'DMA?', value: values.DMA ? 'Yes' : 'No' },
      { key: 'VRAM to VRAM copy?', value: values.VRAM2VRAMcp ? 'Yes' : 'No' },
    ],
  };
}

export const registerStrings = [
  'Mode Register 1',
  'Mode Register 2',
  'Plane A Name Table Location',
  'Window Name Table Location',
  'Plane B Name Table Location',
  'Sprite Table Location',
  'Sprite Table Location (in 128kB VRAM)',
  'Background Colour',
  'Unused',
  'Unused',
  'Horizontal Interrupt Counter',
  'Mode Register 3',
  'Mode Register 4',
  'Horizontal Scroll Data Location',
  'Plane A & B Address (in 128kB VRAM)',
  'Auto-Increment Value',
  'Plane Size',
  'Window Plane Horizontal Position',
  'Window Plane Vertical Position',
  'DMA Length',
  'DMA Length',
  'DMA Source',
  'DMA Source',
  'DMA Source',
];

export const DMAOpStrings = [
  '64K to VRAM',
  'VRAM Fill (source can be left blank)',
  'VRAM to VRAM copy',
];

export function getRegisterOpAnalysis(op: number): AnalysisData {
  const { register, value } = getRegisterWordValues(op);
  const registerString =
    register > 0x17 ? 'Invalid Register Number' : registerStrings[register];
  const r: AnalysisData = {
    title: `0x${op.toString(16)} - VDP Register Operation`,
    data: [
      {
        key: 'Register',
        value: `0x${register.toString(16)} - ${registerString}`,
      },
      { key: 'Value', value: `0x${value.toString(16)}` },
    ],
  };
  if (register === 0x0) {
    const values = getModeRegister1Values(value);
    r.data = r.data.concat([
      {
        key: 'Clear leftmost 8 pixels?',
        value: values.clearLeftmost8pixels
          ? 'Yes (clear with Background color)'
          : 'No',
      },
      {
        key: 'Enable Horizontal Interrupt?',
        value: values.enableHorizontalInterrupt ? 'Yes' : 'No',
      },
      {
        key: 'Use all color bits?',
        value: values.useAllcolorBits ? 'Yes' : 'No (use only the LSB)',
      },
      {
        key: 'Freeze H/V Counter?',
        value: values.stopHVCounter ? 'Yes' : 'No',
      },
      {
        key: 'Enable display (used only for CSYNC)?',
        value: values.displayEnabled ? 'Yes' : 'No',
      },
    ]);
  } else if (register === 0x1) {
    const values = getModeRegister2Values(value);
    r.data = r.data.concat([
      {
        key: 'Use 128kB of VRAM?',
        value: values.use128kbVRAM ? 'Yes' : 'No',
      },
      {
        key: 'Enable Display?',
        value: values.displayEnabled
          ? 'Yes'
          : 'No (fill with background color)',
      },
      {
        key: 'Enable Vertical Interrupt?',
        value: values.enableVerticalInterrupt ? 'Yes' : 'No',
      },
      {
        key: 'Enable DMA?',
        value: values.enableDMA ? 'Yes' : 'No',
      },
      {
        key: 'PAL Mode (240 pixels - 30 cell)?',
        value: values.PALMode ? 'Yes' : 'No (224 pixel - 28 cell)',
      },
      {
        key: 'Mega Drive (mode 5)?',
        value: values.MDMode ? 'Yes' : 'No (Master System - mode 4)',
      },
    ]);
  } else if (register === 0x2) {
    r.data = r.data.concat([
      {
        key: 'Effective Address:',
        value: `0x${(value * 0x400).toString(16)}`,
      },
    ]);
  } else if (register === 0x4) {
    r.data = r.data.concat([
      {
        key: 'Effective Address:',
        value: `0x${(value * 0x2000).toString(16)}`,
      },
    ]);
  } else if (register === 0x7) {
    const values = getBackgroundColorValues(value);
    r.data = r.data.concat([
      {
        key: 'Background Palette Row',
        value: `0x${values.paletteLine}`,
      },
      {
        key: 'Background Palette Color',
        value: `0x${values.colorIndex}`,
      },
    ]);
  } else if (register === 0xa) {
    r.data = r.data.concat([
      {
        key: 'Number of scanlines between horizontal interrupts',
        value: `0x${value.toString(16)}`,
      },
    ]);
  } else if (register === 0xf) {
    r.data = r.data.concat([
      {
        key: 'Increment value after each read/write to the data port',
        value: `0x${value.toString(16)}`,
      },
    ]);
  } else if (register === 0x13) {
    const str = value.toString(16);
    r.data = r.data.concat([
      {
        key: 'DMA Length (low bytes)',
        value: `0x${str} (0x??${
          '0'.repeat(Math.max(0, 2 - str.length)) + str
        }) - final value is multiplied by 2 bytes.`,
      },
    ]);
  } else if (register === 0x14) {
    r.data = r.data.concat([
      {
        key: 'DMA Length (high bytes)',
        value: `0x${value.toString(16)} (0x${value.toString(
          16,
        )}??) - final value is multiplied by 2 bytes.`,
      },
    ]);
  } else if (register === 0x15) {
    const str = value.toString(16);
    r.data = r.data.concat([
      {
        key: 'DMA Source (low bytes)',
        value: `0x${str} (0x????${
          '0'.repeat(Math.max(0, 2 - str.length)) + str
        }) - final value is multiplied by 2 bytes.`,
      },
    ]);
  } else if (register === 0x16) {
    const str = value.toString(16);
    r.data = r.data.concat([
      {
        key: 'DMA Source (middle bytes)',
        value: `0x${str} (0x??${
          '0'.repeat(Math.max(0, 2 - str.length)) + str
        }??) - final value is multiplied by 2 bytes.`,
      },
    ]);
  } else if (register === 0x17) {
    const values = getDMASource3Values(value);
    r.data = r.data.concat([
      {
        key: 'DMA Source (high bytes)',
        value: `0x${values.highBytes.toString(
          16,
        )} (0x${values.highBytes.toString(
          16,
        )}????) - final value is multiplied by 2 bytes.`,
      },
      {
        key: 'DMA Operation',
        value: `0x${DMAOpStrings[values.DMAOp]}`,
      },
    ]);
  }
  return r;
}
