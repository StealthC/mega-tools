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

export function GradientsPage(): JSX.Element {
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
        <Col lg={6}>
          <SMDColorSelector
            initialColor={gradientStart}
            initialBrightnessMode={gradientMode}
            disableMode
            onChangeColor={(color) => dispatch(setGradientStart(color))}
          />
        </Col>
        <Col lg={6}>
          <SMDColorSelector
            initialColor={gradientEnd}
            initialBrightnessMode={gradientMode}
            disableMode
            onChangeColor={(color) => dispatch(setGradientEnd(color))}
          />
        </Col>
      </Row>
      <Row>
        <Col>
          <SMDPaletteColors colors={gradientColors} mode={gradientMode} />
        </Col>
      </Row>
      <Row>
        <Col>
          <Form.Control as="textarea" value={gradientText} />
        </Col>
      </Row>
    </div>
  );
}
