import React, { Component } from 'react';
import { Route, BrowserRouter, Switch } from 'react-router-dom';

import Home from './components/Home';
import Unsubscribe from './components/unsubscribe/Unsubscribe';


class App extends Component {
  render() {
    return (
      <div>
        <BrowserRouter>
          <Switch>
            <Route path='/' exact component={Home} />
            <Route path='/unsubscribe' component={Unsubscribe} />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
