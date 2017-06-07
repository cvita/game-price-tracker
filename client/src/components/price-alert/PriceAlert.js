import React, { Component } from 'react';
import './PriceAlert.css';

import Client from '../../Client';
import UserSignUp from './components/UserSignUp';
import GamePreview from './components/GamePreview';
import UserSignUpFeedback from './components/UserSignUpFeedback';
const UserSignUpComplete = UserSignUpFeedback.UserSignUpComplete;
const ProgressBarAndMessage = UserSignUpFeedback.ProgressBarAndMessage;


class PriceAlert extends Component {
    constructor(props) {
        super(props);
        this.state = {
            priceAlertSubmitted: false
        };
        this.submitPriceAlertRequest = this.submitPriceAlertRequest.bind(this);
        this.resetCurrentPriceAlert = this.resetCurrentPriceAlert.bind(this);
        this.activateProgressBar = this.activateProgressBar.bind(this);
        this.savePriceAlertToDB = this.savePriceAlertToDB.bind(this);
    }
    submitPriceAlertRequest(gameUrl, userEmail) {
        this.activateProgressBar();
        Client.requestScrape(gameUrl).then(result => {
            var expirationInt = new Date().getTime() + 10886400000; // 18 weeks from now
            this.setState({
                game: result.title,
                gameUrl: gameUrl,
                gameImage: result.image,
                price: result.price,
                priceInt: result.priceInt,
                expiration: new Date(expirationInt).toDateString(),
                expirationInt: expirationInt,
                email: userEmail
            });
        });
    }
    resetCurrentPriceAlert() {
        this.setState({
            priceAlertSubmitted: false,
            game: null,
            gameUrl: null,
            gameImage: null,
            price: null,
            priceInt: null,
            expiration: null,
            expirationInt: null,
            email: null
        });
    }
    activateProgressBar() {
        var currentVal = 0;
        var incrementProgressBar = setInterval(() => {
            if (currentVal < 200) {
                currentVal++;
                this.setState({ progressBarValue: currentVal * 0.5 });
            }

            if (currentVal >= 200 || this.state.game) {
                clearInterval(incrementProgressBar);
                this.setState({ progressBarValue: null })
            }
        }, 40);
    }
    savePriceAlertToDB() {
        var priceAlertInfo = {
            game: this.state.game,
            gameUrl: this.state.gameUrl,
            gameImage: this.state.gameImage,
            price: this.state.price,
            priceInt: this.state.priceInt,
            expiration: this.state.expiration,
            expirationInt: this.state.expirationInt,
            email: this.state.userEmail,
            dateAdded: new Date().getTime()
        };
        Client.createDBEntry(priceAlertInfo).then(result => {
            this.setState({ priceAlertSubmitted: true });
        });
    }
    render() {
        
        return (
            <div>
                {!this.state.game &&
                    <UserSignUp handleClick={this.submitPriceAlertRequest} />}

                {this.state.progressBarValue &&
                    <ProgressBarAndMessage value={this.state.progressBarValue} />}

                {this.state.gameImage &&
                    <div>
                        <hr className='my-2' />
                        <GamePreview
                            priceAlertInfo={this.state}
                            handleConfirmationClick={this.savePriceAlertToDB}
                            handleResetClick={this.resetCurrentPriceAlert}
                            priceAlertSubmitted={this.state.priceAlertSubmitted}
                        />
                    </div>}

                {this.state.priceAlertSubmitted &&
                    <div>
                        <hr className='my-2' />
                        <UserSignUpComplete handleClick={this.resetCurrentPriceAlert} />
                    </div>}
            </div>
        );
    }
}


export default PriceAlert;
