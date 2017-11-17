import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { MAKE_ACTIVE_GAME_FAILED } from '../../redux/constants/actionTypes';

import GameOverview from './GameOverview';
import GameDetails from './GameDetails';
import PriceAlertUi from './PriceAlertUi';
import { Alert } from 'reactstrap';


class PriceAlert extends Component {
    componentDidMount() {
        const url = window.location.toString();
        const gameId = url.slice(url.indexOf('games/') + 6);
        this.props.makeActiveGame(gameId); // Error handling below
    }
    render() {
        const { activeGame, errors } = this.props;
        const checkError = error => (error['type'] === MAKE_ACTIVE_GAME_FAILED);

        if (errors.some(checkError)) {
            return (
                <Alert color='danger'>
                    <h4 className='text-center alert-heading'>Invalid game ID</h4>
                    <p className='text-center'>Let's <Link to='/'>go home</Link> and try again.</p>
                </Alert>
            );
        }
        if (activeGame) {
            return (
                <div>
                    <GameOverview {...this.props.activeGame}>
                        <PriceAlertUi {...this.props} />
                    </GameOverview>
                    <GameDetails {...this.props.activeGame} searchVideo={this.props.searchVideo} />
                </div>
            );
        }
        return null;
    }
}

export default PriceAlert;
