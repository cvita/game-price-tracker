import React, { Component } from 'react';
import PriceAlert from './price-alert/PriceAlert';
import GamesGrid from './GamesGrid';
import { Jumbotron, Container } from 'reactstrap';

class Home extends Component {
  render() {
    return (
      <div>
        <Jumbotron fluid>
          <Container fluid>
            <PriceAlert {...this.props} />
          </Container>
        </Jumbotron>

        <GamesGrid {...this.props} />
      </div>
    );
  }
}

export default Home;