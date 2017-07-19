import React, { Component } from 'react';
import SubmitGameForm from './SubmitGameForm';
import GamesGrid from './GamesGrid';
import { Jumbotron, Container } from 'reactstrap';

class Home extends Component {
  componentDidMount() {
    this.props.resetActiveGame();
    if (this.props.newGames.length === 0) {
      this.props.findNewGames(35);
    }
  }
  render() {

    return (
      <div>
        <Jumbotron fluid>
          <Container fluid>
            <p className='lead'>Get an email when your game goes on sale.</p>
            <SubmitGameForm {...this.props} />
          </Container>
        </Jumbotron>

        {this.props.newGames.length >= 3 &&
          <div>
            <p className='lead' style={{ 'margin': '1em' }}>New releases</p>
            <GamesGrid allGames={this.props.newGames} />
          </div>}
      </div>
    );
  }
}


export default Home;
