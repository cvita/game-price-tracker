import React from 'react';
import { Route, Switch } from 'react-router-dom';

import { Container } from 'reactstrap';
import LoadingBar from 'react-redux-loading-bar';
import ErrorAlert from './ErrorAlert';
import Navigation from './Navigation';
import Footer from './Footer';

import Home from '../Home/Home';
import SearchResults from '../SearchResults/SearchResults';
import PriceAlert from '../ActiveGame/PriceAlert';
import Unsubscribe from '../Unsubscribe/Unsubscribe';
import NotFound from './NotFound';
import './Main.css';


const Main = props => (
    <div className='mainBody'>
        <header className='mainHeader'>
            <Navigation />
            <LoadingBar className='loading' />
            <ErrorAlert errors={props.errors} />
        </header>

        <main className='mainContent'>
            <Container>
                <Switch>
                    <Route path='/' exact={true} render={() => <Home {...props} />} />
                    <Route path='/search' render={() => <SearchResults {...props} />} />
                    <Route path='/games' render={() => <PriceAlert {...props} />} />
                    <Route path='/manage' render={() => <Unsubscribe {...props} />} />
                    <Route component={NotFound} />
                </Switch>
            </Container>
        </main>

        <footer className='mainFooter'>
            <Footer />
        </footer>
    </div>
);


export default Main;
