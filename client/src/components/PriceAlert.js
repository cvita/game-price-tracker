import React, { Component } from 'react';
import { Link, browserHistory } from 'react-router';
import PriceAlertPreview from './PriceAlertPreview';
import { Alert, Button } from 'reactstrap';
import './PriceAlert.css';


class PriceAlert extends Component {
    componentDidMount() {
        const url = window.location.toString();
        const sonyStoreUrl = 'https://store.playstation.com/#!/en-us' + url.slice(url.indexOf('/games/'));
        this.props.makeActiveGame(sonyStoreUrl);
    }
    render() {
        const { activeGame, priceAlertCreated, userInfo, createPriceAlert } = this.props;
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

        return (
            <div className='priceAlert'>
                {activeGame &&
                    <div>
                        {activeGame === 'fetching game' ?
                            <Alert color='info'>Connecting to the Sony PlayStation store</Alert> :
                            <PriceAlertPreview {...this.props}>
                                {!priceAlertComplete && !userOnBlacklist &&
                                    confirmAndResetButtons}
                            </PriceAlertPreview>}
                    </div>}

                {priceAlertComplete &&
                    <Alert className='confirmationMessages' color='success' toggle={() => browserHistory.push('/')} isOpen={priceAlertComplete}>
                        <strong>You're all set! </strong>
                        Make sure you allow messages from <strong>game.price.tracker@gmail.com</strong> or you might miss a sale.
                    </Alert>}

                {userOnBlacklist &&
                    <Alert className='confirmationMessages' color='danger' toggle={() => browserHistory.push('/')} isOpen={userOnBlacklist}>
                        <strong>Unable to create your price alert. </strong>
                        Your email is on our "do not send" list. Contact game.price.tracker@gmail.com if you feel this is in error.
                    </Alert>}
            </div>
        );
    }
}

export default PriceAlert;
