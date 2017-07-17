import React, { Component } from 'react';
import UserSignUp from './UserSignUp';
import { Jumbotron, Container } from 'reactstrap';

class Home extends Component {
  componentDidMount() {
    this.props.resetActiveGame();
  }
  render() {
    return (
        <Jumbotron fluid>
          <Container fluid>
            <UserSignUp {...this.props} />
          </Container>
        </Jumbotron>
    );
  }
}

export default Home;
