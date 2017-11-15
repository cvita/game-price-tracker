import React from 'react';

import { ConnectedRouter } from 'react-router-redux';
import { history } from './redux/store';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actionCreators from './redux/actions/actionCreators';

import Main from './components/Main/Main';


const App = props => (
  <ConnectedRouter history={history}>
    <Main {...props} />
  </ConnectedRouter>
);


const mapStateToProps = state => ({
    allGames: state.allGames,
    popularGames: state.popularGames,
    autoSuggestions: state.autoSuggestions,
    searchResults: state.searchResults,
    activeGame: state.activeGame,
    priceAlertCreated: state.priceAlertCreated,
    userInfo: state.userInfo,
    errors: state.errors,
    loadingBar: state.loadingBarReducer,
    routing: state.routing
  });
  
  const mapDispatchToProps = dispatch => (bindActionCreators(actionCreators, dispatch));


export default connect(mapStateToProps, mapDispatchToProps)(App);
