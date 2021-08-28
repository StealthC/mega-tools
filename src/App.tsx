import React from 'react';
import './App.css';
import {
  HashRouter as Router,
  Switch,
  Route,
  NavLink,
  Redirect,
} from 'react-router-dom';
import { Container, Nav } from 'react-bootstrap';
import { ColorsPage } from './ColorsPage';
import { GradientsPage } from './GradientsPage';

function App(): JSX.Element {
  return (
    <Container>
      <h1>Mega Tools</h1>
      <a className="float-end" href="https://github.com/StealthC/mega-tools">
        View on Github
      </a>
      <p className="pb-2">
        Here you may encounter some tools to help learn Sega Genesis/Mega Drive
        development.
      </p>

      <Router>
        <Nav variant="tabs">
          <Nav.Item>
            <Nav.Link as={NavLink} to="/colors">
              Color
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link as={NavLink} to="/gradient">
              Gradient (Soon&trade;)
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link as={NavLink} to="/vdp">
              VDP (Soon&trade;)
            </Nav.Link>
          </Nav.Item>
        </Nav>
        <div className="py-4">
          <Switch>
            <Route path="/colors">
              <ColorsPage />
            </Route>
            <Route path="/gradient">
              <GradientsPage />
            </Route>
            <Route path="/">
              <Redirect to="/colors" />
            </Route>
          </Switch>
        </div>
      </Router>

      <p className="pt-4 text-center">
        If you like this project and want to help me to create more,{' '}
        <a href="https://www.patreon.com/stealthc">
          please consider being my patron
        </a>
        .
      </p>
    </Container>
  );
}

export default App;
