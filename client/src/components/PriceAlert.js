import React, { Component } from 'react';
import { Alert, Button } from 'reactstrap';
import './PriceAlert.css';

import UserSignUp from './UserSignUp';
import PriceAlertPreview from './PriceAlertPreview';


class PriceAlert extends Component {
    componentDidMount() {
        this.props.fetchAllGamesInDb();
    }
    render() {
        const { activeGame, priceAlertCreated, userInfo, resetActiveGame, createPriceAlert } = this.props;
        const validUserEmail = userInfo.userEmail !== null;

        const priceAlertComplete = priceAlertCreated;
        const userOnBlacklist = userInfo.onBlacklist;
        const confirmAndResetButtons = (
            <div>
                <Button
                    className='gamePriceTrackerButton'
                    color='success'
                    disabled={!validUserEmail}
                    onClick={() => createPriceAlert(userInfo)}
                >
                    Sounds good
                </Button>
                <Button
                    className='gamePriceTrackerButton'
                    color='danger'
                    outline
                    onClick={resetActiveGame}
                >
                    Nevermind
                </Button>
            </div>
        );

        return (
            <div>
                {!activeGame ?
                    <UserSignUp {...this.props} /> :
                    <div>
                        {activeGame === 'fetching game' ?
                            <Alert color='info'>Connecting to the Sony PlayStation store</Alert> :
                            <PriceAlertPreview {...this.props}>
                                {!priceAlertComplete && !userOnBlacklist &&
                                    confirmAndResetButtons}
                            </PriceAlertPreview>}
                    </div>}

                {priceAlertComplete &&
                    <Alert className='confirmationMessages' color='success' toggle={resetActiveGame} isOpen={priceAlertComplete}>
                        <strong>You're all set! </strong>
                        Make sure you allow messages from <strong>game.price.tracker@gmail.com</strong> or you might miss a sale.
                    </Alert>}

                {userOnBlacklist &&
                    <Alert className='confirmationMessages' color='danger' toggle={resetActiveGame} isOpen={userOnBlacklist}>
                        <strong>Unable to create your price alert. </strong>
                        Your email is on our "do not send" list. Contact game.price.tracker@gmail.com if you feel this is in error.
                    </Alert>}
            </div>
        );
    }
}

export default PriceAlert;
