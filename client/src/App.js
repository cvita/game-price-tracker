import React, { Component } from 'react';
import { Route, HashRouter, Switch } from 'react-router-dom';

import Home from './components/Home';
import Unsubscribe from './components/unsubscribe/Unsubscribe';
import NotFound from './components/NotFound';


class App extends Component {
  render() {
    return (
      <div>
        <HashRouter>
          <Switch>
            <Route path='/' exact component={Home} />
            <Route path='/unsubscribe' component={Unsubscribe} />
            <Route component={NotFound} />
          </Switch>
        </HashRouter>
      </div>
    );
  }
}

export default App;
