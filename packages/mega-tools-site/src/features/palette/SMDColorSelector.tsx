import React, { useRef, useState } from 'react';
import { Row, Col, Form } from 'react-bootstrap';
import {
  BrightnessMode,
  convert24BitsToWeb,
  convert24BitToSMD,
  convertSMDTo24Bit,
  getBits,
  getColorFromBits,
  isValid,
  selectMode,
} from '../../utils/smdColors';
import styles from './SMDColorSelector.module.scss';

export interface SMDColorSelectorProps {
  initialColor?: number;
  initialBrightnessMode?: number;
  disableMode?: boolean;
  onChangeColor?: (color: number) => void;
}

function formatBitHex(n: number) {
  return `0x${(n * 2).toString(16)}`;
}

export function SMDColorSelector({
  initialColor = 0x0,
  initialBrightnessMode = BrightnessMode.normal,
  disableMode,
  onChangeColor,
}: SMDColorSelectorProps): JSX.Element {
  const [color, setColor] = useState(initialColor);
  const [colorInput, setColorInput] = useState(
    `0x${initialColor.toString(16)}`,
  );
  const [mode, setMode] = useState(initialBrightnessMode);
  const { r, g, b } = getBits(color);
  const rSlider = useRef<HTMLInputElement>(null);
  const gSlider = useRef<HTMLInputElement>(null);
  const bSlider = useRef<HTMLInputElement>(null);
  const b24Color = convertSMDTo24Bit(color, selectMode(mode));
  const webColor = convert24BitsToWeb(b24Color);
  const rgbChange = () => {
    const newColor = getColorFromBits({
      r: rSlider.current?.valueAsNumber || 0,
      g: gSlider.current?.valueAsNumber || 0,
      b: bSlider.current?.valueAsNumber || 0,
    });
    setColorInput(`0x${newColor.toString(16)}`);
    setColor(newColor);
    if (onChangeColor) {
      onChangeColor(newColor);
    }
  };
  const webColorChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
    const n = convert24BitToSMD(
      parseInt(ev.currentTarget.value.substr(1), 16),
      selectMode(mode),
    );
    setColor(n);
    setColorInput(`0x${n.toString(16)}`);
    if (onChangeColor) {
      onChangeColor(n);
    }
  };
  const colorInputChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
    setColorInput(ev.currentTarget.value);
    const n = parseInt(ev.currentTarget.value);
    if (isValid(n)) {
      setColor(n);
      if (onChangeColor) {
        onChangeColor(n);
      }
    }
  };
  return (
    <div>
      <Row>
        <Col xs={2}>
          <div className="border rounded border-2 p-1 h-100">
            <div
              className="h-100"
              style={{
                backgroundColor: webColor,
                width: '100%',
              }}
            >
              &nbsp;
            </div>
          </div>
        </Col>
        <Col>
          <Form.Group as={Row} xs={2} lg={6}>
            {disableMode ? null : (
              <>
                <Form.Label column sm={6} md={3} lg="auto">
                  Mode:
                </Form.Label>
                <Col xs={6} md={3}>
                  <Form.Select
                    defaultValue={mode}
                    onChange={(ev) => setMode(parseInt(ev.currentTarget.value))}
                  >
                    <option value={BrightnessMode.normal}>Normal</option>
                    <option value={BrightnessMode.shadow}>Shadow</option>
                    <option value={BrightnessMode.highlight}>Highlight</option>
                  </Form.Select>
                </Col>
              </>
            )}

            <Form.Label column xs={6} md={3} lg="auto">
              SMD:
            </Form.Label>
            <Col xs={6} md={3} lg="auto">
              <Form.Control value={colorInput} onChange={colorInputChange} />
            </Col>

            <Form.Label column xs={4} lg="auto">
              Picker:{' '}
            </Form.Label>
            <Col xs={4}>
              <Form.Control
                type="color"
                value={webColor}
                onChange={webColorChange}
              />
            </Col>
            <Form.Label className="text-center" column xs={4}>
              Web: {webColor}
            </Form.Label>
          </Form.Group>

          <div className={styles.Sliders}>
            <Row className={styles.R}>
              <Col>
                <Form.Range
                  ref={rSlider}
                  min={0}
                  max={7}
                  step={1}
                  value={r}
                  onChange={rgbChange}
                />
              </Col>
              <Col className={styles.Value} xs="auto">
                {formatBitHex(r)}
              </Col>
            </Row>
            <Row className={styles.G}>
              <Col>
                <Form.Range
                  ref={gSlider}
                  min={0}
                  max={7}
                  step={1}
                  value={g}
                  onChange={rgbChange}
                />
              </Col>
              <Col className={styles.Value} xs="auto">
                {formatBitHex(g)}
              </Col>
            </Row>
            <Row className={styles.B}>
              <Col>
                <Form.Range
                  ref={bSlider}
                  min={0}
                  max={7}
                  step={1}
                  value={b}
                  onChange={rgbChange}
                />
              </Col>
              <Col className={styles.Value} xs="auto">
                {formatBitHex(b)}
              </Col>
            </Row>
          </div>
        </Col>
      </Row>
    </div>
  );
}
