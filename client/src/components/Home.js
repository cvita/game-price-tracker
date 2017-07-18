import React, { Component } from 'react';
import SubmitGameForm from './SubmitGameForm';
import { Jumbotron, Container } from 'reactstrap';

class Home extends Component {
  componentDidMount() {
    this.props.resetActiveGame();
  }
  render() {
    return (
      <Jumbotron fluid>
        <Container fluid>
          <p className='lead'>Get an email when your game goes on sale.</p>
          <SubmitGameForm {...this.props} />
        </Container>
      </Jumbotron>
    );
  }
}

export default Home;
