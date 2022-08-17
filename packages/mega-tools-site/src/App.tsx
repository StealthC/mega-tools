import React from 'react';
import './App.css';
import {
  HashRouter as Router,
  Routes,
  Route,
  NavLink,
  Navigate,
} from 'react-router-dom';
import { Col, Container, Nav, Row } from 'react-bootstrap';
import { ColorsPage } from './ColorsPage';
import { VDPControl } from './VDPControl';

function App(): JSX.Element {
  return (
    <Container>
      <Row>
        <Col>
          <h1>Mega Tools</h1>
          <p className="pb-2">
            Some tools to help learning Sega Genesis/Mega Drive development.
          </p>
        </Col>
        <Col xs="auto">
          <a
            href="https://github.com/StealthC/mega-tools"
            target="_blank"
            rel="noreferrer"
          >
            View on Github
          </a>
        </Col>
      </Row>

      <Router>
        <Nav variant="tabs">
          <Nav.Item>
            <Nav.Link as={NavLink} to="/colors">
              SMD Colors
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link as={NavLink} to="/vdpcontrol">
              VDP Control Port
            </Nav.Link>
          </Nav.Item>
        </Nav>
        <div className="py-4">
          <Routes>
            <Route path="/colors" element={<ColorsPage />}/>
            <Route path="/vdpcontrol" element={<VDPControl />}/>
            <Route path="/" element={<Navigate to="/colors" />}/>
          </Routes>
        </div>
      </Router>

      <p className="pt-4 text-center small">
        If you like this project and want to help me to create more,{' '}
        <a
          href="https://www.patreon.com/stealthc"
          target="_blank"
          rel="noreferrer"
        >
          please consider being my patron
        </a>
        .
      </p>
    </Container>
  );
}

export default App;
