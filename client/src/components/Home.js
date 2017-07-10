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
        {!this.props.activeGame &&
          <GamesGrid allGames={this.props.allGames} makeActiveGame={this.props.makeActiveGame}/>}
      </div>
    );
  }
}

export default Home;