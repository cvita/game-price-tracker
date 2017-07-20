import React, { Component } from 'react';
import { Link } from 'react-router';
import gamepad from '../assets/gamepad.svg';
import { Container, Row, Col } from 'reactstrap';
import LoadingBar from 'react-redux-loading-bar';
import GamesGrid from './GamesGrid';
import Footer from './Footer';
import './Main.css';


class Main extends Component {
    render() {
        return (
            <Container>
                <Row>
                    <Col md='12'>
                        <Link className='siteHeaderContainer' to='/' onClick={this.props.resetActiveGame}>
                            <h1 className='siteHeader'>Game Price Tracker</h1>
                            <img className='gamepad' src={gamepad} alt='gamepad' />
                        </Link>
                        <LoadingBar className='loading' />
                        {React.cloneElement(this.props.children, this.props)}
                        <GamesGrid allGames={this.props.allGames} />
                    </Col>
                </Row>
                <Footer />
            </Container>
        );
    }
}

export default Main;
