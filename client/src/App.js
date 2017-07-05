import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actionCreators from './redux/actions/actionCreators';
import Main from './components/Main';


function mapStateToProps(state) {
    return {
        gamesInDb: state.gamesInDb,
        activeGame: state.activeGame,
        errors: state.errors,
        loadingBar: state.loadingBarReducer,
        activePriceAlert: state.activePriceAlert
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(actionCreators, dispatch);
}

const App = connect(mapStateToProps, mapDispatchToProps)(Main);

export default App;
