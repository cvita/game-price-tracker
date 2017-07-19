import React from 'react';
import { render } from 'react-dom';
import GamePriceTracker from './GamePriceTracker';

// Service worker disabled for development...
// import registerServiceWorker from './registerServiceWorker';

import 'bootstrap/dist/css/bootstrap.css';
import './index.css';


const rootEl = document.getElementById('root');

render(
    <GamePriceTracker />,
    rootEl
);

if (module.hot) {
    module.hot.accept('./GamePriceTracker', () => {
        const NextApp = require('./GamePriceTracker').default
        render(
            <NextApp />,
            rootEl
        );
    });
}

// registerServiceWorker();
