import React from 'react';
import { render } from 'react-dom';
import GamePriceTracker from './GamePriceTracker';
import './index.css';

// Service worker disabled for development...
//import registerServiceWorker from './registerServiceWorker';


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

//registerServiceWorker();
