import React from 'react';
import { Col, Row } from 'react-bootstrap';
import { SMDColorSelector } from './features/palette/SMDColorSelector';
import { SMDGradient } from './features/palette/SMDGradient';

export function GradientsPage(): JSX.Element {
  return (
    <div>
      <Row>
        <Col lg={6}>
          <SMDColorSelector />
        </Col>
        <Col lg={6}>
          <SMDColorSelector />
        </Col>
      </Row>
      <SMDGradient from={0x0} to={0xeee} steps={8} />
    </div>
  );
}
