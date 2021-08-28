import React, { useRef, useState } from 'react';
import { Row, Col, Form } from 'react-bootstrap';
import {
  BRIGHTNESS_HIGHLIGHT,
  BRIGHTNESS_NORMAL,
  BRIGHTNESS_SHADOW,
  Convert24BitsToWeb,
  convert24BitToSMD,
  convertSMDTo24Bit,
  getBits,
  getColorFromBits,
  isValid,
} from './smdColors';
import styles from './SMDColorSelector.module.scss';

export enum BrightnessMode {
  NORMAL = 0,
  SHADOW = 1,
  HIGHLIGHT = 2,
}

export interface SMDColorSelectorProps {
  initialColor?: number;
  initialBrightnessMode?: BrightnessMode;
  onChangeColor?: (color: number) => void;
}

function selectMode(mode: BrightnessMode): number[] {
  if (mode === BrightnessMode.SHADOW) {
    return BRIGHTNESS_SHADOW;
  }
  if (mode === BrightnessMode.HIGHLIGHT) {
    return BRIGHTNESS_HIGHLIGHT;
  }
  return BRIGHTNESS_NORMAL;
}

function formatBitHex(n: number) {
  return `0x${(n * 2).toString(16)}`;
}

export function SMDColorSelector({
  initialColor = 0x0,
  initialBrightnessMode = BrightnessMode.NORMAL,
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
  const webColor = Convert24BitsToWeb(b24Color);
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
    setColor(
      convert24BitToSMD(
        parseInt(ev.currentTarget.value.substr(1), 16),
        selectMode(mode),
      ),
    );
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
        <Col xs="auto">
          <div className="border rounded border-2 p-1 h-100">
            <div
              className="h-100"
              style={{
                backgroundColor: webColor,
                minWidth: '15vw',
              }}
            >
              &nbsp;
            </div>
          </div>
        </Col>
        <Col>
          <Form.Group as={Row} xs={2} lg={6}>
            <Form.Label column sm={6} md={3} lg="auto">
              Brightness Mode:
            </Form.Label>
            <Col xs={6} md={3}>
              <Form.Select
                defaultValue={mode}
                onChange={(ev) => setMode(parseInt(ev.currentTarget.value))}
              >
                <option value={BrightnessMode.NORMAL}>Normal</option>
                <option value={BrightnessMode.SHADOW}>Shadow</option>
                <option value={BrightnessMode.HIGHLIGHT}>Highlight</option>
              </Form.Select>
            </Col>

            <Form.Label column xs={6} md={3} lg="auto">
              SMD:
            </Form.Label>
            <Col xs={6} md={3}>
              <Form.Control value={colorInput} onChange={colorInputChange} />
            </Col>

            <Form.Label column xs={4} lg="auto">
              Web:{' '}
            </Form.Label>
            <Col xs={4}>
              <Form.Control
                type="color"
                value={webColor}
                onChange={webColorChange}
              />
            </Col>
            <Form.Label column xs={4} lg="auto">
              {webColor}
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
