import React from 'react';
import { getControlAddressValues, MemorySpace } from '../../utils/vdp';

export interface ControlAdressOpProps {
  op: number;
}

export function ControlAdressOp({ op }: ControlAdressOpProps): JSX.Element {
  const values = getControlAddressValues(op);
  return (
    <dl className="row">
      <dt className="col-3 text-end">Memory Space:</dt>
      <dd className="col-9">{MemorySpace[values.memorySpace]}</dd>
      <dt className="col-3 text-end">Operation type:</dt>
      <dd className="col-9">{values.write ? 'Write' : 'Read'}</dd>
      <dt className="col-3 text-end">Address:</dt>
      <dd className="col-9">{`0x${values.address.toString(16)}`}</dd>
      <dt className="col-3 text-end">DMA?:</dt>
      <dd className="col-9">{values.DMA ? 'Yes' : 'No'}</dd>
      <dt className="col-3 text-end">VRAM to VRAM copy?:</dt>
      <dd className="col-9">{values.VRAM2VRAMcp ? 'Yes' : 'No'}</dd>
    </dl>
  );
}
