import React, { Component } from 'react';
import { Link, browserHistory } from 'react-router';
import PriceAlertPreview from './PriceAlertPreview';
import GameDetails from './GameDetails';
import { Alert, Button } from 'reactstrap';
import './PriceAlert.css';


function ConfirmAndResetButtons(props) {
    return (
        <div>
            <Button
                className='gamePriceTrackerButton'
                color='success'
                disabled={!props.validUserEmail}
                onClick={props.handleClick}
            >
                Sounds good
                </Button>
            <Link to='/'>
                <Button
                    className='gamePriceTrackerButton'
                    color='danger'
                    outline
                >
                    Nevermind
                </Button>
            </Link>
        </div>
    );
}

class PriceAlert extends Component {
    componentDidMount() {
        const url = window.location.toString();
        const gameId = url.slice(url.indexOf('games/') + 6);
        const regEx = /UP\d{4}-\w{9}_00-\w{16}/g;
        if (regEx.test(gameId)) {
            this.props.makeActiveGame(gameId);
        } else {
            // return search results for term entered
        }
    }
    render() {
        const { activeGame, priceAlertCreated, userInfo, createPriceAlert } = this.props;
        const validUserEmail = userInfo.userEmail !== null;

        return (
            <div>
                {activeGame &&
                    <div>
                        <PriceAlertPreview {...this.props} >

                            {!priceAlertCreated && !userInfo.onBlacklist ?
                                <ConfirmAndResetButtons handleClick={() => createPriceAlert(userInfo)} validUserEmail={validUserEmail} /> :
                                <Alert className='confirmationMessages' color='danger' toggle={() => browserHistory.push('/')} isOpen={userInfo.onBlacklist}>
                                    <strong>Unable to create your price alert. </strong>
                                    Your email is on our "do not send" list. Contact game.price.tracker@gmail.com if you feel this is in error.
                                </Alert>}

                            <Alert className='confirmationMessages' isOpen={priceAlertCreated} toggle={() => browserHistory.push('/')} color='success'>
                                <strong>You're all set! </strong>
                                Make sure you allow messages from <strong>game.price.tracker@gmail.com</strong> or you might miss a sale.
                            </Alert>

                        </PriceAlertPreview>

                        <GameDetails {...this.props.activeGame} />
                    </div>}
            </div>
        );
    }
}

export default PriceAlert;
