import React from 'react';
import { Route, Switch, Link } from 'react-router-dom';

import gamepad from '../../assets/gamepad.svg';
import { Container, Row, Col } from 'reactstrap';
import LoadingBar from 'react-redux-loading-bar';
import ErrorAlert from './ErrorAlert';
import Footer from './Footer';
import './Main.css';

import Home from '../Home/Home';
import SearchResults from '../SearchResults/SearchResults';
import PriceAlert from '../ActiveGame/PriceAlert';
import Unsubscribe from '../Unsubscribe/Unsubscribe';
import NotFound from './NotFound';


const Main = props => (
    <div className='mainBody'>

        <div className='mainContent'>
            <header>
                <LoadingBar className='loading' />
                <Link className='siteHeaderContainer' to='/' onClick={props.resetActiveGame}>
                    <h1 className='siteHeader'>Game Price Tracker</h1>
                    <img className='gamepad' src={gamepad} alt='gamepad' />
                </Link>
                <ErrorAlert errors={props.errors} />
            </header>
            <main>
                <Container>
                    <Row>
                        <Col>
                            <Switch>
                                <Route path='/' exact={true} render={() => <Home {...props} />} />
                                <Route path='/search' render={() => <SearchResults {...props} />} />
                                <Route path='/games' render={() => <PriceAlert {...props} />} />
                                <Route path='/manage' render={() => <Unsubscribe {...props} />} />
                                <Route component={NotFound} />
                            </Switch>
                        </Col>
                    </Row>
                </Container>
            </main>
        </div>

        <footer className='mainFooter'>
            <Footer />
        </footer>
    </div>
);


export default Main;
