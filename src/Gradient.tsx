import React from 'react';
import { Col, Form, Row } from 'react-bootstrap';
import { useAppDispatch, useAppSelector } from './app/hooks';
import {
  getGradient,
  setGradientEnd,
  setGradientStart,
} from './features/palette/paletteSlice';
import { generateGradient } from './utils/smdColors';
import { SMDColorSelector } from './features/palette/SMDColorSelector';
import { SMDPaletteColors } from './features/palette/SMDPaletteColors';

export function Gradient(): JSX.Element {
  const { gradientStart, gradientEnd, gradientSteps, gradientMode } =
    useAppSelector(getGradient);
  const gradientColors = generateGradient(
    gradientStart,
    gradientEnd,
    gradientSteps,
  );
  const dispatch = useAppDispatch();
  const gradientText = gradientColors
    .map((color) => `0x${color.toString(16)}`)
    .join(', ');
  return (
    <div>
      <Row>
        <Col lg={6} className="pt-2">
          <h4>Starting Color</h4>
          <SMDColorSelector
            initialColor={gradientStart}
            initialBrightnessMode={gradientMode}
            disableMode
            onChangeColor={(color) => dispatch(setGradientStart(color))}
          />
        </Col>
        <Col lg={6} className="pt-2">
          <h4>Ending Color</h4>
          <SMDColorSelector
            initialColor={gradientEnd}
            initialBrightnessMode={gradientMode}
            disableMode
            onChangeColor={(color) => dispatch(setGradientEnd(color))}
          />
        </Col>
      </Row>
      <Row>
        <Col xs={12} md={6} className="pt-2">
          <SMDPaletteColors colors={gradientColors} mode={gradientMode} />
        </Col>
        <Col xs={12} md={6} className="pt-2">
          <Form.Control
            style={{ resize: 'none' }}
            className="h-100"
            as="textarea"
            value={gradientText}
          />
        </Col>
      </Row>
    </div>
  );
}
