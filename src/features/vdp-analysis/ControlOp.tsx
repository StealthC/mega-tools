import React, { ChangeEvent, useState } from 'react';
import { Col, Form, Row } from 'react-bootstrap';
import { interpretControlOperation, OperationResult } from '../../utils/vdp';
import { ControlAdressOp } from './ControlAddressOp';

export function ControlOp() {
  const [opcodeText, setOpcodeText] = useState('0x0');
  function onOpcodeChange(ev: ChangeEvent<HTMLInputElement>) {
    setOpcodeText(ev.currentTarget.value);
  }
  const opcode = parseInt(opcodeText);
  let result: OperationResult = { operations: [] };
  let error = '';
  try {
    result = interpretControlOperation(opcode);
  } catch (e) {
    error = e.message;
  }

  let codeType = error;
  let elements;
  if (!error) {
    if (result.isRegisterOp) {
      if (result.operations.length === 1) {
        codeType = 'One VDP Register Operation';
      } else if (result.operations.length === 2) {
        codeType = 'Two VDP Register Operation';
      }
    } else {
      codeType = 'VDP Address Operation';
      elements = <ControlAdressOp op={result.operations[0]} />;
    }
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
      <p className="text-center">{codeType}</p>
      {elements}
    </div>
  );
}
