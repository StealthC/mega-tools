import React, { ChangeEvent, useState } from 'react';
import { Alert, Col, Form, Row } from 'react-bootstrap';
import { interpretControlOperation, OperationResult } from '../../utils/vdp';
import { AnalysisPrint } from './AnalysisPrint';
import { getAddressOpAnalysis, getRegisterOpAnalysis } from './VDPAnalysis';

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
  } catch (e: any) {
    error = e.message;
  }

  let elements;
  if (!error) {
    if (result.isRegisterOp) {
      elements = (
        <Row>
          {result.operations.map((v) => (
            <Col>
              <AnalysisPrint data={getRegisterOpAnalysis(v)} />
            </Col>
          ))}
        </Row>
      );
    } else {
      elements = (
        <AnalysisPrint data={getAddressOpAnalysis(result.operations[0])} />
      );
    }
  }
  return (
    <>
      <div>
        <Form.Group>
          <Form.Label>
            Type number sent to address <mark>0xc00004</mark> (Control Port of
            VDP) to see what operation it does. Start with &quot;0x&quot; for
            hexadecimal. It works with words (2 Bytes) and longwords (4 bytes).
          </Form.Label>

          <Col>
            <Form.Control
              className="text-center"
              placeholder="0x0"
              value={opcodeText}
              onChange={onOpcodeChange}
            />
          </Col>
        </Form.Group>
        {error ? <Alert className="text-center">{error}</Alert> : null}
        {elements}
      </div>
    </>
  );
}
