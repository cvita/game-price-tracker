import React, { Component } from 'react';
import { Row, Col, Jumbotron } from 'reactstrap';
import TitleSearch from './TitleSearch';
import GamesGrid from '../helper/GamesGrid';


class Home extends Component {
  componentDidMount() {
    this.props.resetActiveGame();
    if (this.props.popularGames.length === 0) {
      this.props.findPopularGames(20);
    }
  }
  render() {
    return (
      <div>
        <Row>
          <Col>
            <div style={{ maxWidth: '50em', margin: '0 auto 5em auto' }}>
              <Jumbotron>
                <p className='lead'>Get an email when your game goes on sale.</p>
                <TitleSearch {...this.props} />
              </Jumbotron>
            </div>
          </Col>
        </Row>

        {this.props.popularGames.length > 0 && (
          <GamesGrid allGames={this.props.popularGames} />)}
      </div>
    );
  }
}


export default Home;
