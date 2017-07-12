import React, { Component } from 'react';
import UserSignUp from './UserSignUp';
import GamesGrid from './GamesGrid';
import { Jumbotron, Container } from 'reactstrap';

class Home extends Component {
  componentDidMount() {
    this.props.resetActiveGame();
    this.props.fetchAllGamesInDb();
  }
  render() {
    return (
      <div>
        <Jumbotron fluid>
          <Container fluid>
            <UserSignUp {...this.props} />
          </Container>
        </Jumbotron>
        <GamesGrid allGames={this.props.allGames} />
      </div>
    );
  }
}

export default Home;
