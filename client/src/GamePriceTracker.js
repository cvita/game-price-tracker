import React from 'react';
import { Router, Route, IndexRoute } from 'react-router';

// Redux
import { Provider } from 'react-redux';
import store, { history } from './redux/store';

// Components
import App from './redux/App';
import Home from './components/Home/Home';
import SearchResults from './components/SearchResults/SearchResults';
import PriceAlert from './components/ActiveGame/PriceAlert';
import Unsubscribe from './components/Unsubscribe/Unsubscribe';
import NotFound from './components/Main/NotFound';


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
