import React from 'react';
import { Router, Route, IndexRoute } from 'react-router';

// Redux
import { Provider } from 'react-redux';
import store, { history } from './redux/store';

// Components
import App from './redux/App';
import Home from './components/Home';
import SearchResults from './components/SearchResults';
import PriceAlert from './components/PriceAlert';
import Unsubscribe from './components/Unsubscribe';
import NotFound from './components/NotFound';


function GamePriceTracker(props) {
    return (
        <Provider store={store}>
            <Router history={history}>
                <Route path='/' component={App}>
                    <IndexRoute component={Home} />
                    <Route path='/search/*' component={SearchResults} />
                    <Route path='/games/*' component={PriceAlert} />
                    <Route path='/manage/*' component={Unsubscribe} />
                    <Route path='*' component={NotFound} />
                </Route>
            </Router>
        </Provider>
    );
}


export default GamePriceTracker;
