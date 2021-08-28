import React from 'react';
import { Col, Row } from 'react-bootstrap';
import { SMDColorSelector } from './features/palette/SMDColorSelector';

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
    </div>
  );
}
