import React, { Component } from 'react';
import LazyLoad from 'react-lazy-load';
import SubmitGameForm from './SubmitGameForm';
import GamesGrid from './GamesGrid';
import { Jumbotron, Container } from 'reactstrap';


class Home extends Component {
  componentDidMount() {
    this.props.resetActiveGame();
    this.props.fetchAllGamesInDb(10);
  }
  handleGetPopularGames() {
    console.log('thinking about calling sony');
    if (this.props.popularGames.length === 0) {
      this.props.findPopularGames(20);
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

        <p className='lead' style={{ 'margin': '1em' }}>Currently tracking</p>
        <GamesGrid allGames={this.props.allGames} />

        <LazyLoad onContentVisible={() => this.handleGetPopularGames()}>
          <div>
            <p className='lead' style={{ 'margin': '1em' }}>Most popular</p>
            <GamesGrid allGames={this.props.popularGames} />
          </div>
        </LazyLoad>
      </div >
    );
  }
}


export default Home;
