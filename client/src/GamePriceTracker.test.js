import React from 'react';
import ReactDOM from 'react-dom';
import GamePriceTracker from './GamePriceTracker';


it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<GamePriceTracker />, div);
});
