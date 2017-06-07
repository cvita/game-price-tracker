import React, { Component } from 'react';
import PriceAlert from './price-alert/PriceAlert';
import ViewSource from './ViewSource';
import { Container, Row, Col, Jumbotron} from 'reactstrap';

class App extends Component {
  render() {
    return (
      <div>
        <Container>
          <Row>
            <Col md='12'>
              <Jumbotron fluid>
                <Container fluid>
                  <h1 className='display-3'>Game Price Tracker</h1>
                  <p className='lead'>A price alert app for the Sony PlayStation store</p>
                  <PriceAlert />
                </Container>
              </Jumbotron>
            </Col>
          </Row>
          <ViewSource />
        </Container>
      </div>
    );
  }
}

export default App;
