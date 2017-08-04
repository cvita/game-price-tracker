import React, { Component } from 'react';
import { Link } from 'react-router';
import gamepad from '../assets/gamepad.svg';
import { Container, Row, Col } from 'reactstrap';
import LoadingBar from 'react-redux-loading-bar';
import ErrorAlert from './ErrorAlert';
import Footer from './Footer';
import './Main.css';


class Main extends Component {
    render() {
        return (
            <Container>
                <LoadingBar className='loading' />
                <Row>
                    <Col md='12'>
                        <Link className='siteHeaderContainer' to='/' onClick={this.props.resetActiveGame}>
                            <h1 className='siteHeader'>Game Price Tracker</h1>
                            <img className='gamepad' src={gamepad} alt='gamepad' />
                        </Link>
                        <ErrorAlert errors={this.props.errors} />
                        {React.cloneElement(this.props.children, this.props)}
                    </Col>
                </Row>
                <Footer />
            </Container>
        );
    }
}


export default Main;
