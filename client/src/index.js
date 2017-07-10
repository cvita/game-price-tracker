import React from 'react';
import { Router, Route, IndexRoute } from 'react-router';
import { render } from 'react-dom';

// Redux
import { Provider } from 'react-redux';
import store, { history } from './redux/store';

// Components
import App from './redux/App';
import Home from './components/Home';
import Unsubscribe from './components/Unsubscribe';
import NotFound from './components/NotFound';

// Service worker disabled for development...
// import registerServiceWorker from './registerServiceWorker';

import 'bootstrap/dist/css/bootstrap.css';
import './index.css';


function GamePriceTracker(props) {
    return (
        <Provider store={store}>
            <Router history={history}>
                <Route path='/' component={App}>
                    <IndexRoute component={Home} />
                    <Route path='/unsubscribe*' component={Unsubscribe} />
                    <Route path='*' component={NotFound} />
                </Route>
            </Router>
        </Provider>
    );
}


render(
    <GamePriceTracker />,
    document.getElementById('root')
);

// registerServiceWorker();
