import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actionCreators from './actions/actionCreators';
import Main from '../components/Main';


function mapStateToProps(state) {
    return {
        allGames: state.allGames,
        newGames: state.newGames,
        autoSuggestions: state.autoSuggestions,
        searchResults: state.searchResults,
        activeGame: state.activeGame,
        priceAlertCreated: state.priceAlertCreated,
        userInfo: state.userInfo,
        errors: state.errors,
        loadingBar: state.loadingBarReducer
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(actionCreators, dispatch);
}

const App = connect(mapStateToProps, mapDispatchToProps)(Main);

export default App;
