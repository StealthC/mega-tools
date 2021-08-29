import React, { ChangeEvent, useState } from 'react';
import { Col, Form, Row } from 'react-bootstrap';
import { interpretLongValueToControl } from '../../utils/vdp';
import { ControlAdressOp } from './ControlAddressOp';

export function ControlOp() {
  const [opcodeText, setOpcodeText] = useState('0x0');
  function onOpcodeChange(ev: ChangeEvent<HTMLInputElement>) {
    setOpcodeText(ev.currentTarget.value);
  }
  const opcode = parseInt(opcodeText);
  const result = interpretLongValueToControl(opcode);
  let elements;
  if (result.length === 1) {
    elements = [
      <p>VDP Address Operation.</p>,
      <ControlAdressOp op={result[0]} />,
    ];
  } else if (result.length === 2) {
    elements = [
      <p>Two VDP Register Operation.</p>,
    ];
  } else {
    elements = <p>Invalid Number.</p>,
  }
  return (
    <div>
      <p className="text-center">
        Type there the number writen to 0xC00004 (Control Port of VDP) to see
        what it does. Start with &quot;0x&quot; for hexadecimal.
      </p>
      <Form.Group as={Row}>
        <Form.Label className="text-end" column xs={3}>
          Op Code
        </Form.Label>
        <Col>
          <Form.Control value={opcodeText} onChange={onOpcodeChange} />
        </Col>
      </Form.Group>
      {elements}
    </div>
  );
}
