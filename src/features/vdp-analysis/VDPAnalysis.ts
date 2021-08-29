import { getControlAddressValues } from '../../utils/vdp';

export type AnalysisData = {
  title: string;
  data: { key: string; value: string }[];
};
export const MemorySpaceStrings = ['VRAM', 'CRAM', 'VSRAM', 'VRAM  (byte)'];

export function getAddressOpAnalysis(op: number): AnalysisData {
  const values = getControlAddressValues(op);
  return {
    title: 'VDP Address Operation',
    data: [
      { key: 'Memory Space', value: MemorySpaceStrings[values.memorySpace] },
      { key: 'Operation type', value: values.write ? 'Write' : 'Read' },
      { key: 'Address', value: `0x${values.address.toString(16)}` },
      { key: 'DMA?', value: values.DMA ? 'Yes' : 'No' },
      { key: 'VRAM to VRAM copy?', value: values.VRAM2VRAMcp ? 'Yes' : 'No' },
    ],
  };
}
