import React, { Component } from 'react';
import UserSubmission from './UserSubmission';
import {
  Container,
  Row,
  Col,
  Jumbotron
} from 'reactstrap';

class App extends Component {
  render() {
    return (
      <div>
        <Container>
          <Row>
            <Col md='12'>
              <Jumbotron>
                <h1 className='display-3'>Game Price Tracker</h1>
                <p className='lead'>A price alert app for the Sony PlayStation store</p>
                <UserSubmission />
              </Jumbotron>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default App;
